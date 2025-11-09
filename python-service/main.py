import os
import io
from typing import List, Dict, Any
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Google Gen AI SDK (new) - from google import genai
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_TEXT = os.getenv("GEMINI_MODEL_TEXT", "gemini-2.5-flash")
MODEL_EVAL = os.getenv("GEMINI_MODEL_EVAL", "gemini-2.5-flash")

client = genai.Client(api_key=GEMINI_API_KEY)

app = FastAPI(title="Gemini Test & Eval Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"]
)

class GeneratePayload(BaseModel):
    topic: str
    difficulty: str
    numQuestions: int
    durationMinutes: int
    pdfUrl: str | None = None

def prompt_for_test(topic: str, difficulty: str, num_q: int, duration: int) -> str:
    return (
        f"You are a test setter. Create {num_q} MCQs for topic '{topic}' "
        f"with difficulty '{difficulty}'. Each question must include exactly 4 options, "
        f"and specify the single correct answer and a brief explanation. "
        f"Return strict JSON with fields: questions:[{{number,question,options,answer,explanation,difficulty}}]. "
        f"Ensure numbering 1..{num_q}. Do not include any text outside JSON. "
        f"Assume test duration is {duration} minutes."
    )

@app.post("/generate-test")
async def generate_test(payload: GeneratePayload):
    contents: List[Any] = [prompt_for_test(payload.topic, payload.difficulty, payload.numQuestions, payload.durationMinutes)]
    # If a PDF URL is provided, fetch and upload to Gemini File API
    if payload.pdfUrl:
        import httpx
        pdf_bytes = io.BytesIO(httpx.get(payload.pdfUrl).content)
        uploaded = client.files.upload(file=pdf_bytes, config=dict(mime_type="application/pdf"))
        contents = [uploaded, contents[0]]
    resp = client.models.generate_content(model=MODEL_TEXT, contents=contents)
    text = resp.text or "{}"
    import json
    data = json.loads(text)
    # Normalize difficulty
    for q in data.get("questions", []):
        q["difficulty"] = payload.difficulty
    return {"questions": data.get("questions", [])}

def build_eval_prompt(moderation: str, answer_key_text: str) -> str:
    return (
        "You are an examiner. Extract the student's final marked choices by question number from the provided PDF. "
        "Then compare with the provided answer key text (format: Q1:A, Q2:C...). "
        f"Apply moderation level '{moderation}' where: lenient allows partial credit if student circled and corrected, "
        "standard is exact-match, strict penalizes ambiguous marks. "
        "Return strict JSON with fields: total, breakdown:[{number, expected, extracted, credit}], "
        "notes and a boolean flagged if extraction is low confidence. No extra text."
    )

@app.post("/evaluate")
async def evaluate(
    pdf: UploadFile = File(...),
    answer_key: UploadFile = File(...),
    moderation_level: str = Form("standard")
):
    # Upload PDF to Gemini via File API
    pdf_bytes = io.BytesIO(await pdf.read())
    uploaded_file = client.files.upload(file=pdf_bytes, config=dict(mime_type="application/pdf"))

    key_text = (await answer_key.read()).decode("utf-8", errors="ignore")
    prompt = build_eval_prompt(moderation_level, key_text)
    # Provide both the PDF file handle and the answer key text to the model
    contents = [uploaded_file, f"Answer Key:\n{key_text}", prompt]

    resp = client.models.generate_content(model=MODEL_EVAL, contents=contents)
    text = resp.text or "{}"
    import json
    result = json.loads(text)

    score = 0
    total = result.get("total", 0)
    breakdown = result.get("breakdown", [])
    if not total and breakdown:
        total = len(breakdown)
    for b in breakdown:
        score += float(b.get("credit", 0))

    return {
        "score": score,
        "total": total,
        "breakdown": breakdown,
        "flagged": bool(result.get("flagged", False)),
        "notes": result.get("notes", "")
    }

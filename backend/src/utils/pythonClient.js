import axios from "axios";

const baseURL = process.env.PYTHON_SERVICE_URL;

export const pythonGenerateTest = async (payload) => {
  const { data } = await axios.post(`${baseURL}/generate-test`, payload);
  return data;
};

export const pythonEvaluateSheet = async (formData) => {
  const { data } = await axios.post(`${baseURL}/evaluate`, formData, {
    headers: formData.getHeaders ? formData.getHeaders() : { "Content-Type": "multipart/form-data" }
  });
  return data;
};

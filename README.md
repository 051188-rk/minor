# Mock Test Platform

A full-stack mock test platform with a React/Next.js frontend and Node.js/Express backend.

## Project Structure

```
.
├── frontend/          # Next.js frontend application
├── backend/           # Node.js/Express backend server
└── python-service/    # Python service for additional functionality
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- MongoDB (for backend)

### Installation

1. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

2. **Backend Setup**
   ```bash
   cd ../backend
   npm install
   ```

3. **Python Service Setup**
   ```bash
   cd ../python-service
   pip install -r requirements.txt
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. (Optional) Start the Python service:
   ```bash
   cd python-service
   uvicorn main:app --reload
   ```

## Environment Variables

Create a `.env` file in both `frontend` and `backend` directories with the required environment variables. Refer to `.env.example` files in each directory for reference.

## License

This project is licensed under the MIT License.

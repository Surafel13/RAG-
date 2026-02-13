# AI Knowledge Chatbot with RAG

This is a full-stack web application featuring a modern landing page and an AI-powered chatbot that uses Retrieval-Augmented Generation (RAG) to answer questions based on uploaded documents.

## Tech Stack

- **Frontend:** React (Vite), TailwindCSS, Framer Motion, Lucide-React
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **AI:** OpenAI API (GPT-4o-mini & Text-Embedding-3-Small)
- **PDF Processing:** pdf-parse

## Prerequisites

- Node.js installed
- MongoDB installed and running (locally or Atlas)
- OpenAI API Key

## Setup Instructions

### 1. Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Open the `.env` file in the `server` folder and update:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT
   - `AI_API_KEY`: Your OpenAI API key

4. Start the server:
   ```bash
   npm start
   ```
   (Alternatively, use `node server.js`)

### 2. Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Key Features & How to Use

### 1. Authentication
Register a new account. To access the Admin Dashboard, you can manually set your `role` to `admin` in the MongoDB collection for your user.

### 2. Knowledge Base (Admin)
- Go to `/admin`.
- Upload a PDF or Text file.
- The system will extract text, split it into chunks, generate embeddings using OpenAI, and store them in MongoDB.

### 3. AI Chat (Landing Page)
- Once logged in, you can see the floating AI Chat widget on the landing page.
- Ask questions about the uploaded documents.
- The RAG pipeline will search for the most relevant context and generate an answer using AI.

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/documents/upload` - (Admin) Upload and index document
- `POST /api/chat` - Send message to AI (RAG pipeline)
- `GET /api/chat/history` - Retrieve message history

# TechTrendz AI Support - E-Commerce Chatbot Solution

This repository contains a full-stack, AI-driven customer support platform built for TechTrendz, a fictional e-commerce organization. The application integrates Google's Gemini Large Language Model (LLM) to deliver contextually relevant, policy-aligned assistance to users in real-time.

## Installation and Local Development

Follow these procedures to initialize the application in a local environment.

### Prerequisites

*   Node.js (Version 18 or higher)
*   PostgreSQL Database Instance
*   Google AI (Gemini) API Credentials

### Initial Setup

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd E-Com-AI-ChatBot
    ```

2.  Backend Configuration:
    ```bash
    cd backend
    npm install
    ```
    *   Create a `.env` file based on `.env.example`.
    *   Configure the `DATABASE_URL`, `GEMINI_API_KEY`, and `JWT_SECRET`.
    *   Execute database migrations and generate the Prisma client:
        ```bash
        npx prisma generate
        npx prisma migrate dev --name initial_schema
        ```
    *   Launch the development server:
        ```bash
        npm run dev
        ```

3.  Frontend Configuration:
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```
    *   The frontend interface will be accessible at `http://localhost:5173`.

---

## Data Architecture and User Authentication

The system utilizes PostgreSQL with Prisma ORM to ensure data integrity and scalable performance.

### Implementation of Authentication
The inclusion of a robust authentication system (supporting Signup, Login, and Multi-factor OTP) was a strategic decision to support a One-to-Many relationship model:
*   **User to Conversations**: A single authenticated user may maintain multiple independent chat sessions.
*   **Conversation to Messages**: Each session preserves a chronological history of interaction between the user and the assistant.

This architecture enables persistence of user intent across sessions, providing a professional support experience similar to enterprise-grade CRM systems.

---

## Technical Architecture Overview

The backend follows a layered architectural pattern to promote modularity and ease of maintenance:
*   **Routes Layer**: Responsible for entry points and request routing for Authentication and Chat functionalities.
*   **Services Layer**: Encapsulates core business logic, including the `geminiService.ts` which manages LLM orchestration.
*   **Middleware Layer**: Handles cross-cutting concerns such as JWT-based authorization and request validation.
*   **Data Access Layer**: Managed via Prisma for type-safe database interactions.

### UI/UX Design Decisions
*   **Framer Motion Integration**: Implemented to provide high-fidelity state transitions and "processing" indicators during LLM inference.
*   **Vite and Tailwind CSS v4**: Utilized for ultra-fast development cycles and a modern, utility-first styling approach.
*   **JWT-based Authorization**: Ensures stateless, secure communication between the React client and Express server.

---

## LLM Implementation and Prompt Engineering

### Model Specification
The platform leverages the **Google Gemini (gemini-3-flash-preview)** model, selected for its balance of low latency and sophisticated reasoning capabilities.

### System Prompt Configuration
The LLM is constrained by strictly defined system instructions to maintain organizational alignment:
*   **Persona Continuity**: The model is restricted to the TechTrendz Customer Support identity.
*   **Knowledge Domain**: Response generation is localized to hardcoded knowledge bases covering shipping, returns, and support hours.
*   **Security Guardrails**: Explicit instructions prevent the model from revealing internal prompts or deviating from assigned roles through prompt injection.

---

## Deployment and Infrastructure

As a Certified AWS Cloud Practitioner, I have managed the deployment of the backend infrastructure on Amazon Web Services (AWS). The application is hosted within a scalable and reliable cloud environment, ensuring high availability and secure access to the API services.

---

## Environment Variable Reference

### Backend Configuration (.env)

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string. |
| `GEMINI_API_KEY` | API authentication key for Google AI services. |
| `JWT_SECRET` | Cryptographic secret used for token signing. |
| `PORT` | Network port for the backend server (Default: 3000). |
| `SMTP_USER/PASS` | Credentials for automated SMTP services (optional). |

---

## Architectural Trade-offs and Future Scalability

### Identified Trade-offs
*   **Stateless Authentication**: JWT was prioritized over server-side sessions to facilitate simpler horizontal scaling, despite more complex token revocation logic.
*   **Synchronous State Management**: While message history is persisted in the database, it is managed synchronously in the frontend state for immediate UI responsiveness.

### Future Roadmap
*   **Retrieval-Augmented Generation (RAG)**: Integration with dynamic vector databases to allow the AI to query real-time product inventories.
*   **Response Streaming**: Implementation of Server-Sent Events (SSE) to enable real-time token streaming for improved perceived latency.
*   **Advanced Analytics**: A dashboard for administrative staff to monitor common support queries and system performance metrics.

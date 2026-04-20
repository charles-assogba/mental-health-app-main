# Mental Health Application (Dicoding DBS Coding Camp Capstone Project) 🧠

[![Project Status](https://img.shields.io/badge/status-completed-brightgreen)]()

## Project Summary 📝

This application is the final project (capstone) from DBS Coding Camp Dicoding. Built as a companion app, its purpose is to provide support and assistance 🤗 for individuals facing mental health challenges and needing a space for interaction or personal tools.

## Main Features ✨

The application offers several core features to support users:

1.  **💬 Community Forum:**
    - Users can create posts (threads) to share stories, problems, or experiences they face.
    - Other users can respond, provide support, advice, or recommendations on these posts.
2.  **🎯 Daily Goals (Todos):**
    - Simple task management feature where users can create, mark as completed, and delete lists of daily goals or activities.
3.  **🧘 Mindfulness Sessions:**
    - Provides guided meditation sessions with timers to help users take time for relaxation and focus.
4.  **🤖 AI Chatbot (Powered by Gemini API):**
    - AI-based conversation bot that allows users to ask and get information about mental health issues.
    - _Note:_ Ideally using a self-developed LLM model, but due to time constraints and limitations on the Machine Learning team, we implemented this feature using the available Gemini API.

## Live Demo Links 🚀

- **Frontend:** 🖥️ [https://mental-health-app.aran8276.site/](https://mental-health-app.aran8276.site/)
- **Backend API:** ⚙️ [https://api-mental-health-app.aran8276.site/](https://api-mental-health-app.aran8276.site/)

## Technologies Used 🛠️

### Frontend 🎨

- **Framework:** React.js ⚛️ (with Vite as bundler ⚡)
- **Styling:** TailwindCSS 💨
- **UI Components:** Shadcn UI 🧩
- **Layout Template:** Meraki UI
- **Animations:** Framer Motion ✨
- **Routing:** React Router DOM 🛣️
- **Package Manager:** NPM 📦

### Backend ⚙️

- **Framework:** Express.js 🚂
- **ORM:** Prisma 🧱
- **ID Generator:** Nanoid #️⃣
- **Package Manager:** NPM 📦
- **Email:** Nodemailer ✉️ (for SMTP)
- **AI:** Google Gemini API (@google/generative-ai) 🤖

### Database 🗄️

- **DBMS:** MySQL 🐬

### Hosting & DevOps ☁️

- **Containerization:** Docker 🐳 & Docker Compose (with custom Dockerfile)
- **Server:** Personal PC 🖥️ functioning as server
- **Tunneling/Exposure:** Cloudflare Zero Trust Tunnel 🛡️ (to forward Docker ports to public domain)

## Project Structure 📁

```
.
├── backend/
│   ├── prisma/
│   │   └── schema.prisma     # Prisma database schema 🧱
│   ├── src/                  # Backend source code (TypeScript) ⚙️
│   │   ├── config/           # Configuration (DB, Express, AI, Email) ⚙️
│   │   ├── controller/       # Request/response logic per feature 🕹️
│   │   ├── middleware/       # Express middleware (e.g., Authentication) 🛡️
│   │   ├── routes/           # API endpoint definitions ↔️
│   │   ├── services/         # Business logic (e.g., Token Service) 🧠
│   │   ├── utils/            # Supporting utilities 🛠️
│   │   └── index.ts          # Backend entry point ▶️
│   ├── .env.example          # Backend environment configuration example 📄
│   ├── Dockerfile            # Docker build instructions for backend 🐳
│   ├── docker-entrypoint.sh  # Docker entry point script 📜
│   ├── package.json          # Backend dependencies 📦
│   └── tsconfig.json         # Backend TypeScript configuration ⚙️
├── frontend/
│   ├── public/               # Static assets 🖼️
│   ├── src/                  # Frontend source code (TypeScript/TSX) 🎨
│   │   ├── components/       # Reusable UI components 🧩
│   │   ├── config/           # Configuration (e.g., Axios client) ⚙️
│   │   ├── layouts/          # Page layout structures 📐
│   │   ├── lib/              # Frontend utility functions 🛠️
│   │   ├── pages/            # Main page components 📄
│   │   ├── viewports/        # Viewport-related components (e.g., Navigator) 🧭
│   │   ├── App.tsx           # Application root component ✨
│   │   ├── main.tsx          # Frontend entry point ▶️
│   │   └── index.css         # Global styling (Tailwind base) 🎨
│   ├── .env                  # Frontend environment configuration (DO NOT COMMIT DIRECTLY! ⚠️)
│   ├── .env.example          # Frontend environment configuration example 📄
│   ├── Dockerfile            # Docker build instructions for frontend (via Nginx) 🐳
│   ├── index.html            # Main HTML template 🌐
│   ├── package.json          # Frontend dependencies 📦
│   ├── tsconfig.json         # Frontend TypeScript configuration ⚙️
│   └── vite.config.ts        # Vite configuration ⚡
├── nginx/
│   └── nginx.conf            # Nginx configuration to serve frontend 🌐
└── docker-compose.yml        # Docker Compose configuration (Frontend, Backend, DB) 🐳
```

## How to Replicate This Project 📖

There are two main ways to run this project in your local environment: using Docker (recommended for ease) or manually.

### Option 1: Using Docker 🐳 (Recommended 👍)

This method will build and run containers for frontend (served by Nginx), backend (Express.js), and database (MySQL) simultaneously.

1.  **Prerequisites:** Ensure Docker and Docker Compose are installed on your system. 🔧
2.  **Clone Repository:** 📥
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd <REPOSITORY_FOLDER_NAME>
    ```
3.  **Configure Environment Variables:** ⚙️
    - Copy `.env.example` to `.env` inside the `backend/` folder.
      ```bash
      cp backend/.env.example backend/.env
      ```
    - Copy `.env.example` to `.env` inside the `frontend/` folder.
      ```bash
      cp frontend/.env.example frontend/.env
      ```
    - **⚠️ IMPORTANT:** Edit both `.env` files and fill in the values according to your local configuration or credentials (see [Environment Variable Configuration](#environment-variable-configuration) section below). _Do not use default values for production or sensitive data._
4.  **Run Docker Compose:** ▶️
    From the project root directory (where `docker-compose.yml` is located), run the following command:

    ```bash
    docker-compose up --build -d
    ```

    - `--build`: Forces Docker to rebuild images if there are changes to Dockerfile or code.
    - `-d`: Runs containers in background (detached mode).

5.  **Access Application:** 🌐
    - Frontend will be available at `http://localhost:80` (or different port if you changed `docker-compose.yml`). Nginx port is usually 80.
    - Backend API will be available at `http://localhost:3000` (or different port if you changed `SERVER_PORT` in `backend/.env` and `docker-compose.yml`).

### Option 2: Manual Setup 🛠️

If you don't want to use Docker, follow these steps:

1.  **Prerequisites:** 🔧
    - Node.js (compatible version, check `package.json`) and NPM installed.
    - MySQL database server running and accessible.
2.  **Clone Repository:** 📥 (Same as Docker step)
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd <REPOSITORY_FOLDER_NAME>
    ```
3.  **Setup Backend:** ⚙️
    - Navigate to backend directory: `cd backend`
    - Copy `.env.example` to `.env`: `cp .env.example .env`
    - Edit `backend/.env` with your MySQL database configuration, JWT keys, Nodemailer credentials, Gemini API Key, and frontend base URL.
    - Install dependencies: `npm install` 📦
    - Run Prisma migrations to create database schema: `npx prisma migrate dev` 🏗️
    - (Optional) Generate Prisma Client: `npx prisma generate`
    - Run backend server (development mode): `npm run dev` ▶️
    - Backend will run on the port specified in `backend/.env` (default: 3000).
4.  **Setup Frontend:** 🎨
    - Open new terminal, navigate to frontend directory: `cd ../frontend` (if still in backend directory) or `cd frontend` (if from root).
    - Copy `.env.example` to `.env`: `cp .env.example .env`
    - Edit `frontend/.env` and ensure `VITE_PUBLIC_EXPRESS_BASE_URL` points to the running backend URL (e.g., `http://localhost:3000`).
    - Install dependencies: `npm install` 📦
    - Run frontend server (development mode): `npm run dev` ▶️
    - Frontend will run on the port specified by Vite (default: 5173). Access via `http://localhost:5173`.

## Environment Variable Configuration 🔑

`.env` files are required for application configuration. Copy from the available `.env.example`.

### `backend/.env`

```ini
# Prisma database connection configuration 🗄️
# Example: mysql://<user>:<password>@<host>:<port>/<database_name>
DATABASE_URL="mysql://root:<YOUR_PASSWORD>@127.0.0.1:3306/prisma_testdb"

# Frontend base URL (important for CORS and email links) 🌐
FRONTEND_BASE_URL="http://localhost:5173" # Adjust if frontend port is different

# Application state ('development' or 'production') ⚙️
APP_STATE="development"

# Port where backend server runs 🔌
SERVER_PORT=3000

# Secret keys for JWT (Generate strong random values!) 🔒
# Example generation in terminal: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=<YOUR_VERY_STRONG_SECRET_KEY>
JWT_REFRESH_SECRET=<YOUR_VERY_STRONG_REFRESH_SECRET_KEY>

# Token expiry duration (example: 15 minutes, 7 days) ⏳
JWT_ACCESS_TOKEN_EXPIRY="15m"
JWT_REFRESH_TOKEN_EXPIRY="7d"

# Nodemailer configuration for email sending (e.g., verification) ✉️
# Use App Password if using Gmail with 2FA
GMAIL_APP_PASSWORD="<YOUR_GMAIL_APP_PASSWORD>" # example: abcd efgh ijkl mnop
NODEMAILER_EMAIL_FROM="<YOUR_SENDER_EMAIL_ADDRESS>" # example: yourname@gmail.com

# API Key for Google Gemini 🤖
GEMINI_API_KEY="<YOUR_GEMINI_API_KEY>"
```

### `backend/.env (Docker Version 🐳)`

```ini
# Prisma database connection configuration 🗄️
# Example: mysql://<user>:<password>@<host>:<port>/<database_name>
DATABASE_URL="mysql://root:mental_health_app@db:3306/mental_health_app"

# Frontend base URL 🌐
FRONTEND_BASE_URL="http://mental-health-app.aran8276.site"

# Application state ⚙️
APP_STATE="production" # "production" || "development"

# Backend port 🔌
SERVER_PORT=3000

# JWT secret keys 🔒
# Example generation: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=<YOUR_VERY_STRONG_SECRET_KEY>
JWT_REFRESH_SECRET=<YOUR_VERY_STRONG_REFRESH_SECRET_KEY>

# Token expiry duration ⏳
JWT_ACCESS_TOKEN_EXPIRY="15m"
JWT_REFRESH_TOKEN_EXPIRY="7d"

# Nodemailer configuration ✉️
# Use App Password if using Gmail with 2FA
GMAIL_APP_PASSWORD="<YOUR_GMAIL_APP_PASSWORD>"
NODEMAILER_EMAIL_FROM="<YOUR_SENDER_EMAIL_ADDRESS>"

# Google Gemini API Key 🤖
GEMINI_API_KEY="<YOUR_GEMINI_API_KEY>"
```

**🚨 WARNING:** Never commit `.env` files containing real credentials to public repositories! Use `.env.example` as a template.

### `frontend/.env`

```ini
# Base URL of the running Backend API ⚙️➡️
VITE_PUBLIC_EXPRESS_BASE_URL=http://localhost:3000 # Adjust to your backend URL
```

## Development Workflow (Summary) 📈

The development of this application follows the following workflow:

1.  **Initial Design & Frontend Templating:** Designing the interface (UI) in _low-fidelity_ directly in frontend code (React + TailwindCSS) for time efficiency, while brainstorming data requirements based on the display.
2.  **Database Design:** Creating database schema (using Prisma Schema) based on data requirement analysis from the frontend templating phase. 🗄️
3.  **Backend Development:** Designing and implementing API endpoints (verification logic, CRUD, authentication, etc.) using Express.js and Prisma. ⚙️
4.  **Backend Testing:** Testing API endpoints using tools like Postman to ensure CRUD functionality and error handling work correctly. 🧪
5.  **Frontend-Backend Integration:** Connecting frontend components with backend API endpoints, ensuring data flow and interactions run smoothly. 🔗
6.  **UI/UX Enhancement:** Adding visual details like color schemes, animations (using Framer Motion), and improving user experience. ✨🎨
7.  **End-to-End Testing:** Performing comprehensive testing on the application (can be assisted with frameworks like Cypress). ✅
8.  **Code Cleanup & Build:** Performing _error checking_, _linting_, and application build testing. 🧹🏗️
9.  **Deployment:** Setting up and running the application on server using Docker and Cloudflare Tunnel. 🚀☁️

Made by Aran8276 / SMK Negeri 6 Malang (see [other contributors in this repo](https://github.com/Aran8276/mental-health-app/graphs/contributors)).

---

# 🛠️ Backend – Full-Stack Internship Project

This is the backend portion of the full-stack internship assignment. It uses **Node.js**, **TypeScript**, **Express**, and **Prisma ORM** to handle user login functionality.

---

## ⚙️ Setup Instructions

### 1. Navigate to the backend folder

```bash
cd backend
npm install
touch .env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret_here"
🧬 Prisma Setup
After setting your .env file, run:

npx prisma migrate dev --name init
This will create the SQLite database and apply the schema.

🧱 Tech Stack
Node.js

TypeScript

Express

Prisma ORM

SQLite (local DB)

JWT (for login authentication)

📂 Project Structure

backend/
├── prisma/
│   └── schema.prisma     # Database schema
├── src/
│   ├── routes/           # Route handlers
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth, error handling
│   └── index.ts          # Entry point
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript config

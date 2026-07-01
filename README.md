# Startup Validator

A full-stack MERN (MongoDB, Express, React, Node) application that helps validate startup ideas.

## Project Structure

```text
startup-validator/
├── client/                 # React frontend bootstrapped with Vite
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express.js backend API
│   ├── config/             # Database & other configurations
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Middleware (auth, validation, logs, errors)
│   ├── models/             # Mongoose schemas/models
│   ├── routes/             # Express routes
│   ├── services/           # Business logic services
│   ├── utils/              # Helper utilities
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── .gitignore
├── README.md
└── package.json            # Root configuration for workspaces and execution
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (Running locally or a MongoDB Atlas URI)

## Getting Started

### 1. Install Dependencies

Install root, client, and server dependencies by running:

```bash
npm run install-all
```

### 2. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```bash
cp server/.env.example server/.env
```

Open `server/.env` and update the values as needed:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/startup-validator
NODE_ENV=development
```

### 3. Run the Application

To run both the frontend client and backend server in development mode concurrently:

```bash
npm run dev
```

- **Frontend Client**: Runs at [http://localhost:5173/](http://localhost:5173/)
- **Backend API**: Runs at [http://localhost:5000/](http://localhost:5000/) (API Health Check: [http://localhost:5000/api/health](http://localhost:5000/api/health))
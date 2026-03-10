# College Event Calendar

A full-stack application for managing college events, featuring role-based access for Students, Organizers, and Staff, event registration, and notifications.

## Architecture & Technologies
This is a monorepo containing a Next.js frontend and an Express backend.

- **Frontend**: Next.js 14/15 (App Router), React, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database & Auth**: Firebase (Firestore, Firebase Auth, Firebase Storage)
- **Language**: TypeScript throughout
- **Package Manager**: pnpm (Workspaces)

## Getting Started

### 1. Prerequisites
- Node.js installed (v18+)
- pnpm installed (`npm install -g pnpm`)
- A Firebase project with Firestore, Authentication, and Storage enabled.

### 2. Installation
Install dependencies for the workspace (frontend and backend):
```bash
pnpm install
```
Or use the provided script:
```bash
pnpm run install:all
```

### 3. Environment Variables
Create a `.env` file in the root directory. It should contain your Firebase Admin SDK credentials and other configuration:
```ini
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="your-client-email"
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_STORAGE_BUCKET="your-storage-bucket"
FRONTEND_URL="http://localhost:3000"
BACKEND_PORT=5000
```
*(Reference `.env.example` if available)*

### 4. Running the App
Start both frontend and backend concurrently from the root directory:
```bash
pnpm run dev
```
- Frontend runs on [http://localhost:3000](http://localhost:3000)
- Backend runs on [http://localhost:5000](http://localhost:5000)

## Features & Usage

### Role-Based Access
- **Students**: Browse events, register, view their registrations, and receive notifications.
- **Organizers**: Create and manage events, view attendees.
- **Staff**: Additional administrative permissions.

## Scripts Context
- `pnpm dev`: Runs both frontend and backend concurrently.
- `pnpm build`: Builds the Next.js frontend.
- `pnpm start`: Starts the built Next.js frontend.

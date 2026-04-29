# SIST Event Calendar 📅

A comprehensive full-stack application for managing college events, designed with a role-based access system for Students, Organizers, and Staff. Features include event discovery, seamless registration, and automated notifications.

## 🏗️ Architecture & Technologies

This project uses a monorepo architecture, effectively separating the client-side Next.js application and the server-side Express API, while maintaining a unified developer experience.

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: TypeScript

### Core Infrastructure
- **Database**: [Firebase Firestore](https://firebase.google.com/products/firestore) (NoSQL)
- **Authentication**: [Firebase Auth](https://firebase.google.com/products/auth) (JWT based)
- **Storage**: Firebase Storage (for event posters/media)
- **Email Service**: Nodemailer (Automated confirmation emails)
- **Package Manager**: [pnpm](https://pnpm.io/) (utilizing Workspaces)

## 🌟 Key Features

### Role-Based Access Control (RBAC)
- **🎓 Students**: Discover upcoming events, register with one click, track past and upcoming registrations, and receive real-time notifications and email confirmations.
- **📅 Organizers**: Create, update, and manage events. Monitor attendee lists in real-time.
- **🛡️ Staff / Admin**: Full administrative oversight, including user management and global event moderation.

### Core Functionality
- **Event Management**: Create events with detailed info (date, time, venue, category, poster, capacity limits).
- **Registration System**: Prevents duplicate registrations and enforces event capacity limits.
- **Notification Engine**: In-app notifications and email alerts (via Nodemailer) for successful registrations and event updates.
- **Secure API**: JWT-based authentication for all protected routes, verifying Firebase tokens on every request.

## 📂 Project Structure

```text
sisteventcalendar/
├── frontend/                 # Next.js Application
│   ├── src/app/              # App Router pages (student, organizer, staff, api)
│   ├── src/components/       # Reusable React components
│   └── src/lib/              # Frontend utilities and API clients
├── backend/                  # Express API Server
│   ├── src/routes/           # API endpoints (auth, events, registrations, notifications)
│   ├── src/lib/              # Server utilities (firebase-admin, email, auth middleware)
│   └── src/server.ts         # Express app entry point
├── package.json              # Monorepo scripts and workspace config
└── pnpm-workspace.yaml       # pnpm workspace definition
```

## 🚀 Getting Started

### 1. Prerequisites
- Node.js installed (v18+)
- pnpm installed globally (`npm install -g pnpm`)
- A Firebase project with Firestore, Authentication, and Storage enabled.

### 2. Installation
Install dependencies for the entire workspace (frontend and backend):
```bash
pnpm install:all
```

### 3. Environment Configuration
Create a `.env` file in the root directory. You will need your Firebase Admin SDK service account credentials:
```ini
# Firebase Config
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="your-firebase-service-account-email"
FIREBASE_PRIVATE_KEY="your-firebase-private-key"
FIREBASE_STORAGE_BUCKET="your-storage-bucket"

# Application Config
FRONTEND_URL="http://localhost:3000"
BACKEND_PORT=5000

# Email Config (Nodemailer)
# (Add your SMTP configuration here if applicable)
```

### 4. Running the Application
Start both the frontend and backend development servers concurrently from the root directory:
```bash
pnpm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

## 🔌 API Endpoints (Backend)

The Express backend exposes the following RESTful endpoints:

- **Auth**:
  - `POST /api/auth/login` - Verify user token and create session
  - `POST /api/auth/register` - Create a new user account
- **Events**:
  - `GET /api/events` - List all events (supports `?date=` filtering)
  - `POST /api/events` - Create a new event (Organizer/Admin)
  - `GET /api/events/:id` - Get event details
  - `PUT /api/events/:id` - Update an event
  - `DELETE /api/events/:id` - Delete an event
  - `POST /api/events/:id/register` - Register a student for an event
  - `GET /api/events/:id/attendees` - List attendees for an event (Organizer/Admin)
- **Registrations**:
  - `GET /api/registrations/my-registrations` - List current user's event registrations
- **Notifications**:
  - `GET /api/notifications` - Get user notifications

## 📜 Scripts

Available in the root `package.json`:
- `pnpm dev`: Runs both frontend and backend concurrently using `concurrently`.
- `pnpm build`: Builds the Next.js frontend for production.
- `pnpm start`: Starts the built Next.js frontend.
- `pnpm install:all`: Installs dependencies across the root, frontend, and backend directories.

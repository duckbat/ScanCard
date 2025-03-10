# ScanCard - Digital Business Card Manager

A cross-platform mobile application for managing digital business cards with seamless sharing capabilities.

## Features

- **User Authentication**

  - Secure login and registration
  - JWT-based authentication
- **Business Card Management**

  - Create and manage digital cards
  - Share cards via QR codes
  - Export cards as CSV or vCard
  - Offline access to saved cards
- **Mobile Features**

  - QR code generation and scanning
  - Native share functionality
  - Beautiful UI with Tamagui
  - Dark/Light theme support

## Tech Stack

### React Web-App (Frontend)

- React.JS
- TypeScript
- TailwindCSS
- UI Framework
- Zustand for state management

### Backend (API)

- ASP.NET Core 8.0
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- CSV and vCard export functionality

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [.NET SDK 8.0](https://dotnet.microsoft.com/download)
- [PostgreSQL](https://www.postgresql.org/download/)

### Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd ScanCard

# Backend Setup
cd server
dotnet restore
dotnet ef database update
dotnet run

# Frontend Setup
cd ../client
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the client directory:

```env
API_URL=http://localhost:5000
```

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Business Cards

- GET `/api/businesscards` - Get all cards (authenticated)
- GET `/api/businesscards/{id}` - Get specific card (public)
- POST `/api/businesscards` - Create new card
- PUT `/api/businesscards/{id}` - Update card
- DELETE `/api/businesscards/{id}` - Delete card
- GET `/api/businesscards/{id}/export/csv` - Export as CSV
- GET `/api/businesscards/{id}/export/vcard` - Export as vCard

## Available Scripts

### Backend

```bash
dotnet run
```

### Frontend

```bash
# Start development server
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Testing

Use the provided Insomnia export file to test the API endpoints.

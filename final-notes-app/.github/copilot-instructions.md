# AI Coding Agent Instructions

Welcome to the `final-notes-app` codebase! This document provides essential guidance for AI coding agents to be productive in this project. Follow these instructions to understand the architecture, workflows, and conventions.

---

## Project Overview

This project is a **full-stack notes application** with the following structure:

- **Frontend**: React application built with Vite, located in `frontend/`.
  - Key directories:
    - `src/components/`: Reusable UI components like `NoteCard`, `NoteForm`, and `NoteList`.
    - `src/pages/`: Page-level components for routing, such as `AllNotes`, `CreateNote`, and `MyNotes`.
    - `src/services/`: Handles API calls (`api.js`), note-related logic (`notes.js`), and wallet integration (`wallet.js`).
  - Uses ESLint for linting and follows React best practices.

- **Backend**: Node.js application located in `backend/`.
  - Key directories:
    - `routes/`: Defines API endpoints, e.g., `notes.js`.
    - `services/`: Contains business logic modules like `blackfrost.js` and `blaze.js`.
    - `db/`: Database connection logic in `database.js`.

---

## Developer Workflows

### Running the Application
- **Frontend**:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- **Backend**:
  ```bash
  cd backend
  npm install
  node index.js
  ```

### Building for Production
- **Frontend**:
  ```bash
  npm run build
  ```

### Testing
- No explicit test setup is provided. Add tests as needed.

---

## Key Conventions

### Frontend
- **Component Structure**: Use functional components with hooks. Place reusable components in `src/components/`.
- **State Management**: Local state is managed using React hooks. No global state management library is used.
- **Wallet Integration**: The `wallet.js` service handles Lace Wallet connection and on-chain note submission.
  - Example: `connectLaceWallet` connects the wallet and retrieves the first address.
  - Example: `submitNoteOnChain` submits metadata-only transactions.

### Backend
- **Service Layer**: Business logic is encapsulated in `services/`.
- **Database**: Connection logic is centralized in `db/database.js`.

---

## External Dependencies

### Frontend
- **React**: Core library for building the UI.
- **Vite**: Development server and build tool.
- **Lace Wallet API**: Used for blockchain interactions.

### Backend
- **Express**: Web framework for handling routes.
- **Database**: Ensure `db/database.js` is configured for your database.

---

## Integration Points

### Wallet Integration
- The `wallet.js` service in the frontend interacts with the Lace Wallet API.
- Key functions:
  - `connectLaceWallet`: Connects the wallet and retrieves the first address.
  - `submitNoteOnChain`: Submits notes as metadata-only transactions.

### API Communication
- The frontend communicates with the backend via REST API endpoints defined in `backend/routes/`.

---

## Notes for AI Agents
- Follow the existing folder structure and naming conventions.
- When adding new features, ensure they align with the modular structure of `services/` and `components/`.
- Use the provided `wallet.js` service for blockchain interactions.
- Document any new patterns or workflows in this file.

---

For further questions, refer to the `README.md` files in the respective directories.
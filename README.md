# Issue Tracker

Vanier College team project for **Advanced Web Programming Techniques**.

This project is a single-page **Issue Tracker** web application inspired by tools like GitHub Issues and Jira. It allows users to manage projects, members, labels, and issues through a modern client–server architecture.

The frontend is built with **React** and uses client-side routing, while the backend is a **FastAPI** service that exposes a REST API consumed by the client. The project focuses on API integration, state management, routing, and collaborative development workflows.

---

## Features

- Create, edit, and delete projects from the homepage
- Manage project members (create, edit, delete)
- Manage labels within projects
- Create issues with a title and description
- View and manage issue lists per project
- Assign and unassign members and labels to issues
- Close and reopen issues
- Filter issues by labels and assignees
- Search issues by title, with filters and search combined

---

## Tech Stack

- **Frontend**
  - React
  - React Router (client-side routing)
  - Bun (runtime and package manager)

- **Backend**
  - FastAPI
  - Python

- **Tooling**
  - Bun scripts for development
  - `uv` for running the backend API

---

## Getting Started

### Prerequisites

- Bun installed on your machine
- Python environment with `uv` installed

---

## Backend Setup (FastAPI)

From the `api` directory:

```sh
cd api
uv run fastapi dev main.py
````

* The API will be available at:
  `http://localhost:8000`
* Interactive API documentation is available at:
  `http://localhost:8000/docs`

---

## Frontend Setup (React + Bun)

Create a `.env` file in the `web` directory:

```env
API_BASE_URL=http://localhost:8000
```

From the `web` directory:

```sh
cd web
bun dev
```

* The frontend will be available at:
  `http://localhost:3000`

---

## Project Structure

High-level overview (may vary slightly):

```text
.
├── api/                # FastAPI backend
│   ├── models/
│   ├── routes/
│   └── main.py
├── web/                # React frontend
│   ├── src/
│   │   ├── routes/     # React Router pages
│   │   ├── components/ # Reusable UI components
│   │   └── hooks/
│   └── bunfig.toml
└── README.md
```

---

## Development Workflow

* Features and tasks are tracked using GitHub Issues
* Issues are grouped using milestones to represent development phases
* Frontend and backend are developed independently but integrated through the API

---

## Notes

* This is a full-stack project with a clear separation between client and server
* The focus is on structure, routing, API usage, and teamwork
* Styling and UI are functional rather than production-polished

---

## Academic Disclaimer

This project was developed for academic purposes as part of a Vanier College course. It demonstrates practical use of React, FastAPI, and full-stack application structure in a team environment.

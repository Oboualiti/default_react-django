# App Starter Template

A full-stack application template with **React + Tailwind CSS** frontend and **Django REST Framework** backend.

Features a complete design system with dark/light theme, 17+ reusable UI components, authentication, and a clean layout.

---

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at **http://localhost:5173**

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Runs at **http://localhost:8000**

The frontend dev server proxies `/api` requests to the backend automatically.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router 7, Tailwind CSS 4, Vite 7 |
| UI Tables | TanStack React Table 8 |
| Charts | Recharts 3 |
| HTTP Client | Axios |
| Backend | Django 4.2, Django REST Framework |
| Auth | JWT (SimpleJWT) |
| Database | SQLite (default), switch to PostgreSQL for production |

---

## Project Structure

```
app-starter-template/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # 17 reusable UI components
│   │   │   ├── layout/      # AppLayout, Sidebar, TopBar
│   │   │   └── guards/      # Auth guards
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # Context providers
│   │   ├── api/             # Axios API client
│   │   ├── config/          # Routes, constants
│   │   └── styles/          # Theme (dark/light CSS variables)
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/
│   ├── core/                # Django settings, URLs
│   ├── apps/
│   │   ├── authentication/  # User model, JWT login, me endpoint
│   │   └── example/         # Example CRUD app
│   ├── manage.py
│   └── requirements.txt
└── README.md
```

---

## UI Components Available

| Component | Description |
|-----------|-----------|
| `Button` | Primary, secondary, danger, ghost, success variants + sizes |
| `Input` | Text input with label, error, icons |
| `Dropdown` | Native single-select dropdown |
| `MultiSelect` | Checkbox multi-select with search |
| `SearchableSelect` | Single-select with search filter |
| `Modal` | Overlay modal with sizes, backdrop, escape key |
| `ConfirmDialog` | Confirmation dialog (delete, etc.) |
| `DataTable` | Sortable table with pagination (TanStack) |
| `Pagination` | Page navigation with page size selector |
| `Badge` | Colored labels (filled, outline, dot) |
| `StatCard` | Metric card with trend indicator |
| `DateRangePresetPicker` | Date range picker with presets |
| `SearchBar` | Search input with icon |
| `LoadingSpinner` | Animated loading spinner |
| `EmptyState` | Empty data placeholder |
| `HealthDot` | Status indicator dot (green/yellow/red) |
| `FileUpload` | Drag & drop file upload |

---

## Theme System

The app supports **dark** and **light** themes using CSS variables. Toggle via the moon/sun icon in the sidebar.

All colors are defined in `frontend/src/styles/globals.css` using `@theme` directive.

### Key Color Tokens

```
bg-app-bg          — Page background
bg-app-card        — Card background
bg-app-elevated    — Input/elevated surface
text-text-primary  — Main text
text-text-secondary — Secondary text
text-text-muted    — Hint text
border-border-default — Default borders
bg-accent-primary  — Blue accent (actions, links)
bg-accent-green    — Success
bg-accent-red      — Error/danger
bg-accent-yellow   — Warning
bg-accent-purple   — Special
```

---

## Default Credentials

After running `python manage.py createsuperuser`, use those credentials to log in.

---

## Production Deployment

### Build Frontend
```bash
cd frontend
npm run build
```

Output goes to `frontend/dist/` — serve with Nginx.

### Run Backend
```bash
pip install waitress
waitress-serve --port=8000 core.wsgi:application
```

### Nginx Config Example
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /assets/ {
        alias /path/to/frontend/dist/assets/;
        expires 1y;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

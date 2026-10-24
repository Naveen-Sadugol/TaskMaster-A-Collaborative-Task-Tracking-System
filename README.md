# TaskMaster API

A zero-configuration collaborative task-tracking REST API using Express and SQLite.

## Start

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env` and set a long `JWT_SECRET`.
3. Run `npm install`.
4. Optionally load demo data with `npm run seed` (login: `demo@taskmaster.local`, password: `Password123!`).
5. Run `npm start`; the API is available at `http://localhost:3000`.

Use `npm test` to run the automated endpoint tests. `npm run dev` starts the service with automatic reloads.

## API summary

- `POST /api/auth/register`, `POST /api/auth/login`
- `GET|PATCH /api/profile`
- `POST|GET /api/teams`, `POST /api/teams/:teamId/members`, `POST /api/teams/:teamId/projects`
- `GET /api/projects`
- `POST /api/projects/:projectId/tasks`, `GET /api/tasks`
- `GET|PATCH|DELETE /api/tasks/:taskId`
- `POST /api/tasks/:taskId/comments`, `POST /api/tasks/:taskId/attachments`

Send `Authorization: Bearer <token>` for protected endpoints. List tasks supports `projectId`, `status`, `assigneeId`, `search`, `sort` (`created_at`, `due_date`, `priority`, `title`) and `order` (`asc`, `desc`). Attachment uploads use multipart form field `file`, up to 10 MB.

## Publish to GitHub

1. Create a new empty public repository on GitHub (do not add a README).
2. From this folder run `git remote add origin https://github.com/YOUR_ACCOUNT/taskmaster-api.git`.
3. Run `git push -u origin main` and authenticate when prompted.
4. For a feature branch: `git switch -c feature/example`, commit changes, `git push -u origin feature/example`.
5. Open GitHub's displayed “Compare & pull request” link, select `main` as the base, and create the PR. GitHub then provides the exact PR URL.

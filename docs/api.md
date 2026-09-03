# Serenly REST API Documentation

Base URL: `/api/v1`

## Endpoints

### 1. Authentication
* `POST /auth/register` — Create a new account.
* `POST /auth/login` — Sign in and receive an HTTP-only secure cookie.
* `POST /auth/logout` — Invalidate session and clear cookies.
* `GET /auth/me` — Retrieve current authenticated user profile.

### 2. Mood Sanctuary
* `GET /moods?limit=20` — Retrieve historical check-ins for the current user.
* `POST /moods` — Record an emotional check-in.
* `GET /moods/summary` — Retrieve 7-day emotional arc, emotion tag counts, and weekly check-in statistics.

### 3. Private Journal (Owner-Guarded)
* `GET /journals` — List journal summaries without leaking body contents.
* `GET /journals/:id` — Retrieve full journal entry (Enforces strict `userId` ownership check).
* `POST /journals` — Save a reflection entry.
* `PUT /journals/:id` — Autosave or update an existing reflection.
* `DELETE /journals/:id` — Erase a reflection permanently.

### 4. Gentle Goals & Habits
* `GET /goals` — List user's active goals.
* `POST /goals` — Add a new gentle anchor.
* `PATCH /goals/:id` — Toggle goal completion or rename.
* `DELETE /goals/:id` — Remove a goal.

### 5. Medication & Care
* `GET /medications` — List user's daily medication schedule with clinical disclaimer.
* `POST /medications` — Register a medication reminder.
* `DELETE /medications/:id` — Remove a reminder.

### 6. Supportive Community
* `GET /community/posts` — Retrieve unmoderated peer encouragement feed.
* `POST /community/posts` — Share a supportive thought.
* `DELETE /community/posts/:id` — Erase own post.
* `POST /community/reports` — Report a post for moderator review.

### 7. Safety Anchor & Crisis
* `GET /safety/crisis-resources` — Retrieve verified global and local emergency telephone helplines.
* `GET /safety/plan` — Retrieve owner's confidential safety plan.
* `PUT /safety/plan` — Update emergency triggers, coping strategies, and trusted contacts.

### 8. LocalStorage Legacy Migration
* `POST /migration/import-local` — Batch import legacy client data from Serenly v1.

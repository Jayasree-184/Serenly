# Serenly Security & Privacy Architecture

## Privacy by Design in Mental Wellness
Digital mental health platforms hold sensitive human disclosures. Serenly follows a strict zero-knowledge, zero-ad-tracking engineering doctrine.

### 1. Multi-Tenant Resource Isolation
Frontend routing does not dictate authorization. Every backend endpoint querying private resources (`/journals/:id`, `/moods`, `/medications`, `/safety/plan`) explicitly compares `resource.userId === req.user.userId`. If a mismatched ID is queried, the API returns a generic `404 Not Found` or `403 AccessDenied` without exposing existence.

### 2. Zero-Exposure Logging
Diagnostic logs are scrubbed at the gateway level. Server-side loggers redact fields matching `content`, `note`, `warningSigns`, and `copingStrategies`.

### 3. Password Security & Session Handling
* **Hashing:** Bcrypt with 12 salt rounds.
* **Token Storage:** Never stored in `localStorage` or `sessionStorage`. All authentication tokens are issued in HTTP-only, `SameSite=Lax`, and `Secure` (production) cookies.

### 4. Rate Limiting & Protection
* Protected with Helmet security headers (anti-clickjacking, DNS prefetch control, X-Content-Type-Options).
* Express rate limiters protect authentication and write endpoints against automated credential stuffing and denial of service.

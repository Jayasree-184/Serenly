# Serenly Database Specification

## Relational Schema (PostgreSQL via Prisma)

### Core Models
* **User:** Account credentials, display profile, language preference, role.
* **Session:** Secure token hashes, expiration timestamps, device metadata.
* **MoodEntry:** Mood rating (1-5), numeric score (1-100), emotion tags, energy level (0-100%), sleep quality rating, context tags, and private notes.
* **JournalEntry:** Encrypted reflection records with auto-calculated word counts, prompts, and thematic tags.
* **Goal:** Small achievable habits with timestamped completion records.
* **Medication & MedicationReminder:** User medication schedule with clinical dosage advice and reminder triggers.
* **CommunityPost & CommunityReport:** Non-gamified peer support feed with moderation reports.
* **SafetyPlan & SafetyContact:** User-controlled crisis prevention plan with designated personal contacts.
* **Professional:** Independently verified therapists and counselors directory with language filters.
* **Resource:** Evidence-based clinical wellness articles with bilingual Tamil & English copy.

### Migrations
Prisma migrations guarantee database schema evolution without manual SQL mutation:
```bash
cd server
npx prisma migrate dev --name init
```

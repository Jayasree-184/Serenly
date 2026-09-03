# Serenly v1 → v2 Migration Guide

## Preserving Legacy Data
Serenly v1 relied entirely on browser `localStorage`. When a user visits Serenly v2 on the same domain or device:

1. **Auto-Detection:** `useLocalStorageMigration` checks for keys `journalEntries`, `moodHistory`, `goals`, and `meds`.
2. **Sanctuary Prompt:** A gentle banner appears on the Dashboard displaying the found entries.
3. **One-Click Import:** Clicking "Import data safely" batches the legacy entries into the user's secure account without data loss.
4. **Permanent Recoverability:** The original static files and assets are preserved in `legacy/` on the `feature/serenly-v2` branch.

## File Mapping
| Legacy Location | Modern Component |
| :--- | :--- |
| `index.html#dashboard` | `client/src/pages/DashboardPage.tsx` |
| `index.html#mood` | `client/src/pages/MoodPage.tsx` |
| `index.html#coping` | `client/src/pages/CopingPage.tsx` |
| `index.html#journal` | `client/src/pages/JournalPage.tsx` |
| `index.html#goals` | `client/src/pages/GoalsPage.tsx` |
| `index.html#meds` | `client/src/pages/MedicationPage.tsx` |
| `index.html#community` | `client/src/pages/CommunityPage.tsx` |
| `index.html#support` | `client/src/pages/ProfessionalsPage.tsx` |
| `assets/music/*.mp3` | `client/public/assets/music/*.mp3` |

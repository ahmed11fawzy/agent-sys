# Project Architecture

## Tech Stack

- **Framework:** React + Vite
- **State:** Redux Toolkit
- **UI:** Shadcn + Tailwind
- **i18n:** react-i18next (JSON based)

## How to add a new Language

1. Create `src/i18n/locales/fr.json`.
2. Import it in `src/i18n/config.ts`.
3. Add the key to the `settingsSlice.ts` types.

## Redux Workflow

We use the "Feature Folder" pattern.

1. Create slice in `features/core-api-slice.ts`.
2. inject api query from `features/api-queries` into `features/core-api-slice.ts`.
3. Add to `store.ts`.

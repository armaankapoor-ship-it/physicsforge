# phyicsforge - Alternating Current Visual Notes

A premium-style, zero-cost visual notes website for **NCERT Class 12 Physics Chapter 7: Alternating Current**.

Built for:

- CBSE Class 12 Boards
- NEET Physics
- JEE Main Physics
- JEE Advanced foundation-level conceptual understanding

## Free Tools Used

- React + Vite
- Tailwind CSS
- lucide-react icons
- Local JSON data
- SVG-based diagrams
- Frontend-only simulations
- Browser print / Save as PDF

No paid APIs, backend, paid templates, paid assets, premium stock images, subscription tools or copyrighted coaching material are used.

## What Is Included

- 28-section chapter notebook
- Formula sheet with units, dimensions, examples and traps
- 12 derivations with board-exam writing style
- 30 original SVG visual plans and diagrams
- 8 interactive simulations
- 12 solved examples
- 380-question local JSON practice bank
- NEET, JEE Main, JEE Advanced conceptual, assertion-reason, integer, match-the-column, graph, circuit, phasor and case-based questions
- One-page printable revision sheet
- Final high-yield dashboard

## Install

```bash
pnpm install
```

## Run Locally

```bash
pnpm dev
```

Open the local URL printed in the terminal, usually:

```text
http://localhost:5173/
```

## Build

```bash
pnpm build
```

The production files will be generated in:

```text
dist/
```

## Preview Production Build

```bash
pnpm preview
```

## Deploy for Free

### GitHub Pages

1. Create a GitHub repository named `phyicsforge`.
2. Push this project to the repository.
3. Install dependencies with `pnpm install`.
4. If deploying manually to a repository path, set the base path:

```bash
VITE_BASE_PATH=/phyicsforge/ pnpm build
```

5. This project also includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds and deploys to GitHub Pages automatically on pushes to `main`.

```bash
pnpm deploy
```

### Other Free Hosting Options

- Netlify free tier
- Vercel free tier
- Cloudflare Pages free tier

Use the build command:

```bash
pnpm build
```

and publish:

```text
dist
```

## Edit Notes

Main content files:

- `src/data/chapterSections.js` - section-wise notes and section practice prompts
- `src/data/formulas.js` - formula sheet
- `src/data/derivations.js` - derivation bank
- `src/data/visualPlans.js` - diagram and visual planning bank
- `src/data/revisionData.js` - tables, hooks, dashboard, checklist
- `src/data/questionBank.json` - full generated question bank

## Regenerate Question Bank

The generator creates the local JSON bank:

```bash
pnpm generate:questions
```

Generator file:

```text
scripts/generateQuestionBank.mjs
```

## Add More Chapters Later

1. Create a new data folder or new data files for the chapter.
2. Reuse the existing components:
   - `ChapterNotebook`
   - `FormulaSheet`
   - `DerivationBank`
   - `VisualBanks`
   - `Simulations`
   - `PracticeZone`
   - `RevisionDashboard`
3. Add the new chapter route or navigation item in `src/App.jsx`.
4. Add chapter-specific diagrams in `src/components/PhysicsDiagrams.jsx` or a new diagram file.

## Project Structure

```text
src/
  components/
    ChapterHero.jsx
    ChapterMap.jsx
    ChapterNotebook.jsx
    DerivationBank.jsx
    FormulaSheet.jsx
    PhysicsDiagrams.jsx
    PracticeZone.jsx
    PrintableSheet.jsx
    RevisionDashboard.jsx
    Simulations.jsx
    SolvedExamples.jsx
    VisualBanks.jsx
    ui.jsx
  data/
    chapterSections.js
    derivations.js
    formulas.js
    questionBank.json
    revisionData.js
    visualPlans.js
  styles/
    index.css
scripts/
  generateQuestionBank.mjs
```

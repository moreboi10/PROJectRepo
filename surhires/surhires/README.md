# Surhires – Next.js marketing site

Frontend assignment for Meru Technosoft. Pages: Home, Jobs, Employers.

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
Deploy: push to GitHub, import the repo on Vercel (no config needed).

## Decisions
- **Stack:** Next.js App Router, JavaScript, Tailwind CSS v3, lucide-react icons.
- **Colours** (tokens in `tailwind.config.js`): navy `#0B1F3A`, teal `#0F766E` (a darker teal chosen so text passes 4.5:1 contrast on white), bright teal `#2DD4BF` only on dark backgrounds, warm white `#FBF9F5`.
- **Fonts** (`next/font`): Bricolage Grotesque for headings, Figtree for body.
- **Data:** jobs, plans and copy live in `lib/data.js`. All company names are fictional.
- **Forms:** front-end validation and a success state only. No backend.
- **Motion:** one hero entrance animation; disabled under `prefers-reduced-motion`.

## Structure
`app/` routes and metadata · `components/` Navbar, Footer, Button, Section, Faq, JobCard, JobsBrowser, PostJobForm · `lib/data.js` content.

## With more time
Job detail pages, dark mode, search by keyword, page transitions, real hero photography, unit tests.

## Suggested commit history (8+)
1. chore: scaffold Next.js, Tailwind and tokens 2. feat: Navbar and Footer 3. feat: Button, Section, Faq 4. feat: Home hero and how-it-works 5. feat: featured roles, testimonials, CTA 6. feat: Jobs page with filters and empty state 7. feat: Employers pricing and comparison 8. feat: post-job form validation 9. fix: accessibility and Lighthouse pass 10. docs: README

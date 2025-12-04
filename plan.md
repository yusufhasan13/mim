# My Inbox Media (MIM) Website – Implementation Plan

Problem Statement: Build a comprehensive multi-page corporate website for My Inbox Media with modern 3D interactions, dynamic services/clients data fetched from mimprofile.e-mim.in, contact form with DB storage + email notifications, and a full Admin Panel to manage content.

Tech Stack: React + React Router + Framer Motion, FastAPI, MongoDB, JWT auth, Axios, Shadcn UI components. Email via SendGrid/Resend (finalize during integration). All backend routes prefixed with /api.

Logo: Provided (PHOTO-2025-11-24-16-49-11.jpg). Brand colors: Navy (#1E2A44), Orange (#E55227), Light Gray backgrounds.

---

## 1) Objectives
- Deliver a multi-page site: Home, About, Services, Clients, Contact, Blog, Case Studies, Testimonials, Admin.
- Dynamic data: Fetch Services & Client logos from https://mimprofile.e-mim.in on every page load (backend aggregator → JSON → frontend).
- Rich UX: 3D transformations, interactive hero, smooth page transitions, carousels for services/clients.
- Lead capture: Contact form → store in MongoDB + send email notification.
- Admin Panel: JWT login + CRUD for Blog, Testimonials, Case Studies, (optional) manual Services/Clients Overrides.
- Professional design: Responsive, fast, accessible, SEO-ready; highlight stats (16+ years, 8 countries, 20K+ clients, 100% bootstrapped; volume stats 30B+ SMS, 50M+ WhatsApp, 20B+ Emails).

---

## 2) Architecture & Key Decisions
- Backend aggregator endpoints parse mimprofile.e-mim.in safely (requests + BeautifulSoup/Selectolax) and return normalized JSON to frontend.
- Email provider selected via integration playbook (SendGrid/Resend). Keys stored in backend/.env. ContactMessage saved to MongoDB.
- JWT auth with role=admin; password hashing (bcrypt). CORS enabled.
- Image handling: use remote URLs for external logos; allow admin to paste URLs for blog/case studies. (File uploads optional in v1).
- Frontend routing with React Router; design via Shadcn + custom 3D CSS + Framer Motion; carousels using embla-carousel-react.

---

## 3) Phase 1 – Core POC (Required)
Core = Dynamic external data extraction + Email notifications. Prove in isolation before app build.

Tasks
1. Integration Playbooks
   - Call integration_playbook_expert_v2 for: a) Email (SendGrid/Resend), b) Web scraping best practices with FastAPI.
2. Backend POC endpoints
   - GET /api/external/services → scrape/normalize title, description, category, image/icon.
   - GET /api/external/clients → scrape/normalize list of logo URLs + names if present.
   - Implement timeouts, retries, and graceful errors.
3. Contact POC
   - POST /api/contact → validate payload, save ContactMessage, send notification email.
4. Single Python test script test_core.py
   - Test both endpoints return non-empty arrays; validate at least 6 services and 40+ client logos.
   - Test POST /api/contact stores to DB and sends email (mock/real via provider sandbox).
5. Fix until passing; only then proceed.

User Stories (POC)
- As a developer, I can call /api/external/services and receive normalized JSON within 2s.
- As a developer, I can call /api/external/clients and receive 80+ logo URLs when available.
- As a business admin, submitting a contact JSON stores a record and triggers a notification email.
- As a developer, network failures return clear error JSON with status and message.
- As a developer, special characters in scraped text are preserved correctly.

Exit Criteria
- test_core.py fully passes; endpoints stable under 3 repeated calls; email delivered to sandbox/real inbox.

---

## 4) Phase 2 – Full App Development

Backend
- Models: AdminUser, BlogPost, Testimonial, CaseStudy, ContactMessage.
- Auth: /api/auth/login (JWT), middleware to protect /api/admin/* CRUD routes.
- CRUD: /api/blog, /api/testimonials, /api/case-studies (list/detail/create/update/delete; pagination; published flag).
- External: /api/external/services, /api/external/clients (from Phase 1).
- Contact: POST /api/contact (DB + email). GET /api/metrics (static stats).
- Helpers: serialize_doc for ObjectId/datetime.

Frontend
- Pages & Routes: Home, About, Services, Clients, Blog (list/detail), Case Studies (list/detail), Testimonials, Contact, Admin (Login + Dashboard + CRUD UIs).
- 3D & Motion: Hero with 3D parallax cards; service cards with 3D hover tilt; section reveals with Framer Motion.
- Carousels: Services and Clients using embla-carousel-react with auto-play, swipe, responsive breakpoints.
- Data: Fetch from backend aggregator each visit; show skeleton loaders and error states; retry button.
- Contact: Form validation, success/error toasts; Captcha-lite (honeypot + rate-limit server-side).
- Admin: Rich text editor (react-quill) for Blog/Case Studies; table grids with filters; publish toggles.

Design & Content
- Brand-forward palette (Navy/Orange/White), large typographic hero, stat counters, global markets ribbon (🇮🇳 🇦🇪 🇨🇦 🇺🇸 🇸🇦 🇪🇬 🇦🇺 🇶🇦).
- Include security badges (ISO 9001/27001, GDPR, SOC2, VAPT) in Trust section.

Testing (end-to-end)
- Use testing_agent_v3 for both backend and frontend. Skip drag-n-drop tests. Validate:
  - External endpoints render data in Services/Clients pages.
  - Contact form creates DB entry and sends email.
  - Admin login + CRUD flows for Blog, Testimonials, Case Studies.
  - Navigation across all pages; carousels functional.

User Stories (Main App)
- As a visitor, I see a 3D hero and key stats immediately on Home.
- As a visitor, I browse Services in an interactive 3D carousel and open service details.
- As a visitor, I scroll Clients slider with 80+ logos smoothly on mobile/desktop.
- As a visitor, I submit the Contact form and get a confirmation while my inquiry is saved.
- As a reader, I open a Blog post with images and rich formatting.
- As a prospect, I view Case Studies with problem/solution/results.
- As a visitor, I read Testimonials and trust badges.
- As an admin, I log in and publish/unpublish posts/testimonials/case studies.
- As an admin, I edit content and changes reflect instantly on the public site.
- As a visitor, broken external data shows graceful fallback and retry.

Exit Criteria
- All user stories validated by testing_agent_v3; no red screen errors; all routes functional; data flows from external site reliably.

---

## 5) Next Actions (from User)
- Confirm email provider (SendGrid or Resend) and supply API key + from-email.
- Provide admin seed email to create first account; I’ll generate a secure temp password.
- Share any brand assets (font preference, additional logos, case-study PDFs/links) if available.

---

## 6) Success Criteria
- External services/clients data loads dynamically on every visit and renders in carousels with 3D interactions.
- Contact form stores inquiries in MongoDB and sends email notifications successfully.
- Admin Panel supports secure login and full CRUD for Blog, Testimonials, and Case Studies.
- Website feels premium: responsive, fast, accessible; no console errors; backend logs clean.
- All tests (backend + frontend) pass via testing_agent_v3; preview URL demonstrates complete functionality.

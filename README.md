# SmartTouch — Bilingual Digital Advertising Agency Platform

Enterprise-grade agency web portal and management dashboard built with **Laravel 12 API**, **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, and **MySQL**.

---

## Architecture Overview

- **Backend (`/backend`)**:
  - Laravel 12 RESTful API with MySQL 8 (`smarttouch` database).
  - Authentication: Laravel Sanctum with token generation and role-based permissions.
  - Role-Based Access Control (RBAC): `admin`, `content`, `seo`.
  - Bilingual data modeling: Dual-language JSON fields (`en`, `ar`) for Services, Dynamic Pages, and Blog Posts.
  - Inquiries pipeline: Lead tracking (`new`, `contacted`, `in_discussion`, `proposal_sent`, `won`, `lost`).

- **Frontend (`/frontend`)**:
  - Next.js (App Router) with TypeScript and Tailwind CSS.
  - Fluid momentum scrolling via **Lenis**.
  - Pop-up modals and drawers with **Framer Motion** custom cubic-bezier easing (`ease-out-expo`: `[0.16, 1, 0.3, 1]`).
  - Bilingual support: Instant switching between **English (LTR)** and **??????? (RTL)** with typography powered by **Cairo** and **Plus Jakarta Sans**.
  - Interactive agency showcase: Web/App Development, SEO Marketing, Creative Branding.
  - Contextual inquiry forms on Contact Us and individual Service detail pages.
  - Executive Dashboard with KPI cards, Inquiries pipeline, Blog CMS, Dynamic Pages manager, and User/Role management.

---

## Quick Start Guide

### 1. Backend (Laravel 12 API)
```bash
cd backend

# Configure environment (MySQL credentials)
# DB_DATABASE=smarttouch
# DB_USERNAME=root

# Run migrations and seed sample bilingual data
php artisan migrate:fresh --seed

# Start API server on port 8000
php artisan serve --port=8000
```
API runs on `http://localhost:8000`.

### 2. Frontend (Next.js & Tailwind)
```bash
cd frontend

# Install dependencies (already completed)
npm install

# Start development server on port 3000
npm run dev
```
Website and Dashboard run on `http://localhost:3000`.

---

## Default Staff Credentials (RBAC)

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@smarttouch.com` | `password123` | Full access: leads pipeline, user creation, blog, pages |
| **Content Creator** | `content@smarttouch.com` | `password123` | Create, edit, and publish blog articles & dynamic pages |
| **SEO Specialist** | `seo@smarttouch.com` | `password123` | SEO metadata auditing, keywords, and OpenGraph tags |

---

## Key Routes

- **Public Marketing Site**: `http://localhost:3000`
- **Services Catalog**: `http://localhost:3000/#services`
- **Service Detail (with embedded inquiry)**: `http://localhost:3000/services/web-development`
- **Bilingual Blog**: `http://localhost:3000/blog`
- **Dynamic Pages (e.g. About Us)**: `http://localhost:3000/pages/about-us`
- **Agency Management Dashboard**: `http://localhost:3000/dashboard`

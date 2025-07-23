# 🏢 HomeHorizon – Building Management System

Welcome to **HomeHorizon**, complete and production-ready modern and responsive full-stack **Building Management System** designed for residential apartment complexes. This is the **client-side (frontend)** application of the project, built using React, TailwindCSS, DaisyUI, Material UI, and Firebase for seamless and secure user interaction.

---

## 🔗 Live Links

- 🚀 **Live Site**: [https://horizontower-3c51a.web.app](https://horizontower-3c51a.web.app)
- 🗂️ **Frontend Repo**: [https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-rabiul3000.git](https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-rabiul3000.git)

---

## ✨ Features

- 🔐 User Authentication (Firebase)
- 👥 Role-based dashboard (User / Member / Admin)
- 🏠 Apartment listings with floor/block/rent info
- 📄 Smart agreement requests and approval
- 💸 Stripe-integrated secure payments
- 🧾 Coupon system with real-time discount application
- 📢 Announcements for all residents
- 📈 Payment history tracking
- 📱 Fully responsive UI (Mobile + Desktop)
- 🌙 Global light/dark mode with DaisyUI
- 🌍 Integrated Leaflet map

---

## 🧰 Tech Stack

**Frontend:**

- ⚛️ React 19
- 🎨 Tailwind CSS + DaisyUI
- 🧱 Material UI (MUI)
- 🔐 Firebase Auth
- 🧾 Stripe JS
- 📦 Axios + React Query
- 🗺️ React Leaflet
- 💅 Emotion (CSS-in-JS)
- 🧠 SweetAlert2

**Development Tools:**

- 🛠️ Vite
- ✅ ESLint
- 🔄 React Router v7

---

## 🏗️ Project Structure
```

src/
│
├── components/ # Reusable components
├── layouts/ # Main and Dashboard Layouts
├── pages/ # All route-based pages
│ ├── Apartment/
│ ├── Home/
│ ├── Login/
│ ├── Register/
│ ├── Announcements/
│ └── dashboard/
│ ├── admin/
│ ├── member/
│ └── controlRoutes/
├── routes/ # routes.jsx
├── firebase/ # Firebase config
└── main.jsx # App entry point

```

---

## 🔄 Routing Overview

This project uses `react-router` with a clean layout structure. Here's an overview of route configuration:

### 🌐 Public Routes (`/`)

- `/` → Home Page
- `/apartment` → Apartment Listings
- `/register` → Registration Page
- `/login` → Login Page

### 📊 Dashboard Routes (`/dashboard`)

| Route Path                     | Component                | Access Role  |
|-----------------------------   |--------------------------|--------------|
| `/dashboard`                   | User Profile             | Logged In    |
| `/dashboard/announcements`     | Announcements            | All Users    |
| `/dashboard/make_announcement` | Make Announcement        | Admin Only   |
| `/dashboard/agreement_requests`| Agreement Requests       | Admin Only   |
| `/dashboard/manage_coupons`    | Manage Coupons           | Admin Only   |
| `/dashboard/manage_members`    | Manage Members           | Admin Only   |
| `/dashboard/make_payment`      | Make Payment             | Member Only  |
| `/dashboard/payment`           | Pay with Stripe          | Member Only  |
| `/dashboard/payment_history`   | View Payment History     | Member Only  |

---

## 🚀 Getting Started (For Dev)

### 🔧 Installation

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-rabiul3000.git
cd b11a12-client-side-rabiul3000
npm install

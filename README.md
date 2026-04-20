# Helping Hand — Home Services Booking Website

A full stack web project built as part of my CSE undergraduate coursework. Helping Hand is a home services booking platform where users can browse services, book a worker, leave reviews, and manage their account — all from a clean, responsive interface.

# Live Site
🌐 **Frontend:** https://helpinghand-bd.netlify.app
⚙️ **Backend API:** https://helping-hand-backend-xuvw.onrender.com

# About The Project

Helping Hand connects customers with trusted home service professionals across Bangladesh. Users can book services like housekeeping, electrical work, plumbing, pest control, interior painting, and vehicle mechanics — all from one place.

The project evolved from a pure frontend into a **full stack web application** with a Node.js/Express backend, MongoDB Atlas database, and JWT-based authentication.

# Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, Tailwind CSS, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT (JSON Web Tokens) |
| Frontend Hosting | Netlify |
| Backend Hosting | Render |
| Font | Google Fonts (Poppins) |
| Editor | VS Code |

# Project Structure

```
Helping-Hand/
│
├── index.html              → Home page
├── js/
│   └── script.js           → All JS logic (auth, booking, billing, reviews)
│
└── pages/
    ├── booking.html        → Book a service form with billing calculator
    ├── contact.html        → Contact form + info
    ├── login.html          → Login form
    ├── signup.html         → Sign up form
    └── comments.html       → Customer reviews page
```

# Features

### Authentication
- User signup and login with JWT tokens
- Navbar updates dynamically after login — shows user's name and Logout button
- Protected routes — booking requires login

### Booking System
- Select service, date, hours
- **Live Bill Summary** — calculates total cost instantly
- **Worker Assignment** — randomly assigns an available worker from the database
- Worker is marked unavailable for 1 day after being assigned
- Booking saved to MongoDB with confirmation code

### Reviews
- Logged in users can submit star ratings and comments
- All reviews loaded from database and displayed on the comments page

### Services
- 6 services: Housekeeping, Electrician, Mechanic, Pest Control, Interior Painting, Plumbing
- Flat rate and hourly rate support

# Pages

### `index.html` — Home Page
- Sticky navbar with dynamic login/logout state
- Hero section with CTA buttons
- Services section with 6 service cards
- Customer reviews carousel
- FAQ accordion
- Footer with quick links

### `pages/booking.html` — Book a Service
- Full booking form with live bill summary
- Assigned worker name and ID shown before confirming
- Confirmation code displayed on success

### `pages/comments.html` — Reviews
- Star rating system
- Submit and view all customer reviews

### `pages/contact.html` — Contact Us
- Contact form with name, email, message
- Contact details and working hours

### `pages/login.html` & `pages/signup.html`
- Clean auth forms connected to backend API

# Pricing

| Service | Rate |
|---|---|
| Housekeeping | ৳500/hr |
| Electrician | ৳800/hr |
| Mechanic | ৳600/hr |
| Pest Control | ৳1,200 flat |
| Interior Painting | ৳900/hr |
| Plumbing | ৳700/hr |

# Color Scheme

| Color | Tailwind Class | Used For |
|---|---|---|
| Dark Green | `bg-green-800` | Navbar, Hero, Buttons |
| Lime Yellow | `text-yellow-300` | Logo, Headings, Accents |
| Warm Cream | `bg-amber-50` | Page backgrounds |
| Light Green | `bg-green-50` | Card badges, Bill summary |
| Dark | `bg-gray-900` | Footer |

# Backend Repo
🔗 https://github.com/Rahatul-Islam-Rafi/Helping-hand-Backend
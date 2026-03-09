# Helping Hand — Home Services Booking Website
A frontend web project built as part of my CSE undergraduate coursework. Helping Hand is a home services booking platform where users can browse services, book a worker, contact the team, and manage their account — all from a clean, responsive interface.


 # Live Site:
 https://rahatul-islam-rafi.github.io/Helping-Hand---FE/



#  About The Project

Helping Hand connects customers with trusted home service professionals across Bangladesh. Users can book services like housekeeping, electrical work, plumbing, pest control, interior painting, and vehicle mechanics — all from one place. This project was built entirely using **HTML**, **Tailwind CSS**, and **Vanilla JavaScript** — no frameworks, no libraries, no custom CSS file.



# Project Structure

```
Helping-Hand/
│
├── index.html              → Home page
├── js/
│   └── script.js           → Form validation + success messages
│
└── pages/
    ├── booking.html        → Book a service form with billing calculator
    ├── contact.html        → Contact form + info
    ├── login.html          → Login form
    └── signup.html         → Sign up form
```

# Pages

# `index.html` — Home Page
The main landing page. Contains 5 sections:
- **Navbar** — Sticky navigation bar with logo, links, Login and Sign Up buttons
- **Hero** — Full screen welcome section with heading, subtext, CTA buttons and stats (500+ workers, 10K+ customers, 3 cities)
- **Services** — 6 service cards (Housekeeping, Electrician, Mechanic, Pest Control, Interior Painting, Plumbing) with hover effects
- **Reviews** — A carousel showing 3 customer reviews with prev/next arrow buttons and dot indicators
- **FAQ** — Accordion style FAQ section — click a question to open/close the answer
- **Footer** — Dark footer with quick links and contact info

# `pages/booking.html` — Book a Service
A booking form where users fill in their details to request a worker. Features:
- Name, phone, address, service dropdown, preferred date
- **Hours selector** — choose 1 to 8 hours
- **Live Bill Summary** — automatically calculates and shows total cost when service and hours are selected
- **Pest Control special case** — flat rate service, hours dropdown is hidden automatically, bill shows instantly
- Success message appears after form is submitted, then clears after 2.5 seconds

# `pages/contact.html` — Contact Us
Two column layout:
- Left side: contact form with Name, Email, and Message fields
- Right side: contact details (address, phone, email, working hours) and average response time badge


# `pages/login.html` — Login
Simple login form with Email and Password fields. Shows a success message on submit.


# `pages/signup.html` — Sign Up
Registration form with Full Name, Email, Phone Number, and Password fields. Shows a success message on submit.

# Styling — Tailwind CSS Only

This project uses **no custom CSS file**. All styling is done using Tailwind CSS utility classes loaded via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

# Color Scheme
| Color | Tailwind Class | Used For |
|---|---|---|
| Dark Green | `bg-green-800` | Navbar, Hero, Buttons |
| Lime Yellow | `text-yellow-300` | Logo, Headings, Accents |
| Warm Cream | `bg-amber-50` | Page backgrounds |
| Light Green | `bg-green-50` | Card badges, Bill summary |
| Dark | `bg-gray-900` | Footer |

# Key Tailwind Features Used
- **Responsive design** → `md:flex`, `lg:grid-cols-3`, `sm:flex-row`
- **Hover effects** → `hover:shadow-xl`, `hover:-translate-y-2`, `hover:border-green-600`
- **Transitions** → `transition-all duration-300`
- **Flexbox** → `flex`, `items-center`, `justify-between`
- **Grid** → `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Spacing** → `px-10`, `py-20`, `gap-6`, `mb-4`
- **Typography** → `text-2xl`, `font-bold`, `tracking-wide`, `uppercase`
- **Group hover** → `group`, `group-hover:text-green-800`

---

# JavaScript — `script.js`

1. **Service Bill Calculator** — A dynamic billing calculator that computes service charges based on user selection. Each service has a defined hourly rate or flat fee. Services like Pest Control use a fixed flat rate, while others such as Housekeeping, Electrician, Mechanic, Interior Painting, and Plumbing are billed per hour. When a user selects a service and specifies the number of hours, the calculator displays a detailed bill summary including service name, rate, hours, and total cost. The hours input is hidden automatically for flat-rate services.

2. **Navigation** — A toggleMenu function handles the mobile navbar by showing or hiding the navigation menu on smaller screens.

3. **Image Carousel** — A manual carousel supports three slides with forward and backward navigation. Dot indicators update in real time to reflect the currently active slide, and the carousel loops seamlessly from the last slide back to the first.

4. **FAQ Accordion** — An accordion-style FAQ section allows users to expand or collapse individual answers by clicking on the question. A plus and minus icon provides visual feedback on the open or closed state of each item.

5. **Form Validation and Submission** — All forms on the page share a unified submit handler. On submission, required fields are checked and highlighted in red if left empty. Upon successful validation, a success message is briefly displayed and the form resets automatically after four seconds, along with clearing the bill summary and service display.

# Pricing Table
| Service | Rate |
|---|---|
| Housekeeping | ৳500/hr |
| Electrician | ৳800/hr |
| Mechanic | ৳600/hr |
| Pest Control | ৳1,200 flat |
| Interior Painting | ৳900/hr |
| Plumbing | ৳700/hr |

# Tools Used

| Tool | Purpose |
|---|---|
| HTML5 | Page structure |
| Tailwind CSS v4 (CDN) | All styling — no CSS file |
| Vanilla JavaScript | Form validation, carousel, FAQ, billing |
| Google Fonts | Poppins font |
| GitHub Pages | Live deployment |
| VS Code | Code editor |

---

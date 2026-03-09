# 🤝 Helping Hand — Home Services Booking Website

A frontend web project built as part of my CSE undergraduate coursework. Helping Hand is a home services booking platform where users can browse services, book a worker, contact the team, and manage their account — all from a clean, responsive interface.

---

## 🌐 Live Site

👉 [https://Rahatul-Islam-Rafi.github.io/Helping-Hand](https://Rahatul-Islam-Rafi.github.io/Helping-Hand)

---

## 📌 About The Project

Helping Hand connects customers with trusted home service professionals across Bangladesh. Users can book services like housekeeping, electrical work, plumbing, pest control, interior painting, and vehicle mechanics — all from one place.

This project was built entirely using **HTML**, **Tailwind CSS**, and **Vanilla JavaScript** — no frameworks, no libraries, no custom CSS file.

---

## 📁 Project Structure

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

---

## 🖥️ Pages

### `index.html` — Home Page
The main landing page. Contains 5 sections:
- **Navbar** — Sticky navigation bar with logo, links, Login and Sign Up buttons
- **Hero** — Full screen welcome section with heading, subtext, CTA buttons and stats (500+ workers, 10K+ customers, 3 cities)
- **Services** — 6 service cards (Housekeeping, Electrician, Mechanic, Pest Control, Interior Painting, Plumbing) with hover effects
- **Reviews** — A carousel showing 3 customer reviews with prev/next arrow buttons and dot indicators
- **FAQ** — Accordion style FAQ section — click a question to open/close the answer
- **Footer** — Dark footer with quick links and contact info

---

### `pages/booking.html` — Book a Service
A booking form where users fill in their details to request a worker. Features:
- Name, phone, address, service dropdown, preferred date
- **Hours selector** — choose 1 to 8 hours
- **Live Bill Summary** — automatically calculates and shows total cost when service and hours are selected
- **Pest Control special case** — flat rate service, hours dropdown is hidden automatically, bill shows instantly
- Success message appears after form is submitted, then clears after 2.5 seconds

---

### `pages/contact.html` — Contact Us
Two column layout:
- Left side: contact form with Name, Email, and Message fields
- Right side: contact details (address, phone, email, working hours) and average response time badge

---

### `pages/login.html` — Login
Simple login form with Email and Password fields. Shows a success message on submit.

---

### `pages/signup.html` — Sign Up
Registration form with Full Name, Email, Phone Number, and Password fields. Shows a success message on submit.

---

## 🎨 Styling — Tailwind CSS Only

This project uses **no custom CSS file**. All styling is done using Tailwind CSS utility classes loaded via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

### Color Scheme
| Color | Tailwind Class | Used For |
|---|---|---|
| Dark Green | `bg-green-800` | Navbar, Hero, Buttons |
| Lime Yellow | `text-yellow-300` | Logo, Headings, Accents |
| Warm Cream | `bg-amber-50` | Page backgrounds |
| Light Green | `bg-green-50` | Card badges, Bill summary |
| Dark | `bg-gray-900` | Footer |

### Key Tailwind Features Used
- **Responsive design** → `md:flex`, `lg:grid-cols-3`, `sm:flex-row`
- **Hover effects** → `hover:shadow-xl`, `hover:-translate-y-2`, `hover:border-green-600`
- **Transitions** → `transition-all duration-300`
- **Flexbox** → `flex`, `items-center`, `justify-between`
- **Grid** → `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Spacing** → `px-10`, `py-20`, `gap-6`, `mb-4`
- **Typography** → `text-2xl`, `font-bold`, `tracking-wide`, `uppercase`
- **Group hover** → `group`, `group-hover:text-green-800`

---

## ⚙️ JavaScript — `script.js`

Only one thing is handled in `script.js`:

### Form Validation + Submission
Applied automatically to all forms on every page:
- Checks all `required` fields are filled
- If empty → adds a **red ring** around the empty field using Tailwind classes `ring-2 ring-red-500`
- If all filled → shows a **green success message** by removing the `hidden` class from `#success-msg`
- After 2.5 seconds → clears the form, hides the success message, hides the bill summary, and resets the heading

---

## 🧮 Billing Calculator — inside `booking.html`

The billing logic lives directly inside `booking.html` as an inline `<script>`:

### Pricing Table
| Service | Rate |
|---|---|
| Housekeeping | ৳500/hr |
| Electrician | ৳800/hr |
| Mechanic | ৳600/hr |
| Pest Control | ৳1,200 flat |
| Interior Painting | ৳900/hr |
| Plumbing | ৳700/hr |

### How it works
- `calculateBill()` runs every time the service or hours dropdown changes (`onchange`)
- For **hourly services** → total = rate × hours, hours dropdown is visible
- For **Pest Control** → flat rate, hours dropdown is hidden automatically, bill shows instantly
- Bill Summary box is hidden by default and only appears when both service and hours are selected

---

## 🎠 Carousel — inside `index.html`

The reviews carousel is handled by inline JavaScript inside `index.html`:
- `moveCarousel(direction)` → moves slides using arrow buttons
- `goToSlide(index)` → jumps to a slide using dot buttons
- `updateCarousel()` → applies `translateX()` to move the track and swaps dot colors

---

## ❓ FAQ Accordion — inside `index.html`

- `toggleFaq(button)` → closes all open answers first, then opens the clicked one
- Uses Tailwind's `hidden` class to show/hide answers
- Changes `+` to `−` icon when open

---

## 🔠 Font

Uses **Poppins** from Google Fonts loaded via:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
```
Applied globally with:
```css
body { font-family: 'Poppins', sans-serif; }
```

---

## 🛠️ Tools Used

| Tool | Purpose |
|---|---|
| HTML5 | Page structure |
| Tailwind CSS v4 (CDN) | All styling — no CSS file |
| Vanilla JavaScript | Form validation, carousel, FAQ, billing |
| Google Fonts | Poppins font |
| GitHub Pages | Live deployment |
| VS Code | Code editor |

---

## 👨‍💻 Author

**Rahatul Islam Rafi**
CSE Undergraduate Student

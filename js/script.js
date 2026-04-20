const API_URL = "http://localhost:5000/api";

// ============================================
// HELPER FUNCTIONS
// ============================================
function saveToken(token) {
  localStorage.setItem("token", token);
}
function getToken() {
  return localStorage.getItem("token");
}
function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("hh_user");
  window.location.href = "../index.html";
}
function showSuccess(id, message) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = message;
    el.classList.remove("hidden");
    el.classList.remove("text-red-800", "bg-red-50", "border-red-300");
    el.classList.add("text-green-800", "bg-green-50", "border-green-300");
  }
}
function showError(id, message) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = "❌ " + message;
    el.classList.remove("hidden");
    el.classList.remove("text-green-800", "bg-green-50", "border-green-300");
    el.classList.add("text-red-800", "bg-red-50", "border-red-300");
  }
}

// ============================================
// NAVBAR
// ============================================
function toggleMenu() {
  const menu = document.getElementById("navbar-sticky");
  if (menu) menu.classList.toggle("hidden");
}
function updateNavbar() {
  const user = getUser();
  const loginLinks = document.querySelectorAll('a[href*="login.html"]');
  const signupLinks = document.querySelectorAll('a[href*="signup.html"]');
  if (user) {
    loginLinks.forEach(link => {
      link.textContent = user.name.split(" ")[0];
      link.href = "#";
    });
    signupLinks.forEach(link => {
      link.textContent = "Logout";
      link.href = "#";
      link.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
      });
    });
  }
}

// ============================================
// SIGNUP PAGE
// ============================================
function initSignup() {
  if (!window.location.href.includes("signup")) return;
  const form = document.querySelector("form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const password = document.getElementById("password")?.value.trim();
    if (!name || !email || !phone || !password) {
      showError("success-msg", "Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      showError("success-msg", "Password must be at least 6 characters.");
      return;
    }
    const btn = form.querySelector("button[type=submit]");
    btn.textContent = "Creating Account...";
    btn.disabled = true;
    try {
      const response = await fetch(API_URL + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await response.json();
      if (data.success) {
        saveToken(data.data.token);
        saveUser(data.data);
        localStorage.setItem("hh_user", JSON.stringify(data.data));
        showSuccess("success-msg", "✅ Account created! Redirecting to login...");
        setTimeout(() => { window.location.href = "./login.html"; }, 1500);
      } else {
        showError("success-msg", data.message || "Registration failed.");
        btn.textContent = "Create Account";
        btn.disabled = false;
      }
    } catch (error) {
      showError("success-msg", "Cannot connect to server.");
      btn.textContent = "Create Account";
      btn.disabled = false;
    }
  });
}

// ============================================
// LOGIN PAGE
// ============================================
function initLogin() {
  if (!window.location.href.includes("login")) return;
  const form = document.querySelector("form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();
    if (!email || !password) {
      showError("success-msg", "Please enter your email and password.");
      return;
    }
    const btn = form.querySelector("button[type=submit]");
    btn.textContent = "Logging in...";
    btn.disabled = true;
    try {
      const response = await fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        saveToken(data.data.token);
        saveUser(data.data);
        localStorage.setItem("hh_user", JSON.stringify(data.data));
        showSuccess("success-msg", "✅ Logged in! Redirecting...");
        setTimeout(() => { window.location.href = "../index.html"; }, 1500);
      } else {
        showError("success-msg", data.message || "Invalid email or password.");
        btn.textContent = "Login";
        btn.disabled = false;
      }
    } catch (error) {
      showError("success-msg", "Cannot connect to server. Make sure backend is running.");
      btn.textContent = "Login";
      btn.disabled = false;
    }
  });
}

// ============================================
// BOOKING PAGE
// ============================================
const servicePrices = {
  "Housekeeping": { rate: 500, flat: false },
  "Electrician": { rate: 800, flat: false },
  "Mechanic": { rate: 600, flat: false },
  "Pest Control": { rate: 1200, flat: true },
  "Interior Painting": { rate: 900, flat: false },
  "Plumbing": { rate: 700, flat: false },
};
const serviceCategoryMap = {
  "Housekeeping": "housekeeping",
  "Electrician": "electrician",
  "Mechanic": "mechanic",
  "Pest Control": "other",
  "Interior Painting": "other",
  "Plumbing": "plumber",
};

function calculateBill() {
  const service = document.getElementById("service-select")?.value;
  const hoursSection = document.getElementById("hours-section");
  const hoursSelect = document.getElementById("hours");
  if (!service) {
    document.getElementById("bill-summary")?.classList.add("hidden");
    hoursSection?.classList.remove("hidden");
    if (hoursSelect) hoursSelect.value = "";
    return;
  }
  const pricing = servicePrices[service];
  if (!pricing) return;
  const display = document.getElementById("selected-service");
  if (display) display.textContent = "— " + service;
  if (pricing.flat) {
    hoursSection?.classList.add("hidden");
    if (hoursSelect) hoursSelect.value = "";
    document.getElementById("bill-service").textContent = service;
    document.getElementById("bill-rate").textContent = "৳" + pricing.rate + " (flat rate)";
    document.getElementById("bill-hours").textContent = "N/A";
    document.getElementById("bill-total").textContent = "৳" + pricing.rate.toLocaleString();
    const noteEl = document.getElementById("bill-note");
    if (noteEl) {
      noteEl.textContent = "* Fixed flat rate — no hourly charge applies.";
      noteEl.classList.remove("hidden");
    }
    document.getElementById("bill-summary")?.classList.remove("hidden");
  } else {
    hoursSection?.classList.remove("hidden");
    const hours = hoursSelect?.value;
    document.getElementById("bill-note")?.classList.add("hidden");
    if (!hours) {
      document.getElementById("bill-summary")?.classList.add("hidden");
      return;
    }
    const total = pricing.rate * parseInt(hours);
    document.getElementById("bill-service").textContent = service;
    document.getElementById("bill-rate").textContent = "৳" + pricing.rate + "/hr";
    document.getElementById("bill-hours").textContent = hours + (hours === "1" ? " hour" : " hours");
    document.getElementById("bill-total").textContent = "৳" + total.toLocaleString();
    document.getElementById("bill-summary")?.classList.remove("hidden");
  }
}

function initBooking() {
  if (!window.location.href.includes("booking")) return;
  const form = document.querySelector("form");
  if (!form) return;
  const token = getToken();
  if (!token) {
    alert("Please login first to book a service.");
    window.location.href = "./login.html";
    return;
  }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const address = document.getElementById("address")?.value.trim();
    const serviceSelected = document.getElementById("service-select")?.value;
    const date = document.getElementById("date")?.value;
    const notes = document.getElementById("note")?.value.trim();
    if (!name || !phone || !address || !serviceSelected || !date) {
      showError("success-msg", "Please fill in all required fields.");
      return;
    }
    const btn = form.querySelector("button[type=submit]");
    btn.textContent = "Confirming Booking...";
    btn.disabled = true;
    const category = serviceCategoryMap[serviceSelected] || "other";
    try {
      const servicesRes = await fetch(API_URL + "/services?category=" + category);
      const servicesData = await servicesRes.json();
      let serviceId = null;
      if (servicesData.success && servicesData.data.length > 0) {
        serviceId = servicesData.data[0]._id;
      }
      if (!serviceId) {
        showError("success-msg", "Service not found. Please ask admin to add services first.");
        btn.textContent = "Confirm Booking";
        btn.disabled = false;
        return;
      }
      const response = await fetch(API_URL + "/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({
          serviceId,
          bookingDate: date,
          timeSlot: "10:00-12:00",
          address,
          phone,
          notes: notes || "",
        }),
      });
      const data = await response.json();
      if (data.success) {
        showSuccess("success-msg", "🎉 Booking confirmed! Your code: " + data.data.confirmationCode);
        form.reset();
        document.getElementById("bill-summary")?.classList.add("hidden");
      } else {
        showError("success-msg", data.message || "Booking failed.");
      }
    } catch (error) {
      showError("success-msg", "Cannot connect to server. Make sure backend is running.");
    }
    btn.textContent = "Confirm Booking";
    btn.disabled = false;
  });
}

// ============================================
// CONTACT PAGE
// ============================================
function initContact() {
  if (!window.location.href.includes("contact")) return;
  const form = document.querySelector("form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();
    if (!name || !email || !message) {
      showError("success-msg", "Please fill in all fields.");
      return;
    }
    showSuccess("success-msg", "✅ Message sent! We'll reply within 24 hours.");
    form.reset();
  });
}

// ============================================
// COMMENT / REVIEW SYSTEM
// ============================================
let selectedRating = 0;

function checkLoginState() {
  const user = getUser();
  const loggedOut = document.getElementById("comment-logged-out");
  const loggedIn = document.getElementById("comment-logged-in");
  if (!loggedOut) return;
  if (user) {
    loggedOut.classList.add("hidden");
    loggedIn.classList.remove("hidden");
    const name = user.name || "User";
    const avatar = document.getElementById("comment-avatar");
    const username = document.getElementById("comment-username");
    if (avatar) avatar.textContent = name.charAt(0).toUpperCase();
    if (username) username.textContent = name;
  } else {
    loggedOut.classList.remove("hidden");
    loggedIn.classList.add("hidden");
  }
}

function setRating(star) {
  selectedRating = star;
  document.querySelectorAll(".star-btn").forEach(function (btn) {
    const n = parseInt(btn.getAttribute("data-star"));
    btn.classList.toggle("text-yellow-400", n <= star);
    btn.classList.toggle("text-gray-300", n > star);
  });
}

async function submitComment() {
  const text = document.getElementById("comment-input")?.value.trim();
  const errorEl = document.getElementById("comment-error");
  const token = getToken();
  if (!text || selectedRating === 0) {
    if (errorEl) errorEl.classList.remove("hidden");
    return;
  }
  if (errorEl) errorEl.classList.add("hidden");
  if (!token) {
    alert("Please login first to submit a review.");
    window.location.href = "./login.html";
    return;
  }
  try {
    const response = await fetch(API_URL + "/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({
        rating: selectedRating,
        comment: text,
      }),
    });
    const data = await response.json();
    if (data.success) {
      document.getElementById("comment-input").value = "";
      selectedRating = 0;
      document.querySelectorAll(".star-btn").forEach(btn => {
        btn.classList.remove("text-yellow-400");
        btn.classList.add("text-gray-300");
      });
      loadReviews();
    } else {
      alert(data.message || "Could not submit review.");
    }
  } catch (error) {
    alert("Cannot connect to server.");
  }
}

async function loadReviews() {
  const list = document.getElementById("comments-list");
  const noMsg = document.getElementById("no-comments-msg");
  if (!list) return;
  try {
    const response = await fetch(API_URL + "/reviews");
    const data = await response.json();
    if (!data.success || data.data.length === 0) {
      if (noMsg) noMsg.classList.remove("hidden");
      list.innerHTML = "";
      return;
    }
    if (noMsg) noMsg.classList.add("hidden");
    const buildStars = r => Array.from({ length: 5 }, (_, i) => i < r ? "★" : "☆").join("");
    list.innerHTML = data.data.map(c => `
      <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-full bg-green-800 text-yellow-300 flex items-center justify-center text-sm font-bold flex-shrink-0">
            ${c.user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p class="font-semibold text-gray-900 text-sm">${c.user.name}</p>
            <p class="text-xs text-gray-400">${new Date(c.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
          </div>
          <span class="ml-auto text-yellow-400 text-lg">${buildStars(c.rating)}</span>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">${c.comment}</p>
      </div>
    `).join("");
  } catch (error) {
    console.log("Could not load reviews");
  }
}

// ============================================
// FAQ TOGGLE
// ============================================
function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const icon = button.querySelector(".faq-icon");
  if (answer.classList.contains("hidden")) {
    answer.classList.remove("hidden");
    icon.textContent = "−";
  } else {
    answer.classList.add("hidden");
    icon.textContent = "+";
  }
}

// ============================================
// CAROUSEL
// ============================================
let currentSlide = 0;
const totalSlides = 3;

function moveCarousel(direction) {
  currentSlide = currentSlide + direction;
  if (currentSlide >= totalSlides) currentSlide = 0;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  updateCarousel();
}
function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}
function updateCarousel() {
  const track = document.getElementById("carousel-track");
  if (!track) return;
  track.style.transform = "translateX(-" + (currentSlide * 100) + "%)";
  const dots = document.querySelectorAll("#dots button");
  dots.forEach((dot, i) => {
    dot.className = i === currentSlide
      ? "w-3 h-3 rounded-full bg-green-800"
      : "w-3 h-3 rounded-full bg-gray-300";
  });
}

// ============================================
// RUN ON PAGE LOAD
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  updateNavbar();
  initSignup();
  initLogin();
  initBooking();
  initContact();
  checkLoginState();
  loadReviews();
});
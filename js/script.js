const servicePrices = {
  'Housekeeping': { rate: 500, flat: false },
  'Electrician': { rate: 800, flat: false },
  'Mechanic': { rate: 600, flat: false },
  'Pest Control': { rate: 1200, flat: true },
  'Interior Painting': { rate: 900, flat: false },
  'Plumbing': { rate: 700, flat: false },
};

function calculateBill() {
  const service = document.getElementById('service-select').value;
  const hoursSection = document.getElementById('hours-section');
  const hoursSelect = document.getElementById('hours');

  if (!service) {
    document.getElementById('bill-summary').classList.add('hidden');
    hoursSection.classList.remove('hidden');
    hoursSelect.value = '';
    return;
  }

  const pricing = servicePrices[service];
  if (!pricing) return;

  const display = document.getElementById('selected-service');
  if (display) display.textContent = '— ' + service;

  if (pricing.flat) {
    hoursSection.classList.add('hidden');
    hoursSelect.value = '';
    document.getElementById('bill-service').textContent = service;
    document.getElementById('bill-rate').textContent = '৳' + pricing.rate + ' (flat rate)';
    document.getElementById('bill-hours').textContent = 'N/A';
    document.getElementById('bill-total').textContent = '৳' + pricing.rate.toLocaleString();
    const noteEl = document.getElementById('bill-note');
    noteEl.textContent = '* Fixed flat rate — no hourly charge applies.';
    noteEl.classList.remove('hidden');
    document.getElementById('bill-summary').classList.remove('hidden');
  } else {
    hoursSection.classList.remove('hidden');
    const hours = hoursSelect.value;
    document.getElementById('bill-note').classList.add('hidden');
    if (!hours) {
      document.getElementById('bill-summary').classList.add('hidden');
      return;
    }
    const total = pricing.rate * parseInt(hours);
    document.getElementById('bill-service').textContent = service;
    document.getElementById('bill-rate').textContent = '৳' + pricing.rate + '/hr';
    document.getElementById('bill-hours').textContent = hours + (hours === '1' ? ' hour' : ' hours');
    document.getElementById('bill-total').textContent = '৳' + total.toLocaleString();
    document.getElementById('bill-summary').classList.remove('hidden');
  }
}

function toggleMenu() {
  const menu = document.getElementById('navbar-sticky');
  menu.classList.toggle('hidden');
}

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
  const track = document.getElementById('carousel-track');
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  const dots = document.querySelectorAll('#dots button');
  dots.forEach((dot, i) => {
    dot.className = i === currentSlide
      ? 'w-3 h-3 rounded-full bg-green-800'
      : 'w-3 h-3 rounded-full bg-gray-300';
  });
}


function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const icon = button.querySelector('.faq-icon');
  if (answer.classList.contains('hidden')) {
    answer.classList.remove('hidden');
    icon.textContent = '−';
  } else {
    answer.classList.add('hidden');
    icon.textContent = '+';
  }
}
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      let allFilled = true;

      inputs.forEach(function (input) {
        if (input.value.trim() === '') {
          allFilled = false;
          input.classList.add('ring-2', 'ring-red-500', 'border-red-400');
        } else {
          input.classList.remove('ring-2', 'ring-red-500', 'border-red-400');
        }
      });

      if (!allFilled) {
        alert('Please fill in all required fields.');
        return;
      }

      const successMsg = document.getElementById('success-msg');
      if (successMsg) successMsg.classList.remove('hidden');

      setTimeout(function () {
        form.reset();
        if (successMsg) successMsg.classList.add('hidden');

        const bill = document.getElementById('bill-summary');
        const hoursSection = document.getElementById('hours-section');
        if (bill) bill.classList.add('hidden');
        if (hoursSection) hoursSection.classList.remove('hidden');

        const display = document.getElementById('selected-service');
        if (display) display.textContent = '';
      }, 4000);

    });
  });
});      
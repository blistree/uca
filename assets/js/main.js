/**
 * United Crypto Alliance (UCA) - Official Website Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initMiningCalculator();
  initFaqAccordion();
  initLiveMockupCounter();
});

/* Mobile Menu Navigation */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* Interactive Mining & Referral Boost Calculator */
function initMiningCalculator() {
  const refCodeToggle = document.getElementById('calcRefCodeApplied');
  const slider = document.getElementById('calcReferralsSlider');
  const sliderVal = document.getElementById('calcReferralsVal');
  const hourlyDisplay = document.getElementById('calcHourlyRate');
  const dailyDisplay = document.getElementById('calcDailyTotal');
  const monthlyDisplay = document.getElementById('calcMonthlyTotal');
  const baseRateLabel = document.getElementById('calcBaseRateLabel');
  const boostRateLabel = document.getElementById('calcBoostRateLabel');

  if (!slider || !hourlyDisplay) return;

  function updateCalculations() {
    const hasRefCode = refCodeToggle ? refCodeToggle.checked : true;
    const activeReferrals = parseInt(slider.value, 10) || 0;

    // Base rate: 0.30 UCAT/hr if applied referral code, else 0.25 UCAT/hr
    const baseRate = hasRefCode ? 0.30 : 0.25;
    // Boost: +0.05 UCAT/hr per active concurrent direct referral
    const boostRate = activeReferrals * 0.05;
    const totalHourly = baseRate + boostRate;
    const totalDaily = totalHourly * 24;
    const totalMonthly = totalDaily * 30;

    if (sliderVal) sliderVal.textContent = activeReferrals;
    hourlyDisplay.textContent = totalHourly.toFixed(2);
    if (dailyDisplay) dailyDisplay.textContent = totalDaily.toFixed(2) + ' UCAT';
    if (monthlyDisplay) monthlyDisplay.textContent = totalMonthly.toFixed(1) + ' UCAT';
    if (baseRateLabel) baseRateLabel.textContent = baseRate.toFixed(2) + ' /hr';
    if (boostRateLabel) boostRateLabel.textContent = '+' + boostRate.toFixed(2) + ' /hr';
  }

  slider.addEventListener('input', updateCalculations);
  if (refCodeToggle) {
    refCodeToggle.addEventListener('change', updateCalculations);
  }

  // Initial calculation
  updateCalculations();
}

/* FAQ Accordion Toggle */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });
}

/* Subtle Live Mockup Counter */
function initLiveMockupCounter() {
  const balanceEl = document.querySelector('.mockup-balance');
  if (!balanceEl) return;

  let currentBalance = 142.8500;
  setInterval(() => {
    currentBalance += 0.0001;
    balanceEl.textContent = currentBalance.toFixed(4) + ' UCAT';
  }, 1200);
}

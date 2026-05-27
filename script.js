// ============== Mobile Menu Toggle ==============
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// ============== Countdown Timer (to 14 June) ==============
function updateCountdown() {
    const cdDays = document.getElementById('cd-days');
    if (!cdDays) return;
    const cdHours = document.getElementById('cd-hours');
    const cdMins = document.getElementById('cd-mins');
    const cdSecs = document.getElementById('cd-secs');

    // Target: 14 June of current year (or next year if past)
    const now = new Date();
    let target = new Date(now.getFullYear(), 5, 14, 23, 59, 59); // Month 5 = June
    if (target < now) {
        target = new Date(now.getFullYear() + 1, 5, 14, 23, 59, 59);
    }

    const diff = target - now;
    if (diff <= 0) {
        cdDays.textContent = '0';
        cdHours.textContent = '0';
        cdMins.textContent = '0';
        cdSecs.textContent = '0';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    cdDays.textContent = String(days).padStart(2, '0');
    cdHours.textContent = String(hours).padStart(2, '0');
    cdMins.textContent = String(mins).padStart(2, '0');
    cdSecs.textContent = String(secs).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ============== FAQ Accordion ==============
document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        // Open clicked if it was closed
        if (!isOpen) item.classList.add('open');
    });
});

// ============== Smooth Scroll for Anchor Links ==============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ============== Contact Form Handler ==============
function handleContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '✓ संदेश भेजा गया';
    btn.style.background = 'linear-gradient(135deg, #2d8f47 0%, #1e6b32 100%)';
    setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        form.reset();
    }, 2500);
}

// ============== Reveal on Scroll (subtle) ==============
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.highlight-card, .stage-card, .syl-card, .timeline-item, .news-list-item, .step-row, .elig-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

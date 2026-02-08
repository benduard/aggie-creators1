document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // FAQ Accordion Logic
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            const isActive = item.classList.contains('active');

            // Close all others (optional, keeps it clean)
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Mobile toggle logic
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    /* Toggle Menu Function */
    function toggleMenu() {
        document.body.classList.toggle('menu-open');
        // Lock scroll
        if (document.body.classList.contains('menu-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMenu);
    }

    /* Close menu when a link is clicked */
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (document.body.classList.contains('menu-open')) {
                toggleMenu();
            }
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

/* Countdown Timer Logic */
/* Countdown Timer Logic */
// Check for existing deadline in localStorage
let deadlineStr = localStorage.getItem('saleDeadline');
let deadline;

if (deadlineStr) {
    deadline = new Date(deadlineStr);
    // If deadline passed, reset it for a new visitor experience or keep it at 0
    if (deadline < new Date()) {
        deadline = new Date();
        deadline.setDate(deadline.getDate() + 3);
        localStorage.setItem('saleDeadline', deadline.toISOString());
    }
} else {
    deadline = new Date();
    deadline.setDate(deadline.getDate() + 3); // 3 days from first visit
    localStorage.setItem('saleDeadline', deadline.toISOString());
}

function updateCountdown() {
    const now = new Date();
    const diff = deadline - now;

    if (diff <= 0) {
        // Timer expired
        const dEl = document.getElementById('days');
        if (dEl) {
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
        }
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');

    if (dEl && hEl && mEl && sEl) {
        dEl.innerText = days < 10 ? '0' + days : days;
        hEl.innerText = hours < 10 ? '0' + hours : hours;
        mEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        sEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }
}

// Run immediately and then every second to show it's working (even if we only show minutes)
updateCountdown();
setInterval(updateCountdown, 1000);

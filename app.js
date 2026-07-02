const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate').forEach((el) => observer.observe(el));

// Nav scroll effect
const topNav = document.getElementById('topNav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        topNav.style.background = 'rgba(10, 18, 25, 0.95)';
    } else {
        topNav.style.background = 'rgba(10, 18, 25, 0.75)';
    }
}, { passive: true });

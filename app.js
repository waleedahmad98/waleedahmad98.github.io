// ---------- Reveal on scroll ----------
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate').forEach((el) => observer.observe(el));

// ---------- Feature detection ----------
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

// ---------- Nav background + progress bar + scroll parallax ----------
const topNav = document.getElementById('topNav');
const scrollProgress = document.getElementById('scrollProgress');
const parallaxLayers = document.querySelectorAll('.parallax-layer');
const projectImgInners = document.querySelectorAll('.project-img:not(.project-img-multi) .project-img-inner');
const timeline = document.querySelector('.timeline');
const timelineProgress = document.getElementById('timelineProgress');
const timelineItems = document.querySelectorAll('.timeline-item');

let ticking = false;

function updateOnScroll() {
    const scrollY = window.scrollY;

    if (topNav) topNav.classList.toggle('scrolled', scrollY > 40);

    if (scrollProgress) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.style.width = docHeight > 0 ? `${(scrollY / docHeight) * 100}%` : '0%';
    }

    if (!reduceMotion) {
        const heroClamp = Math.min(scrollY, 900);
        parallaxLayers.forEach((layer) => {
            const speed = parseFloat(layer.dataset.speed);
            layer.style.transform = `translate3d(0, ${(heroClamp * speed).toFixed(2)}px, 0)`;
        });

        const vh = window.innerHeight;
        projectImgInners.forEach((inner) => {
            const rect = inner.parentElement.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > vh) return;
            const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
            const move = progress * 36;
            inner.style.transform = `translate3d(0, ${move.toFixed(2)}px, 0)`;
        });

        if (timeline && timelineProgress) {
            const rect = timeline.getBoundingClientRect();
            const triggerTop = vh * 0.85;
            const triggerBottom = vh * 0.35;
            const span = rect.height + (triggerTop - triggerBottom);
            const fillProgress = Math.min(Math.max((triggerTop - rect.top) / span, 0), 1);
            timelineProgress.style.height = `${(fillProgress * 100).toFixed(2)}%`;

            timelineItems.forEach((item) => {
                const dot = item.querySelector('.timeline-dot');
                const dotRect = dot.getBoundingClientRect();
                item.classList.toggle('in-view', dotRect.top < triggerBottom);
            });
        }
    }

    ticking = false;
}

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });
updateOnScroll();

// ---------- Hero photo mouse-tilt ----------
const heroPhoto = document.getElementById('heroPhoto');
const photoRing = heroPhoto ? heroPhoto.querySelector('.photo-ring') : null;

if (heroPhoto && photoRing && finePointer && !reduceMotion) {
    heroPhoto.addEventListener('mousemove', (e) => {
        const rect = heroPhoto.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        photoRing.style.transform = `rotateY(${(px * 16).toFixed(2)}deg) rotateX(${(-py * 16).toFixed(2)}deg)`;
    });
    heroPhoto.addEventListener('mouseleave', () => {
        photoRing.style.transform = '';
    });
}

// ---------- Magnetic buttons ----------
if (finePointer && !reduceMotion) {
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            btn.style.transform = `translate(${x.toFixed(2)}px, ${(y - 2).toFixed(2)}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ---------- Custom cursor ----------
if (finePointer && !reduceMotion) {
    document.body.classList.add('custom-cursor');

    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorDot) cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        if (cursorRing) cursorRing.style.transform = `translate(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .project-card, .icon-link, .skill-tag').forEach((el) => {
        el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('hover'));
    });
}

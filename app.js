// ===== LENIS SMOOTH SCROLL =====
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth follow
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.08;
    followerY += (mouseY - followerY) * 0.08;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .project-card, [data-magnetic]');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        follower.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        follower.classList.remove('hovering');
    });
});

// ===== MAGNETIC EFFECT =====
const magneticElements = document.querySelectorAll('[data-magnetic]');
magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: 'power2.out'
        });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// ===== LOADER =====
const loader = document.getElementById('loader');
const loaderBarFill = document.getElementById('loader-bar-fill');
let progress = 0;

function simulateLoading() {
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            loaderBarFill.style.width = '100%';
            setTimeout(hideLoader, 300);
        }
        loaderBarFill.style.width = progress + '%';
    }, 100);
}

function hideLoader() {
    gsap.to(loader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
            loader.style.display = 'none';
            animateHero();
        }
    });
}

window.addEventListener('load', simulateLoading);

// ===== HERO ANIMATIONS =====
function animateHero() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-tag .pixel-tag', {
        y: 20,
        opacity: 0,
        duration: 0.6,
    })
    .from('.hero-line', {
        y: '110%',
        opacity: 0,
        duration: 1,
        stagger: 0.15,
    }, '-=0.3')
    .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.6,
    }, '-=0.5')
    .from('.hero-cta > *', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
    }, '-=0.3')
    .from('.hero-scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 0.5,
    }, '-=0.2')
    .from('.hero-grid-bg', {
        opacity: 0,
        duration: 1,
    }, '-=0.5')
    .from('.nav', {
        y: -72,
        opacity: 0,
        duration: 0.6,
    }, '-=0.8');
}

// ===== NAVIGATION SCROLL =====
const nav = document.getElementById('nav');
ScrollTrigger.create({
    trigger: document.body,
    start: 'top -100',
    onEnter: () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled'),
});

// ===== MOBILE MENU =====
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== SMOOTH ANCHOR SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, { offset: -72 });
        }
    });
});

// ===== SCROLL ANIMATIONS =====

// Section tags and titles
gsap.utils.toArray('.section-tag').forEach(tag => {
    gsap.from(tag, {
        scrollTrigger: {
            trigger: tag,
            start: 'top 85%',
            toggleActions: 'play none none none',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
    });
});

// Split text animations
gsap.utils.toArray('[data-animate="split"]').forEach(el => {
    const split = new SplitType(el, { types: 'chars,words' });
    gsap.from(split.chars, {
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        y: '100%',
        opacity: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out',
    });
});

// Fade up animations
gsap.utils.toArray('[data-animate="fade-up"]').forEach(el => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
    });
});

// Project cards stagger
gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i % 2 * 0.15,
        ease: 'power3.out',
    });
});

// Parallax on hero grid
gsap.to('.hero-grid-bg', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
    },
    y: 150,
    opacity: 0,
});

// Marquee speed change on scroll
ScrollTrigger.create({
    trigger: '.marquee-section',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
        const speed = 1 + self.getVelocity() / 5000;
        gsap.to('.marquee-track', {
            animationDuration: `${20 / Math.max(0.5, Math.min(3, speed))}s`,
            duration: 0.5,
        });
    }
});

// Gallery horizontal scroll effect
const galleryTrack = document.getElementById('gallery-track');
if (galleryTrack) {
    ScrollTrigger.create({
        trigger: '.gallery-section',
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
            const vel = self.getVelocity();
            const skew = Math.max(-3, Math.min(3, vel / 1000));
            gsap.to('.gallery-item', {
                skewX: skew,
                duration: 0.3,
                ease: 'power2.out',
            });
        },
        onLeave: () => {
            gsap.to('.gallery-item', { skewX: 0, duration: 0.5 });
        },
        onLeaveBack: () => {
            gsap.to('.gallery-item', { skewX: 0, duration: 0.5 });
        },
    });
}

// Stats counter animation
gsap.utils.toArray('.stat-number').forEach(stat => {
    const text = stat.textContent;
    const num = parseInt(text);
    if (!isNaN(num)) {
        const suffix = text.replace(num.toString(), '');
        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            textContent: 0,
            duration: 1.5,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
                stat.textContent = Math.round(parseFloat(stat.textContent)) + suffix;
            }
        });
    }
});

// Skill pills stagger
gsap.utils.toArray('.skill-pill').forEach((pill, i) => {
    gsap.from(pill, {
        scrollTrigger: {
            trigger: pill.parentElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
        },
        y: 20,
        opacity: 0,
        duration: 0.4,
        delay: i * 0.05,
        ease: 'power3.out',
    });
});

// Social links stagger
gsap.utils.toArray('.social-link').forEach((link, i) => {
    gsap.from(link, {
        scrollTrigger: {
            trigger: link.parentElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
        },
        y: 20,
        opacity: 0,
        duration: 0.4,
        delay: i * 0.08,
        ease: 'power3.out',
    });
});

// Contact email reveal
gsap.from('.contact-email', {
    scrollTrigger: {
        trigger: '.contact-email',
        start: 'top 85%',
        toggleActions: 'play none none none',
    },
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
});

// ===== TILT EFFECT ON PROJECT CARDS =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
            rotateY: x * 6,
            rotateX: -y * 6,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000,
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
        });
    });
});

// ===== PIXEL GLITCH EFFECT ON HOVER =====
document.querySelectorAll('.pixel-tag').forEach(tag => {
    const originalText = tag.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';

    tag.addEventListener('mouseenter', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            tag.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iterations >= originalText.length) clearInterval(interval);
            iterations += 1 / 2;
        }, 30);
    });
});

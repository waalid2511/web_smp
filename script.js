document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation
    AOS.init({
        duration: 800,
        once: false,
        offset: 100
    });

    // 1. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 2. Sticky Navbar & Scroll Spy
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Spy (Active Link)
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // 3. Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // Lower inc to slow and higher to fast
            const inc = target / speed;

            if (count < target) {
                // Add inc to count and output in counter
                counter.innerText = Math.ceil(count + inc);
                // Call function every ms
                setTimeout(animateCounters, 20);
            } else {
                counter.innerText = target + (target >= 1000 ? '+' : '');
            }
        });
    }

    // Intersection Observer for Counters (Start when visible)
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect(); // Only animate once
            }
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }
});

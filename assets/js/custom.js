AOS.init({
    anchorPlacement: 'bottom-bottom' // Makes animations trigger from bottom of viewport
});

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    speed: 800,
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
    },
});

// Counter animation function
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Intersection Observer for triggering animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.ex-box h2');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            });
            observer.unobserve(entry.target); // Stop observing after animation
        }
    });
}, observerOptions);

// Start observing the about section
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about-bottom');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});

// Mobile Menu Toggle
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');
const servicesLink = document.querySelector('.group > a');
const servicesDropdown = document.querySelector('.group > ul');
const servicesGroup = document.querySelector('.group');

function toggleMenu() {
    hamburgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// Desktop dropdown functionality
function toggleDesktopDropdown() {
    if (window.innerWidth > 1200) {
        const isActive = servicesGroup.classList.contains('active');
        
        // Close any other open dropdowns
        document.querySelectorAll('.group.active').forEach(group => {
            if (group !== servicesGroup) {
                group.classList.remove('active');
                group.querySelector('ul').classList.remove('show');
            }
        });
        
        // Toggle current dropdown
        if (isActive) {
            servicesGroup.classList.remove('active');
            servicesDropdown.classList.remove('show');
        } else {
            servicesGroup.classList.add('active');
            servicesDropdown.classList.add('show');
        }
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth > 1200) {
        if (!servicesGroup.contains(e.target)) {
            servicesGroup.classList.remove('active');
            servicesDropdown.classList.remove('show');
        }
    }
});

// Handle mobile menu
hamburgerMenu.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// Handle services dropdown - click for desktop, click for mobile
servicesLink.addEventListener('click', (e) => {
    if (window.innerWidth > 1200) {
        e.preventDefault();
        toggleDesktopDropdown();
    } else {
        e.preventDefault();
        servicesDropdown.classList.toggle('active');
    }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a:not(.group > a)');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1200) {
            toggleMenu();
        } else {
            // Close dropdown on desktop when clicking a link
            servicesGroup.classList.remove('active');
            servicesDropdown.classList.remove('show');
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) {
        // Reset mobile menu state
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        servicesDropdown.classList.remove('active');
    } else {
        // Reset desktop dropdown state on mobile
        servicesGroup.classList.remove('active');
        servicesDropdown.classList.remove('show');
    }
});




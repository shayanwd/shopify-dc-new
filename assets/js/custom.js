    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 4,
        slidesPerView: "auto",
        spaceBetween: 30, 
        loop: true,
        centeredSlides: true,
        speed: 800,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
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

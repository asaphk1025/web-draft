document.addEventListener("DOMContentLoaded", function() {
    
    // Register the GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- DYNAMIC HEADER OFFSET ---
    const header = document.querySelector(".main-header");
    
    let headerHeight = header.offsetHeight;
    
    const setHeaderHeight = () => {
        headerHeight = header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        ScrollTrigger.refresh();
    };

    // Run it once on load
    setHeaderHeight();
    // Re-run it on resize
    window.addEventListener("resize", setHeaderHeight);

    // --- ANIMATIONS ---
    
ScrollTrigger.matchMedia({
        
        // DESKTOP
        "(min-width: 769px)": function() {
            const heroTL = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero-container", 
                    start: `top ${headerHeight}px`,      
                    end: "+=200vh",
                    scrub: true,
                    pin: ".hero-container",
                    pinSpacing: true
                }
            });
            heroTL.to(".about-title", { opacity: 0, duration: 0.1 }, 0.5);
            heroTL.to(".about-content", { opacity: 1, duration: 0.1 }, "<");
            heroTL.to(".hero-overlays", { yPercent: -50, duration: 1 }, 0); 
        },

        // MOBILE
        "(max-width: 768px)": function() {
            
            const mobileTL = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero-panel.hero-orange",
                    start: "top 20%", 
                    end: "center center",  
                    scrub: true
                }
            });
            
            mobileTL.to(".hero-orange .about-title", { opacity: 0, duration: 1 });
            mobileTL.to(".hero-orange .about-content", { opacity: 1, duration: 1 }, "<");
        }

    });

// --- IMMERSION CAROUSEL LOGIC (ARROWS) ---
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.next-arrow');
    const prevBtn = document.querySelector('.prev-arrow');
    
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Show specific slide
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        // Logic to go backwards correctly
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Attach listeners
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }

    // --- FAQ ACCORDION LOGIC ---
    const allFaqItems = document.querySelectorAll('.faq-item');
    const allFaqQuestions = document.querySelectorAll('.faq-question');

    allFaqQuestions.forEach((question, index) => {
        question.addEventListener('click', () => {
            const clickedItem = allFaqItems[index];
            const wasActive = clickedItem.classList.contains('active');

            // Close all items
            allFaqItems.forEach(item => {
                item.classList.remove('active');
            });

            // If the clicked item wasn't already active, open it
            if (!wasActive) {
                clickedItem.classList.add('active');
            }
        });
    });

});

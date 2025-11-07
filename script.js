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
        "(min-width: 769px)": function() {

            // --- HERO STICKY ANIMATION ---
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
        }
    });

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
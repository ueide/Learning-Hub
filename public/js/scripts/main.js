
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.mobile-header .icon-button[aria-label="Menu"]');
    const closeBtn = document.getElementById('closeOverlayBtn');
    const overlay = document.getElementById('mobileOverlay');
    const backToTopBtn = document.getElementById('backToTop');
    const toggleButtons = document.querySelectorAll('.circle-buttons button[data-type]');


    // Function to check if the viewport is mobile
    function isMobile() {
        return window.innerWidth < 768;
    }

    if (menuBtn && closeBtn && overlay) {
        menuBtn.addEventListener('click', () => {
            if (isMobile()) {
                overlay.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        });

        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.classList.add('no-scroll');
        });

        // Close overlay on resize to tablet/desktop
        window.addEventListener('resize', () => {
            if (!isMobile()) {
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }


    // Toggle icons functionality
    toggleButtons.forEach(button => {
        const img = button.querySelector('img');
        const type = button.dataset.type;

        button.addEventListener('click', () => {
            const isFilled = img.src.includes(`${type}-fill.svg`);
            const newIcon = isFilled 
            ? `/images/icons/${type}.svg`
            : `/images/icons/${type}-fill.svg`;

            img.src = newIcon;

            // Add animation class
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 200);
        });
    });



    // Back to top button functionality
    // Show button when scrolled down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
        backToTopBtn.style.display = 'flex';
        } else {
        backToTopBtn.style.display = 'none';
        }
    });

    // Scroll smoothly to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});



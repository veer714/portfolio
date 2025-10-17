
        // Page Navigation
        function navigateToAbout() {
            document.getElementById('home').classList.remove('active');
            document.getElementById('about').classList.add('active');
            window.scrollTo(0, 0);
        }

        function navigateToHome() {
            document.getElementById('about').classList.remove('active');
            document.getElementById('home').classList.add('active');
            window.scrollTo(0, 0);
        }

        // Custom cursor
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        // Expand cursor on hover
        const hoverElements = document.querySelectorAll('a, .scroll-indicator, .profile-image, .career-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'scale(1.5)';
                cursorDot.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'scale(1)';
                cursorDot.style.transform = 'scale(1)';
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Enhanced parallax (only for home page)
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking && document.getElementById('home').classList.contains('active')) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const gradient = document.querySelector('.gradient-bg');
                    const accent1 = document.querySelector('.gradient-accent');
                    const accent2 = document.querySelector('.gradient-accent-2');
                    
                    if (gradient) gradient.style.transform = `translateY(${scrolled * 0.5}px)`;
                    if (accent1) accent1.style.transform = `translate(${scrolled * 0.3}px, ${scrolled * -0.2}px)`;
                    if (accent2) accent2.style.transform = `translate(${scrolled * -0.2}px, ${scrolled * 0.3}px)`;
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
 
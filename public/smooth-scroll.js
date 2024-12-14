document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const scrollButtons = document.querySelectorAll('.scroll-btn');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.screen');
    let isScrolling = false;
    let currentSection = 0;

    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const currentSection = document.querySelector('.screen:not(.fade-out)');
            currentSection.classList.add('fade-out');
            
            setTimeout(() => {
                const elementPosition = element.offsetTop;
                const startPosition = main.scrollTop;
                const distance = elementPosition - startPosition;
                const duration = 1000; // 1 second
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    main.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 0.5) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
                
                setTimeout(() => {
                    currentSection.classList.remove('fade-out');
                    element.classList.remove('fade-out');
                }, 1000);
            }, 250);
        }
    }

    function updateCurrentSection() {
        const scrollPosition = main.scrollTop;
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100; // Ajuste conforme necessário
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = index;
            }
        });
    }

    function scrollToSection(index) {
        smoothScroll(`#${sections[index].id}`);
    }

    scrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = button.getAttribute('data-target');
            smoothScroll(`#${target}`);
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
        });
    });

    main.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateCurrentSection();
                sections.forEach((section, index) => {
                    if (index !== currentSection) {
                        section.classList.add('fade-out');
                    } else {
                        section.classList.remove('fade-out');
                    }
                });
                isScrolling = false;
            });
        }
        isScrolling = true;
    });

    let lastWheel = Date.now();
    main.addEventListener('wheel', (e) => {
        const now = Date.now();
        if (now - lastWheel > 1000) { // Previne múltiplos eventos de rolagem em 1 segundo
            if (e.deltaY > 0 && currentSection < sections.length - 1) {
                scrollToSection(currentSection + 1);
            } else if (e.deltaY < 0 && currentSection > 0) {
                scrollToSection(currentSection - 1);
            }
            lastWheel = now;
        }
        e.preventDefault();
    }, { passive: false });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        } else if (e.key === 'ArrowUp' && currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    });
});


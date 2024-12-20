document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('active');
    });
});

// Form submission (you can add more functionality here)
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Formulário enviado com sucesso!');
        form.reset();
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const appointmentFormContainer = document.getElementById('appointment-form-container');
    const appointmentsPanelContainer = document.getElementById('appointments-panel');

    if (appointmentFormContainer) {
        ReactDOM.render(<AppointmentForm />, appointmentFormContainer);
    }

    if (appointmentsPanelContainer) {
        ReactDOM.render(<AppointmentsPanel />, appointmentsPanelContainer);
    }

    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    };

    const handleAppointmentForm = () => {
        const form = document.getElementById('appointment-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const service = document.getElementById('service').value;

            // Aqui você pode adicionar a lógica para enviar os dados do agendamento para um servidor
            console.log('Agendamento:', { name, email, phone, date, service });
            alert('Agendamento realizado com sucesso!');
            form.reset();
        });
    };

    navSlide();
    handleAppointmentForm();
});

// Adicione os componentes React aqui
const AppointmentForm = () => {
    // Cole o conteúdo do arquivo AppointmentForm.tsx aqui
};

const AppointmentsPanel = () => {
    // Cole o conteúdo do arquivo AppointmentsPanel.tsx aqui
};


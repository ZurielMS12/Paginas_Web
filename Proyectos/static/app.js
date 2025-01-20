document.addEventListener('DOMContentLoaded', () => {
    // Menú hamburguesa
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    const flashMessages = document.getElementById('flash-messages');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Recolectar datos del formulario
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch('/send_email', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            // Mostrar mensaje de éxito o error
            showFlashMessage(data.success ? 'success' : 'error', data.message);
            
            if (data.success) {
                contactForm.reset();
            }
        } catch (error) {
            showFlashMessage('error', 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
        }
    });

    // Función para mostrar mensajes flash
    function showFlashMessage(type, message) {
        const flashMessage = document.createElement('div');
        flashMessage.className = `flash-message flash-${type}`;
        flashMessage.textContent = message;

        flashMessages.appendChild(flashMessage);

        // Remover el mensaje después de 5 segundos
        setTimeout(() => {
            flashMessage.remove();
        }, 5000);
    }
});
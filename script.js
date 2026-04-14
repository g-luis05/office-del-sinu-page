// Inicializar Iconos Lucide
lucide.createIcons();

// Smooth Scroll para navegación
function scrollToId(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Observer para Animaciones al hacer Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Registrar todos los elementos con clase "reveal"
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Lógica de Modo Oscuro
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Cargar preferencia guardada
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        
        // Guardar preferencia
        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        
        // Re-inicializar iconos si es necesario
        lucide.createIcons();
    });
}

// GRID

const section = document.querySelector('.products-grid');

setTimeout(() => {
    section.classList.add('hint');
}, 1500);


const WA_PHONE = '573015038798';
const serviceTemplate = 'Hola, vi su página web y estoy interesado en el servicio de {service}, ¿Podrían asesorarme?';

function buildWaHref(text){
    return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
}


document.querySelectorAll('a[data-ws-message]').forEach(anchor => {
    const raw = anchor.getAttribute('data-ws-message') || '';
    anchor.setAttribute('href', buildWaHref(raw));
    anchor.setAttribute('target', '_blank');
    anchor.setAttribute('rel', 'noopener noreferrer');
});


document.querySelectorAll('a[data-ws-service]').forEach(anchor => {
    const svc = anchor.getAttribute('data-ws-service') || '';
    const text = serviceTemplate.replace('{service}', svc);
    anchor.setAttribute('href', buildWaHref(text));
    anchor.setAttribute('target', '_blank');
    anchor.setAttribute('rel', 'noopener noreferrer');
});

// Animación más suave

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
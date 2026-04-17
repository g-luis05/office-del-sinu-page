// ===========================
// Inicializar Iconos Lucide
// ===========================
lucide.createIcons();

// ===========================
// Smooth Scroll — manejador global para todos los enlaces internos
// Reemplaza los onclick inline del HTML
// ===========================
function scrollToId(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const id = link.getAttribute('href').slice(1);
        if (id) {
            e.preventDefault();
            scrollToId(id);
        }
    });
});

// ===========================
// Observer para Animaciones al hacer Scroll
// ===========================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===========================
// Modo Oscuro
// ===========================
const themeToggle = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        lucide.createIcons();
    });
}

// ===========================
// Grid de productos — animación de pista
// ===========================
const productsGrid = document.querySelector('.products-grid');
if (productsGrid) {
    setTimeout(() => productsGrid.classList.add('hint'), 1500);
}

// ===========================
// WhatsApp — construcción de links
// ===========================
const WA_PHONE = '573015038798';
const SERVICE_TEMPLATE = 'Hola, vi su página web y estoy interesado en el servicio de {service}, ¿Podrían asesorarme?';

function buildWaHref(text) {
    return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
}

function applyWaLink(anchor, text) {
    anchor.setAttribute('href', buildWaHref(text));
    anchor.setAttribute('target', '_blank');
    anchor.setAttribute('rel', 'noopener noreferrer');
}

document.querySelectorAll('a[data-ws-message]').forEach(anchor => {
    const message = anchor.getAttribute('data-ws-message') || '';
    applyWaLink(anchor, message);
});

document.querySelectorAll('a[data-ws-service]').forEach(anchor => {
    const service = anchor.getAttribute('data-ws-service') || '';
    const text = SERVICE_TEMPLATE.replace('{service}', service);
    applyWaLink(anchor, text);
});

// ===========================
// Animación de entrada al cargar la página
// ===========================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
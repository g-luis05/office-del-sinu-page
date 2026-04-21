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
        if (!id) return;

        // Si es un link de "nosotros", abrir el drawer en vez de hacer scroll
        if (id === 'nosotros') {
            e.preventDefault();
            openNosotrosDrawer();
            return;
        }

        e.preventDefault();
        scrollToId(id);
    });
});

// ===========================
// Drawer "Nosotros"
// ===========================
const nosotrosDrawer  = document.getElementById('nosotros');
const nosotrosOverlay = document.getElementById('nosotros-overlay');
const nosotrosClose   = document.getElementById('nosotros-close');

function openNosotrosDrawer() {
    nosotrosDrawer.classList.add('active');
    nosotrosOverlay.classList.add('active');
    document.body.classList.add('drawer-open');
    nosotrosDrawer.removeAttribute('aria-hidden');
    // Re-inicializar iconos dentro del drawer
    lucide.createIcons();
    // Foco en el botón cerrar para accesibilidad
    setTimeout(() => nosotrosClose && nosotrosClose.focus(), 50);
}

function closeNosotrosDrawer() {
    nosotrosDrawer.classList.remove('active');
    nosotrosOverlay.classList.remove('active');
    document.body.classList.remove('drawer-open');
    nosotrosDrawer.setAttribute('aria-hidden', 'true');
}

if (nosotrosClose)   nosotrosClose.addEventListener('click', closeNosotrosDrawer);
if (nosotrosOverlay) nosotrosOverlay.addEventListener('click', closeNosotrosDrawer);

// Cerrar con Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nosotrosDrawer.classList.contains('active')) {
        closeNosotrosDrawer();
    }
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
// Menú móvil (hamburguesa)
// ===========================
const hamburger  = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMobileMenu(forceClose = false) {
    const isOpen = mobileMenu.classList.contains('open');
    if (forceClose || isOpen) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
    } else {
        mobileMenu.classList.add('open');
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
    }
}

if (hamburger) {
    hamburger.addEventListener('click', () => toggleMobileMenu());
}

// Cerrar el menú al hacer clic en cualquier enlace del menú móvil
mobileMenu && mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(true));
});

// Cerrar al hacer scroll
window.addEventListener('scroll', () => toggleMobileMenu(true), { passive: true });
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===========================
// Navbar — resaltar sección activa al hacer scroll
// ===========================
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = Array.from(navLinks)
    .map(link => document.getElementById(link.getAttribute('href').slice(1)))
    // Excluir el drawer de nosotros — no es una sección en el flujo de scroll
    .filter(el => el && el.tagName !== 'ASIDE');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('nav-active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.35 });

sections.forEach(s => navObserver.observe(s));
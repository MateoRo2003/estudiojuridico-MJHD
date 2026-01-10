// ===== HEADER OPTIMIZADO - JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const menuOverlay = document.querySelector('.menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    
    // Variables de control
    let scrollTimeout;
    let isMobileMenuOpen = false;

    // 1. Efecto scroll optimizado con debounce
    function handleScroll() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 10);
    }
    
    window.addEventListener('scroll', handleScroll);

    // 2. Controlar body scroll cuando menú está abierto
    function toggleBodyScroll(isOpen) {
        if (window.innerWidth < 992) {
            if (isOpen) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                document.body.style.height = '100%';
                isMobileMenuOpen = true;
            } else {
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.height = '';
                isMobileMenuOpen = false;
            }
        }
    }

    // 3. Detectar estado del menú hamburguesa
    navbarCollapse.addEventListener('show.bs.collapse', function() {
        toggleBodyScroll(true);
    });

    navbarCollapse.addEventListener('hide.bs.collapse', function() {
        toggleBodyScroll(false);
    });

    // 4. Cerrar menú al hacer clic en enlace (móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                // Usar Bootstrap para cerrar el menú
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
                
                // Si es un ancla, dejar que Bootstrap maneje el scroll
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    // Permitir que el navegación ocurra normalmente
                    return true;
                }
            }
        });
    });

    // 5. Cerrar menú al hacer clic en el overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    }

    // 6. Cerrar menú con botón X
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    }

    // 7. Resetear estilos del body al redimensionar
    function handleResize() {
        if (window.innerWidth >= 992) {
            // Si estamos en desktop, asegurar que body tenga estilos normales
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            isMobileMenuOpen = false;
        } else if (isMobileMenuOpen) {
            // Si estamos en móvil y el menú estaba abierto, restaurar el bloqueo
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
        }
    }
    
    window.addEventListener('resize', handleResize);

    // 8. Mejorar accesibilidad del botón hamburguesa
    navbarToggler.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // 9. Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });

    // 10. Prevenir problemas de scroll en iOS
    document.addEventListener('touchmove', function(e) {
        if (window.innerWidth < 992 && isMobileMenuOpen) {
            e.preventDefault();
        }
    }, { passive: false });

    // 11. Inicializar efecto scroll al cargar
    handleScroll();
    
    // 12. Asegurar que Bootstrap esté inicializado
    if (typeof bootstrap !== 'undefined') {
        // Inicializar el collapse de Bootstrap si no se ha hecho
        if (!bootstrap.Collapse.getInstance(navbarCollapse)) {
            new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
        }
    }
});
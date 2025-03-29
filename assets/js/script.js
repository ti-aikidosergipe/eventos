// Scripts para a página
document.addEventListener('DOMContentLoaded', function() {
    // Aqui podemos adicionar qualquer JavaScript necessário

    // Controle dos acordeões
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = header.querySelector('i');
        
        // Adiciona IDs únicos para os botões
        header.id = `tab-${item.dataset.slide || Math.random().toString(36).substr(2, 9)}`;
        
        // Função para fechar todos os painéis
        function closeAllPanels() {
            accordionItems.forEach(otherItem => {
                const otherHeader = otherItem.querySelector('.accordion-header');
                const otherContent = otherItem.querySelector('.accordion-content');
                const otherIcon = otherHeader.querySelector('i');
                
                otherHeader.setAttribute('aria-selected', 'false');
                otherHeader.setAttribute('aria-expanded', 'false');
                otherContent.hidden = true;
                otherIcon.style.transform = 'rotate(0deg)';
            });
        }
        
        // Função para abrir um painel específico
        function openPanel() {
            closeAllPanels();
            header.setAttribute('aria-selected', 'true');
            header.setAttribute('aria-expanded', 'true');
            content.hidden = false;
            icon.style.transform = 'rotate(180deg)';
            
            // Foca o primeiro elemento interativo dentro do painel
            const firstFocusable = content.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
        
        // Evento de clique
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            if (!isExpanded) {
                openPanel();
            } else {
                closeAllPanels();
            }
        });
        
        // Navegação por teclado
        header.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    openPanel();
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    const prevTab = header.parentElement.previousElementSibling?.querySelector('.accordion-header');
                    if (prevTab) {
                        prevTab.focus();
                    }
                    break;
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    const nextTab = header.parentElement.nextElementSibling?.querySelector('.accordion-header');
                    if (nextTab) {
                        nextTab.focus();
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    const firstTab = document.querySelector('.accordion-header');
                    if (firstTab) {
                        firstTab.focus();
                    }
                    break;
                case 'End':
                    e.preventDefault();
                    const lastTab = document.querySelector('.accordion-header:last-child');
                    if (lastTab) {
                        lastTab.focus();
                    }
                    break;
            }
        });
    });

    // Controle do carrossel
    const carousel = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    function updateCarousel() {
        const track = document.querySelector('.carousel-track');
        
        currentSlide = (currentSlide + 1) % slides.length;
        
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Atualiza os indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
            
            // Atualiza o aria-label para indicar qual slide está ativo
            const isActive = index === currentSlide;
            const slideNumber = index + 1;
            const teacherName = slides[index].querySelector('h4').textContent;
            indicator.setAttribute('aria-label', `Ir para slide ${slideNumber}: ${teacherName}${isActive ? ' (Atual)' : ''}`);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    // Adiciona eventos de clique aos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Autoplay do carrossel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }, 5000);

    // Efeito de sobreposição durante a rolagem
    const heroContent = document.querySelector('.hero-content');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const direction = scrollTop > lastScrollTop ? 'down' : 'up';
            
            if (direction === 'down' && scrollTop > 0) {
                heroContent.style.transform = 'translateY(-60vh)';
            } else if (direction === 'up' && scrollTop < 100) {
                heroContent.style.transform = window.innerWidth <= 480 ? 'translateY(-15vh)' : 'translateY(-20vh)';
            }
        }
        
        lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    });

    // Controle do modo de alto contraste
    const contrastToggle = document.getElementById('contrast-toggle');
    const body = document.body;

    // Verifica se há uma preferência salva
    const highContrast = localStorage.getItem('highContrast') === 'true';
    if (highContrast) {
        body.classList.add('high-contrast');
    }

    // Alterna o modo de alto contraste
    contrastToggle.addEventListener('click', () => {
        body.classList.toggle('high-contrast');
        const isHighContrast = body.classList.contains('high-contrast');
        localStorage.setItem('highContrast', isHighContrast);
        
        // Atualiza o ícone
        const icon = contrastToggle.querySelector('i');
        icon.className = isHighContrast ? 'fas fa-sun' : 'fas fa-adjust';
    });
});

// Scripts para a página
document.addEventListener('DOMContentLoaded', function() {
    // Aqui podemos adicionar qualquer JavaScript necessário

    // Controle do acordeão
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Fecha todos os outros itens
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active');
        });
    });

    // Controle do carrossel
    const carousel = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        // Atualiza os indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
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
});

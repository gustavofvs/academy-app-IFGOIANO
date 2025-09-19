/* filepath: c:\Users\PCLixo\Downloads\academy-app-IFGOIANO\js\presentation.js */
class MinimalistPresentation {
    constructor() {
        this.currentSlideIndex = 0;
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        this.progressFill = document.getElementById('progress');
        this.navigator = document.getElementById('slide-navigator');
        this.navigatorList = document.getElementById('navigator-list');
        this.isAutoplayEnabled = false;
        this.autoplayInterval = null;
        this.autoplayDelay = 10000; // 10 seconds
        
        this.init();
    }

    init() {
        this.setupNavigator();
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
        this.setupImageErrorHandling();
        this.updateUI();
        
        // Add performance monitoring
        this.trackPerformance();
    }
    
    setupNavigator() {
        this.slides.forEach((slide, index) => {
            const title = slide.dataset.title || `Slide ${index + 1}`;
            const listItem = document.createElement('li');
            listItem.className = 'navigator-item';
            listItem.innerHTML = `<span>${title}</span> <span class="slide-number">${index + 1} / ${this.totalSlides}</span>`;
            listItem.addEventListener('click', () => {
                this.goToSlide(index);
                this.toggleNavigator(false);
            });
            this.navigatorList.appendChild(listItem);
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', e => this.handleKeydown(e));
    }

    setupTouchNavigation() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', e => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Only handle horizontal swipes
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.goToSlide(this.currentSlideIndex - 1); // Swipe right = previous
                } else {
                    this.goToSlide(this.currentSlideIndex + 1); // Swipe left = next
                }
            }
        });
    }

    setupImageErrorHandling() {
        const images = document.querySelectorAll('.slide-image');
        
        images.forEach((img, index) => {
            // Add loading state
            img.style.opacity = '0.5';
            img.style.filter = 'blur(1px)';
            
            img.addEventListener('error', () => {
                console.warn(`❌ Image failed to load: ${img.src}`);
                const placeholder = this.createImagePlaceholder(img.alt, img.src);
                img.parentNode.replaceChild(placeholder, img);
            });
            
            img.addEventListener('load', () => {
                console.log(`✅ Image loaded: ${img.src}`);
                img.style.opacity = '1';
                img.style.filter = 'none';
                img.classList.add('loaded');
            });
            
            // Force reload if not loaded after 3 seconds
            setTimeout(() => {
                if (!img.complete || img.naturalHeight === 0) {
                    console.warn(`⏱️ Image timeout: ${img.src}`);
                    img.src = img.src + '?retry=' + Date.now();
                }
            }, 3000);
        });
    }

    createImagePlaceholder(altText, originalSrc) {
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        
        // Extract filename from path for better error message
        const filename = originalSrc.split('/').pop();
        
        placeholder.innerHTML = `
            <div class="placeholder-content">
                <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                </svg>
                <p><strong>${altText}</strong></p>
                <small>Arquivo: ${filename}</small>
                <small style="color: #ef4444;">Imagem não encontrada</small>
                <small style="margin-top: 0.5rem; display: block; font-size: 0.7rem;">
                    Adicione a imagem em assets/images/ e recarregue
                </small>
            </div>
        `;
        return placeholder;
    }

    toggleNavigator(forceState) {
        const isVisible = this.navigator.classList.contains('visible');
        const show = forceState !== undefined ? forceState : !isVisible;
        this.navigator.classList.toggle('visible', show);
        
        if (show) {
            this.pauseAutoplay();
        } else {
            this.resumeAutoplay();
        }
    }
    
    goToSlide(index) {
        if (index < 0 || index >= this.totalSlides || index === this.currentSlideIndex) return;

        this.slides[this.currentSlideIndex].classList.remove('active');
        this.currentSlideIndex = index;
        this.slides[this.currentSlideIndex].classList.add('active');
        
        this.updateUI();
        this.updateNavigatorActiveItem();
        
        // Track slide view
        this.trackSlideView(index);
    }

    updateNavigatorActiveItem() {
        const items = this.navigatorList.querySelectorAll('.navigator-item');
        items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentSlideIndex);
        });
    }

    updateUI() {
        const progressPercentage = ((this.currentSlideIndex + 1) / this.totalSlides) * 100;
        this.progressFill.style.width = `${progressPercentage}%`;
        
        // Update page title
        const currentSlide = this.slides[this.currentSlideIndex];
        const slideTitle = currentSlide.dataset.title;
        document.title = `Academy Neon - ${slideTitle}`;
    }
    
    handleKeydown(e) {
        const isNavigatorVisible = this.navigator.classList.contains('visible');

        switch(e.key.toLowerCase()) {
            case 'p':
                e.preventDefault();
                this.toggleNavigator();
                break;
            case 'escape':
                if (isNavigatorVisible) {
                    e.preventDefault();
                    this.toggleNavigator(false);
                }
                break;
            case 'f11':
                // Let browser handle fullscreen
                break;
            case 'home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'end':
                e.preventDefault();
                this.goToSlide(this.totalSlides - 1);
                break;
            case 'a':
                e.preventDefault();
                this.toggleAutoplay();
                break;
            default:
                if (!isNavigatorVisible) {
                    if (e.key === 'ArrowRight' || e.key === ' ') {
                        e.preventDefault();
                        this.goToSlide(this.currentSlideIndex + 1);
                    } else if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        this.goToSlide(this.currentSlideIndex - 1);
                    } else if (e.key === 'PageDown') {
                        e.preventDefault();
                        this.goToSlide(this.currentSlideIndex + 1);
                    } else if (e.key === 'PageUp') {
                        e.preventDefault();
                        this.goToSlide(this.currentSlideIndex - 1);
                    }
                }
        }
    }

    toggleAutoplay() {
        if (this.isAutoplayEnabled) {
            this.pauseAutoplay();
        } else {
            this.startAutoplay();
        }
    }

    startAutoplay() {
        this.isAutoplayEnabled = true;
        this.autoplayInterval = setInterval(() => {
            const nextIndex = (this.currentSlideIndex + 1) % this.totalSlides;
            this.goToSlide(nextIndex);
        }, this.autoplayDelay);
        
        this.showNotification('Autoplay ativado (A para desativar)');
    }

    pauseAutoplay() {
        this.isAutoplayEnabled = false;
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    resumeAutoplay() {
        if (this.isAutoplayEnabled) {
            this.startAutoplay();
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: var(--muted);
            color: var(--foreground);
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            border: 1px solid var(--border);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    trackPerformance() {
        // Track load time
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Presentation loaded in ${Math.round(loadTime)}ms`);
        });

        // Track slide transitions
        this.slideStartTime = performance.now();
    }

    trackSlideView(slideIndex) {
        const slideTitle = this.slides[slideIndex].dataset.title;
        const timeOnPreviousSlide = performance.now() - this.slideStartTime;
        
        console.log(`Viewed slide ${slideIndex + 1}: ${slideTitle} (${Math.round(timeOnPreviousSlide)}ms on previous)`);
        
        this.slideStartTime = performance.now();
    }

    // Debug method for development
    debugImages() {
        const images = document.querySelectorAll('.slide-image');
        const results = [];
        
        console.log('🔍 Academy Neon - Debug de Imagens');
        console.log('=======================================');
        
        images.forEach((img, index) => {
            const filename = img.src.split('/').pop();
            const result = {
                '#': index + 1,
                'Arquivo': filename,
                'Alt Text': img.alt,
                'Status': img.complete && img.naturalHeight !== 0 ? '✅ OK' : '❌ ERRO',
                'Dimensões': img.complete ? `${img.naturalWidth}x${img.naturalHeight}` : 'Não carregada',
                'Caminho': img.src
            };
            results.push(result);
        });
        
        console.table(results);
        
        // Quick fix suggestions
        const failedImages = results.filter(r => r.Status === '❌ ERRO');
        if (failedImages.length > 0) {
            console.log('\n🚨 Imagens com problemas:');
            failedImages.forEach(img => {
                console.log(`❌ ${img.Arquivo} - Verifique se existe em assets/images/`);
            });
            
            console.log('\n💡 Soluções:');
            console.log('1. Adicione as imagens na pasta assets/images/');
            console.log('2. Use servidor local: python -m http.server 8000');
            console.log('3. Verifique os nomes dos arquivos (case-sensitive)');
            console.log('4. Teste: debugImages() novamente após corrigir');
        } else {
            console.log('🎉 Todas as imagens estão funcionando!');
        }
        
        return results;
    }
}

// Initialize presentation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const presentation = new MinimalistPresentation();
    
    // Make debug function globally available
    window.debugImages = () => presentation.debugImages();
    window.presentation = presentation;
    
    // Initialize Lucide icons if available
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Add slide-in animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
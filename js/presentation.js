/* filepath: c:\Users\PCLixo\Downloads\academy-app-IFGOIANO\js\presentation.js */
class MinimalistPresentation {
    constructor() {
        this.currentSlideIndex = 0;
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        this.progressFill = document.getElementById('progress');
        this.navigator = document.getElementById('slide-navigator');
        this.navigatorList = document.getElementById('navigator-list');
        
        this.init();
    }

    init() {
        this.setupNavigator();
        document.addEventListener('keydown', e => this.handleKeydown(e));
        this.updateUI();
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

    toggleNavigator(forceState) {
        const isVisible = this.navigator.classList.contains('visible');
        const show = forceState !== undefined ? forceState : !isVisible;
        this.navigator.classList.toggle('visible', show);
    }
    
    goToSlide(index) {
        if (index < 0 || index >= this.totalSlides || index === this.currentSlideIndex) return;

        this.slides[this.currentSlideIndex].classList.remove('active');
        this.currentSlideIndex = index;
        this.slides[this.currentSlideIndex].classList.add('active');
        
        this.updateUI();
    }

    updateUI() {
        const progressPercentage = ((this.currentSlideIndex + 1) / this.totalSlides) * 100;
        this.progressFill.style.width = `${progressPercentage}%`;
    }
    
    handleKeydown(e) {
        const isNavigatorVisible = this.navigator.classList.contains('visible');

        if (e.key.toLowerCase() === 'p') {
            e.preventDefault();
            this.toggleNavigator();
        } else if (e.key === 'Escape' && isNavigatorVisible) {
            e.preventDefault();
            this.toggleNavigator(false);
        } else if (!isNavigatorVisible) {
            if (e.key === 'ArrowRight') {
                this.goToSlide(this.currentSlideIndex + 1);
            } else if (e.key === 'ArrowLeft') {
                this.goToSlide(this.currentSlideIndex - 1);
            }
        }
    }
}

// Initialize presentation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MinimalistPresentation();
    // Initialize Lucide icons if available
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
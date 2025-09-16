/**
 * Academy Neon Presentation App
 * Optimized for 1366x768 resolution with JSON configuration
 */

class AcademyNeonPresentation {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 0;
    this.slides = [];
    this.isTransitioning = false;
    this.modal = null;
    this.modalImage = null;
    this.modalClose = null;
    this.config = null;
    
    this.init();
  }

  async init() {
    try {
      // Show loading indicator
      this.showLoadingIndicator();
      
      await this.loadConfig();
      this.setupElements();
      this.forceLoadAllImages();
      this.applyConfig();
      this.bindEvents();
      this.setupImageModal();
      this.updatePresentation();
      this.initializeFromHash();
      
      // Hide loading indicator after a short delay
      setTimeout(() => {
        this.hideLoadingIndicator();
      }, 500);
    } catch (error) {
      console.error('Failed to initialize presentation:', error);
      this.hideLoadingIndicator();
      this.fallbackInit();
    }
  }

  showLoadingIndicator() {
    const indicator = document.getElementById('config-loading');
    if (indicator) {
      indicator.style.display = 'block';
    }
  }

  hideLoadingIndicator() {
    const indicator = document.getElementById('config-loading');
    if (indicator) {
      indicator.style.display = 'none';
    }
  }

  async loadConfig() {
    try {
      const response = await fetch('./config/config.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.config = await response.json();
      console.log('Configuration loaded successfully:', this.config);
    } catch (error) {
      console.warn('Failed to load config.json, using default configuration:', error);
      this.config = this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      site: {
        title: "Academy Neon - Apresentação",
        company: "Academy Neon",
        subtitle: "Uma nova experiência em gestão de treinos",
        authors: "Bruno e Gustavo Fernandes",
        version: "2.0.0"
      },
      design: {
        theme: "dark",
        primaryColor: "#00ffff",
        secondaryColor: "#ffff00",
        backgroundColor: "#0f0f23",
        textColor: "#ffffff",
        fontFamily: "Inter"
      },
      presentation: {
        resolution: { width: 1366, height: 768 },
        slides: []
      },
      controls: {
        keyboard: true,
        touch: true,
        navigation: true,
        progress: true,
        fullscreen: true
      }
    };
  }

  setupElements() {
    this.slides = document.querySelectorAll('.slide');
    this.totalSlides = this.slides.length;
    this.prevButton = document.getElementById('prev-slide');
    this.nextButton = document.getElementById('next-slide');
    this.currentSlideElement = document.getElementById('current-slide');
    this.totalSlidesElement = document.getElementById('total-slides');
    this.progressFill = document.getElementById('progress');
    
    // Modal elements
    this.modal = document.getElementById('image-modal');
    this.modalImage = document.getElementById('modal-image');
    this.modalClose = document.getElementById('modal-close');
    
    // Update total slides counter
    if (this.totalSlidesElement) {
      this.totalSlidesElement.textContent = this.totalSlides;
    }

    console.log(`Found ${this.totalSlides} slides`);
    
    // Apply controls configuration
    this.applyControlsConfig();
  }

  bindEvents() {
    // Navigation buttons with better event handling
    if (this.prevButton) {
      this.prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Previous button clicked');
        this.previousSlide();
      });
    }

    if (this.nextButton) {
      this.nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Next button clicked');
        this.nextSlide();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Touch/swipe support
    this.setupTouchEvents();

    // Window resize
    window.addEventListener('resize', () => this.handleResize());

    console.log('Events bound successfully');
  }

  handleKeyboard(e) {
    if (this.config?.controls?.keyboard === false) return;

    if (e.key === 'Escape') {
      if (this.modal?.classList.contains('active')) {
        this.closeImageModal();
        return;
      }
      this.exitFullscreen();
      return;
    }
    
    if (this.modal?.classList.contains('active')) return;
    if (this.isTransitioning) return;

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        console.log('Keyboard: Next slide');
        this.nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        console.log('Keyboard: Previous slide');
        this.previousSlide();
        break;
      case 'Home':
        e.preventDefault();
        console.log('Keyboard: First slide');
        this.goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        console.log('Keyboard: Last slide');
        this.goToSlide(this.totalSlides - 1);
        break;
      case 'F11':
        if (this.config?.controls?.fullscreen !== false) {
          e.preventDefault();
          this.toggleFullscreen();
        }
        break;
    }
  }

  goToSlide(slideNumber) {
    // Validate slide number
    if (slideNumber < 0 || slideNumber >= this.totalSlides) {
      console.warn(`Invalid slide number: ${slideNumber}`);
      return;
    }

    if (slideNumber === this.currentSlide) {
      console.log(`Already on slide ${slideNumber}`);
      return;
    }

    if (this.isTransitioning) {
      console.log('Transition in progress, ignoring navigation');
      return;
    }

    // Close modal if open
    if (this.modal?.classList.contains('active')) {
      this.closeImageModal();
    }

    console.log(`Transitioning from slide ${this.currentSlide} to ${slideNumber}`);
    
    this.isTransitioning = true;
    
    // Hide current slide
    if (this.slides[this.currentSlide]) {
      this.slides[this.currentSlide].classList.remove('active');
      this.slides[this.currentSlide].classList.add('prev');
    }
    
    // Update current slide number
    const previousSlide = this.currentSlide;
    this.currentSlide = slideNumber;
    
    // Show new slide after a brief delay
    setTimeout(() => {
      // Remove prev class from previous slide
      if (this.slides[previousSlide]) {
        this.slides[previousSlide].classList.remove('prev');
      }
      
      // Show new slide
      if (this.slides[this.currentSlide]) {
        this.slides[this.currentSlide].classList.add('active');
      }
      
      // Update UI
      this.updatePresentation();
      
      // Allow new transitions
      setTimeout(() => {
        this.isTransitioning = false;
        console.log(`Transition complete: now on slide ${this.currentSlide}`);
      }, 100);
    }, 50);
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.goToSlide(this.currentSlide + 1);
    } else {
      console.log('Already on last slide');
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.goToSlide(this.currentSlide - 1);
    } else {
      console.log('Already on first slide');
    }
  }

  updatePresentation() {
    // Update slide counter
    if (this.currentSlideElement) {
      this.currentSlideElement.textContent = this.currentSlide + 1;
    }
    
    // Update progress bar
    if (this.progressFill) {
      const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
      this.progressFill.style.width = `${progress}%`;
    }
    
    // Update navigation buttons
    if (this.prevButton) {
      if (this.currentSlide === 0) {
        this.prevButton.style.opacity = '0.3';
        this.prevButton.style.pointerEvents = 'none';
      } else {
        this.prevButton.style.opacity = '1';
        this.prevButton.style.pointerEvents = 'auto';
      }
    }
    
    if (this.nextButton) {
      if (this.currentSlide === this.totalSlides - 1) {
        this.nextButton.style.opacity = '0.3';
        this.nextButton.style.pointerEvents = 'none';
      } else {
        this.nextButton.style.opacity = '1';
        this.nextButton.style.pointerEvents = 'auto';
      }
    }
    
    // Update URL hash
    this.updateHash();
    
    // Dispatch event
    this.dispatchSlideChange();
  }

  // ...existing code for forceLoadAllImages, applyConfig, etc...

  forceLoadAllImages() {
    console.log('Force loading all images...');
    
    // Define all image paths
    const imagePaths = {
      'dashboard': './assets/imgs/paginainicial.png',
      'clients': './assets/imgs/listaclient.PNG',
      'register': './assets/imgs/cadastro.PNG',
      'plans': './assets/imgs/planos.PNG',
      'schedule': './assets/imgs/aulas.PNG'
    };

    // Force load main slide images
    Object.entries(imagePaths).forEach(([slideId, imagePath]) => {
      const slide = document.querySelector(`[data-slide="${slideId}"]`);
      if (slide) {
        const img = slide.querySelector('.main-image');
        if (img) {
          this.forceLoadImage(img, imagePath, slideId);
        }
      }
    });

    // Force load feature images
    const featureImages = document.querySelectorAll('.feature-image');
    const featurePaths = [
      './assets/imgs/franquias.PNG',
      './assets/imgs/notificacoes.PNG',
      './assets/imgs/login.PNG'
    ];

    featureImages.forEach((img, index) => {
      if (featurePaths[index]) {
        this.forceLoadImage(img, featurePaths[index], `feature-${index}`);
      }
    });
  }

  forceLoadImage(imgElement, imagePath, identifier) {
    console.log(`Force loading: ${imagePath} for ${identifier}`);
    
    imgElement.classList.add('loading');

    const testImg = new Image();
    
    testImg.onload = () => {
      console.log(`✅ Successfully loaded: ${imagePath} for ${identifier}`);
      imgElement.src = imagePath;
      imgElement.classList.remove('loading');
    };
    
    testImg.onerror = () => {
      console.error(`❌ Failed to load: ${imagePath} for ${identifier}`);
      
      // Try alternative extensions
      const alternatives = [
        imagePath.replace('.PNG', '.png'),
        imagePath.replace('.PNG', '.jpg'),
        imagePath.replace('.PNG', '.jpeg'),
        imagePath.replace('.png', '.PNG'),
        imagePath.replace('.png', '.jpg')
      ];
      
      this.tryAlternativeImages(imgElement, alternatives, identifier, 0);
    };
    
    testImg.src = imagePath;
  }

  tryAlternativeImages(imgElement, alternatives, identifier, index) {
    if (index >= alternatives.length) {
      console.error(`❌ All alternatives failed for ${identifier}`);
      this.createPlaceholder(imgElement, identifier);
      return;
    }

    const altPath = alternatives[index];
    console.log(`Trying alternative: ${altPath} for ${identifier}`);
    
    const testImg = new Image();
    
    testImg.onload = () => {
      console.log(`✅ Alternative loaded: ${altPath} for ${identifier}`);
      imgElement.src = altPath;
      imgElement.classList.remove('loading');
    };
    
    testImg.onerror = () => {
      this.tryAlternativeImages(imgElement, alternatives, identifier, index + 1);
    };
    
    testImg.src = altPath;
  }

  createPlaceholder(imgElement, identifier) {
    const svgPlaceholder = `data:image/svg+xml;base64,${btoa(`
      <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1a1a2e"/>
        <text x="50%" y="45%" text-anchor="middle" fill="#00ffff" font-family="Arial" font-size="24">
          Academy Neon
        </text>
        <text x="50%" y="55%" text-anchor="middle" fill="#a1a1aa" font-family="Arial" font-size="16">
          ${identifier}
        </text>
      </svg>
    `)}`;
    
    imgElement.src = svgPlaceholder;
    imgElement.classList.remove('loading');
    console.log(`Created placeholder for ${identifier}`);
  }

  applyConfig() {
    if (!this.config) return;

    document.title = this.config.site.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = `Apresentação do sistema ${this.config.site.company} - Gestão moderna de academias`;
    }

    const metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor) {
      metaAuthor.content = this.config.site.authors;
    }

    const root = document.documentElement;
    if (this.config.design) {
      root.style.setProperty('--primary-color', this.config.design.primaryColor);
      root.style.setProperty('--secondary-color', this.config.design.secondaryColor);
      root.style.setProperty('--background-color', this.config.design.backgroundColor);
      root.style.setProperty('--text-color', this.config.design.textColor);
    }

    this.updateContentFromConfig();
  }

  updateContentFromConfig() {
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle && this.config.site) {
      mainTitle.textContent = this.config.site.company;
    }

    const subtitle = document.querySelector('.subtitle');
    if (subtitle && this.config.site) {
      subtitle.textContent = this.config.site.subtitle;
    }

    const authorInfo = document.querySelector('.author-info p');
    if (authorInfo && this.config.site) {
      authorInfo.innerHTML = `Apresentado por: <strong>${this.config.site.authors}</strong>`;
    }
  }

  applyControlsConfig() {
    if (!this.config.controls) return;

    // Hide/show navigation based on config
    if (!this.config.controls.navigation) {
      const navigation = document.querySelector('.navigation');
      if (navigation) navigation.style.display = 'none';
    }

    // Hide/show progress bar based on config
    if (!this.config.controls.progress) {
      const progressBar = document.querySelector('.progress-bar');
      if (progressBar) progressBar.style.display = 'none';
    }
  }

  fallbackInit() {
    this.setupElements();
    this.forceLoadAllImages();
    this.bindEvents();
    this.setupImageModal();
    this.updatePresentation();
    this.initializeFromHash();
  }

  setupImageModal() {
    const expandableImages = document.querySelectorAll('.expandable-image');
    
    expandableImages.forEach(img => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        if (img.src && img.src !== window.location.href && !img.src.includes('data:image/svg')) {
          this.openImageModal(img.src, img.alt);
        }
      });
    });
    
    this.modalClose?.addEventListener('click', () => this.closeImageModal());
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeImageModal();
      }
    });
  }

  openImageModal(src, alt) {
    if (!this.modal || !this.modalImage) return;
    
    this.modalImage.src = src;
    this.modalImage.alt = alt;
    this.modal.classList.add('active');
    
    document.body.style.overflow = 'hidden';
    this.modalClose?.focus();
  }

  closeImageModal() {
    if (!this.modal) return;
    
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      if (this.modalImage) {
        this.modalImage.src = '';
        this.modalImage.alt = '';
      }
    }, 400);
  }

  setupTouchEvents() {
    if (this.config?.controls?.touch === false) return;

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    document.addEventListener('touchstart', (e) => {
      if (this.modal?.classList.contains('active')) return;
      
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (this.modal?.classList.contains('active')) return;
      if (this.isTransitioning) return;
      
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      const deltaX = startX - endX;
      const deltaY = startY - endY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          console.log('Touch: Next slide');
          this.nextSlide();
        } else {
          console.log('Touch: Previous slide');
          this.previousSlide();
        }
      }
    }, { passive: true });
  }

  updateHash() {
    const slideId = this.slides[this.currentSlide].dataset.slide;
    history.replaceState(null, null, `#${slideId}`);
  }

  initializeFromHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const slideIndex = Array.from(this.slides).findIndex(slide => slide.dataset.slide === hash);
      if (slideIndex !== -1) {
        this.goToSlide(slideIndex);
      }
    }
  }

  dispatchSlideChange() {
    const event = new CustomEvent('slidechange', {
      detail: {
        currentSlide: this.currentSlide,
        totalSlides: this.totalSlides,
        slideId: this.slides[this.currentSlide].dataset.slide,
        config: this.config
      }
    });
    document.dispatchEvent(event);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.() ||
      document.documentElement.webkitRequestFullscreen?.() ||
      document.documentElement.msRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() ||
      document.webkitExitFullscreen?.() ||
      document.msExitFullscreen?.();
    }
  }

  exitFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.() ||
      document.webkitExitFullscreen?.() ||
      document.msExitFullscreen?.();
    }
  }

  handleResize() {
    const container = document.getElementById('presentation-container');
    if (container && window.innerWidth < 1366) {
      const scale = window.innerWidth / 1366;
      container.style.transform = `scale(${scale})`;
    } else if (container) {
      container.style.transform = 'none';
    }
  }

  // Debug method
  debugSlides() {
    console.log('=== DEBUG: Slides Status ===');
    console.log(`Current slide: ${this.currentSlide}`);
    console.log(`Total slides: ${this.totalSlides}`);
    console.log(`Is transitioning: ${this.isTransitioning}`);
    
    this.slides.forEach((slide, index) => {
      console.log(`Slide ${index}:`, {
        id: slide.dataset.slide,
        active: slide.classList.contains('active'),
        prev: slide.classList.contains('prev'),
        classes: slide.className
      });
    });
  }

  debugImages() {
    console.log('=== DEBUG: All Images Status ===');
    const allImages = document.querySelectorAll('img');
    allImages.forEach((img, index) => {
      console.log(`Image ${index}:`, {
        src: img.src,
        alt: img.alt,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        classes: img.className
      });
    });
  }

  // Public API
  getConfig() {
    return this.config;
  }

  getCurrentSlide() {
    return this.currentSlide;
  }

  getTotalSlides() {
    return this.totalSlides;
  }

  restart() {
    this.goToSlide(0);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Initializing Academy Neon Presentation...');
  
  window.presentation = new AcademyNeonPresentation();
  
  // Add debug functions to global scope
  window.debugSlides = () => {
    if (window.presentation) {
      window.presentation.debugSlides();
    }
  };
  
  window.debugImages = () => {
    if (window.presentation) {
      window.presentation.debugImages();
    }
  };
  
  // Test navigation
  window.testNavigation = () => {
    console.log('Testing navigation...');
    setTimeout(() => window.presentation.nextSlide(), 1000);
    setTimeout(() => window.presentation.nextSlide(), 2000);
    setTimeout(() => window.presentation.previousSlide(), 3000);
  };
  
  console.log(`
Academy Neon Presentation Initialized!

Controls:
→ / Space / PageDown: Next slide
← / PageUp: Previous slide
Home: First slide
End: Last slide
Click images: Expand view
F11: Toggle fullscreen
Escape: Exit fullscreen / Close image

Debug commands:
debugSlides() - Check slides status
debugImages() - Check images status
testNavigation() - Test automatic navigation
  `);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AcademyNeonPresentation;
}

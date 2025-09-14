// Timer functionality
class CountdownTimer {
    constructor() {
        this.endTime = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days from now
        this.init();
    }

    init() {
        this.updateTimer();
        setInterval(() => this.updateTimer(), 1000);
        
        // Debug: check if final timer elements exist
        console.log('Final timer elements check:');
        console.log('final-days:', document.getElementById('final-days'));
        console.log('final-hours:', document.getElementById('final-hours'));
        console.log('final-minutes:', document.getElementById('final-minutes'));
        console.log('final-seconds:', document.getElementById('final-seconds'));
    }

    updateTimer() {
        const now = new Date().getTime();
        const timeLeft = this.endTime - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Update hero timer
            const heroDays = document.getElementById('days');
            const heroHours = document.getElementById('hours');
            const heroMinutes = document.getElementById('minutes');
            const heroSeconds = document.getElementById('seconds');
            
            if (heroDays) heroDays.textContent = days.toString().padStart(2, '0');
            if (heroHours) heroHours.textContent = hours.toString().padStart(2, '0');
            if (heroMinutes) heroMinutes.textContent = minutes.toString().padStart(2, '0');
            if (heroSeconds) heroSeconds.textContent = seconds.toString().padStart(2, '0');

            // Update final timer
            const finalDays = document.getElementById('final-days');
            const finalHours = document.getElementById('final-hours');
            const finalMinutes = document.getElementById('final-minutes');
            const finalSeconds = document.getElementById('final-seconds');
            
            if (finalDays) finalDays.textContent = days.toString().padStart(2, '0');
            if (finalHours) finalHours.textContent = hours.toString().padStart(2, '0');
            if (finalMinutes) finalMinutes.textContent = minutes.toString().padStart(2, '0');
            if (finalSeconds) finalSeconds.textContent = seconds.toString().padStart(2, '0');

            // Add special effects for last 24 hours
            if (timeLeft < 24 * 60 * 60 * 1000) {
                this.addUrgencyEffects();
            }
        } else {
            // Timer expired
            const elements = ['days', 'hours', 'minutes', 'seconds', 'final-days', 'final-hours', 'final-minutes', 'final-seconds'];
            elements.forEach(id => {
                const element = document.getElementById(id);
                if (element) element.textContent = '00';
            });
        }
    }

    addUrgencyEffects() {
        const timers = document.querySelectorAll('.timer');
        const timeLeft = this.endTime - new Date().getTime();
        
        timers.forEach(timer => {
            // Last 1 hour - pulsing effect
            if (timeLeft < 60 * 60 * 1000) {
                timer.style.animation = 'pulse 1s infinite';
            }
            
            // Last 10 minutes - red border
            if (timeLeft < 10 * 60 * 1000) {
                timer.style.border = '2px solid #E53E3E';
            }
        });
    }
}

// Testimonials Slider
class TestimonialsSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-item');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        
        this.showSlide(0);
        this.setupEventListeners();
        this.startAutoSlide();
    }

    setupEventListeners() {
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showSlide(index));
        });
    }

    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }
        
        this.currentSlide = index;
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }

    startAutoSlide() {
        setInterval(() => {
            this.nextSlide();
        }, 8000); // Change slide every 8 seconds
    }
}

// FAQ Accordion
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggleItem(item));
        });
    }

    toggleItem(item) {
        const isActive = item.classList.contains('active');
        
        // Close all items
        this.faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// Spots Counter
class SpotsCounter {
    constructor() {
        this.spotsElement = document.getElementById('spots-left');
        this.currentSpots = 25;
        this.init();
    }

    init() {
        if (this.spotsElement) {
            this.updateSpots();
            // Decrease spots every 10 minutes
            setInterval(() => this.decreaseSpots(), 10 * 60 * 1000);
        }
    }

    updateSpots() {
        if (this.spotsElement) {
            this.spotsElement.textContent = this.currentSpots;
        }
    }

    decreaseSpots() {
        if (this.currentSpots > 1) {
            this.currentSpots--;
            this.updateSpots();
        }
    }
}

// Initialize timer when page loads
document.addEventListener('DOMContentLoaded', function() {
    new CountdownTimer();
    new TestimonialsSlider();
    new FAQAccordion();
    new SpotsCounter();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

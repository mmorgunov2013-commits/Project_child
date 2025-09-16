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

// YooMoney Payment Integration
class YooMoneyPayment {
    constructor() {
        // Конфигурация ЮMoney - ЗАМЕНИТЕ НА ВАШИ ДАННЫЕ
        this.config = {
            receiver: '410011443641783', // Ваш номер кошелька ЮMoney
            formcomment: 'Методика "Точка опоры" - профориентация',
            shortDest: 'Методика "Точка опоры"',
            sum: 990, // Сумма в рублях
            quickpayForm: 'donate',
            paymentType: 'AC', // AC - с банковской карты (по умолчанию)
            targets: 'Оплата методики профориентации "Точка опоры"',
            successURL: window.location.origin + '/success.html' // URL для перенаправления после успешной оплаты
        };
        this.init();
    }

    init() {
        this.setupPaymentButtons();
        this.createPaymentModal();
    }

    setupPaymentButtons() {
        // Находим все CTA кнопки и добавляем обработчики
        const ctaButtons = document.querySelectorAll('.cta-button, .hero-cta, .final-cta-button');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPaymentModal();
            });
        });
    }

    createPaymentModal() {
        // Создаем модальное окно для оплаты
        const modalHTML = `
            <div id="payment-modal" class="payment-modal">
                <div class="payment-modal-content">
                    <div class="payment-modal-header">
                        <h3>Оплата методики "Точка опоры"</h3>
                        <span class="payment-modal-close">&times;</span>
                    </div>
                    <div class="payment-modal-body">
                        <div class="payment-info">
                            <div class="payment-item">
                                <span class="payment-label">Товар:</span>
                                <span class="payment-value">Методика "Точка опоры"</span>
                            </div>
                            <div class="payment-item">
                                <span class="payment-label">Цена:</span>
                                <span class="payment-value">
                                    <span class="old-price">1990 руб.</span>
                                    <span class="new-price">990 руб.</span>
                                </span>
                            </div>
                            <div class="payment-item">
                                <span class="payment-label">Скидка:</span>
                                <span class="payment-value discount">50%</span>
                            </div>
                        </div>
                        
                        <form id="payment-form" method="POST" action="https://yoomoney.ru/quickpay/confirm.xml" target="_blank">
                            <input type="hidden" name="receiver" value="${this.config.receiver}">
                            <input type="hidden" name="formcomment" value="${this.config.formcomment}">
                            <input type="hidden" name="short-dest" value="${this.config.shortDest}">
                            <input type="hidden" name="sum" value="${this.config.sum}" data-type="number">
                            <input type="hidden" name="label" value="tochka_opory_${Date.now()}">
                            <input type="hidden" name="quickpay-form" value="${this.config.quickpayForm}">
                            <input type="hidden" name="targets" value="${this.config.targets}">
                            <input type="hidden" name="paymentType" value="${this.config.paymentType}">
                            <input type="hidden" name="successURL" value="${this.config.successURL}">
                            
                            <div class="email-section">
                                <label for="customer-email" class="email-label">
                                    <span class="email-icon">📧</span>
                                    Email для отправки чека и материалов
                                </label>
                                <input type="email" id="customer-email" name="customer-email" class="email-input" 
                                       placeholder="ваш@email.com" required>
                                <div class="email-note">
                                    На этот email мы отправим чек об оплате и ссылки для доступа к методике
                                </div>
                            </div>
                            
                            <div class="payment-actions">
                                <button type="button" class="payment-cancel-btn">Отмена</button>
                                <button type="submit" class="payment-confirm-btn">Оплатить 990 руб.</button>
                            </div>
                        </form>
                        
                        <div class="payment-guarantee">
                            <p>✅ Гарантия возврата средств в течение 14 дней</p>
                            <p>🔒 Безопасная оплата через ЮMoney</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Добавляем модальное окно в DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Добавляем обработчики для модального окна
        this.setupModalHandlers();
    }

    setupModalHandlers() {
        const modal = document.getElementById('payment-modal');
        const closeBtn = modal.querySelector('.payment-modal-close');
        const cancelBtn = modal.querySelector('.payment-cancel-btn');
        const form = document.getElementById('payment-form');

        // Закрытие модального окна
        closeBtn.addEventListener('click', () => this.hidePaymentModal());
        cancelBtn.addEventListener('click', () => this.hidePaymentModal());
        
        // Закрытие по клику вне модального окна
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hidePaymentModal();
            }
        });

        // Обработка отправки формы
        form.addEventListener('submit', (e) => {
            this.handlePaymentSubmit(e);
        });

        // Способ оплаты теперь фиксированный - банковская карта
    }

    showPaymentModal() {
        const modal = document.getElementById('payment-modal');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Восстанавливаем email из localStorage если есть
        const savedEmail = localStorage.getItem('customer_email');
        if (savedEmail) {
            const emailInput = document.getElementById('customer-email');
            if (emailInput) {
                emailInput.value = savedEmail;
            }
        }
        
        // Анимация появления
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    hidePaymentModal() {
        const modal = document.getElementById('payment-modal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Способ оплаты теперь фиксированный - банковская карта

    handlePaymentSubmit(e) {
        e.preventDefault();
        
        // Получаем email
        const emailInput = document.getElementById('customer-email');
        const email = emailInput.value.trim();
        
        // Валидация email
        if (!this.validateEmail(email)) {
            this.showPaymentNotification('Пожалуйста, введите корректный email адрес', 'error');
            emailInput.focus();
            return;
        }
        
        // Добавляем уникальный идентификатор заказа
        const labelInput = document.querySelector('input[name="label"]');
        if (labelInput) {
            labelInput.value = `tochka_opory_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }

        // Сохраняем email в localStorage для последующего использования
        localStorage.setItem('customer_email', email);
        localStorage.setItem('order_id', labelInput.value);
        
        // Отправляем аналитику (если подключена)
        this.trackPaymentAttempt(email);
        
        // Показываем уведомление
        this.showPaymentNotification('Перенаправление на страницу оплаты...');
        
        // Отправляем форму
        setTimeout(() => {
            e.target.submit();
        }, 1000);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    trackPaymentAttempt(email) {
        // Здесь можно добавить отправку данных в аналитику
        console.log('Payment attempt tracked:', {
            product: 'Точка опоры',
            price: 990,
            email: email,
            timestamp: new Date().toISOString()
        });
        
        // Можно отправить данные на ваш сервер для обработки
        // fetch('/api/track-payment', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         email: email,
        //         product: 'Точка опоры',
        //         price: 990,
        //         timestamp: new Date().toISOString()
        //     })
        // });
    }

    // Функция для обработки успешного платежа
    handleSuccessfulPayment() {
        const email = localStorage.getItem('customer_email');
        const orderId = localStorage.getItem('order_id');
        
        if (email && orderId) {
            // Показываем уведомление об успешной оплате
            this.showPaymentNotification('Оплата прошла успешно! Материалы отправлены на ваш email.', 'success');
            
            // Отправляем данные о успешной оплате на сервер
            this.sendPaymentConfirmation(email, orderId);
            
            // Очищаем localStorage
            localStorage.removeItem('customer_email');
            localStorage.removeItem('order_id');
        }
    }

    // Функция для отправки подтверждения оплаты на сервер
    sendPaymentConfirmation(email, orderId) {
        console.log('Payment confirmed:', {
            email: email,
            orderId: orderId,
            product: 'Точка опоры',
            price: 990,
            timestamp: new Date().toISOString()
        });
        
        // Здесь можно отправить данные на ваш сервер для отправки материалов
        // fetch('/api/send-materials', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         email: email,
        //         orderId: orderId,
        //         product: 'Точка опоры',
        //         price: 990
        //     })
        // });
    }

    showPaymentNotification(message, type = 'success') {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = `payment-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Убираем уведомление через 3 секунды
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize timer when page loads
document.addEventListener('DOMContentLoaded', function() {
    new CountdownTimer();
    new TestimonialsSlider();
    new FAQAccordion();
    new SpotsCounter();
    new YooMoneyPayment(); // Инициализируем платежную систему
    
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

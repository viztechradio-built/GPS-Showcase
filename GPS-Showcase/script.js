// GPS-Showcase MVP - JavaScript Functionality

class GPSShowcase {
    constructor() {
        this.currentPage = 'landing';
        this.questionnaireData = {};
        this.currentQuestionIndex = 0;
        this.totalQuestions = 6;
        this.restaurants = [];
        this.selectedRestaurant = null;
        this.currentRestaurantIndex = 0;
        this.clockInterval = null;
        this.settings = {
            radiusMode: false,
            aiVoiceCommand: true,
            aiRecommendations: true,
            lightMode: false,
            vibeHigh: false,
            vibeMid: false,
            vibeLow: false
        };
        
        this.questions = [
            {
                id: 'restaurantType',
                title: 'What type of restaurant are you?',
                options: ['Fast Casual', 'Fine Dining', 'Casual Dining', 'Ethnic Cuisine', 'Food Trucks', 'Night Clubs'],
                type: 'multiple-choice'
            },
            {
                id: 'targetAudience',
                title: 'Who\'s your target audience?',
                options: ['Community', 'Urban', 'Upscale'],
                type: 'multiple-choice'
            },
            {
                id: 'performanceTracking',
                title: 'Would you be interested in tracking your performance?',
                options: ['YES', 'NO'],
                type: 'yes-no'
            },
            {
                id: 'billboardFeature',
                title: 'Would you be interested in our billboard feature?',
                options: ['YES', 'NO'],
                type: 'yes-no'
            },
            {
                id: 'commercialService',
                title: 'Would you be interested in our commercial service templates?',
                options: ['YES', 'NO'],
                type: 'yes-no'
            },
            {
                id: 'newsletter',
                title: 'Do you accept our MVP feature updates via newsletter?',
                options: ['YES', 'NO'],
                type: 'yes-no'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadSampleData();
        this.showPage('landing');
    }
    
    setupEventListeners() {
        // Landing page events
        const createAccountForm = document.getElementById('createAccountForm');
        if (createAccountForm) {
            createAccountForm.addEventListener('submit', (e) => this.handleCreateAccount(e));
        }
        
        const startQuestionnaireBtn = document.getElementById('startQuestionnaire');
        if (startQuestionnaireBtn) {
            startQuestionnaireBtn.addEventListener('click', () => this.startQuestionnaire());
        }
        
        // Home page events
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }
        
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        if (hamburgerMenu) {
            hamburgerMenu.addEventListener('click', () => this.toggleSettings());
        }
        
        const liveFeedBtn = document.getElementById('liveFeedBtn');
        if (liveFeedBtn) {
            liveFeedBtn.addEventListener('click', () => this.toggleLiveFeed());
        }
        
        const gpsShowcaseBtn = document.getElementById('gpsShowcaseBtn');
        if (gpsShowcaseBtn) {
            gpsShowcaseBtn.addEventListener('click', () => this.activateGPSShowcase());
        }
        
        // Toggle buttons
        const favoritesToggle = document.getElementById('favoritesToggle');
        if (favoritesToggle) {
            favoritesToggle.addEventListener('click', () => this.toggleView('favorites'));
        }
        
        const allToggle = document.getElementById('allToggle');
        if (allToggle) {
            allToggle.addEventListener('click', () => this.toggleView('all'));
        }
        
        // Category buttons
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => this.selectCategory(btn));
        });
        
        // AI Command Bar
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.handleSearch());
        }
        
        const aiCommandInput = document.getElementById('aiCommandInput');
        if (aiCommandInput) {
            aiCommandInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleSearch();
            });
        }
        
        // Settings toggles
        this.setupSettingsToggles();
        
        // Thank you page
        const goToHomeBtn = document.getElementById('goToHome');
        if (goToHomeBtn) {
            goToHomeBtn.addEventListener('click', () => this.goToHome());
        }
    }
    
    setupSettingsToggles() {
        const settingsToggles = [
            'radiusToggle', 'aiVoiceToggle', 'aiRecommendToggle',
            'lightModeToggle', 'vibeHighToggle', 'vibeMidToggle', 'vibeLowToggle'
        ];
        
        settingsToggles.forEach(toggleId => {
            const toggle = document.getElementById(toggleId);
            if (toggle) {
                toggle.addEventListener('change', (e) => this.handleSettingChange(toggleId, e.target.checked));
            }
        });
    }
    
    handleSettingChange(settingId, value) {
        const settingMap = {
            'radiusToggle': 'radiusMode',
            'aiVoiceToggle': 'aiVoiceCommand',
            'aiRecommendToggle': 'aiRecommendations',
            'lightModeToggle': 'lightMode',
            'vibeHighToggle': 'vibeHigh',
            'vibeMidToggle': 'vibeMid',
            'vibeLowToggle': 'vibeLow'
        };
        
        const settingKey = settingMap[settingId];
        if (settingKey) {
            this.settings[settingKey] = value;
            console.log(`Setting ${settingKey} changed to:`, value);
            
            // Apply light mode if toggled
            if (settingKey === 'lightMode') {
                this.applyLightMode(value);
            }
        }
    }
    
    applyLightMode(enabled) {
        if (enabled) {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    }
    
    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        const targetPage = document.getElementById(pageId + 'Page');
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
        }
    }
    
    handleCreateAccount(e) {
        e.preventDefault();
        
        const formData = {
            businessName: document.getElementById('businessName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value
        };
        
        // Validation
        if (formData.password !== formData.confirmPassword) {
            this.showNotification('Passwords do not match!', 'error');
            return;
        }
        
        // Store account data (in real app, this would be sent to server)
        localStorage.setItem('gpsShowcaseAccount', JSON.stringify(formData));
        
        this.showNotification('Account created successfully!', 'success');
        
        // Start questionnaire after a short delay
        setTimeout(() => this.startQuestionnaire(), 1500);
    }
    
    startQuestionnaire() {
        this.currentQuestionIndex = 0;
        this.questionnaireData = {};
        this.showPage('questionnaire');
        this.displayQuestion();
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        const questionContainer = document.getElementById('questionContainer');
        const questionTitle = document.getElementById('questionTitle');
        const progressFill = document.getElementById('progressFill');
        
        // Update progress
        const progress = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
        progressFill.style.width = progress + '%';
        
        // Update title
        questionTitle.textContent = question.title;
        
        // Create question HTML
        let questionHTML = `
            <div class="question-title">${question.title}</div>
            <div class="question-options">
        `;
        
        question.options.forEach(option => {
            questionHTML += `
                <button class="option-button" data-option="${option}">
                    ${option}
                </button>
            `;
        });
        
        questionHTML += `
            </div>
            <div class="question-navigation">
                <button class="secondary-button" onclick="app.previousQuestion()" ${this.currentQuestionIndex === 0 ? 'style="visibility: hidden;"' : ''}>
                    Back
                </button>
                <button class="neon-button continue-btn" onclick="app.continueQuestionnaire()" disabled>
                    Continue
                </button>
            </div>
        `;
        
        questionContainer.innerHTML = questionHTML;
        
        // Add event listeners to options
        const optionButtons = questionContainer.querySelectorAll('.option-button');
        optionButtons.forEach(btn => {
            btn.addEventListener('click', () => this.selectOption(btn));
        });
        
        // Fade in animation
        questionContainer.classList.add('fade-in');
    }
    
    selectOption(button) {
        // Remove previous selection
        const container = button.closest('.question-container');
        container.querySelectorAll('.option-button').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Add selection to clicked button
        button.classList.add('selected');
        
        // Enable continue button
        const continueBtn = container.querySelector('.continue-btn');
        if (continueBtn) {
            continueBtn.disabled = false;
        }
    }
    
    continueQuestionnaire() {
        const selectedOption = document.querySelector('.option-button.selected');
        if (!selectedOption) {
            this.showNotification('Please select an option', 'error');
            return;
        }
        
        // Store answer
        const question = this.questions[this.currentQuestionIndex];
        this.questionnaireData[question.id] = selectedOption.dataset.option;
        
        // Move to next question or finish
        if (this.currentQuestionIndex < this.totalQuestions - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.finishQuestionnaire();
        }
    }
    
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }
    
    finishQuestionnaire() {
        // Store questionnaire data
        localStorage.setItem('gpsShowcaseQuestionnaire', JSON.stringify(this.questionnaireData));
        
        // Show thank you page
        this.showPage('thankYou');
    }
    
    goToHome() {
        this.showPage('home');
        this.initializeHome();
    }
    
    initializeHome() {
        this.currentRestaurantIndex = 0;
        this.renderHero();
        this.renderCarousel();
        this.startClock();
        this.setupHomeEventListeners();
    }

    startClock() {
        const el = document.querySelector('.hp-time');
        if (!el) return;
        const update = () => {
            const now = new Date();
            el.textContent = now.toLocaleTimeString('en-US', {
                hour: 'numeric', minute: '2-digit', hour12: true
            });
        };
        update();
        if (this.clockInterval) clearInterval(this.clockInterval);
        this.clockInterval = setInterval(update, 10000);
    }

    renderHero() {
        const r = this.restaurants[this.currentRestaurantIndex];
        if (!r) return;
        const photo = document.getElementById('hpHeroPhoto');
        const name = document.getElementById('hpHeroName');
        const addr = document.getElementById('hpHeroAddress');
        if (photo) photo.style.background = r.photoGradient;
        if (name) name.textContent = r.name;
        if (addr) addr.textContent = r.address;
    }

    renderCarousel(list) {
        const track = document.getElementById('hpCarouselTrack');
        if (!track) return;
        const data = list || this.restaurants;
        track.innerHTML = '';
        data.forEach((r, i) => {
            const card = document.createElement('div');
            card.className = 'hp-carousel-card' + (i === this.currentRestaurantIndex ? ' active' : '');
            card.dataset.index = i;
            const stars = '★'.repeat(Math.floor(r.rating)) + (r.rating % 1 >= 0.5 ? '½' : '');
            card.innerHTML = `
                <div class="hp-card-photo" style="background:${r.photoGradient}"></div>
                <div class="hp-card-body">
                    <div class="hp-card-name">${r.name}</div>
                    <div class="hp-card-rating">${stars}<span class="hp-card-reviews">(${r.reviewCount})</span></div>
                </div>
            `;
            card.addEventListener('click', () => {
                this.currentRestaurantIndex = this.restaurants.indexOf(r);
                this.renderHero();
                track.querySelectorAll('.hp-carousel-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
            track.appendChild(card);
        });
    }

    renderCarouselFiltered(list) {
        this.renderCarousel(list);
    }

    setupHomeEventListeners() {
        // Media control buttons
        document.querySelectorAll('.hp-ctrl-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const dir = btn.dataset.dir;
                const len = this.restaurants.length;
                if (dir === 'prev') {
                    this.currentRestaurantIndex = (this.currentRestaurantIndex - 1 + len) % len;
                } else if (dir === 'next') {
                    this.currentRestaurantIndex = (this.currentRestaurantIndex + 1) % len;
                } else if (dir === 'forward') {
                    this.currentRestaurantIndex = (this.currentRestaurantIndex + 2) % len;
                }
                this.renderHero();
                this.renderCarousel();
            });
        });

        // Sidebar nav clicks
        document.querySelectorAll('.hp-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.handleNavSelection(section);
                document.querySelectorAll('.hp-nav-item').forEach(n => n.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Action buttons
        document.querySelectorAll('.hp-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                const r = this.restaurants[this.currentRestaurantIndex];
                if (action === 'favourite') {
                    this.showNotification(`Added "${r.name}" to Favourites`, 'success');
                } else if (action === 'reservation') {
                    this.showNotification(`Opening reservation for "${r.name}"`, 'info');
                } else {
                    this.showNotification(`Routing to "${r.name}"`, 'info');
                }
            });
        });
    }

    handleNavSelection(section) {
        const titleEl = document.querySelector('.hp-section-title');

        if (section === 'showcase' || section === 'restaurants' || section === 'favourite-all' || section === 'playlist') {
            if (titleEl) {
                const labels = {
                    'showcase': 'Showcase',
                    'restaurants': 'Restaurants',
                    'favourite-all': 'Favourite All',
                    'playlist': 'Playlist'
                };
                titleEl.textContent = labels[section] || 'Restaurants';
            }
            this.currentRestaurantIndex = 0;
            this.renderHero();
            this.renderCarousel();
            return;
        }

        // Category filter
        const filtered = this.restaurants.filter(r => r.category === section);
        if (filtered.length > 0) {
            this.currentRestaurantIndex = this.restaurants.indexOf(filtered[0]);
            this.renderHero();
            this.renderCarouselFiltered(filtered);
        } else {
            this.showNotification('No restaurants in this category', 'info');
        }

        if (titleEl) {
            titleEl.textContent = section.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#00ff88' : '#D4AF37'};
            color: #000;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    loadSampleData() {
        this.restaurants = [
            {
                id: 1,
                name: 'Neon Bistro',
                category: 'fast-casual',
                description: 'A modern fast-casual restaurant serving innovative fusion cuisine with a neon-inspired atmosphere.',
                address: '1501 Pike Place, Seattle, WA 98101',
                status: 'green',
                hours: 'Open until 10 PM',
                rating: 4.5,
                reviewCount: 328,
                photoGradient: 'linear-gradient(135deg, #1a3a2a 0%, #0d2818 50%, #1a4030 100%)'
            },
            {
                id: 2,
                name: 'Azure Fine Dining',
                category: 'fine-dining',
                description: 'An exquisite fine dining experience featuring artisanal cuisine prepared with the finest ingredients.',
                address: '2010 4th Ave, Seattle, WA 98121',
                status: 'yellow',
                hours: 'Open until 11 PM',
                rating: 4.8,
                reviewCount: 512,
                photoGradient: 'linear-gradient(135deg, #2a1a3a 0%, #18102a 50%, #301a40 100%)'
            },
            {
                id: 3,
                name: 'Urban Kitchen',
                category: 'casual-dining',
                description: 'A cozy casual dining spot offering comfort food with a modern twist.',
                address: '400 Broad St, Seattle, WA 98109',
                status: 'green',
                hours: 'Open until 9 PM',
                rating: 4.2,
                reviewCount: 215,
                photoGradient: 'linear-gradient(135deg, #3a2a1a 0%, #2a1a0d 50%, #403018 100%)'
            },
            {
                id: 4,
                name: 'Spice Route',
                category: 'ethnic-cuisine',
                description: 'Authentic ethnic cuisine bringing the flavors of the world to your plate.',
                address: '608 1st Ave, Seattle, WA 98104',
                status: 'red',
                hours: 'Closed - Opens at 11 AM',
                rating: 4.6,
                reviewCount: 441,
                photoGradient: 'linear-gradient(135deg, #3a1a1a 0%, #2a100d 50%, #401818 100%)'
            },
            {
                id: 5,
                name: 'Street Eats Express',
                category: 'food-trucks',
                description: 'Gourmet food truck experience with creative street food offerings.',
                address: '1200 Western Ave, Seattle, WA 98101',
                status: 'green',
                hours: 'Open until 8 PM',
                rating: 4.3,
                reviewCount: 189,
                photoGradient: 'linear-gradient(135deg, #1a2a3a 0%, #0d1828 50%, #182a40 100%)'
            },
            {
                id: 6,
                name: 'Velocity Lounge',
                category: 'fine-dining',
                description: 'Premium destination with expert mixologists and refined cuisine.',
                address: '88 Yesler Way, Seattle, WA 98104',
                status: 'yellow',
                hours: 'Open until 2 AM',
                rating: 4.4,
                reviewCount: 376,
                photoGradient: 'linear-gradient(135deg, #1a1a3a 0%, #10102a 50%, #1a1840 100%)'
            }
        ];
    }
    
    displayRestaurants() {
        // Legacy — now handled by renderHero + renderCarousel
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new GPSShowcase();
});

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
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
document.head.appendChild(notificationStyles);
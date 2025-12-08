// GPS-Showcase MVP - JavaScript Functionality (Production Ready)

class GPSShowcase {
    constructor() {
        this.currentPage = 'landing';
        this.questionnaireData = {};
        this.currentQuestionIndex = 0;
        this.totalQuestions = 6;
        this.restaurants = [];
        this.selectedRestaurant = null;
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
    
    // Utility: Sanitize user input
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
    
    // Utility: Validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Utility: Validate phone
    validatePhone(phone) {
        const re = /^[\d\s\-\+\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }
    
    // Utility: Validate password strength
    validatePassword(password) {
        return password.length >= 8;
    }
    
    // Utility: Safe localStorage operations
    safeLocalStorage = {
        setItem: (key, value) => {
            try {
                localStorage.setItem(key, value);
                return true;
            } catch (e) {
                this.showNotification('Storage unavailable. Please enable cookies.', 'error');
                return false;
            }
        },
        getItem: (key) => {
            try {
                return localStorage.getItem(key);
            } catch (e) {
                return null;
            }
        },
        removeItem: (key) => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                return false;
            }
        }
    };
    
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
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC to close settings
            if (e.key === 'Escape') {
                const settingsDropdown = document.getElementById('settingsDropdown');
                if (settingsDropdown && settingsDropdown.classList.contains('active')) {
                    this.toggleSettings();
                }
            }
        });
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
            
            // Apply light mode if toggled
            if (settingKey === 'lightMode') {
                this.applyLightMode(value);
            }
            
            // Save settings
            this.safeLocalStorage.setItem('gpsShowcaseSettings', JSON.stringify(this.settings));
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
        
        // Get form values
        const businessName = document.getElementById('businessName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Comprehensive validation
        if (!businessName) {
            this.showNotification('Business name is required', 'error');
            return;
        }
        
        if (!this.validateEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (!this.validatePhone(phone)) {
            this.showNotification('Please enter a valid phone number', 'error');
            return;
        }
        
        if (!this.validatePassword(password)) {
            this.showNotification('Password must be at least 8 characters long', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match!', 'error');
            return;
        }
        
        // Sanitize inputs
        const formData = {
            businessName: this.sanitizeInput(businessName),
            email: this.sanitizeInput(email),
            phone: this.sanitizeInput(phone),
            createdAt: new Date().toISOString()
        };
        
        // Store account data (Note: In production, never store passwords in localStorage)
        const success = this.safeLocalStorage.setItem('gpsShowcaseAccount', JSON.stringify(formData));
        
        if (success) {
            this.showNotification('Account created successfully!', 'success');
            
            // Start questionnaire after a short delay
            setTimeout(() => this.startQuestionnaire(), 1500);
        }
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
            <div class="question-title">${this.sanitizeInput(question.title)}</div>
            <div class="question-options">
        `;
        
        question.options.forEach(option => {
            questionHTML += `
                <button class="option-button" data-option="${this.sanitizeInput(option)}" aria-label="${this.sanitizeInput(option)}">
                    ${this.sanitizeInput(option)}
                </button>
            `;
        });
        
        questionHTML += `
            </div>
            <div class="question-navigation">
                <button class="secondary-button" onclick="app.previousQuestion()" ${this.currentQuestionIndex === 0 ? 'style="visibility: hidden;"' : ''} aria-label="Go back to previous question">
                    Back
                </button>
                <button class="neon-button continue-btn" onclick="app.continueQuestionnaire()" disabled aria-label="Continue to next question">
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
            btn.setAttribute('aria-selected', 'false');
        });
        
        // Add selection to clicked button
        button.classList.add('selected');
        button.setAttribute('aria-selected', 'true');
        
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
        
        // Store sanitized answer
        const question = this.questions[this.currentQuestionIndex];
        this.questionnaireData[question.id] = this.sanitizeInput(selectedOption.dataset.option);
        
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
        this.safeLocalStorage.setItem('gpsShowcaseQuestionnaire', JSON.stringify(this.questionnaireData));
        
        // Show thank you page
        this.showPage('thankYou');
    }
    
    goToHome() {
        this.showPage('home');
        this.initializeHome();
    }
    
    initializeHome() {
        // Initialize Google Maps (placeholder)
        this.initializeMap();
        
        // Load restaurant data
        this.displayRestaurants();
        
        // Load saved settings
        const savedSettings = this.safeLocalStorage.getItem('gpsShowcaseSettings');
        if (savedSettings) {
            try {
                this.settings = JSON.parse(savedSettings);
                this.applySettings();
            } catch (e) {
                // Invalid settings, use defaults
            }
        }
    }
    
    applySettings() {
        // Apply saved settings to UI
        Object.keys(this.settings).forEach(key => {
            const toggleMap = {
                'radiusMode': 'radiusToggle',
                'aiVoiceCommand': 'aiVoiceToggle',
                'aiRecommendations': 'aiRecommendToggle',
                'lightMode': 'lightModeToggle',
                'vibeHigh': 'vibeHighToggle',
                'vibeMid': 'vibeMidToggle',
                'vibeLow': 'vibeLowToggle'
            };
            
            const toggleId = toggleMap[key];
            if (toggleId) {
                const toggle = document.getElementById(toggleId);
                if (toggle) {
                    toggle.checked = this.settings[key];
                }
            }
        });
        
        // Apply light mode if enabled
        if (this.settings.lightMode) {
            this.applyLightMode(true);
        }
    }
    
    initializeMap() {
        // In production, this would initialize Google Maps Street View
        // Placeholder for API integration
    }
    
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('collapsed');
        }
    }
    
    toggleSettings() {
        const settingsDropdown = document.getElementById('settingsDropdown');
        if (settingsDropdown) {
            settingsDropdown.classList.toggle('active');
        }
    }
    
    toggleLiveFeed() {
        const liveFeedBlock = document.getElementById('liveFeedBlock');
        const liveFeedBtn = document.getElementById('liveFeedBtn');
        
        if (liveFeedBlock) {
            liveFeedBlock.classList.toggle('active');
        }
        
        if (liveFeedBtn) {
            liveFeedBtn.parentElement.classList.toggle('active');
        }
    }
    
    activateGPSShowcase() {
        // Update nav state
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        const gpsBtn = document.getElementById('gpsShowcaseBtn');
        if (gpsBtn) {
            gpsBtn.parentElement.classList.add('active');
        }
    }
    
    toggleView(view) {
        const favoritesToggle = document.getElementById('favoritesToggle');
        const allToggle = document.getElementById('allToggle');
        const favoritesView = document.getElementById('favoritesView');
        const allView = document.getElementById('allView');
        
        if (view === 'favorites') {
            favoritesToggle.classList.add('active');
            allToggle.classList.remove('active');
            favoritesView.classList.add('active');
            allView.classList.remove('active');
        } else {
            allToggle.classList.add('active');
            favoritesToggle.classList.remove('active');
            allView.classList.add('active');
            favoritesView.classList.remove('active');
        }
    }
    
    selectCategory(categoryBtn) {
        // Remove previous selection
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add selection to clicked button
        categoryBtn.classList.add('active');
        
        // Filter restaurants by category
        const category = categoryBtn.dataset.category;
        this.filterRestaurantsByCategory(category);
    }
    
    filterRestaurantsByCategory(category) {
        const filteredRestaurants = this.restaurants.filter(restaurant => {
            return restaurant.category === category;
        });
        
        this.displayRestaurantList(filteredRestaurants);
    }
    
    displayRestaurantList(restaurants = this.restaurants) {
        const restaurantList = document.getElementById('restaurantList');
        if (!restaurantList) return;
        
        restaurantList.innerHTML = '';
        
        if (restaurants.length === 0) {
            restaurantList.innerHTML = '<p style="color: var(--icy-white); padding: 20px; text-align: center;">No restaurants found in this category.</p>';
            return;
        }
        
        restaurants.forEach(restaurant => {
            const card = document.createElement('div');
            card.className = 'restaurant-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `${restaurant.name}, ${restaurant.category}`);
            
            card.innerHTML = `
                <div class="restaurant-image" aria-hidden="true">
                    ${this.sanitizeInput(restaurant.name.charAt(0))}
                </div>
                <div class="restaurant-info">
                    <div class="restaurant-name">${this.sanitizeInput(restaurant.name)}</div>
                    <div class="restaurant-category">${this.sanitizeInput(restaurant.category)}</div>
                </div>
            `;
            
            card.addEventListener('click', () => this.selectRestaurant(restaurant, card));
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    this.selectRestaurant(restaurant, card);
                }
            });
            
            restaurantList.appendChild(card);
        });
    }
    
    selectRestaurant(restaurant, cardElement) {
        this.selectedRestaurant = restaurant;
        
        // Update card selection
        document.querySelectorAll('.restaurant-card').forEach(card => {
            card.classList.remove('active');
        });
        cardElement.classList.add('active');
        
        // Display restaurant details
        this.displayRestaurantDetails(restaurant);
    }
    
    displayRestaurantDetails(restaurant) {
        const businessName = document.getElementById('businessName');
        const businessDescription = document.getElementById('businessDescription');
        const statusLight = document.getElementById('statusLight');
        
        if (businessName) businessName.textContent = this.sanitizeInput(restaurant.name);
        if (businessDescription) businessDescription.textContent = this.sanitizeInput(restaurant.description);
        
        // Update status light based on hours
        if (statusLight) {
            const light = statusLight.querySelector('.light');
            light.className = 'light ' + restaurant.status;
        }
    }
    
    handleSearch() {
        const searchInput = document.getElementById('aiCommandInput');
        const query = searchInput.value.trim();
        
        if (query) {
            const sanitizedQuery = this.sanitizeInput(query);
            this.showNotification(`Searching for: ${sanitizedQuery}`, 'info');
            
            // Perform search
            this.performSearch(sanitizedQuery);
        }
    }
    
    performSearch(query) {
        // Simulate search functionality
        const results = this.restaurants.filter(restaurant => {
            return restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
                   restaurant.category.toLowerCase().includes(query.toLowerCase()) ||
                   restaurant.description.toLowerCase().includes(query.toLowerCase());
        });
        
        this.displayRestaurantList(results);
        
        if (results.length === 0) {
            this.showNotification('No results found', 'info');
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = this.sanitizeInput(message);
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#00ff88' : '#00d4ff'};
            color: ${type === 'error' || type === 'success' ? '#000' : '#fff'};
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    loadSampleData() {
        // Sample restaurant data
        this.restaurants = [
            {
                id: 1,
                name: 'Neon Bistro',
                category: 'fast-casual',
                description: 'A modern fast-casual restaurant serving innovative fusion cuisine with a neon-inspired atmosphere. Perfect for quick lunches and casual dinners.',
                status: 'green',
                hours: 'Open until 10 PM',
                rating: 4.5
            },
            {
                id: 2,
                name: 'Azure Fine Dining',
                category: 'fine-dining',
                description: 'An exquisite fine dining experience featuring artisanal cuisine prepared with the finest ingredients. Elegant atmosphere perfect for special occasions.',
                status: 'yellow',
                hours: 'Open until 11 PM',
                rating: 4.8
            },
            {
                id: 3,
                name: 'Urban Kitchen',
                category: 'casual-dining',
                description: 'A cozy casual dining spot offering comfort food with a modern twist. Great for families and groups looking for a relaxed atmosphere.',
                status: 'green',
                hours: 'Open until 9 PM',
                rating: 4.2
            },
            {
                id: 4,
                name: 'Spice Route',
                category: 'ethnic-cuisine',
                description: 'Authentic ethnic cuisine bringing the flavors of the world to your plate. Experience traditional dishes in a vibrant setting.',
                status: 'red',
                hours: 'Closed - Opens at 11 AM',
                rating: 4.6
            },
            {
                id: 5,
                name: 'Street Eats Express',
                category: 'food-trucks',
                description: 'Gourmet food truck experience with creative street food offerings. Follow us for our daily location and special menu items.',
                status: 'green',
                hours: 'Open until 8 PM',
                rating: 4.3
            },
            {
                id: 6,
                name: 'Velocity Lounge',
                category: 'night-clubs',
                description: 'Premium nightlife destination with expert mixologists and pulsating beats. The ultimate spot for entertainment and socializing.',
                status: 'yellow',
                hours: 'Open until 2 AM',
                rating: 4.4
            }
        ];
    }
    
    displayRestaurants() {
        this.displayRestaurantList();
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
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);
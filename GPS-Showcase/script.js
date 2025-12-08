// GPS-Showcase MVP - JavaScript Functionality

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
        // Initialize Google Maps (placeholder)
        this.initializeMap();
        
        // Load restaurant data
        this.displayRestaurants();
    }
    
    initializeMap() {
        const mapContainer = document.getElementById('mapContainer');
        if (mapContainer) {
            // In real implementation, this would initialize Google Maps Street View
            console.log('Initializing Google Maps Street View...');
            console.log('GPS API Key Required');
        }
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
        // Activate the full interface
        console.log('GPS-Showcase interface activated');
        
        // Update nav state
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        document.getElementById('gpsShowcaseBtn').parentElement.classList.add('active');
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
        
        restaurants.forEach(restaurant => {
            const card = document.createElement('div');
            card.className = 'restaurant-card';
            card.innerHTML = `
                <div class="restaurant-image">
                    ${restaurant.name.charAt(0)}
                </div>
                <div class="restaurant-info">
                    <div class="restaurant-name">${restaurant.name}</div>
                    <div class="restaurant-category">${restaurant.category}</div>
                </div>
            `;
            
            card.addEventListener('click', () => this.selectRestaurant(restaurant));
            restaurantList.appendChild(card);
        });
    }
    
    selectRestaurant(restaurant) {
        this.selectedRestaurant = restaurant;
        
        // Update card selection
        document.querySelectorAll('.restaurant-card').forEach(card => {
            card.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
        
        // Display restaurant details
        this.displayRestaurantDetails(restaurant);
    }
    
    displayRestaurantDetails(restaurant) {
        const businessName = document.getElementById('businessName');
        const businessDescription = document.getElementById('businessDescription');
        const statusLight = document.getElementById('statusLight');
        
        if (businessName) businessName.textContent = restaurant.name;
        if (businessDescription) businessDescription.textContent = restaurant.description;
        
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
            console.log('AI Voice Command Search:', query);
            this.showNotification(`Searching for: ${query}`, 'info');
            
            // In real implementation, this would trigger AI-powered search
            this.performSearch(query);
        }
    }
    
    performSearch(query) {
        // Simulate search functionality
        const results = this.restaurants.filter(restaurant => {
            return restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
                   restaurant.category.toLowerCase().includes(query.toLowerCase());
        });
        
        this.displayRestaurantList(results);
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
            background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#00ff88' : '#00d4ff'};
            color: ${type === 'error' || type === 'success' ? '#000' : '#fff'};
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
        // Sample restaurant data
        this.restaurants = [
            {
                id: 1,
                name: 'Neon Bistro',
                category: 'Fast Casual',
                description: 'A modern fast-casual restaurant serving innovative fusion cuisine with a neon-inspired atmosphere. Perfect for quick lunches and casual dinners.',
                status: 'green',
                hours: 'Open until 10 PM',
                rating: 4.5
            },
            {
                id: 2,
                name: 'Azure Fine Dining',
                category: 'Fine Dining',
                description: 'An exquisite fine dining experience featuring artisanal cuisine prepared with the finest ingredients. Elegant atmosphere perfect for special occasions.',
                status: 'yellow',
                hours: 'Open until 11 PM',
                rating: 4.8
            },
            {
                id: 3,
                name: 'Urban Kitchen',
                category: 'Casual Dining',
                description: 'A cozy casual dining spot offering comfort food with a modern twist. Great for families and groups looking for a relaxed atmosphere.',
                status: 'green',
                hours: 'Open until 9 PM',
                rating: 4.2
            },
            {
                id: 4,
                name: 'Spice Route',
                category: 'Ethnic Cuisine',
                description: 'Authentic ethnic cuisine bringing the flavors of the world to your plate. Experience traditional dishes in a vibrant setting.',
                status: 'red',
                hours: 'Closed - Opens at 11 AM',
                rating: 4.6
            },
            {
                id: 5,
                name: 'Street Eats Express',
                category: 'Food Trucks',
                description: 'Gourmet food truck experience with creative street food offerings. Follow us for our daily location and special menu items.',
                status: 'green',
                hours: 'Open until 8 PM',
                rating: 4.3
            },
            {
                id: 6,
                name: 'Velocity Lounge',
                category: 'Night Clubs',
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
`;
document.head.appendChild(notificationStyles);
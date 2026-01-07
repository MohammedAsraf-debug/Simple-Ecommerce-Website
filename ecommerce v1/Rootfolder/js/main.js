// Ecommerce Application - Main JavaScript File

// State Management
const AppState = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
    user: JSON.parse(localStorage.getItem('user')) || null,
    products: [],
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
    },
    
    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistCount();
    },
    
    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    },
    
    updateWishlistCount() {
        const wishlistCount = document.getElementById('wishlistCount');
        if (wishlistCount) {
            wishlistCount.textContent = this.wishlist.length;
            wishlistCount.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
        }
    },
    
    addToCart(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.showNotification('Product added to cart!');
    },
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.showNotification('Product removed from cart!');
    },
    
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    },
    
    toggleWishlist(product) {
        const index = this.wishlist.findIndex(item => item.id === product.id);
        
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.showNotification('Removed from wishlist!');
        } else {
            this.wishlist.push(product);
            this.showNotification('Added to wishlist!');
        }
        
        this.saveWishlist();
        return index === -1;
    },
    
    isInWishlist(productId) {
        return this.wishlist.some(item => item.id === productId);
    },
    
    getCartTotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    },
    
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
};

// Sample Products Data
const sampleProducts = [
    {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        category: 'electronics',
        price: 129.99,
        originalPrice: 199.99,
        rating: 4.5,
        reviewCount: 342,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
        features: ['Noise Cancelling', '30hr Battery', 'Bluetooth 5.0', 'Built-in Mic'],
        inStock: true,
        discount: 35
    },
    {
        id: 2,
        name: 'Smart Fitness Watch',
        category: 'electronics',
        price: 249.99,
        originalPrice: 299.99,
        rating: 4.7,
        reviewCount: 187,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500',
        description: 'Advanced fitness tracker with heart rate monitor and GPS.',
        features: ['Heart Rate Monitor', 'GPS', 'Waterproof', '7-day Battery'],
        inStock: true,
        discount: 17
    },
    {
        id: 3,
        name: 'Organic Cotton T-Shirt',
        category: 'fashion',
        price: 29.99,
        originalPrice: 39.99,
        rating: 4.3,
        reviewCount: 89,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500',
        description: '100% organic cotton t-shirt, comfortable and eco-friendly.',
        features: ['100% Organic Cotton', 'Machine Wash', 'Breathable', 'Eco-friendly'],
        inStock: true,
        discount: 25
    },
    {
        id: 4,
        name: 'Ceramic Coffee Mug Set',
        category: 'home',
        price: 34.99,
        originalPrice: 49.99,
        rating: 4.6,
        reviewCount: 156,
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500',
        description: 'Set of 4 premium ceramic coffee mugs with elegant design.',
        features: ['Set of 4', 'Microwave Safe', 'Dishwasher Safe', 'Premium Ceramic'],
        inStock: true,
        discount: 30
    },
    {
        id: 5,
        name: 'Natural Face Cream',
        category: 'beauty',
        price: 24.99,
        originalPrice: 34.99,
        rating: 4.4,
        reviewCount: 234,
        image: 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?auto=format&fit=crop&w=500',
        description: 'Organic face cream with natural ingredients for glowing skin.',
        features: ['Organic Ingredients', 'Cruelty Free', 'Vegan', 'Hypoallergenic'],
        inStock: true,
        discount: 29
    },
    {
        id: 6,
        name: 'Professional Camera',
        category: 'electronics',
        price: 1299.99,
        originalPrice: 1599.99,
        rating: 4.8,
        reviewCount: 67,
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=500',
        description: 'Professional DSLR camera with 24MP sensor and 4K video.',
        features: ['24MP Sensor', '4K Video', 'WiFi & Bluetooth', '5-Axis Stabilization'],
        inStock: true,
        discount: 19
    },
    {
        id: 7,
        name: 'Running Shoes',
        category: 'sports',
        price: 89.99,
        originalPrice: 119.99,
        rating: 4.5,
        reviewCount: 312,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500',
        description: 'Lightweight running shoes with cushion technology for comfort.',
        features: ['Lightweight', 'Breathable', 'Cushion Technology', 'Durable'],
        inStock: true,
        discount: 25
    },
    {
        id: 8,
        name: 'Air Fryer',
        category: 'home',
        price: 89.99,
        originalPrice: 129.99,
        rating: 4.6,
        reviewCount: 421,
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=500',
        description: 'Digital air fryer with multiple cooking functions.',
        features: ['Digital Display', 'Multiple Functions', 'Non-stick Basket', 'Energy Efficient'],
        inStock: true,
        discount: 31
    }
];

// Login/Logout Management
const AuthManager = {
    // Check login status on page load
    init() {
        this.updateHeaderUI();
    },
    
    // Handle login
    login(email, password) {
        if (!email || !password) {
            return { success: false, message: 'Please fill in all fields' };
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, message: 'Please enter a valid email address' };
        }
        
        // Get username from email (text before @)
        const userName = email.split('@')[0];
        
        // Save to localStorage
        const userData = {
            email: email,
            name: userName,
            loggedIn: true,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update UI
        this.updateHeaderUI();
        
        return { success: true, userName: userName };
    },
    
    // Handle logout
    logout() {
        localStorage.removeItem('user');
        this.updateHeaderUI();
        return true;
    },
    
    // Check if user is logged in
    isLoggedIn() {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        return user && user.loggedIn === true;
    },
    
    // Get current user
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user') || 'null');
    },
    
    // Update header UI based on login status
    updateHeaderUI() {
        const user = this.getCurrentUser();
        const isLoggedIn = this.isLoggedIn();
        
        // Update desktop header
        this.updateDesktopHeader(isLoggedIn, user);
        
        // Update mobile menu
        this.updateMobileMenu(isLoggedIn, user);
    },
    
    // Update desktop header
    updateDesktopHeader(isLoggedIn, user) {
        const accountLink = document.getElementById('accountLink');
        if (!accountLink) return;
        
        if (isLoggedIn && user) {
            // User is logged in - show "Hi, username" with logout
            accountLink.innerHTML = `
                <div class="user-menu">
                    <a href="#" class="nav-icon user-greeting">
                        <i class="fas fa-user"></i>
                        <span>Hi, ${user.name}</span>
                    </a>
                    <div class="logout-btn-container">
                        <a href="#" class="logout-link" id="logoutBtn">Logout</a>
                    </div>
                </div>
            `;
            
            // Add logout event listener
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleLogout();
                });
            }
        } else {
            // User is not logged in - show login link
            accountLink.innerHTML = `
                <a href="pages/login.html" class="nav-icon">
                    <i class="fas fa-user"></i>
                    <span>Login</span>
                </a>
            `;
        }
    },
    
    // Update mobile menu
    updateMobileMenu(isLoggedIn, user) {
        const mobileAccountLink = document.querySelector('.mobile-menu-links a[href*="login.html"]');
        if (!mobileAccountLink) return;
        
        if (isLoggedIn && user) {
            // User is logged in - show logout
            mobileAccountLink.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout`;
            mobileAccountLink.href = "#";
            
            // Remove existing click listeners
            const newLink = mobileAccountLink.cloneNode(true);
            mobileAccountLink.parentNode.replaceChild(newLink, mobileAccountLink);
            
            // Add logout event
            newLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        } else {
            // User is not logged in - show login
            mobileAccountLink.innerHTML = `<i class="fas fa-user"></i> Login`;
            mobileAccountLink.href = "pages/login.html";
            
            // Remove any existing click listeners
            const newLink = mobileAccountLink.cloneNode(true);
            mobileAccountLink.parentNode.replaceChild(newLink, mobileAccountLink);
        }
    },
    
    // Handle logout process
    handleLogout() {
        this.logout();
        AppState.showNotification('Logged out successfully!');
        
        // Redirect to home page
        setTimeout(() => {
            if (!window.location.pathname.includes('index.html')) {
                window.location.href = '../index.html';
            }
        }, 500);
    }
};

// Initialize Application
class EcommerceApp {
    constructor() {
        this.init();
    }
    
    init() {
        // Initialize state
        AppState.products = sampleProducts;
        
        // Initialize auth
        AuthManager.init();
        
        // Initialize DOM
        this.initLoadingScreen();
        this.initMobileMenu();
        this.initBackToTop();
        this.initEventListeners();
        
        // Update UI
        AppState.updateCartCount();
        AppState.updateWishlistCount();
        
        // Initialize page-specific functionality
        this.initPageSpecific();
    }
    
    initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }, 800);
        }
    }
    
    initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        
        if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.add('active');
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.add('active');
                }
            });
            
            mobileMenuClose.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.remove('active');
                }
            });
            
            if (mobileMenuOverlay) {
                mobileMenuOverlay.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    mobileMenuOverlay.classList.remove('active');
                });
            }
        }
    }
    
    initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    initEventListeners() {
        // Desktop search
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput && searchBtn) {
            const performSearch = () => {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `pages/products.html?search=${encodeURIComponent(query)}`;
                }
            };
            
            searchBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') performSearch();
            });
        }
        
        // Mobile search
        const mobileSearchBtn = document.querySelector('.mobile-search button');
        const mobileSearchInput = document.querySelector('.mobile-search input');
        
        if (mobileSearchBtn && mobileSearchInput) {
            mobileSearchBtn.addEventListener('click', () => {
                const query = mobileSearchInput.value.trim();
                if (query) {
                    const mobileMenu = document.getElementById('mobileMenu');
                    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
                    if (mobileMenu) mobileMenu.classList.remove('active');
                    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
                    
                    setTimeout(() => {
                        window.location.href = `pages/products.html?search=${encodeURIComponent(query)}`;
                    }, 300);
                }
            });
            
            mobileSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const query = mobileSearchInput.value.trim();
                    if (query) {
                        const mobileMenu = document.getElementById('mobileMenu');
                        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
                        if (mobileMenu) mobileMenu.classList.remove('active');
                        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
                        
                        setTimeout(() => {
                            window.location.href = `pages/products.html?search=${encodeURIComponent(query)}`;
                        }, 300);
                    }
                }
            });
        }
        
        // Newsletter
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                if (email) {
                    AppState.showNotification('Thank you for subscribing!');
                    newsletterForm.reset();
                }
            });
        }
        
        // Category dropdown
        const categoryToggle = document.querySelector('.category-toggle');
        if (categoryToggle) {
            categoryToggle.addEventListener('click', () => {
                const menu = document.querySelector('.category-menu');
                if (menu) {
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                }
            });
            
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.category-dropdown')) {
                    const menu = document.querySelector('.category-menu');
                    if (menu) {
                        menu.style.display = 'none';
                    }
                }
            });
        }
    }
    
    initPageSpecific() {
        const currentPage = window.location.pathname.split('/').pop();
        
        switch(currentPage) {
            case 'login.html':
                this.initLoginPage();
                break;
            case 'signup.html':
                this.initSignupPage();
                break;
            case 'products.html':
                this.initProductsPage();
                break;
            case 'product-detail.html':
                this.initProductDetailPage();
                break;
            case 'cart.html':
                this.initCartPage();
                break;
            case 'wishlist.html':
                this.initWishlistPage();
                break;
            case 'checkout.html':
                this.initCheckoutPage();
                break;
            default:
                this.initHomePage();
        }
    }
    
    initHomePage() {
        this.initHeroSlider();
        this.initProductGrids();
    }
    
    initHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        
        if (!slides.length) return;
        
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            showSlide((currentSlide + 1) % slides.length);
        }
        
        function prevSlide() {
            showSlide((currentSlide - 1 + slides.length) % slides.length);
        }
        
        let slideInterval = setInterval(nextSlide, 5000);
        
        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
        
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
    }
    
    initProductGrids() {
        const featuredProducts = document.getElementById('featuredProducts');
        if (featuredProducts) {
            const featured = AppState.products.slice(0, 4);
            featuredProducts.innerHTML = this.generateProductCards(featured);
            this.initProductCardEvents(featuredProducts);
        }
        
        const newArrivals = document.getElementById('newArrivals');
        if (newArrivals) {
            const newArrivalsList = AppState.products.slice(4, 8);
            newArrivals.innerHTML = this.generateProductCards(newArrivalsList);
            this.initProductCardEvents(newArrivals);
        }
    }
    
    generateProductCards(products) {
        return products.map(product => `
            <div class="product-card" data-id="${product.id}">
                ${product.discount ? `<span class="product-badge">-${product.discount}%</span>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-content">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars">
                            ${this.generateStarRating(product.rating)}
                        </div>
                        <span class="rating-count">(${product.reviewCount})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="action-btn btn-cart" data-action="cart">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="action-btn btn-wishlist ${AppState.isInWishlist(product.id) ? 'active' : ''}" data-action="wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    generateStarRating(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }
    
    initProductCardEvents(container) {
        container.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if (!productCard) return;
            
            const productId = parseInt(productCard.dataset.id);
            const product = AppState.products.find(p => p.id === productId);
            
            if (!product) return;
            
            if (e.target.closest('[data-action="cart"]')) {
                e.preventDefault();
                AppState.addToCart(product);
            }
            else if (e.target.closest('[data-action="wishlist"]')) {
                e.preventDefault();
                const added = AppState.toggleWishlist(product);
                const btn = e.target.closest('[data-action="wishlist"]');
                btn.classList.toggle('active', added);
            }
            else if (!e.target.closest('.product-actions')) {
                window.location.href = `pages/product-detail.html?id=${productId}`;
            }
        });
    }
    
    initLoginPage() {
        const loginForm = document.getElementById('loginForm');
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('loginPassword');
        
        // Toggle password visibility
        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
            });
        }
        
        // Login form submission
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // Clear previous messages
                this.clearFormMessages('loginForm');
                
                // Try to login
                const result = AuthManager.login(email, password);
                
                if (result.success) {
                    // Show success message
                    this.showFormSuccess('loginForm', 'Login successful! Redirecting to home...');
                    
                    // Redirect to home page
                    setTimeout(() => {
                        window.location.href = '../index.html';
                    }, 1000);
                } else {
                    // Show error message
                    this.showFormError('loginForm', result.message);
                }
            });
        }
    }
    
    initSignupPage() {
        // Signup page - basic implementation
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Sign up would be implemented in a real application');
            });
        }
    }
    
    showFormError(formId, message) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.cssText = `
            color: var(--danger-color);
            background-color: rgba(239, 68, 68, 0.1);
            padding: 12px 15px;
            border-radius: var(--border-radius);
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        form.insertBefore(errorDiv, form.firstChild);
    }
    
    showFormSuccess(formId, message) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.style.cssText = `
            color: var(--success-color);
            background-color: rgba(16, 185, 129, 0.1);
            padding: 12px 15px;
            border-radius: var(--border-radius);
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        form.insertBefore(successDiv, form.firstChild);
    }
    
    clearFormMessages(formId) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const errors = form.querySelectorAll('.form-error');
        const successes = form.querySelectorAll('.form-success');
        
        errors.forEach(error => error.remove());
        successes.forEach(success => success.remove());
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ecommerceApp = new EcommerceApp();
});

// Add notification styles dynamically
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        color: var(--dark-color);
        padding: 15px 20px;
        border-radius: var(--border-radius);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 2000;
        transform: translateX(100%);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        max-width: 350px;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification.success {
        border-left: 4px solid var(--success-color);
    }
    
    .notification.error {
        border-left: 4px solid var(--danger-color);
    }
    
    .notification i {
        font-size: 20px;
    }
    
    .notification.success i {
        color: var(--success-color);
    }
    
    .notification.error i {
        color: var(--danger-color);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--gray-color);
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        font-size: 14px;
    }
    
    .notification-close:hover {
        color: var(--dark-color);
    }
    
    /* User menu styles */
    .user-menu {
        position: relative;
    }
    
    .user-greeting {
        cursor: default;
    }
    
    .user-greeting:hover {
        color: var(--gray-color);
    }
    
    .logout-btn-container {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        min-width: 120px;
        display: none;
        overflow: hidden;
        z-index: 100;
    }
    
    .user-menu:hover .logout-btn-container {
        display: block;
    }
    
    .logout-link {
        display: block;
        padding: 12px 20px;
        color: var(--danger-color);
        text-align: center;
        transition: var(--transition);
        font-weight: 500;
        font-size: 14px;
    }
    
    .logout-link:hover {
        background-color: rgba(239, 68, 68, 0.1);
    }
    
    .mobile-menu-links a i.fa-sign-out-alt {
        color: var(--danger-color);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);


// ================= CART PAGE RENDER =================

// cart.html load aagum pothu run aaganum
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("cartItemsContainer")) {
    renderCartItems();
  }
});

function renderCartItems() {
  const cartContainer = document.getElementById("cartItemsContainer");
  const subtotalEl = document.getElementById("cartSubtotal");
  const totalEl = document.getElementById("cartTotal");

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Empty cart
  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    subtotalEl.textContent = "$0.00";
    totalEl.textContent = "$9.99";
    return;
  }

  cartContainer.innerHTML = "";
  let subtotal = 0;

  cartItems.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>$${item.price} × ${item.quantity}</p>
        </div>
        <button onclick="removeCartItem(${index})">Remove</button>
      </div>
    `;
  });

  subtotalEl.textContent = "$" + subtotal.toFixed(2);
  totalEl.textContent = "$" + (subtotal + 9.99).toFixed(2);
}

function removeCartItem(index) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCartItems();
}

// ================= CART PAGE LOGIC (FIXED) =================

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("cartItems")) {
    renderCartItems();
  }

  const clearBtn = document.querySelector(".btn-clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  }
});

function renderCartItems() {
  const cartItemsDiv = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("cartSubtotal");
  const shippingEl = document.getElementById("shippingCost");
  const taxEl = document.getElementById("taxAmount");
  const totalEl = document.getElementById("cartTotal");

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Empty cart
  if (cartItems.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty</p>";
    subtotalEl.textContent = "$0.00";
    taxEl.textContent = "$0.00";
    totalEl.textContent = shippingEl.textContent;
    return;
  }

  cartItemsDiv.innerHTML = "";
  let subtotal = 0;

  cartItems.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>$${item.price} × ${item.quantity}</p>
        </div>
        <button class="btn-remove" onclick="removeCartItem(${index})">Remove</button>
      </div>
    `;
  });

  let shipping = 9.99;
  let tax = subtotal * 0.05; // 5% tax example
  let total = subtotal + shipping + tax;

  subtotalEl.textContent = "$" + subtotal.toFixed(2);
  taxEl.textContent = "$" + tax.toFixed(2);
  totalEl.textContent = "$" + total.toFixed(2);
}

function removeCartItem(index) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCartItems();
}

function clearCart() {
  localStorage.removeItem("cartItems");
  renderCartItems();
}

// ========== MOBILE MENU FUNCTIONALITY ==========
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('active');
            }
        });
        
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
            }
        });
        
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
            });
        }
    }
}

// ========== UPDATE COUNTS FUNCTION ==========
function updateCartAndWishlistCounts() {
    // Cart count
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    // Wishlist count
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistCount.textContent = wishlist.length;
        wishlistCount.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

// ========== FAQ FUNCTIONALITY ==========
function initFAQ() {
    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Close all other answers
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Open clicked answer if it was closed
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
    
    // FAQ Category Filter
    document.querySelectorAll('.faq-category').forEach(category => {
        category.addEventListener('click', () => {
            const cat = category.dataset.category;
            
            // Update active category
            document.querySelectorAll('.faq-category').forEach(c => {
                c.classList.remove('active');
            });
            category.classList.add('active');
            
            // Show/hide FAQ sections
            document.querySelectorAll('.faq-section').forEach(section => {
                if (cat === 'all' || section.dataset.category === cat) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
    
    // FAQ Search
    const searchInput = document.querySelector('.search-faq input');
    const searchButton = document.querySelector('.search-faq button');
    
    function searchFAQs() {
        const searchTerm = searchInput.value.toLowerCase();
        
        document.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', searchFAQs);
        searchInput.addEventListener('keyup', searchFAQs);
    }
}

// ========== SEARCH TAGS FUNCTIONALITY ==========
function initSearchTags() {
    document.querySelectorAll('.search-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const searchTerm = this.textContent;
            window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
        });
    });
}

// ========== CONTACT FORM FUNCTIONALITY ==========
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you within 24 hours.');
            this.reset();
        });
    }
}

// ========== INITIALIZE ALL FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Update cart and wishlist counts
    updateCartAndWishlistCounts();
    
    // Initialize FAQ functionality if on FAQ page
    if (document.querySelector('.faq-page')) {
        initFAQ();
    }
    
    // Initialize search tags if on categories page
    if (document.querySelector('.search-tag')) {
        initSearchTags();
    }
    
    // Initialize contact form if on contact page
    if (document.getElementById('contactForm')) {
        initContactForm();
    }
    
    // Initialize back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Update login status
    const authManager = window.AuthManager || {};
    if (typeof authManager.updateHeaderUI === 'function') {
        authManager.updateHeaderUI();
    }
});

// ========== ADD MISSING ELEMENTS IF NEEDED ==========
function ensureMobileMenuElements() {
    // Check if mobile menu overlay exists, if not create it
    if (!document.querySelector('.mobile-menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.id = 'mobileMenuOverlay';
        document.body.appendChild(overlay);
    }
    
    // Check if mobile menu exists, if not create basic structure
    if (!document.getElementById('mobileMenu')) {
        const mobileMenuHTML = `
            <div class="mobile-menu" id="mobileMenu">
                <div class="mobile-menu-header">
                    <h3>ShopEasy Menu</h3>
                    <button class="mobile-menu-close" id="mobileMenuClose">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="mobile-search">
                    <input type="text" placeholder="Search products...">
                    <button><i class="fas fa-search"></i></button>
                </div>
                
                <div class="mobile-menu-links">
                    <a href="../index.html"><i class="fas fa-home"></i> Home</a>
                    <a href="products.html"><i class="fas fa-th-large"></i> All Products</a>
                    <a href="categories.html"><i class="fas fa-list"></i> Categories</a>
                    <a href="wishlist.html"><i class="fas fa-heart"></i> Wishlist</a>
                    <a href="cart.html"><i class="fas fa-shopping-cart"></i> Cart</a>
                    <a href="login.html"><i class="fas fa-user"></i> Account</a>
                    <a href="about.html"><i class="fas fa-info-circle"></i> About Us</a>
                    <a href="contact.html"><i class="fas fa-phone"></i> Contact</a>
                    <a href="faq.html"><i class="fas fa-question-circle"></i> FAQ</a>
                </div>
            </div>
        `;
        
        // Insert mobile menu after header
        const header = document.querySelector('.header');
        if (header) {
            header.insertAdjacentHTML('beforeend', mobileMenuHTML);
        }
    }
}

// Call this function on page load
document.addEventListener('DOMContentLoaded', ensureMobileMenuElements);
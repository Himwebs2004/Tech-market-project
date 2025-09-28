        // Sample product data
        //The full code by Radhwane Harres
        const products = [
            {
                id: 1,
                name: "Dell Precision Workstation",
                specs: "Intel Xeon W-2295 | 64GB ECC RAM | 2TB NVMe SSD | NVIDIA RTX A5000",
                price: "$4,299.99",
                image: "img/1.jpg",
                badge: "Professional",
                category: "Workstations"
            },
            {
                id: 2,
                name: "HP Z8 G4 Workstation",
                specs: "Dual Intel Xeon Gold | 128GB RAM | 4TB SSD + 8TB HDD | NVIDIA Quadro RTX 8000",
                price: "$8,499.99",
                image: "img/2.jpg",
                badge: "Flagship",
                category: "Workstations"
            },
            {
                id: 3,
                name: "Lenovo ThinkStation P920",
                specs: "Intel Xeon Platinum | 256GB RAM | 2x2TB NVMe SSD | NVIDIA RTX 6000",
                price: "$12,999.99",
                image: "img/3.jpg",
                badge: "Enterprise",
                category: "Workstations"
            },
            {
                id: 4,
                name: "ASUS ProArt StudioBook",
                specs: "Intel i9-12900H | 32GB RAM | 1TB SSD | NVIDIA RTX 3070 Ti | 4K OLED Display",
                price: "$3,199.99",
                image: "img/4.jpg",
                badge: "Creator",
                category: "Laptops"
            },
            {
                id: 5,
                name: "Apple Mac Studio",
                specs: "Apple M1 Ultra | 64GB RAM | 1TB SSD | 32-core GPU",
                price: "$3,999.99",
                image: "img/5.jpg",
                badge: "Apple",
                category: "Workstations"
            },
            {
                id: 6,
                name: "Dell Alienware Aurora R13",
                specs: "Intel i9-12900KF | 32GB RAM | 1TB SSD | NVIDIA RTX 3090 | Liquid Cooling",
                price: "$3,499.99",
                image: "img/6.jpg",
                badge: "Gaming",
                category: "Gaming Systems"
            }
        ];

        // DOM elements
        const productsContainer = document.getElementById('products-container');
        const themeToggle = document.getElementById('theme-toggle');
        const cartButtons = document.querySelectorAll('.product-actions .btn-primary');
        const wishlistButtons = document.querySelectorAll('.product-actions .icon-btn');
        const cartCount = document.querySelector('#cart-btn .cart-count');
        const wishlistCount = document.querySelector('#wishlist-btn .cart-count');
        const loginModal = document.getElementById('login-modal');
        const closeLogin = document.getElementById('close-login');
        const loginForm = document.getElementById('login-form');

        // Initialize cart and wishlist counts
        let cartItems = 0;
        let wishlistItems = 0;

        // Load products
        function loadProducts() {
            productsContainer.innerHTML = '';
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        <span class="product-badge">${product.badge}</span>
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-specs">
                            <p>${product.specs}</p>
                        </div>
                        <div class="product-price">${product.price}</div>
                        <div class="product-actions">
                            <button class="btn btn-primary">Add to Cart</button>
                            <button class="icon-btn"><i class="far fa-heart"></i></button>
                        </div>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            });

            // Add event listeners to new buttons
            document.querySelectorAll('.product-actions .btn-primary').forEach(button => {
                button.addEventListener('click', addToCart);
            });

            document.querySelectorAll('.product-actions .icon-btn').forEach(button => {
                button.addEventListener('click', addToWishlist);
            });
        }

        // Theme toggle functionality
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = themeToggle.querySelector('i');
            
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.toggle('dark-mode', savedTheme === 'dark');
            const icon = themeToggle.querySelector('i');
            if (savedTheme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }

        // Add to cart function
        function addToCart() {
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Show notification
            showNotification('Item added to cart');
        }

        // Add to wishlist function
        function addToWishlist(event) {
            const icon = event.currentTarget.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            
            if (icon.classList.contains('fas')) {
                wishlistItems++;
                showNotification('Item added to wishlist');
            } else {
                wishlistItems--;
            }
            
            wishlistCount.textContent = wishlistItems;
        }

        // Show notification
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = 'var(--primary)';
            notification.style.color = 'var(--light)';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '4px';
            notification.style.zIndex = '1000';
            notification.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 2000);
        }

        // Tab switching functionality
        function switchTab(tabId) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab content
            document.getElementById(tabId).classList.add('active');
            
            // Update active tab
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            event.currentTarget.classList.add('active');
        }

        // Modal functionality
        document.querySelector('.btn-outline').addEventListener('click', () => {
            loginModal.style.display = 'flex';
        });

        closeLogin.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });

        // Login form submission
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (email && password) {
                showNotification('Login successful!');
                loginModal.style.display = 'none';
            } else {
                showNotification('Please fill all fields');
            }
        });

        // Filter functionality
        const filterSelects = document.querySelectorAll('.filters select');
        filterSelects.forEach(select => {
            select.addEventListener('change', filterProducts);
        });

        function filterProducts() {
            const category = document.getElementById('category').value;
            const price = document.getElementById('price').value;
            const brand = document.getElementById('brand').value;
            
            // Simple filtering logic for demonstration
            const filteredProducts = products.filter(product => {
                if (category !== 'All Categories' && product.category !== category) {
                    return false;
                }
                // Additional filter logic would go here
                return true;
            });
            
            // For demonstration, we'll just reload all products
            loadProducts();
        }

        // Initialize page
        loadProducts();
        
        // Add event listeners to initial buttons
        cartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });

        wishlistButtons.forEach(button => {
            button.addEventListener('click', addToWishlist);
        });
                //The full code by Radhwane Harres

// Enhanced Login Modal with Security and Animations
// The full code by Radhwane Harres
document.addEventListener('DOMContentLoaded', function() {
    const loginModal = document.getElementById('login-modal');
    const closeLogin = document.getElementById('close-login');
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Add CSS for animations and security features
    const style = document.createElement('style');
    style.textContent = `
        /* Modal animation styles */
        .modal {
            display: flex;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            transform: translateY(-50px) scale(0.9);
            opacity: 0;
            transition: transform 0.4s ease, opacity 0.4s ease;
        }
        
        .modal.active .modal-content {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        
        /* Loading animation */
        .btn-loading {
            position: relative;
            color: transparent !important;
        }
        
        .btn-loading::after {
            content: "";
            position: absolute;
            width: 20px;
            height: 20px;
            top: 50%;
            left: 50%;
            margin: -10px 0 0 -10px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Input validation styles */
        .form-group {
            position: relative;
            margin-bottom: 20px;
        }
        
        .error-message {
            color: #ff3860;
            font-size: 0.8rem;
            margin-top: 5px;
            display: none;
        }
        
        .input-error {
            border-color: #ff3860 !important;
        }
        
        .input-success {
            border-color: #23d160 !important;
        }
        
        /* Security message */
        .security-message {
            font-size: 0.8rem;
            color: #888;
            margin-top: 15px;
            text-align: center;
        }
        
        body.dark-mode .security-message {
            color: #aaa;
        }
        
        /* Success checkmark */
        .success-checkmark {
            display: none;
            text-align: center;
            margin: 20px 0;
        }
        
        .checkmark {
            color: #23d160;
            font-size: 3rem;
        }
        
        /* Shake animation for invalid login */
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        
        .shake {
            animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
        }
    `;
    document.head.appendChild(style);
    
    // Add security message to login form
    const securityMessage = document.createElement('p');
    securityMessage.className = 'security-message';
    securityMessage.innerHTML = '<i class="fas fa-lock"></i> Your login is secured with SSL encryption';
    loginForm.appendChild(securityMessage);
    
    // Add success checkmark element (initially hidden)
    const successCheckmark = document.createElement('div');
    successCheckmark.className = 'success-checkmark';
    successCheckmark.innerHTML = '<div class="checkmark"><i class="fas fa-check-circle"></i></div><p>Login successful! Redirecting...</p>';
    loginForm.appendChild(successCheckmark);
    
    // Add error message elements
    const emailError = document.createElement('div');
    emailError.className = 'error-message';
    emailError.id = 'email-error';
    emailInput.parentNode.appendChild(emailError);
    
    const passwordError = document.createElement('div');
    passwordError.className = 'error-message';
    passwordError.id = 'password-error';
    passwordInput.parentNode.appendChild(passwordError);
    
    // Function to open modal with animation
    function openLoginModal() {
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        loginModal.classList.add('active');
    }
    
    // Function to close modal with animation
    function closeLoginModal() {
        loginModal.classList.remove('active');
        setTimeout(() => {
            document.body.style.overflow = ''; // Re-enable scrolling
        }, 300);
    }
    
    // Event listener for login button (if exists)
    const loginButton = document.querySelector('button.btn-outline');
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            openLoginModal();
        });
    }
    
    // Event listener for close button
    closeLogin.addEventListener('click', closeLoginModal);
    
    // Close modal when clicking outside
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal.classList.contains('active')) {
            closeLoginModal();
        }
    });
    
    // Form validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePassword(password) {
        // At least 8 characters, one letter and one number
        const re = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        return re.test(password);
    }
    
    // Input validation on blur
    emailInput.addEventListener('blur', function() {
        if (!validateEmail(this.value)) {
            showError(this, emailError, 'Please enter a valid email address');
        } else {
            showSuccess(this);
            hideError(emailError);
        }
    });
    
    passwordInput.addEventListener('blur', function() {
        if (!validatePassword(this.value)) {
            showError(this, passwordError, 'Password must be at least 8 characters with letters and numbers');
        } else {
            showSuccess(this);
            hideError(passwordError);
        }
    });
    
    // Clear validation on input
    emailInput.addEventListener('input', function() {
        clearValidation(this, emailError);
    });
    
    passwordInput.addEventListener('input', function() {
        clearValidation(this, passwordError);
    });
    
    function showError(input, errorElement, message) {
        input.classList.add('input-error');
        input.classList.remove('input-success');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function showSuccess(input) {
        input.classList.remove('input-error');
        input.classList.add('input-success');
    }
    
    function hideError(errorElement) {
        errorElement.style.display = 'none';
    }
    
    function clearValidation(input, errorElement) {
        input.classList.remove('input-error', 'input-success');
        errorElement.style.display = 'none';
    }
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate inputs
        let isValid = true;
        
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!validatePassword(passwordInput.value)) {
            showError(passwordInput, passwordError, 'Password must be at least 8 characters with letters and numbers');
            isValid = false;
        }
        
        if (!isValid) {
          loginForm.classList.add('shake');
          setTimeout(() => {
           loginForm.classList.remove('shake');
             }, 600);

          // redirect if you want (optional)

          return; // stop further code
            }

        
        // Show loading state
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.innerHTML = 'Logging in...';
        submitButton.classList.add('btn-loading');
        submitButton.disabled = true;
        
        // Simulate login process (in a real application, this would be an API call)
        setTimeout(() => {
            // For demonstration purposes, let's assume login is successful
            simulateSuccessfulLogin();
        }, 1500);
    });
    
    function simulateSuccessfulLogin() {
        // Hide form elements
        const formElements = loginForm.querySelectorAll('.form-group, button, .security-message');
        formElements.forEach(el => {
            el.style.display = 'none';
        });
        
        // Show success message
        successCheckmark.style.display = 'block';
        
        // Redirect after a delay
        setTimeout(() => {
            // In a real application, you would redirect to a dashboard or home page
            // window.location.href = '/dashboard.html';
                      window.location.href = "A.index.html"; 

            // For demonstration, we'll just close the modal and show an alert
            closeLoginModal();
            alert('Login successful! Redirecting to dashboard...');
            
            // Reset form for next time
            resetLoginForm();
        }, 2000);
    }
    
    function resetLoginForm() {
        loginForm.reset();
        
        // Clear validation
        const inputs = loginForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('input-error', 'input-success');
        });
        
        const errors = loginForm.querySelectorAll('.error-message');
        errors.forEach(error => {
            error.style.display = 'none';
        });
        
        // Reset button state
        const submitButton = loginForm.querySelector('button[type="submit"]');
        submitButton.classList.remove('btn-loading');
        submitButton.disabled = false;
        submitButton.textContent = 'Login';
        
        // Show form elements again
        const formElements = loginForm.querySelectorAll('.form-group, button, .security-message');
        formElements.forEach(el => {
            el.style.display = 'block';
        });
        
        // Hide success message
        successCheckmark.style.display = 'none';
    }
    
    console.log('Enhanced login modal initialized');
});
// the user tag 
// the full code by Radhwane Harres
     document.addEventListener('DOMContentLoaded', function() {
            const userBtn = document.getElementById('user-btn');
            const userPopup = document.getElementById('user-info');
            const backdrop = document.getElementById('popover-backdrop');
            const closeBtn = userPopup.querySelector('.close-btn');
            const loginBtn = userPopup.querySelector('.btn');
            
            // Show popover and backdrop
            function showPopup() {
                backdrop.classList.add('show');
                userPopup.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
            
            // Hide popover and backdrop
            function hidePopup() {
                backdrop.classList.remove('show');
                userPopup.classList.remove('show');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
            
            // Show popover when button is clicked
            userBtn.addEventListener('click', showPopup);
            
            // Hide popover when clicking close button
            closeBtn.addEventListener('click', hidePopup);
            
            // Hide popover when clicking login button
            loginBtn.addEventListener('click', function() {
                hidePopup();
                alert('Click On Login button in the top right corner to login.');
                // In a real application, you would redirect to login page
                // window.location.href = '/login';
            });
            
            // Hide popover when clicking on backdrop
            backdrop.addEventListener('click', hidePopup);
            
            // Close with Escape key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    hidePopup();
                }
            });
        });
         // Add functionality to the logout button
        document.querySelector('.logout-btn').addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                alert('Logging out...');
                // In a real application, this would redirect to logout endpoint
                // window.location.href = '/logout';
            }
        });
        
        // Add click events to menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const menuText = this.querySelector('span').textContent;
                alert(`Navigating to ${menuText}...`);
            });
        });
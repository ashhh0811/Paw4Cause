document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameEmailInput = document.getElementById('usernameEmail');
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('togglePassword');

    // ===================================
    // 1. PASSWORD VISIBILITY TOGGLE 
    // ===================================
    togglePasswordButton.addEventListener('click', () => {
        const icon = togglePasswordButton.querySelector('i');
        
        // Toggle the input type between 'password' and 'text'
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Change the icon (fa-eye is open, fa-eye-slash is closed/hidden)
        if (type === 'text') {
            // Password is visible -> show the 'hide' icon
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash'); 
        } else {
            // Password is hidden -> show the 'show' icon
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye'); 
        }
    });


    const removeErrorOnInput = (inputElement) => {
        // Check if the input is not empty (and not just spaces)
        if (inputElement.value.trim().length > 0) {
            // Remove the 'input-error' class from the parent '.input-group'
            inputElement.parentElement.classList.remove('input-error');
        }
    };

    // Listen for typing/pasting on both fields
    usernameEmailInput.addEventListener('input', () => removeErrorOnInput(usernameEmailInput));
    passwordInput.addEventListener('input', () => removeErrorOnInput(passwordInput));
    
    // ===================================
    // 3. FORM VALIDATION 
    // ===================================
    loginForm.addEventListener('submit', (event) => {
        // Prevent the form from submitting and navigating away immediately
        event.preventDefault(); 

        const usernameEmail = usernameEmailInput.value.trim();
        const password = passwordInput.value.trim();

        // ... inside loginForm.addEventListener('submit', ...)

        if (usernameEmail === '' || password === '') {
            // 🚨 Validation failed: Fields are empty

            // ... alert box ...

            // ADD the error class
            if (usernameEmail === '') {
                usernameEmailInput.parentElement.classList.add('input-error');
                usernameEmailInput.focus();
            } else {
            // REMOVE the error class if user fixed it
                usernameEmailInput.parentElement.classList.remove('input-error');
            }
    
            if (password === '') {
                // ADD the error class
                passwordInput.parentElement.classList.add('input-error');
                if (usernameEmail !== '') {
                    passwordInput.focus();
                }
            } else {
                // REMOVE the error class if user fixed it
                passwordInput.parentElement.classList.remove('input-error');
            }
    
        } else {
        // ✅ Validation successful: Remove all error classes before navigating
            usernameEmailInput.parentElement.classList.remove('input-error');
            passwordInput.parentElement.classList.remove('input-error');
    
            window.location.href = 'home.html';
        }

    });
});
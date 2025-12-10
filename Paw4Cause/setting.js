document.addEventListener('DOMContentLoaded', () => {
    // Select main elements
    const sidebar = document.querySelector('.sidebar-menu');
    const menuItems = document.querySelectorAll('.sidebar-navigation li');
    const menuToggle = document.querySelector('.sidebar-toggle-top .menu-toggle');
    const closeBtn = document.querySelector('.sidebar-toggle-top .close-menu-btn');

    // --- Core Logic: Sets the active menu item based on the current URL ---
    const setActiveMenuItem = () => {
        // Get the current file name (e.g., "watchvideos.html" or "home.html")
        let currentPath = window.location.pathname.split('/').pop() || '';
        
        // Handle the root path: If empty, assume it's home.html
        if (currentPath === '' || currentPath.includes('home.html')) {
            currentPath = 'home.html';
        }

        // 1. Clear ALL active classes before setting the new one
        menuItems.forEach(el => {
            el.classList.remove('active');
        });

        // 2. Find the link that matches the current page and set its parent li as active
        menuItems.forEach(item => {
            const link = item.querySelector('a');
            
            if (link && link.href) {
                // Extract the file name from the link's href
                const linkPath = link.href.split('/').pop() || '';
                
                // Set active if the link matches the current page file name
                if (linkPath === currentPath) {
                    item.classList.add('active');
                }
            }
        });
    };

    // --- Menu Item Click Logic (Handles smooth transition when clicking) ---
    menuItems.forEach(item => {
        item.addEventListener('click', event => {
            // This handles the smooth visual transition BEFORE the browser navigates
            document.querySelector('.sidebar-navigation li.active')?.classList.remove('active');
            item.classList.add('active');
            
            // NOTE: The browser will then navigate to the link's HREF, 
            // and setActiveMenuItem() will run again on the next page load.
        });
    });

    // --- Sidebar Toggle Logic (Opens and closes the menu) ---
    const toggleMenu = () => {
        sidebar.classList.toggle('expanded');
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    }
    
    // *** CRITICAL STEP: Run the function immediately when the page loads ***
    setActiveMenuItem(); 
});


document.addEventListener('DOMContentLoaded', () => {
    // 1. Get all the list items in the settings-sidebar
    const settingItems = document.querySelectorAll('.settings-sidebar li');

    // 2. Iterate over each list item to add an event listener
    settingItems.forEach(item => {
        item.addEventListener('click', function() {
            
            // 3. First, find the currently active item and remove the 'active-setting' class
            // We use the same selector used for the current active item in the CSS
            const currentActive = document.querySelector('.settings-sidebar li.active-setting');
            
            if (currentActive) {
                currentActive.classList.remove('active-setting');
            }

            // 4. Then, add the 'active-setting' class to the item that was just clicked
            this.classList.add('active-setting');

            // Optional: You could add logic here to load the corresponding content 
            // based on the item clicked (e.g., if(this.textContent.includes('Privacy')) { /* load privacy form */ })
            // For now, we only handle the visual change.
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SETTINGS SIDEBAR NAVIGATION LOGIC ---
    const settingItems = document.querySelectorAll('.settings-sidebar li');

    settingItems.forEach(item => {
        item.addEventListener('click', function() {
            const currentActive = document.querySelector('.settings-sidebar li.active-setting');
            
            if (currentActive) {
                currentActive.classList.remove('active-setting');
            }

            this.classList.add('active-setting');
        });
    });

    // --- 2. ACCOUNT INFORMATION SAVE CHANGES LOGIC ---
    
    // Get the form element for Account Information
    const accountInfoForm = document.querySelector('.account-info-card form');

    // 👇 ADD THESE INPUT VARIABLE DEFINITIONS HERE 👇
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    // 👆 END OF ADDED VARIABLES 👆

    if (accountInfoForm) {
        accountInfoForm.addEventListener('submit', function(event) {
            // Prevent the default form submission (which reloads the page)
            event.preventDefault(); 
        
            // 1. Get the new values from the input fields
            const newFirstName = firstNameInput.value.trim();
            const newLastName = lastNameInput.value.trim();
            const newEmail = emailInput.value.trim();
            const newPhone = phoneInput.value.trim();
            const newAddress = addressInput.value.trim();

            // 2. Perform basic validation (Optional: Ensure fields aren't empty)
            if (!newFirstName || !newEmail) {
                alert('First Name and Email are required fields.');
                return; // Stop the function if validation fails
            }

            // 3. Update the inputs (This keeps the new values in the fields)
            
            // 4. DISPLAY THE CUSTOMIZED ALERT BOX
            alert('Account information has been successfully saved!'); 
        });
    }

    // --- 3. CANCEL BUTTON LOGIC (Optional but helpful) ---
    // The cancel button needs access to the form variable defined above.
    const cancelButton = document.querySelector('.button-cancel');
    if (cancelButton && accountInfoForm) { // Ensure both elements are present
        cancelButton.addEventListener('click', () => {
            accountInfoForm.reset();
            alert('Changes have been discarded.');
        });
    }
});

// --- 4. PASSWORD TOGGLE LOGIC (Updated for Font Awesome) ---
    const togglePasswordButton = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('confirmNewPassword');

    if (togglePasswordButton && passwordInput) {
        togglePasswordButton.addEventListener('click', function() {
            // Get the icon element inside the button
            const icon = this.querySelector('i');
            
            // Toggle the type attribute between 'password' and 'text'
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle the icon class for visual feedback
            if (type === 'text') {
                // Change to closed eye (fa-eye-slash) when password is visible
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                // Change to open eye (fa-eye) when password is hidden
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
            
            passwordInput.focus();
        });
    }
    // ----------------------------------------
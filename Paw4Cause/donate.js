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
    // 1. Select all necessary elements
    const oneTimeBtn = document.querySelector('.one-time-donation-btn');
    const monthlyBtn = document.querySelector('.monthly-giving-btn');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customInput = document.querySelector('.custom-input');
    const impactSummary = document.querySelector('.your-impact-summary p');
    const donateNowBtn = document.querySelector('.donate-now-btn');
    const causeCards = document.querySelectorAll('.cause-card');

    let selectedAmount = 25; // Default amount set in HTML

    // --- Helper Functions ---
    function setActiveAmountButton(targetButton) {
        amountButtons.forEach(btn => btn.classList.remove('active'));
        if (targetButton) {
            targetButton.classList.add('active');
            customInput.value = ''; // Clear custom input if a preset button is clicked
        }
    }
    // Function to update the text showing the impact and the final donation button
    function updateDisplay(amount) {
        selectedAmount = amount;
    
        // Calculate Impact
        // If $250 is selected, it should provide food for 10 animals for a week (250 / 25 = 10)
        const animalCount = Math.ceil(amount / 25); 
    
        // Create the clean, single message string
        const impactMessage = `**$${amount}** Can provide food for ${animalCount} animal${animalCount === 1 ? '' : 's'} for a week`;
    
        // Update Impact Summary - Use innerHTML since you have bold tags (**)
        impactSummary.innerHTML = impactMessage;
    
        // Update Donate Now Button
        donateNowBtn.textContent = `❤️ Donate $${amount} now`;
    }
    
    // --- 1. Donation Type Toggle (One-Time / Monthly) ---
    
    oneTimeBtn.addEventListener('click', () => {
        monthlyBtn.classList.remove('active');
        oneTimeBtn.classList.add('active');
        // Logic specific to one-time donation can go here (e.g., hiding recurring info)
    });

    monthlyBtn.addEventListener('click', () => {
        oneTimeBtn.classList.remove('active');
        monthlyBtn.classList.add('active');
        // Logic specific to monthly donation can go here
    });


    // --- 2. Amount Button Selection ---

    amountButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const amountText = e.target.textContent.replace('$', '');
            const amount = parseInt(amountText);
            
            setActiveAmountButton(e.target);
            updateDisplay(amount);
        });
    });


    // --- 3. Custom Amount Input ---
    
    customInput.addEventListener('input', (e) => {
        const amount = parseInt(e.target.value) || 0;
        
        // Remove active state from preset buttons
        setActiveAmountButton(null); 
        
        if (amount > 0) {
            updateDisplay(amount);
        } else {
            // Revert to default if custom input is cleared/invalid
            updateDisplay(10); 
        }
    });


    // --- 4. Cause Card Selection ---

    causeCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Find the closest parent with the class 'cause-card'
            const targetCard = e.currentTarget; 
            
            // Remove active from all cards
            causeCards.forEach(c => c.classList.remove('active'));
            
            // Add active to the clicked card
            targetCard.classList.add('active');
        });
    });


    // --- 5. Initial Load Setup ---

    // Ensure the initial active states are correctly reflected on load
    // Since $25 is active in HTML, we ensure the display matches.
    updateDisplay(selectedAmount); 
    
});
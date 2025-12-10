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

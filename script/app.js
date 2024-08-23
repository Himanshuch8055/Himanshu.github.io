/* ================= Variables/Constants ================= */
let oldTimeout;
let oldScrollY = window.scrollY;

/* ================= Navbar Constants ================= */
const navHeader = document.getElementById('nav-header');
const navMenu = document.getElementById('nav-menu');
const ham = document.getElementById('ham');
const content = document.getElementById('content');

/* ================== Global ==================== */

// Disable transitions & animations globally while the window is being resized. This helps in avoiding phantom animations
window.addEventListener('resize', () => {
    document.body.classList.add('no-animations');

    // If width is greater than 768px, force close the navbar
    if (window.innerWidth > 768) {
        hideNav();
    }

    // Clear the oldtimeout. Not required, just a good practice to clear what you've initialized
    clearTimeout(oldTimeout);
    
    // Timeout of 0.25s, just for a little breathing room if the user resizes their window like a maniac
    oldTimeout = setTimeout(() => {
        document.body.classList.remove('no-animations');
    }, 250);
});

/* ================= Navigation ================= */

// Helper functions utilized for hiding/unhiding navbar on mobile screens
// Setting the appropriate overflow property on the body to lock scrolling when menu is open
function hideNav() {
    navMenu.setAttribute('toggle', false);
    document.body.style.overflow = "auto";
}

function showNav() {
    navMenu.setAttribute('toggle', true);
    document.body.style.overflow = "hidden";
}

// Hide/show the navigation when the user scrolls downwards/upwards
window.addEventListener('scroll', () => {
    newScrollY = window.scrollY;

    // Force close the navbar
    hideNav();

    clearTimeout(prevTimeout);

    // Timeout is required to ensure that navbar slides-out first before hiding the header
    if (newScrollY > oldScrollY && oldScrollY >= 0) {
        var prevTimeout = setTimeout(() => {
            navHeader.classList.add('hide-nav');
        }, 50);
    } else if (newScrollY <= 0) {
        navHeader.classList.remove('hide-nav', 'resize-nav');
    } else {
        navHeader.classList.add('resize-nav');
        navHeader.classList.remove('hide-nav');
    }

    // Update oldScroll position because if we did it before both scroll will be the same, thereby, rendering our if statement useless
    oldScrollY = newScrollY;
});

// Hide the navigation menu if the user touches any area outside of nav-menu i.e, the blurred content
['click', 'touchmove'].forEach(eve => {
    content.addEventListener(eve, hideNav);
});

// Add functionality to the hamburger for hiding & unhiding the navigation
ham.addEventListener('click', () => {
    visible = navMenu.getAttribute('toggle');

    if (visible == 'false') {
        showNav();
    } else {
        hideNav();
    }
});
// Function to show the loader
// The full Code by Radhwane Harres 
function showLoader() {
    const loader = document.querySelector('.newtons-cradle');
    if (loader) {
        loader.style.display = 'flex';
    }
}

// Function to hide the loader
function hideLoader() {
    const loader = document.querySelector('.newtons-cradle');
    if (loader) {
        loader.style.display = 'none';
    }
}

// Function to start the loader for 2 seconds and then remove it
function runLoader() {
    showLoader();
    
    setTimeout(() => {
        hideLoader();
    }, 2000);
}

// Start the loader when the page loads
document.addEventListener('DOMContentLoaded', function() {
    runLoader();
});

// You can also call runLoader() manually whenever you need to show the loader
// For example: runLoader();
// The full code by Radhwane Harees 
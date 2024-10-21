document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById('image-container');

    // Specify the number of images (replace with the actual count if you know it)
    const totalImages = 168; // Adjust this number according to the total images you have
    const imagesPerLoad = 10; // Number of images to load at a time
    let currentImageIndex = 1; // Start with the first image

    // Function to create a placeholder image element
    function createImageElement(imageNumber) {
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', `./images/${imageNumber}.JPG`); // Use the folder path here
        imgElement.classList.add('placeholder');
        imgElement.alt = `Image ${imageNumber}`;
        return imgElement;
    }

    // Function to load more images
    function loadMoreImages() {
        const endIndex = Math.min(currentImageIndex + imagesPerLoad - 1, totalImages);
        for (let i = currentImageIndex; i <= endIndex; i++) {
            const imageElement = createImageElement(i);
            imageContainer.appendChild(imageElement);
        }
        currentImageIndex += imagesPerLoad; // Move to the next batch
    }

    // Initial load of images
    loadMoreImages();

    // Function to check if the user has scrolled to the bottom
    function checkScroll() {
        // Check if the user has scrolled to the bottom of the page
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            if (currentImageIndex <= totalImages) {
                loadMoreImages();
            }
        }
    }

    // Listen for the scroll event
    window.addEventListener('scroll', checkScroll);

    // Lazy load images using IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('src'); // Load the image
                img.onload = () => img.classList.remove('placeholder'); // Remove placeholder class once loaded
                observer.unobserve(img); // Stop observing this image since it's loaded
            }
        });
    });

    // Observe each image element for lazy loading
    function observeImages() {
        const images = document.querySelectorAll('img[src]');
        images.forEach(image => observer.observe(image));
    }

    // Initial observation for the first batch of images
    observeImages();
});

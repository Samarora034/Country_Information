var slides = document.querySelectorAll('.slide');
var currentSlide = 0;

// Function to show the current slide
function showSlide() {
  // Hide all slides
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  // Display the current slide
  slides[currentSlide].style.display = 'block';
}

// Function to switch to the next slide
function nextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide();
}

// Set interval to switch slides every 3 seconds
setInterval(nextSlide, 3000);

// Show the initial slide
showSlide();

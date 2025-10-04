// ----------------- Mobile Nav -----------------
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ----------------- Main Slider -----------------
let mainCurrent = 0;
const mainSlider = document.getElementById('slider');
const mainSlides = document.querySelectorAll('.slide');
const mainTotal = mainSlides.length;
const mainPrev = document.querySelector('.nav-button.prev');
const mainNext = document.querySelector('.nav-button.next');

let autoSlideTimer;
const autoSlideDelay = 3000; // 3 seconds

function updateMainSlider() {
    mainSlider.style.transform = `translateX(-${mainCurrent * 100}%)`;

    mainSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === mainCurrent);
    });

    mainPrev.disabled = mainCurrent === 0;
    mainNext.disabled = mainCurrent === mainTotal - 1;
}

function changeMainSlide(dir) {
    let newIndex = mainCurrent + dir;

    if (newIndex >= mainTotal) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = mainTotal - 1;
    }

    mainCurrent = newIndex;
    updateMainSlider();
    resetMainAuto();
}

// Auto slide
function startMainAuto() {
    autoSlideTimer = setInterval(() => {
        changeMainSlide(1);
    }, autoSlideDelay);
}

function resetMainAuto() {
    clearInterval(autoSlideTimer);
    startMainAuto();
}

// Buttons
mainPrev.addEventListener('click', () => changeMainSlide(-1));
mainNext.addEventListener('click', () => changeMainSlide(1));

// Keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changeMainSlide(-1);
    if (e.key === 'ArrowRight') changeMainSlide(1);
});

// Touch/Swipe
let mainTouchStart = 0;
let mainTouchEnd = 0;
const mainWrapper = document.querySelector('.slider-wrapper');

mainWrapper.addEventListener('touchstart', (e) => {
    mainTouchStart = e.changedTouches[0].screenX;
});
mainWrapper.addEventListener('touchend', (e) => {
    mainTouchEnd = e.changedTouches[0].screenX;
    handleMainSwipe();
});

function handleMainSwipe() {
    const diff = mainTouchStart - mainTouchEnd;
    if (Math.abs(diff) > 50) {
        if (diff > 0) changeMainSlide(1);
        else changeMainSlide(-1);
    }
}

// Init
updateMainSlider();
startMainAuto();

// ----------------- Testimonials Slider -----------------
const testSlides = document.querySelectorAll('.slide-tests');
const testIndicators = document.querySelectorAll('.indicator');
let testCurrent = 0;
let testTransitioning = false;
let testAutoTimer;

function goToTestSlide(index) {
    if (testTransitioning || index === testCurrent) return;

    testTransitioning = true;

    // Current slide/indicator
    testSlides[testCurrent].classList.remove('active');
    testSlides[testCurrent].classList.add('prev');
    testIndicators[testCurrent].classList.remove('active');

    // Next slide/indicator
    testSlides[index].classList.remove('prev');
    testSlides[index].classList.add('active');
    testIndicators[index].classList.add('active');

    testCurrent = index;

    setTimeout(() => {
        testSlides.forEach((s, i) => {
            if (i !== testCurrent) s.classList.remove('prev');
        });
        testTransitioning = false;
    }, 500);
}

// Indicator clicks
testIndicators.forEach((ind, i) => {
    ind.addEventListener('click', () => goToTestSlide(i));
});

// Auto play
function startTestAuto() {
    testAutoTimer = setInterval(() => {
        goToTestSlide((testCurrent + 1) % testSlides.length);
    }, 5000);
}
function stopTestAuto() {
    clearInterval(testAutoTimer);
}

// Hover pause
const testContainer = document.querySelector('.slider-container-tests');
testContainer.addEventListener('mouseenter', stopTestAuto);
testContainer.addEventListener('mouseleave', startTestAuto);

// Touch/Swipe
let testTouchStart = 0;
let testTouchEnd = 0;

testContainer.addEventListener('touchstart', (e) => {
    testTouchStart = e.changedTouches[0].screenX;
    stopTestAuto();
});
testContainer.addEventListener('touchend', (e) => {
    testTouchEnd = e.changedTouches[0].screenX;
    handleTestSwipe();
    startTestAuto();
});

function handleTestSwipe() {
    const diff = testTouchStart - testTouchEnd;
    if (Math.abs(diff) > 50) {
        if (diff > 0) goToTestSlide((testCurrent + 1) % testSlides.length);
        else goToTestSlide((testCurrent - 1 + testSlides.length) % testSlides.length);
    }
}

// Init
startTestAuto();

 const floatingIcon = document.getElementById('floatingIcon');
        const iconBtn = document.getElementById('iconBtn');
        const modalOverlay = document.getElementById('modalOverlay');
        const navbar = document.querySelector('nav');

        // Show/hide floating icon based on scroll
        window.addEventListener('scroll', () => {
            const navbarHeight = navbar.offsetHeight;
            if (window.scrollY > navbarHeight) {
                floatingIcon.classList.add('visible');
            } else {
                floatingIcon.classList.remove('visible');
            }
        });

        // Open modal
        iconBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close modal
        function closeModal() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking overlay
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        // Download handler
        function handleDownload() {
            alert('Redirecting to download page...');
            // Add your download link here
            // window.location.href = 'your-download-link';
        }

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });

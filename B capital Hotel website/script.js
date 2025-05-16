// script.js for B Capital Hotel

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Hero Slider
    const heroSlider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.hero-slider .slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    const slideCount = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance when hovering over slider
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevTestimonial = document.querySelector('.prev-testimonial');
    const nextTestimonial = document.querySelector('.next-testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;
    const testimonialCount = testimonials.length;

    // Create dots
    for (let i = 0; i < testimonialCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToTestimonial(i);
        });
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    function goToTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCount;
        goToTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialCount) % testimonialCount;
        goToTestimonial(currentTestimonial);
    }

    nextTestimonial.addEventListener('click', nextTestimonial);
    prevTestimonial.addEventListener('click', prevTestimonial);

    // Auto-advance testimonials every 7 seconds
    setInterval(nextTestimonial, 7000);

    // Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            const filter = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox Gallery
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            const imgAlt = item.querySelector('img').getAttribute('alt');
            
            lightboxImg.setAttribute('src', imgSrc);
            lightboxCaption.textContent = imgAlt;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Booking Modal
    const bookingModal = document.querySelector('.booking-modal');
    const bookingButtons = document.querySelectorAll('[href="#booking"], .booking-btn .btn');
    const closeModal = document.querySelector('.close-modal');

    bookingButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            bookingModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Current Year for Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
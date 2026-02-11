document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (hamburger) {
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70; // Height of fixed header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Header Color Change on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(13, 17, 23, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            header.style.backgroundColor = 'rgba(13, 17, 23, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Custom Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    const iframe = document.getElementById('hidden_iframe');

    if (contactForm && iframe) {
        let submitted = false;

        contactForm.addEventListener('submit', () => {
            submitted = true;
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;
        });

        iframe.addEventListener('load', () => {
            if (submitted) {
                const btn = contactForm.querySelector('button');
                btn.innerText = 'Message Sent!';
                btn.style.backgroundColor = '#238636';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerText = 'Send Message';
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    submitted = false;
                }, 3000);
            }
        });
    }
});

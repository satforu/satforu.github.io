// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Typing animation for hero text
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const phrases = ['Made Simple', 'Made Easy', 'Made Intuitive', 'Made Guided', 'Made Accessible', 'Made Smart'];
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        
        function typeAnimation() {
            const current = phrases[currentPhrase];
            
            if (isDeleting) {
                typingText.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typingText.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && currentChar === current.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                typeSpeed = 500; // Pause before next phrase
            }
            
            setTimeout(typeAnimation, typeSpeed);
        }
        
        // Start animation after initial delay
        setTimeout(typeAnimation, 1000);
    }
    
    // Load latest YouTube content
    loadLatestYouTubeContent();
    
    // Animate stats on scroll
    const observeStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observeStats.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.score-stats');
    if (statsSection) {
        observeStats.observe(statsSection);
    }
    
    // Animate feature cards on scroll
    const observeCards = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observeCards.observe(card);
    });
});

// Animate statistics counters
function animateStats() {
    // Stats animation removed - no fake numbers
}

function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50; // 50 steps
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + suffix;
    }, 40);
}

// Load latest YouTube content
async function loadLatestYouTubeContent() {
    try {
        // For demonstration, we'll create a placeholder
        // In a real implementation, you'd use the YouTube API
        const streamPreview = document.getElementById('latest-stream');
        const mainYouTubeEmbed = document.getElementById('main-youtube-embed');
        
        if (streamPreview) {
            // Show simple placeholder directing to YouTube
            setTimeout(() => {
                streamPreview.innerHTML = `
                    <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; text-align: center;">
                        <div style="font-weight: 600; margin-bottom: 0.5rem;">Visit YouTube for Latest Content</div>
                        <div style="color: #6b7280; font-size: 0.9rem;">Check @sat4u.official for live streams and videos!</div>
                    </div>
                `;
            }, 1000);
        }
        
        if (mainYouTubeEmbed) {
            // Create a responsive YouTube embed placeholder
            setTimeout(() => {
                mainYouTubeEmbed.innerHTML = `
                    <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; background: #000; border-radius: 8px; overflow: hidden;">
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">▶️</div>
                            <div style="font-size: 1.1rem; font-weight: 600;">Visit our YouTube Channel</div>
                            <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.5rem;">@sat4u.official for SAT prep content</div>
                        </div>
                    </div>
                `;
                
                // Make it clickable to open YouTube
                mainYouTubeEmbed.style.cursor = 'pointer';
                mainYouTubeEmbed.addEventListener('click', () => {
                    window.open('https://www.youtube.com/@sat4u.official', '_blank');
                });
            }, 1200);
        }
    } catch (error) {
        console.log('Error loading YouTube content:', error);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll reveal animations
function addScrollRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Add reveal class to elements that should animate
    document.querySelectorAll('.feature-card, .content-card, .cta-content').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Add CSS for reveal animations
const revealStyles = `
<style>
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.reveal.revealed {
    opacity: 1;
    transform: translateY(0);
}

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}
</style>
`;

// Add reveal styles to head
document.head.insertAdjacentHTML('beforeend', revealStyles);

// Initialize reveal animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollRevealAnimations);

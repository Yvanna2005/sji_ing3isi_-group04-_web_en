let currentStep = 1;
    const totalSteps = 5;

    // Initialize theme from localStorage on page load
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        }
        // Initialize first card
        updateCards();
    });

    function updateCards() {
        document.querySelectorAll('.step-card').forEach(card => {
            card.classList.remove('active');
            if (parseInt(card.dataset.step) === currentStep) {
                card.classList.add('active');
            }
        });
    }

    function nextStep() {
        if (currentStep < totalSteps) {
            currentStep++;
            updateCards();
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            updateCards();
        }
    }

    function toggleTheme() {
        const body = document.body;
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Intersection Observer for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hero, .how-to-play, .history, .support, .game-section, footer').forEach(section => {
        observer.observe(section);
    });
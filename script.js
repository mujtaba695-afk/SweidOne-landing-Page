document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Travel Map Destinations
    // ----------------------------------------------------
    const destCards = document.querySelectorAll('.dest-card');

    function selectDestination(id) {
        // Toggle active classes on cards
        destCards.forEach(card => {
            const isActive = card.dataset.id === id;
            card.classList.toggle('active', isActive);
            card.setAttribute('aria-selected', isActive ? 'true' : 'false');
            
            // Show/hide info paragraph
            const infoText = card.querySelector('.dest-info-text');
            if (infoText) {
                infoText.style.display = isActive ? 'block' : 'none';
            }
        });
    }

    // Attach click events to destination cards
    destCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            selectDestination(id);
        });
    });

    // Initialize first destination on load
    selectDestination('marina');

    // ----------------------------------------------------
    // 2. Scroll Watchers (Header & Sticky Action Hub)
    // ----------------------------------------------------
    const stickyHub = document.getElementById('sticky-hub');
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Sticky Action Hub visible after scrolling 300px
        if (stickyHub) {
            if (scrollPos > 300) {
                stickyHub.classList.add('visible');
            } else {
                stickyHub.classList.remove('visible');
            }
        }

        // Add subtle background drop-shadow/solidification to header on scroll
        if (header) {
            if (scrollPos > 50) {
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
            } else {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.02)';
            }
        }
    });

    // ----------------------------------------------------
    // 3. Form Submit Handler (Capturing Leads)
    // ----------------------------------------------------
    const leadForm = document.getElementById('leadCaptureForm');
    const leadCard = document.querySelector('.lead-card');

    if (leadForm && leadCard) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract values
            const name = document.getElementById('name').value;
            const mobile = document.getElementById('mobile').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const size = document.getElementById('size').value;
            const timeline = document.getElementById('timeline').value;

            // Log details (mock backend capture)
            console.log('Lead Captured Successfully:', {
                name,
                mobile,
                email,
                company,
                size,
                timeline,
                source: 'Sweid One Fitted Landing Page',
                timestamp: new Date().toISOString()
            });

            // Reconstruct lead card layout for success state (replicates H-H flow)
            leadCard.innerHTML = `
                <div class="success-card">
                    <div class="success-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <h2>Enquiry received.</h2>
                    <p>Thank you for your interest in Sweid One fitted offices. Our commercial team at Cushman & Wakefield Core will contact you within 24 hours.</p>
                    <div class="mini-location" style="margin-top: 15px;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span>Sweid One &bull; JLT, Dubai</span>
                    </div>
                </div>
            `;
        });
    }

    // ----------------------------------------------------
    // 4. Brochure Download Modal
    // ----------------------------------------------------
    const brochureModal = document.getElementById('brochure-modal');
    const brochureTriggers = document.querySelectorAll('.brochure-trigger');
    const brochureClose = document.querySelector('.brochure-modal-close');
    const brochureForm = document.getElementById('brochureDownloadForm');
    const brochureUrl = 'https://raw.githubusercontent.com/mujtaba695-afk/SweidOne-landing-Page/main/SweidOne_Brochure%20Desktop.pdf';

    function openBrochureModal() {
        if (!brochureModal) return;

        brochureModal.hidden = false;
        document.body.style.overflow = 'hidden';
        document.getElementById('brochure-name')?.focus();
    }

    function closeBrochureModal() {
        if (!brochureModal) return;

        brochureModal.hidden = true;
        document.body.style.overflow = '';
    }

    brochureTriggers.forEach(trigger => {
        trigger.addEventListener('click', openBrochureModal);
    });

    brochureClose?.addEventListener('click', closeBrochureModal);

    brochureModal?.addEventListener('click', (e) => {
        if (e.target === brochureModal) {
            closeBrochureModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && brochureModal && !brochureModal.hidden) {
            closeBrochureModal();
        }
    });

    brochureForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const brochureLead = {
            name: document.getElementById('brochure-name').value,
            mobile: document.getElementById('brochure-mobile').value,
            email: document.getElementById('brochure-email').value,
            source: 'Sweid One Brochure Download',
            timestamp: new Date().toISOString()
        };

        console.log('Brochure Download Lead Captured:', brochureLead);
        window.open(brochureUrl, '_blank', 'noopener');
        brochureForm.reset();
        closeBrochureModal();
    });
});

/* ==========================================================================
   SREEJITH M - NIXTIO AI SAAS PORTFOLIO SCRIPT
   Theme switcher, skills category filter, modal triggers & interactive feedback
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Dark / Light Theme Toggle
  const themeBtn = document.getElementById('theme-btn');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // 3. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 4. Skills Category Tabs
  const filterTabs = document.querySelectorAll('.saas-filter-tab');
  const skillCards = document.querySelectorAll('.skill-card-saas');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 5. Resume Modal Preview
  const resumeModal = document.getElementById('resume-modal');
  const modalClose = document.getElementById('modal-close');
  const resumeTriggers = [
    document.getElementById('nav-resume-btn'),
    document.getElementById('hero-open-resume'),
    document.getElementById('about-open-resume'),
    document.getElementById('cta-view-resume')
  ];

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('open');
      resumeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      resumeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  resumeTriggers.forEach(btn => {
    if (btn) btn.addEventListener('click', openResumeModal);
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeResumeModal();
  });

  // 6. Direct Contact Form Mailto Handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name').value.trim();
      const email = document.getElementById('c-email').value.trim();
      const subject = document.getElementById('c-subject').value.trim();
      const message = document.getElementById('c-message').value.trim();

      const mailtoUrl = `mailto:sreejithvm65@gmail.com?subject=${encodeURIComponent(subject || 'Opportunity Inquiry')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;
    });
  }
});

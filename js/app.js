/* ============================================
   BambooConnect India — Main Application
   ============================================ */

class AppMain {
  constructor() {
    this.init();
  }

  async init() {
    // 1. Initialize data layer (Now awaits Supabase)
    await initializeData();

    // 2. Initialize modules
    if (typeof SearchEngine !== 'undefined') {
      window.searchEngine = new SearchEngine();
    }
    
    if (typeof BambooMap !== 'undefined') {
      window.bambooMap = new BambooMap('india-map-svg');
    }
    
    if (typeof RegistrationForm !== 'undefined') {
      window.registrationForm = new RegistrationForm();
    }

    // 3. Setup UI Components
    this.setupNavigation();
    this.setupModals();
    this.renderDynamicSections();
    this.updateStats();

    // 4. Start visual effects
    if (typeof initScrollReveal === 'function') initScrollReveal();
    var heroBg = document.querySelector('.hero');
    if (heroBg && typeof createLeafParticles === 'function') createLeafParticles(heroBg, 20);

    // Initial route handle
    this.handleRouting();
    window.addEventListener('hashchange', () => this.handleRouting());
  }

  setupNavigation() {
    var navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', debounce(() => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, 10));

    var menuBtn = document.getElementById('mobile-menu-btn');
    var navLinks = document.getElementById('nav-links');
    
    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
      });

      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          menuBtn.textContent = '☰';
        });
      });
    }
  }

  setupModals() {
    var modals = document.querySelectorAll('.modal');
    var backdrop = document.querySelector('.modal-backdrop');
    var closeBtns = document.querySelectorAll('.modal-close');
    var openBtns = document.querySelectorAll('[data-modal]');

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        var modalId = btn.getAttribute('data-modal');
        var modal = document.getElementById(modalId);
        if (modal && backdrop) {
          backdrop.classList.add('active');
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    var closeModal = () => {
      modals.forEach(m => m.classList.remove('active'));
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
    };

    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
    if (backdrop) backdrop.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  handleRouting() {
    var hash = window.location.hash || '#home';
    var navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
      if (link.getAttribute('href') === hash) link.classList.add('active');
      else link.classList.remove('active');
    });

    if (hash !== '#home') {
      scrollToElement(hash.substring(1));
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  updateStats() {
    var stats = getStats();
    
    var pCount = document.getElementById('stat-providers-count');
    var sCount = document.getElementById('stat-states-count');
    var cCount = document.getElementById('stat-capacity-count');
    
    if (pCount) {
      pCount.dataset.counter = stats.verifiedProviders;
      animateCounter(pCount, stats.verifiedProviders);
    }
    if (sCount) {
      sCount.dataset.counter = stats.totalStates;
      animateCounter(sCount, stats.totalStates);
    }
    if (cCount) {
      var capVal = Math.round(stats.totalCapacity / 100);
      cCount.dataset.counter = capVal;
      animateCounter(cCount, capVal);
    }
  }

  renderDynamicSections() {
    this.renderSpeciesEncyclopedia();
    this.renderRequirementsBoard();
    this.renderGovSchemes();
  }

  renderSpeciesEncyclopedia() {
    var container = document.getElementById('species-container');
    if (!container) return;

    var html = '';
    BAMBOO_SPECIES.forEach(function(sp, index) {
      const delay = index * 0.1;
      let cardHtml = renderSpeciesCard(sp).trim();
      cardHtml = cardHtml.replace('class="species-card reveal"', `class="species-card" style="animation: fadeInUp 0.6s ease forwards; animation-delay: ${delay}s; opacity: 0;"`);
      html += cardHtml;
    });
    container.innerHTML = html;
  }

  renderRequirementsBoard() {
    var container = document.getElementById('requirements-container');
    if (!container) return;

    var reqs = getRequirements().filter(r => r.status === 'open').slice(0, 6);
    var html = '';
    reqs.forEach(function(req, index) {
      const delay = index * 0.1;
      let cardHtml = renderRequirementCard(req).trim();
      cardHtml = cardHtml.replace('class="requirement-card reveal"', `class="requirement-card" style="animation: fadeInUp 0.6s ease forwards; animation-delay: ${delay}s; opacity: 0;"`);
      html += cardHtml;
    });
    container.innerHTML = html;
  }

  renderGovSchemes() {
    var container = document.getElementById('schemes-container');
    if (!container) return;

    var html = '';
    GOV_SCHEMES.forEach(function(scheme, index) {
      var iconClass = (index % 2 === 0) ? 'green' : 'gold';
      var delayClass = 'delay-' + (index + 1);
      html += '<a href="' + scheme.link + '" target="_blank" class="knowledge-card reveal ' + delayClass + '" style="text-decoration:none;">'
        + '<div class="knowledge-icon ' + iconClass + '">' + scheme.icon + '</div>'
        + '<div>'
        + '<h4 style="color:var(--text-primary);">' + scheme.name + '</h4>'
        + '<p style="color:var(--text-secondary); margin-bottom: 4px;">' + scheme.description + '</p>'
        + '<span style="font-size:0.75rem; color:var(--primary-light); font-weight:500;">' + scheme.subsidy + '</span>'
        + '</div>'
        + '</a>';
    });
    container.innerHTML = html;
  }
  setupPostRequirementForm() {
    var speciesSelect = document.getElementById('req-species');
    var stateSelect = document.getElementById('req-state');
    var districtSelect = document.getElementById('req-district');
    var reqForm = document.getElementById('post-requirement-form');
    var btnSubmit = document.getElementById('btn-submit-req');

    if (speciesSelect) {
      BAMBOO_SPECIES.forEach(sp => {
        var opt = document.createElement('option');
        opt.value = sp.name;
        opt.textContent = sp.name;
        speciesSelect.appendChild(opt);
      });
    }

    if (stateSelect && typeof INDIAN_STATES !== 'undefined') {
      Object.keys(INDIAN_STATES).sort().forEach(state => {
        var opt = document.createElement('option');
        opt.value = state;
        opt.textContent = state;
        stateSelect.appendChild(opt);
      });

      stateSelect.addEventListener('change', (e) => {
        districtSelect.innerHTML = '<option value="">Select District</option>';
        if (e.target.value && INDIAN_STATES[e.target.value]) {
          INDIAN_STATES[e.target.value].sort().forEach(dist => {
            var opt = document.createElement('option');
            opt.value = dist;
            opt.textContent = dist;
            districtSelect.appendChild(opt);
          });
          districtSelect.disabled = false;
        } else {
          districtSelect.disabled = true;
        }
      });
    }

    if (reqForm) {
      reqForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        var fd = new FormData(reqForm);
        var reqData = Object.fromEntries(fd.entries());
        
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Posting...';

        var result = await addRequirement(reqData);
        
        if (result) {
          showToast('Requirement posted successfully!', 'success');
          document.getElementById('post-requirement-modal').classList.remove('active');
          document.querySelector('.modal-backdrop').classList.remove('active');
          document.body.style.overflow = '';
          reqForm.reset();
          districtSelect.disabled = true;
          this.renderRequirementsBoard(); // Refresh board

          // Crucial fix: Re-initialize scroll reveal for new cards so they appear!
          if (typeof initScrollReveal === 'function') {
            setTimeout(initScrollReveal, 50);
          }
        } else {
          showToast('Failed to post requirement.', 'error');
        }
        
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Post Requirement';
      });
    }
  }

}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  window.appMain = new AppMain();
  window.appMain.setupPostRequirementForm();
});

// Global functions for inline HTML event handlers
window.viewProviderDetails = function(id) {
  var providers = getProviders();
  var provider = providers.find(p => p.id === id);
  if (!provider) return;
  showToast('Contacting ' + provider.name + ' (' + provider.phone + ')...', 'info');
};

window.openPostRequirementModal = function() {
  var modal = document.getElementById('post-requirement-modal');
  var backdrop = document.querySelector('.modal-backdrop');
  if (modal && backdrop) {
    backdrop.classList.add('active');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

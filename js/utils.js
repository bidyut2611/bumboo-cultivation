/* ============================================
   BambooConnect India — Utility Functions
   ============================================ */

// Debounce utility
function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Animate counter from 0 to target
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const easeout = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * easeout);
    element.textContent = formatNumber(current);
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Scroll reveal observer
var _globalScrollObserver = null;
function initScrollReveal() {
  if (_globalScrollObserver) {
    _globalScrollObserver.disconnect();
  }
  
  _globalScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // If it's a stats counter, animate it
        if (entry.target.dataset.counter && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          const target = parseInt(entry.target.dataset.counter);
          animateCounter(entry.target, target);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children').forEach(el => {
    _globalScrollObserver.observe(el);
  });

  document.querySelectorAll('[data-counter]').forEach(el => {
    _globalScrollObserver.observe(el);
  });
}

// Create floating leaf particles
function createLeafParticles(container, count = 15) {
  const leaves = ['🍃', '🌿', '🎋', '🎍', '☘️'];

  for (let i = 0; i < count; i++) {
    const leaf = document.createElement('span');
    leaf.className = 'leaf-particle';
    leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
    leaf.style.left = Math.random() * 100 + '%';
    leaf.style.top = -(Math.random() * 20) + '%';
    leaf.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    leaf.style.animationDuration = (8 + Math.random() * 12) + 's';
    leaf.style.animationDelay = (Math.random() * 10) + 's';
    leaf.style.opacity = 0.15 + Math.random() * 0.25;
    container.appendChild(leaf);
  }
}

// Toast notification
function showToast(message, type = 'success', duration = 4000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Ripple effect on buttons
function addRippleEffect(button, e) {
  const ripple = document.createElement('span');
  ripple.className = 'ripple-effect';
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

// Get initials from name
function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

// Truncate text
function truncate(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

// Get relative time
function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// Smooth scroll to element
function scrollToElement(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Validate email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate phone (Indian)
function isValidPhone(phone) {
  return /^(\+91[\-\s]?)?[6-9]\d{4}[\-\s]?\d{5}$/.test(phone.replace(/\s/g, ''));
}

// Generate provider card HTML
function renderProviderCard(provider) {
  const initials = getInitials(provider.name);
  const speciesTags = provider.bambooTypes.map(s =>
    `<span class="species-tag">${s.split(' ').pop()}</span>`
  ).join('');

  return `
    <div class="provider-card reveal" data-provider-id="${provider.id}">
      <div class="provider-card-header">
        <div class="flex items-center gap-md">
          <div class="provider-avatar">${initials}</div>
          <div>
            <div class="provider-name">${provider.name}</div>
            <div class="provider-location">📍 ${provider.district}, ${provider.state}</div>
          </div>
        </div>
        ${provider.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
      </div>
      <div class="provider-details">
        <div class="provider-detail">
          <span class="provider-detail-label">Capacity</span>
          <span class="provider-detail-value">${provider.capacityTonnes} tonnes/yr</span>
        </div>
        <div class="provider-detail">
          <span class="provider-detail-label">Land Area</span>
          <span class="provider-detail-value">${provider.landAreaAcres} acres</span>
        </div>
        <div class="provider-detail">
          <span class="provider-detail-label">Experience</span>
          <span class="provider-detail-value">${provider.experienceYears} years</span>
        </div>
        <div class="provider-detail">
          <span class="provider-detail-label">PIN Code</span>
          <span class="provider-detail-value">${provider.pincode}</span>
        </div>
      </div>
      <div class="provider-species-tags">${speciesTags}</div>
      <div class="provider-actions">
        <button class="btn btn-primary btn-sm" onclick="viewProviderDetails('${provider.id}')">
          📞 Contact
        </button>
        <button class="btn btn-outline btn-sm" onclick="viewProviderDetails('${provider.id}')">
          View Details
        </button>
      </div>
    </div>
  `;
}

// Generate requirement card HTML
function renderRequirementCard(req) {
  return `
    <div class="requirement-card reveal">
      <div class="requirement-header">
        <h4 style="font-size:1rem;">${req.title}</h4>
        <span class="requirement-urgency urgency-${req.urgency}">${req.urgency}</span>
      </div>
      <p style="font-size:0.85rem; margin-bottom: var(--space-sm);">${req.description}</p>
      <div class="provider-species-tags" style="margin-bottom:var(--space-sm);">
        <span class="species-tag">${req.species === 'any' ? 'Any Species' : req.species}</span>
        <span class="species-tag" style="background:rgba(212,168,67,0.1);border-color:rgba(212,168,67,0.25);color:var(--accent);">${req.quantity}</span>
      </div>
      <div class="requirement-meta">
        <span class="requirement-meta-item">📍 ${req.district}, ${req.state}</span>
        <span class="requirement-meta-item">👤 ${req.postedBy}</span>
        <span class="requirement-meta-item">📅 ${getRelativeTime(req.postedDate)}</span>
      </div>
      <div style="margin-top:var(--space-md);">
        <button class="btn btn-accent btn-sm" onclick="showToast('Contact: ${req.contact}', 'info')">📞 Respond</button>
      </div>
    </div>
  `;
}

// Render species card
function renderSpeciesCard(species) {
  const useTags = species.uses.slice(0, 4).map(u =>
    `<span class="species-use">${u}</span>`
  ).join('');

  const imageStyle = species.image 
    ? `background-image: url('${species.image}'); background-size: cover; background-position: center;`
    : '';

  return `
    <div class="species-card reveal">
      <div class="species-card-image" style="${imageStyle}">
        ${!species.image ? `<span>${species.emoji}</span>` : ''}
      </div>
      <div class="species-card-body">
        <h4>${species.name}</h4>
        <div class="common-name">${species.commonName}</div>
        <p>${truncate(species.description, 90)}</p>
        <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:var(--space-sm);">
          ⏱ Harvest: ${species.harvestCycle} · 📏 ${species.maxHeight}
        </div>
        <div class="species-meta">${useTags}</div>
      </div>
    </div>
  `;
}

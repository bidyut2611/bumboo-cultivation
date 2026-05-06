/* ============================================
   BambooConnect India — Interactive Map Logic
   ============================================ */

class BambooMap {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.tooltip = document.getElementById('map-tooltip');
    this.providers = getProviders();
    this.stateData = this.calculateStateData();
    
    this.init();
  }

  calculateStateData() {
    var data = {};
    
    Object.keys(INDIAN_STATES).forEach(state => {
      data[state] = { count: 0, species: new Set() };
    });

    this.providers.forEach(p => {
      if (data[p.state]) {
        data[p.state].count++;
        p.bambooTypes.forEach(sp => data[p.state].species.add(sp));
      }
    });

    return data;
  }

  getColorForDensity(count) {
    if (count === 0) return 'rgba(45, 106, 79, 0.2)';
    if (count < 3) return 'rgba(82, 183, 136, 0.4)';
    if (count < 8) return 'rgba(64, 145, 108, 0.6)';
    if (count < 15) return 'rgba(45, 106, 79, 0.8)';
    return 'rgba(27, 67, 50, 1)';
  }

  init() {
    var svgPaths = this.container.querySelectorAll('path');
    if (svgPaths.length === 0) {
      setTimeout(() => this.init(), 500);
      return;
    }

    var self = this;
    svgPaths.forEach(path => {
      var stateName = path.getAttribute('title') || path.getAttribute('id') || path.getAttribute('name');
      if (!stateName) return;

      var mappedState = self.mapStateName(stateName);
      if (!mappedState) return;
      
      path.dataset.state = mappedState;

      var data = self.stateData[mappedState];
      var count = data ? data.count : 0;

      path.style.fill = self.getColorForDensity(count);

      path.addEventListener('mouseenter', function(e) { self.showTooltip(e, mappedState, count, data); });
      path.addEventListener('mousemove', function(e) { self.updateTooltipPosition(e); });
      path.addEventListener('mouseleave', function() { self.hideTooltip(); });
      path.addEventListener('click', function() { self.handleStateClick(mappedState); });
    });
  }

  mapStateName(svgName) {
    var list = Object.keys(INDIAN_STATES);
    var normalized = svgName.toLowerCase().replace(/[\-_]/g, ' ');
    
    var exactMatch = list.find(s => s.toLowerCase() === normalized);
    if (exactMatch) return exactMatch;

    if (normalized.includes('jammu')) return null;
    if (normalized.includes('andaman')) return null;
    if (normalized.includes('delhi')) return null;
    if (normalized.includes('orissa')) return 'Odisha';
    if (normalized.includes('bengal')) return 'West Bengal';

    return null;
  }

  showTooltip(e, state, count, data) {
    if (!this.tooltip) return;

    var content = '<strong>' + state + '</strong><br/>';
    if (count > 0) {
      content += '<span style="color:var(--primary-light)">' + count + ' Providers</span><br/>';
      content += '<span style="font-size:0.75rem;color:var(--text-muted)">' + data.species.size + ' Species Available</span>';
    } else {
      content += '<span style="color:var(--text-muted)">No providers yet</span>';
    }

    this.tooltip.innerHTML = content;
    this.tooltip.classList.add('visible');
    this.updateTooltipPosition(e);
  }

  updateTooltipPosition(e) {
    if (!this.tooltip) return;
    this.tooltip.style.left = (e.pageX + 15) + 'px';
    this.tooltip.style.top = (e.pageY + 15) + 'px';
  }

  hideTooltip() {
    if (!this.tooltip) return;
    this.tooltip.classList.remove('visible');
  }

  handleStateClick(stateName) {
    window.location.hash = '#providers';
    
    setTimeout(function() {
      if (window.searchEngine) {
        window.searchEngine.filterByState(stateName);
      }
    }, 100);

    this.highlightState(stateName);
  }

  highlightState(stateName) {
    var svgPaths = this.container.querySelectorAll('path');
    svgPaths.forEach(path => {
      if (path.dataset.state === stateName) {
        path.classList.add('active');
        path.parentNode.appendChild(path);
      } else {
        path.classList.remove('active');
      }
    });
  }

  refreshData() {
    this.providers = getProviders();
    this.stateData = this.calculateStateData();
    this.init();
  }
}

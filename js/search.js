/* ============================================
   BambooConnect India — Search Engine
   ============================================ */

const ITEMS_PER_PAGE = 12;

class SearchEngine {
  constructor() {
    this.allProviders = getProviders();
    this.filteredProviders = [...this.allProviders];
    this.currentPage = 1;
    this.resultsContainer = document.getElementById('search-results');
    this.paginationContainer = document.getElementById('pagination');
    this.resultCountEl = document.getElementById('result-count');
    
    this.query = '';
    this.state = '';
    this.district = '';
    this.species = '';
    this.useCategory = '';
    
    this.initFilterSelectors();
    this.attachEventListeners();
    this.render();
  }

  initFilterSelectors() {
    const stateSelect = document.getElementById('filter-state');
    if (!stateSelect) return;
    
    Object.keys(INDIAN_STATES).sort().forEach(state => {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });

    const speciesSelect = document.getElementById('filter-species');
    if (!speciesSelect) return;

    BAMBOO_SPECIES.forEach(sp => {
      const option = document.createElement('option');
      option.value = sp.name;
      option.textContent = sp.name + ' (' + sp.commonName + ')';
      speciesSelect.appendChild(option);
    });
    
    const useSelect = document.getElementById('filter-use');
    if (!useSelect) return;

    USE_CATEGORIES.forEach(use => {
      const option = document.createElement('option');
      option.value = use;
      option.textContent = use;
      useSelect.appendChild(option);
    });
  }

  attachEventListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        this.query = e.target.value.toLowerCase();
        this.currentPage = 1;
        this.filter();
      }, 300));
    }

    const stateSelect = document.getElementById('filter-state');
    const districtSelect = document.getElementById('filter-district');
    
    if (stateSelect && districtSelect) {
      stateSelect.addEventListener('change', (e) => {
        this.state = e.target.value;
        this.district = '';
        
        districtSelect.innerHTML = '<option value="">All Districts</option>';
        if (this.state && INDIAN_STATES[this.state]) {
          INDIAN_STATES[this.state].sort().forEach(dist => {
            const option = document.createElement('option');
            option.value = dist;
            option.textContent = dist;
            districtSelect.appendChild(option);
          });
          districtSelect.disabled = false;
        } else {
          districtSelect.disabled = true;
        }
        
        this.currentPage = 1;
        this.filter();
      });

      districtSelect.addEventListener('change', (e) => {
        this.district = e.target.value;
        this.currentPage = 1;
        this.filter();
      });
    }

    const speciesSelect = document.getElementById('filter-species');
    if (speciesSelect) {
      speciesSelect.addEventListener('change', (e) => {
        this.species = e.target.value;
        this.currentPage = 1;
        this.filter();
      });
    }

    const useSelect = document.getElementById('filter-use');
    if (useSelect) {
      useSelect.addEventListener('change', (e) => {
        this.useCategory = e.target.value;
        this.currentPage = 1;
        this.filter();
      });
    }
  }

  filterByState(state) {
    const stateSelect = document.getElementById('filter-state');
    if (stateSelect) {
      stateSelect.value = state;
      stateSelect.dispatchEvent(new Event('change'));
    } else {
      this.state = state;
      this.currentPage = 1;
      this.filter();
    }
  }

  filter() {
    this.resultsContainer.innerHTML = '<div class="loading-spinner"></div>';
    
    setTimeout(() => {
      this.filteredProviders = this.allProviders.filter(provider => {
        if (this.query) {
          const textToSearch = (
            provider.name + ' ' + 
            provider.state + ' ' + 
            provider.district + ' ' + 
            provider.bambooTypes.join(' ') + ' ' +
            provider.useCategories.join(' ')
          ).toLowerCase();
          
          if (!textToSearch.includes(this.query)) return false;
        }

        if (this.state && provider.state !== this.state) return false;
        if (this.district && provider.district !== this.district) return false;
        if (this.species && !provider.bambooTypes.includes(this.species)) return false;
        if (this.useCategory && !provider.useCategories.includes(this.useCategory)) return false;

        return true;
      });

      this.render();
      
      if (window.bambooMap) {
        window.bambooMap.highlightState(this.state);
      }
    }, 400);
  }

  render() {
    if (!this.resultsContainer) return;

    if (this.resultCountEl) {
      this.resultCountEl.innerHTML = 'Found <span>' + this.filteredProviders.length + '</span> providers';
    }

    if (this.filteredProviders.length === 0) {
      this.resultsContainer.innerHTML = '<div class="no-results" style="grid-column: 1 / -1; width: 100%;"><div class="no-results-icon">🔍</div><h3>No providers found</h3><p>Try adjusting your filters or searching for a different region/species.</p><button class="btn btn-outline" style="margin-top: 1rem;" onclick="document.getElementById(\'filter-state\').value=\'\'; document.getElementById(\'filter-state\').dispatchEvent(new Event(\'change\')); document.getElementById(\'search-input\').value=\'\'; searchEngine.query=\'\'; searchEngine.filter();">Clear all filters</button></div>';
      this.paginationContainer.innerHTML = '';
      return;
    }

    const totalPages = Math.ceil(this.filteredProviders.length / ITEMS_PER_PAGE);
    const startIndex = (this.currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProviders = this.filteredProviders.slice(startIndex, endIndex);

    this.resultsContainer.innerHTML = '';
    currentProviders.forEach((provider, index) => {
      const delay = (index % ITEMS_PER_PAGE) * 0.05;
      const delayCss = 'animation: fadeInUp 0.5s ease forwards; animation-delay: ' + delay + 's; opacity: 0;';
      const tempDiv = document.createElement('div');
      
      // Remove 'reveal' class if it exists in the template so observer doesn't hide it
      let html = renderProviderCard(provider).trim();
      html = html.replace('class="provider-card reveal"', 'class="provider-card"');
      html = html.replace('class="provider-card reveal ', 'class="provider-card ');
      
      tempDiv.innerHTML = html;
      const card = tempDiv.firstChild;
      card.setAttribute('style', delayCss);
      this.resultsContainer.appendChild(card);
    });

    this.renderPagination(totalPages);
  }

  renderPagination(totalPages) {
    if (!this.paginationContainer) return;

    if (totalPages <= 1) {
      this.paginationContainer.innerHTML = '';
      return;
    }

    let html = '<div class="flex gap-sm justify-center" style="grid-column: 1 / -1; margin-top: var(--space-2xl);">';
    
    if (this.currentPage > 1) {
      html += '<button class="btn btn-ghost btn-sm" onclick="searchEngine.goToPage(' + (this.currentPage - 1) + ')">← Prev</button>';
    }

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
        var cls = (i === this.currentPage) ? 'btn-primary' : 'btn-outline';
        html += '<button class="btn ' + cls + ' btn-sm" onclick="searchEngine.goToPage(' + i + ')">' + i + '</button>';
      } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
        html += '<span style="color:var(--text-muted); align-self:flex-end;">...</span>';
      }
    }

    if (this.currentPage < totalPages) {
      html += '<button class="btn btn-ghost btn-sm" onclick="searchEngine.goToPage(' + (this.currentPage + 1) + ')">Next →</button>';
    }
    
    html += '</div>';
    this.paginationContainer.innerHTML = html;
  }

  goToPage(page) {
    this.currentPage = page;
    this.render();
    scrollToElement('search-container');
  }

  refreshData() {
    this.allProviders = getProviders();
    this.filter();
  }
}

let searchEngine;

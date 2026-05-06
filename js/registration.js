/* ============================================
   BambooConnect India — Registration Logic
   ============================================ */

class RegistrationForm {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 4;
    this.formData = {
      bambooTypes: [],
      useCategories: []
    };
    
    this.form = document.getElementById('provider-registration-form');
    if (!this.form) return;
    
    this.steps = document.querySelectorAll('.form-step');
    this.stepperSteps = document.querySelectorAll('.stepper-step');
    this.stepperLines = document.querySelectorAll('.stepper-line');
    
    this.attachEventListeners();
    this.populateDropdowns();
  }

  populateDropdowns() {
    var stateSelect = document.getElementById('reg-state');
    if (!stateSelect) return;
    
    Object.keys(INDIAN_STATES).sort().forEach(state => {
      var option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });

    var districtSelect = document.getElementById('reg-district');
    stateSelect.addEventListener('change', (e) => {
      var state = e.target.value;
      districtSelect.innerHTML = '<option value="">Select District</option>';
      
      if (state && INDIAN_STATES[state]) {
        INDIAN_STATES[state].sort().forEach(dist => {
          var option = document.createElement('option');
          option.value = dist;
          option.textContent = dist;
          districtSelect.appendChild(option);
        });
        districtSelect.disabled = false;
      } else {
        districtSelect.disabled = true;
      }
    });

    var speciesContainer = document.getElementById('reg-species-container');
    if (speciesContainer) {
      BAMBOO_SPECIES.forEach(sp => {
        var label = document.createElement('label');
        label.className = 'form-checkbox-label';
        
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'bambooTypes';
        input.value = sp.name;
        
        input.addEventListener('change', (e) => {
          if (e.target.checked) label.classList.add('checked');
          else label.classList.remove('checked');
        });

        label.appendChild(input);
        label.appendChild(document.createTextNode(sp.name));
        speciesContainer.appendChild(label);
      });
    }

    var usesContainer = document.getElementById('reg-uses-container');
    if (usesContainer) {
      USE_CATEGORIES.forEach(use => {
        var label = document.createElement('label');
        label.className = 'form-checkbox-label';
        
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'useCategories';
        input.value = use;
        
        input.addEventListener('change', (e) => {
          if (e.target.checked) label.classList.add('checked');
          else label.classList.remove('checked');
        });

        label.appendChild(input);
        label.appendChild(document.createTextNode(use));
        usesContainer.appendChild(label);
      });
    }
  }

  attachEventListeners() {
    var nextBtns = document.querySelectorAll('.next-step');
    var prevBtns = document.querySelectorAll('.prev-step');

    nextBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        addRippleEffect(btn, e);
        if (this.validateStep(this.currentStep)) {
          this.saveFormData();
          this.goToStep(this.currentStep + 1);
        }
      });
    });

    prevBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        addRippleEffect(btn, e);
        this.goToStep(this.currentStep - 1);
      });
    });

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      var submitBtn = document.getElementById('btn-submit-reg');
      addRippleEffect(submitBtn, e);
      submitBtn.innerHTML = '<span class="loading-spinner" style="width:20px;height:20px;border-width:2px;margin:0;"></span> Submitting...';
      submitBtn.disabled = true;

      this.saveFormData();
      var newProvider = await addProvider(this.formData);
      
      if (newProvider) {
        if (window.searchEngine) window.searchEngine.refreshData();
        if (window.bambooMap) window.bambooMap.refreshData();
        if (window.appMain) window.appMain.updateStats();

        showToast('Registration Successful! Your profile is pending verification.', 'success', 5000);
        
        var modal = document.getElementById('registration-modal');
        if (modal) modal.classList.remove('active');
        document.querySelector('.modal-backdrop').classList.remove('active');
        
        this.resetForm();
      } else {
        showToast('Failed to register. Please try again.', 'error');
      }

      submitBtn.innerHTML = 'Complete Registration';
      submitBtn.disabled = false;
    });
  }

  validateStep(step) {
    var isValid = true;
    var currentStepEl = document.getElementById('step-' + step);
    var inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
    
    currentStepEl.querySelectorAll('.error-text').forEach(e => e.remove());
    currentStepEl.querySelectorAll('.form-input, .form-select').forEach(el => el.style.borderColor = '');

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        this.showError(input, 'This field is required');
      } else if (input.type === 'email' && !isValidEmail(input.value)) {
        isValid = false;
        this.showError(input, 'Please enter a valid email');
      } else if (input.type === 'tel' && !isValidPhone(input.value)) {
        isValid = false;
        this.showError(input, 'Please enter a valid Indian phone number');
      }
    });

    if (step === 3) {
      var typeChecked = document.querySelectorAll('input[name="bambooTypes"]:checked').length > 0;
      if (!typeChecked) {
        isValid = false;
        this.showError(document.getElementById('reg-species-container'), 'Please select at least one species');
      }
    }

    if (!isValid) {
      showToast('Please fix the errors before continuing', 'error');
    }

    return isValid;
  }

  showError(element, message) {
    element.style.borderColor = 'var(--error)';
    var errorEl = document.createElement('div');
    errorEl.className = 'error-text';
    errorEl.style.color = 'var(--error)';
    errorEl.style.fontSize = '0.75rem';
    errorEl.style.marginTop = '4px';
    errorEl.textContent = message;
    element.parentNode.insertBefore(errorEl, element.nextSibling);
  }

  saveFormData() {
    var fd = new FormData(this.form);
    
    ['name', 'email', 'phone', 'state', 'district', 'pincode', 'address'].forEach(key => {
      if (fd.get(key)) this.formData[key] = fd.get(key);
    });

    ['capacityTonnes', 'landAreaAcres', 'experienceYears'].forEach(key => {
      if (fd.get(key)) this.formData[key] = parseInt(fd.get(key), 10);
    });

    this.formData.bambooTypes = Array.from(fd.getAll('bambooTypes'));
    this.formData.useCategories = Array.from(fd.getAll('useCategories'));

    if (this.currentStep === 3) {
      this.populateReviewStep();
    }
  }

  populateReviewStep() {
    var r = this.formData;
    document.getElementById('review-name').textContent = r.name;
    document.getElementById('review-contact').textContent = r.phone + ' | ' + r.email;
    document.getElementById('review-location').textContent = r.address + ', ' + r.district + ', ' + r.state + ' - ' + r.pincode;
    document.getElementById('review-capacity').textContent = r.capacityTonnes + ' tonnes/yr (' + r.landAreaAcres + ' acres)';
    
    document.getElementById('review-species').innerHTML = r.bambooTypes.map(function(s) {
      return '<span class="species-tag">' + s + '</span>';
    }).join('');
    
    document.getElementById('review-uses').innerHTML = r.useCategories.map(function(u) {
      return '<span class="species-use">' + u + '</span>';
    }).join('');
  }

  goToStep(step) {
    if (step < 1 || step > this.totalSteps) return;

    this.steps.forEach(s => s.classList.remove('active'));
    document.getElementById('step-' + step).classList.add('active');

    this.stepperSteps.forEach((s, index) => {
      s.classList.remove('active', 'completed');
      if (index < step - 1) s.classList.add('completed');
      if (index === step - 1) s.classList.add('active');
    });

    this.stepperLines.forEach((l, index) => {
      l.classList.remove('active');
      if (index < step - 1) l.classList.add('active');
    });

    this.currentStep = step;
    
    var modal = document.querySelector('.modal');
    if (modal) modal.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetForm() {
    this.form.reset();
    document.querySelectorAll('.form-checkbox-label').forEach(l => l.classList.remove('checked'));
    this.formData = { bambooTypes: [], useCategories: [] };
    this.goToStep(1);
  }
}

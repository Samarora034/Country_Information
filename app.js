// ===== Country Information App (Modern ES6+) =====

const App = (() => {
  // DOM elements
  const grid = document.getElementById('country-grid');
  const searchInput = document.getElementById('search-input');
  const statsEl = document.getElementById('stats');
  const noResults = document.getElementById('no-results');

  let countries = [];
  let debounceTimer = null;

  // Initialize the application
  async function init() {
    try {
      const response = await fetch('countries.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      countries = await response.json();
      renderCountries(countries);
      setupEventListeners();
    } catch (error) {
      console.error('Failed to load countries:', error);
      grid.innerHTML = `
        <div class="no-results">
          <p>Failed to load country data. Please ensure countries.json exists.</p>
        </div>
      `;
    }
  }

  // Render country cards
  function renderCountries(list) {
    if (list.length === 0) {
      grid.innerHTML = '';
      noResults.hidden = false;
      statsEl.textContent = 'No countries found';
      return;
    }

    noResults.hidden = true;
    statsEl.textContent = `Showing ${list.length} ${list.length === 1 ? 'country' : 'countries'}`;

    const fragment = document.createDocumentFragment();

    list.forEach((country) => {
      const card = document.createElement('article');
      card.className = 'country-card';
      card.setAttribute('role', 'listitem');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${country.name} - click to expand details`);

      card.innerHTML = `
        <div class="card-header">
          <img
            class="card-flag"
            src="${country.flag}"
            alt="Flag of ${country.name}"
            loading="lazy"
            onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 60 40%22><rect fill=%22%23333%22 width=%2260%22 height=%2240%22/><text x=%2230%22 y=%2225%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2210%22>🏳️</text></svg>'"
          >
          <h2 class="card-title">${country.name}</h2>
        </div>
        <div class="card-details">
          <div class="detail-row">
            <span class="detail-label">Capital</span>
            <span class="detail-value">${country.capital}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Currency</span>
            <span class="detail-value">${country.currency}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Code</span>
            <span class="detail-value">${country.code.toUpperCase()}</span>
          </div>
        </div>
        <span class="card-expand-hint">Click to expand</span>
      `;

      // Toggle expand on click
      card.addEventListener('click', () => toggleCard(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCard(card);
        }
      });

      fragment.appendChild(card);
    });

    grid.innerHTML = '';
    grid.appendChild(fragment);
  }

  // Toggle card expansion
  function toggleCard(card) {
    const isExpanded = card.classList.contains('expanded');
    // Collapse all others
    document.querySelectorAll('.country-card.expanded').forEach((c) => {
      if (c !== card) c.classList.remove('expanded');
    });
    card.classList.toggle('expanded', !isExpanded);
  }

  // Setup event listeners
  function setupEventListeners() {
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(handleSearch, 200);
    });

    // Allow pressing Escape to clear search
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        handleSearch();
        searchInput.blur();
      }
    });
  }

  // Handle search with filtering
  function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      renderCountries(countries);
      return;
    }

    const filtered = countries.filter((country) => {
      return (
        country.name.toLowerCase().includes(query) ||
        country.capital.toLowerCase().includes(query) ||
        country.currency.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query)
      );
    });

    renderCountries(filtered);
  }

  // Start app when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { init };
})();

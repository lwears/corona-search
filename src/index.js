const state = {
  coronaData: [],
  countries: [],
  search: '',
};

// Helper Functions

const fetchData = async () => {
  const response = await fetch('https://cov19.cc/report.json');
  return response.json();
};

const validateInput = (string) => {
  const newString = string.trim();
  return newString.charAt(0).toUpperCase() + newString.substring(1);
};

// Template and Rendering

const worldTotalHTML = (data) => `
  <div>
    <p class="confirmed">Confirmed: ${data.confirmed}</p>
    <p class="deaths">Dead: ${data.deaths}</p>
    <p class="recovered">Recovered: ${data.recovered}</p>
    <p class="critical">Critical: ${data.critical}</p>
  </div>
`;

const buildCard = (item) => `
  <div>
    <h1 class="country">${item.country}</h1>
    <h2 class="state">${item.state ? item.state : ''}</h2>
    <p class="confirmed-cases">Total Cases: ${item.confirmed}</p>
    <p class="deaths">Total Deaths: ${item.deaths}</p>
    <p class="last-updated">Last Updated: ${item.last_updated}</p>
  </div>
`;

const template = (currentState) => {
  return currentState.search.map((item) => buildCard(item)).join('');
};

const render = (htmlString, el) => {
  const updatedElement = el;
  updatedElement.innerHTML = htmlString;
};

function ac(value) {
  document.getElementById('datalist').innerHTML = '';
  // setting datalist empty at the start of function
  // if we skip this step, same name will be repeated
  // input query length
  for (let i = 0; i < state.countries.length; i++) {
    if (state.countries[i].toLowerCase().indexOf(value.toLowerCase()) > -1) {
      // comparing if input string is existing in tags[i] string

      const node = document.createElement('option');
      const val = document.createTextNode(state.countries[i]);
      node.appendChild(val);

      document.getElementById('datalist').appendChild(node);
      // creating and appending new elements in data list
    }
  }
}

// Event Listeners

window.onload = async () => {
  // const searchButton = document.getElementById('search-button');
  const searchDisplay = document.getElementById('corona-display');
  const searchInput = document.getElementById('search-input');
  const searchForm = document.getElementById('search-form');
  const worldTotalsDisplay = document.getElementById('world-totals');

  state.coronaData = await fetchData();

  state.countries = state.coronaData.regions.world.list.map((country) =>
    country.state ? country.state : country.country
  );

  worldTotalsDisplay.innerHTML = worldTotalHTML(state.coronaData.regions.world.totals);

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newSearch = validateInput(searchInput.value);
    if (newSearch !== '') {
      state.search = state.coronaData.regions.world.list.filter((country) => {
        return country.state === newSearch || country.country === newSearch;
      });
    }
    searchInput.value = '';
    window.dispatchEvent(new Event('statechange'));
  });

  searchInput.addEventListener('keyup', ac(searchInput.value));

  window.addEventListener('statechange', () => {
    render(template(state), searchDisplay);
  });
};

// const searchData = () => {};

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const state = {\n  coronaData: [],\n  countries: [],\n  search: '',\n};\n\n// Helper Functions\n\nconst fetchData = async () => {\n  const response = await fetch('https://cov19.cc/report.json');\n  return response.json();\n};\n\nconst validateInput = (string) => {\n  const newString = string.trim();\n  return newString.charAt(0).toUpperCase() + newString.substring(1);\n};\n\n// Template and Rendering\n\nconst worldTotalHTML = (data) => `\n  <div>\n    <p class=\"confirmed\">Confirmed: ${data.confirmed}</p>\n    <p class=\"deaths\">Dead: ${data.deaths}</p>\n    <p class=\"recovered\">Recovered: ${data.recovered}</p>\n    <p class=\"critical\">Critical: ${data.critical}</p>\n  </div>\n`;\n\nconst buildCard = (item) => `\n  <div>\n    <h1 class=\"country\">${item.country}</h1>\n    <h2 class=\"state\">${item.state ? item.state : ''}</h2>\n    <p class=\"confirmed-cases\">Total Cases: ${item.confirmed}</p>\n    <p class=\"deaths\">Total Deaths: ${item.deaths}</p>\n    <p class=\"last-updated\">Last Updated: ${item.last_updated}</p>\n  </div>\n`;\n\nconst template = (currentState) => {\n  return currentState.search.map((item) => buildCard(item)).join('');\n};\n\nconst render = (htmlString, el) => {\n  const updatedElement = el;\n  updatedElement.innerHTML = htmlString;\n};\n\nfunction ac(value) {\n  document.getElementById('datalist').innerHTML = '';\n  // setting datalist empty at the start of function\n  // if we skip this step, same name will be repeated\n  // input query length\n  for (let i = 0; i < state.countries.length; i++) {\n    if (state.countries[i].toLowerCase().indexOf(value.toLowerCase()) > -1) {\n      // comparing if input string is existing in tags[i] string\n\n      const node = document.createElement('option');\n      const val = document.createTextNode(state.countries[i]);\n      node.appendChild(val);\n\n      document.getElementById('datalist').appendChild(node);\n      // creating and appending new elements in data list\n    }\n  }\n}\n\n// Event Listeners\n\nwindow.onload = async () => {\n  // const searchButton = document.getElementById('search-button');\n  const searchDisplay = document.getElementById('corona-display');\n  const searchInput = document.getElementById('search-input');\n  const searchForm = document.getElementById('search-form');\n  const worldTotalsDisplay = document.getElementById('world-totals');\n\n  state.coronaData = await fetchData();\n\n  state.countries = state.coronaData.regions.world.list.map((country) =>\n    country.state ? country.state : country.country\n  );\n\n  worldTotalsDisplay.innerHTML = worldTotalHTML(state.coronaData.regions.world.totals);\n\n  searchForm.addEventListener('submit', (event) => {\n    event.preventDefault();\n    const newSearch = validateInput(searchInput.value);\n    if (newSearch !== '') {\n      state.search = state.coronaData.regions.world.list.filter((country) => {\n        return country.state === newSearch || country.country === newSearch;\n      });\n    }\n    searchInput.value = '';\n    window.dispatchEvent(new Event('statechange'));\n  });\n\n  searchInput.addEventListener('keyup', ac(searchInput.value));\n\n  window.addEventListener('statechange', () => {\n    render(template(state), searchDisplay);\n  });\n};\n\n// const searchData = () => {};\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
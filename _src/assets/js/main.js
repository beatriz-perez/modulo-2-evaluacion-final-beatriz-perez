'use strict';

// CONTROLES
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// DATOS DE PARTIDA
const urlShowSearchBase = 'http://api.tvmaze.com/search/shows?q='

// RESULTADOS
const searchResultsList = document.getElementById('searchResultsList');
const favList = document.getElementById('favList');

let searchResultShows = null; // constante preparada para recibir resultados
let favSows = null;


// ACCIONES
function renderSearchResultShows (show) {
  //LI
  const resultCard = document.createElement('li');
  resultCard.id = show.show.id;
  searchResultsList.appendChild(resultCard);
  //TITLE
  const resultCardTitle = document.createElement('p');
  resultCard.appendChild(resultCardTitle);
  const resultCardTitleContent = document.createTextNode(show.show.name);
  resultCardTitle.appendChild(resultCardTitleContent);
  //IMAGE
  const resultCardImage = document.createElement('img');
  const imageSource = show.show.image !== null ? show.show.image.medium : 'https://via.placeholder.com/210x295?text=TV';
  resultCardImage.src = imageSource;
  resultCard.appendChild(resultCardImage);
}

function showNameSearch () {
    let query = searchInput.value;
    fetch(urlShowSearchBase + query)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        searchResultShows = data;
        console.log('resultados', searchResultShows);

        for(let show of searchResultShows){
          renderSearchResultShows(show);
          }
    });
}

function handleSearchButton (event) {
  event.preventDefault();
  searchResultsList.innerHTML = '';
  showNameSearch();
  searchForm.reset();
}

searchButton.addEventListener('click', handleSearchButton);

/*

*/

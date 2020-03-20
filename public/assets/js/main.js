'use strict';

// CONTROLES
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// DATOS DE PARTIDA
const urlShowSearchBase = 'http://api.tvmaze.com/search/shows?'

// RESULTADOS
const searchResultsIntro = document.getElementById('searchResultsIntro');
const searchResultsList = document.getElementById('searchResultsList');
const favList = document.getElementById('favList');

let searchResultShows = null; // constante preparada para recibir resultados
let favSows = null;


// ACCIONES ****************************************************************************************

function renderSearchResultShows (show) {
  //LI
  const resultCard = document.createElement('li');
  resultCard.id = show.show.id;
  resultCard.classList.add('main__resultsList--card')
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


function countResults (count, text) {
  searchResultsIntro.innerHTML = '';
  const searchResultsIntroContent = document.createTextNode(
    `Te mostramos ${count} resultados que contienen "${text}"`
  );
  searchResultsIntro.appendChild(searchResultsIntroContent);
}


function showSearchByName () {
    let query = searchInput.value;
    fetch(`${urlShowSearchBase}q=${query}`)
    .then(function(response) {
      if (!response.ok) {throw response;}
      return response.json();
    })
    .then(function(data) {
      searchResultShows = data;  //******************************** <------------  OJO ! Acumulador mejor
      countResults(searchResultShows.length, query);  // Ejecutamos el contador 1 vez
      for (let show of searchResultShows){
        renderSearchResultShows(show);                // Ejecutamos el renderizador en bucle, por resultado
      }
    })
    .catch(error => console.log(`Ha sucedido un error: ${error}`));
};



function handleSearchButton (event) {
  event.preventDefault();
  searchResultsList.innerHTML = ''; //******************************** <------------  OJO !
  showSearchByName();
  searchForm.reset();
}

searchButton.addEventListener('click', handleSearchButton);

/*

*/

//# sourceMappingURL=main.js.map

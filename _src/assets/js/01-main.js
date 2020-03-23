'use strict';

// CONTROLES --------------------------------------------------

//fijos
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

//dinámicos

const clearFavPannel = document.createElement('button');
clearFavPannel.classList.add('aside__favList--clearButton', 'button__lightLong', 'text__lightButton');
const clearFavPannelContent = document.createTextNode('vaciar favoritos');
clearFavPannel.appendChild(clearFavPannelContent);
clearFavPannel.addEventListener('click', function () { emptyFavPannel() });
/*el botón se añadirá: a. si al cargar la página existen favoritos b. si no hay favoritos y añadimos uno
el botón se borrará si  a. eliminamos el último favorito b. hacemos click en él*/


// DATOS DE PARTIDA ---------------------------------------------

const urlShowSearchByName = 'http://api.tvmaze.com/search/shows?';
const urlShowSearchById = 'http://api.tvmaze.com/shows/';

// RESULTADOS ---------------------------------------------------

const mainSection = document.querySelector('.mainSection');

const searchResultsIntro = document.getElementById('searchResultsIntro');
const searchResultsInstructions = document.getElementById('searchResultsInstructions');
const alertText = document.getElementById('alerText');

const searchResultsList = document.getElementById('searchResultsList');
let searchResultShows = null; // recibe resultados del servidor

const favList = document.getElementById('favList');
let favShows = []; // recibe elementos añadidos con push

const showInfoBox = document.getElementById('showInfo');



// Al cargar la página --------------------------------------------

const savedFavs = JSON.parse(localStorage.getItem('favShows'));
if (savedFavs !== null && savedFavs.length !== 0) {
  favList.appendChild(clearFavPannel);
  savedFavs.map(fav => addOrRemoveFavourite(fav));
}


// ACCIONES ------------------------------------------------------------------------------------------------

//Gestión de FAVORITOS ------------------------------------

function emptyFavPannel() {
  favShows.map(fav => changeCardStyle(fav));
  const FavsToRemove = favShows.map(fav => fav);
  FavsToRemove.reverse();
  FavsToRemove.map(fav => addOrRemoveFavourite(fav));
};


function getFavInfo(id) {
  fetch(urlShowSearchById + id)
    .then(function (response) {
      if (!response.ok) { throw response; }
      return response.json();
    })
    .then(function (data) {
      let newFav = data;
      renderFav(newFav)
    })
    .catch(error => console.log(`Ha sucedido un error: ${error}`));

};

function addOrRemoveFavourite(id) {
  alertText.innerHTML = '';
  if (parseInt(favShows.indexOf(id)) === (-1)) {
    if (favShows.length >= 10) {
      window.location = '#';
      mainSection.scroll(0, 0);
      const alertTextContent = document.createTextNode(
        '* Tu listado de favoritos está completo. Por favor, elimina alguno antes de añadir uno nuevo.'
      );
      alertText.appendChild(alertTextContent);
      changeCardStyle(id);
    } else {
      favShows.push(id);
      getFavInfo(id);
      if (favList.innerHTML.length === 0) {
        favList.appendChild(clearFavPannel);
      }
    }
  } else {
    favShows.splice(parseInt(favShows.indexOf(id)), 1);
    document.getElementById(id + 'FAV').remove();
    if (favShows.length < 1) {
      favList.removeChild(clearFavPannel);
    }
  }
  localStorage.setItem('favShows', JSON.stringify(favShows));
};

function changeCardStyle(id) {
  if (document.getElementById(id) !== null) {
    document.getElementById(id).classList.toggle('main__favShowStyle');
    document.getElementById(id).children[0].classList.toggle('text__card--titleFav');
  }
}

//Gestión de resultados de BÚSQUEDA ------------------------------------


function countResults(count, text) {
  searchResultsIntro.innerHTML = '';
  searchResultsInstructions.innerHTML = '';
  const searchResultsIntroContent = document.createTextNode(
    `Tenemos ${count} resultados para tu búsqueda "${text}", ordenados por popularidad.`
  );
  searchResultsIntro.appendChild(searchResultsIntroContent);
  const searchResultsInstructionsContent = document.createTextNode(
    'Haz click sobre una serie para añadirla a favoritos y ver más información.'
  );
  searchResultsInstructions.appendChild(searchResultsInstructionsContent);
}

function showSearchByName() {
  let query = searchInput.value;
  fetch(`${urlShowSearchByName}q=${query}`)
    .then(function (response) {
      if (!response.ok) { throw response; }
      return response.json();
    })
    .then(function (data) {
      searchResultShows = data;
      countResults(searchResultShows.length, query);
      for (let show of searchResultShows) {
        renderSearchResultShows(show);
      }
    })
    .catch(error => console.log(`Ha sucedido un error: ${error}`));
};

function handleSearchButton(event) {
  event.preventDefault();
  searchResultsIntro.innerHTML = '';
  searchResultsInstructions.innerHTML = '';
  alertText.innerHTML = '';
  searchResultsList.innerHTML = '';
  showInfoBox.innerHTML = '';
  if (searchInput.value.length !== 0) {
    showSearchByName();
  }
  searchForm.reset();
}

searchButton.addEventListener('click', handleSearchButton);


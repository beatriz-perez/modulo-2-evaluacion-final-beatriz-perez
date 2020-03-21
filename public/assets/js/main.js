'use strict';


// CONTROLES --------------------------------------------------

//fijos
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

//dinámicos
//************************************************ <--------  OJO incluir showCard y x en favCard

const clearFavPannel = document.createElement('button');
const clearFavPannelContent = document.createTextNode('vaciar favoritos');
clearFavPannel.appendChild(clearFavPannelContent);
clearFavPannel.addEventListener('click', function(){emptyFavPannel()});
/*el botón se añadirá: a. si al cargar la página existen favoritos b. si no hay favoritos y añadimos uno
el botón se borrará si  a. eliminamos el último favorito b. hacemos click en él*/


// DATOS DE PARTIDA ---------------------------------------------
const urlShowSearchByName = 'http://api.tvmaze.com/search/shows?';
const urlShowSearchById = 'http://api.tvmaze.com/shows/';

// RESULTADOS
const searchResultsIntro = document.getElementById('searchResultsIntro');
const searchResultsList = document.getElementById('searchResultsList');
const favListIntro = null;  //************************************************ <--------  OJO por definir
const favList = document.getElementById('favList');

let searchResultShows = null; // recibe resultados del servidor
let favShows = []; // recibe elementos añadidos con push


// Al cargar la página --------------------------------------------

const savedFavs = JSON.parse(localStorage.getItem('favShows'));
if (savedFavs !== null && savedFavs.length !== 0) {
  favList.appendChild(clearFavPannel);
  savedFavs.map(fav => addOrRemoveFavourite(fav));
}


// ACCIONES ****************************************************************************************

//Gestión de FAVORITOS ------------------------------------

function emptyFavPannel () {
favShows.map(fav => changeCardStyle(fav)); // cambio de estilo
const FavsToRemove = favShows.map(fav => fav); //copiamos los favoritos
FavsToRemove.reverse(); // damos la vuelta a la copia de favoritos para recorrerlos desde último a primero
FavsToRemove.map(fav => addOrRemoveFavourite(fav));
};

function renderFav(newFav) {
  //LI
  const favCard = document.createElement('li');
  favCard.id = newFav.id + 'FAV';
  favCard.classList.add('aside__favList--card')
  favList.appendChild(favCard);
  //TITLE
  const favTitle = document.createElement('p');
  favTitle.classList.add('aside__favList--title')
  favCard.appendChild(favTitle);
  const favTitleContent = document.createTextNode(newFav.name);
  favTitle.appendChild(favTitleContent);
  //IMAGE
  const favImage = document.createElement('img');
  const imageSource = newFav.image !== null ? newFav.image.medium : 'https://via.placeholder.com/210x295?text=TV';
  favImage.classList.add('aside__favList--image')
  favImage.src = imageSource;
  favCard.appendChild(favImage);
  //DELETE BUTTON
  const favDeleteButton = document.createElement('div');
  favCard.appendChild(favDeleteButton);
  const favDeleteButtonContent = document.createTextNode('X');
  favDeleteButton.appendChild(favDeleteButtonContent);
  //make X icons react to click
  favDeleteButton.addEventListener('click', function(){
    addOrRemoveFavourite(newFav.id.toString());
    changeCardStyle(newFav.id.toString())
  });
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

function addOrRemoveFavourite(id) { //Añadimos cada nuevo favorito tanto al listado como a localStorage
  if (parseInt(favShows.indexOf(id)) === (-1)) {
    favShows.push(id);
    getFavInfo(id);
    if (favList.innerHTML.length ===0) {
      favList.appendChild(clearFavPannel);
    }
  } else {
    favShows.splice(parseInt(favShows.indexOf(id)), 1);
    document.getElementById(id + 'FAV').remove();
    if (favShows.length<1){
      favList.removeChild(clearFavPannel);
    }
  }
  localStorage.setItem('favShows', JSON.stringify(favShows));
};

function changeCardStyle(id) {
  if(document.getElementById(id) !== null){
    document.getElementById(id).classList.toggle('main__favShowStyle');
  }
}

//Gestión de resultados de BÚSQUEDA ------------------------------------

function renderSearchResultShows(show) {
  //LI
  const resultCard = document.createElement('li');
  resultCard.id = show.show.id;
  if (parseInt(favShows.indexOf(resultCard.id)) !== (-1)) {
    resultCard.classList.add('main__favShowStyle')
  }
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
  // make card react on clicks
  resultCard.addEventListener('click', function () { 
    addOrRemoveFavourite(resultCard.id); 
    changeCardStyle(resultCard.id)
  });
}

function countResults(count, text) {
  searchResultsIntro.innerHTML = '';
  const searchResultsIntroContent = document.createTextNode(
    `Tenemos ${count} resultados para tu búsqueda "${text}", ordenados por popularidad.`
  );
  searchResultsIntro.appendChild(searchResultsIntroContent);
}

function showSearchByName() {
  let query = searchInput.value;
  fetch(`${urlShowSearchByName}q=${query}`)
    .then(function (response) {
      if (!response.ok) { throw response; }
      return response.json();
    })
    .then(function (data) {
      searchResultShows = data;  //******************************** <---- para ver más páginas: acumulador
      countResults(searchResultShows.length, query);  // Ejecutamos el contador 1 vez
      for (let show of searchResultShows) {
        renderSearchResultShows(show);                // Ejecutamos el renderizador en bucle, por resultado
      }
    })
    .catch(error => console.log(`Ha sucedido un error: ${error}`));
};

function handleSearchButton(event) {
  event.preventDefault();
  searchResultsList.innerHTML = '';
  showSearchByName();
  searchForm.reset();
}

searchButton.addEventListener('click', handleSearchButton);


//# sourceMappingURL=main.js.map

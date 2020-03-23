'use strict';

// CONTROLES --------------------------------------------------

//fijos
const siteTitle = document.getElementById('siteTitle');

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

//dinámicos

const clearFavPannel = document.createElement('button');
clearFavPannel.classList.add('aside__favList--clearButton', 'button__lightLong', 'text__lightButton');
const clearFavPannelContent = document.createTextNode('vaciar favoritos');
clearFavPannel.appendChild(clearFavPannelContent);
clearFavPannel.addEventListener('click', function () { emptyFavPanel() });
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

function clearMainPanel() {
  searchResultsIntro.innerHTML = '';
  searchResultsInstructions.innerHTML = '';
  alertText.innerHTML = '';
  searchResultsList.innerHTML = '';
  showInfoBox.innerHTML = '';
}

//Gestión de FAVORITOS ------------------------------------

function emptyFavPanel() {
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
  clearMainPanel();
  if (searchInput.value.length !== 0) {
    showSearchByName();
  }
  searchForm.reset();
}


siteTitle.addEventListener('click', function () {location.reload()});
searchButton.addEventListener('click', handleSearchButton);


function renderSearchResultShows(show) {

  //LI
  const resultCard = document.createElement('li');
  resultCard.id = show.show.id;
  resultCard.classList.add('main__resultsList--card');
  if (parseInt(favShows.indexOf(resultCard.id)) !== (-1)) {
    resultCard.classList.add('main__favShowStyle')
  }
  searchResultsList.appendChild(resultCard);

  //TITLE
  const resultCardTitle = document.createElement('p');
  resultCardTitle.classList.add('main__resultsList--title', 'text__card--title');
  if (parseInt(favShows.indexOf(resultCard.id)) !== (-1)) {
    resultCardTitle.classList.add('text__card--titleFav');
  }
  resultCard.appendChild(resultCardTitle);
  const resultCardTitleContent = document.createTextNode(show.show.name);
  resultCardTitle.appendChild(resultCardTitleContent);

  //IMAGE
  const resultCardImage = document.createElement('img');
  resultCardImage.classList.add('main__resultsList--image');
  const imageSource = show.show.image !== null ? show.show.image.medium : 'https://via.placeholder.com/210x295?text=TV';
  resultCardImage.src = imageSource;
  resultCard.appendChild(resultCardImage);

  // make card react on clicks
  resultCard.addEventListener('click', function () {
    addOrRemoveFavourite(resultCard.id);
    changeCardStyle(resultCard.id);
  });
};

function renderFav(newFav) {

    //LI
    const favCard = document.createElement('li');
    favCard.id = newFav.id + 'FAV';
    favCard.classList.add('aside__favList--card');
    favList.appendChild(favCard);

    //IMAGE
    const favImage = document.createElement('img');
    const imageSource = newFav.image !== null ? newFav.image.medium : 'https://via.placeholder.com/210x295?text=TV';
    favImage.classList.add('aside__favList--image');
    favImage.src = imageSource;
    favCard.appendChild(favImage);

    //infoBox
    const favInfoBox = document.createElement('div');
    favInfoBox.setAttribute('class', 'aside__favList--infoBox');
    favCard.appendChild(favInfoBox);

    //infoBoxTexts
    const favInfoBoxTexts = document.createElement('div');
    favInfoBoxTexts.setAttribute('class', 'aside__favList--infoBoxTexts');
    favInfoBox.appendChild(favInfoBoxTexts);

    //TITLE
    const favTitle = document.createElement('p');
    favTitle.classList.add('aside__favList--title', 'text__card--title');
    favInfoBoxTexts.appendChild(favTitle);
    const favTitleContent = document.createTextNode(newFav.name);
    favTitle.appendChild(favTitleContent);

    // info link
    const favInfoLink = document.createElement('div');
    favInfoLink.classList.add('aside__favList--infoLink', 'button__grayLong', 'text__greyButton');
    favInfoBoxTexts.appendChild(favInfoLink);
    const favInfoLinkContent = document.createTextNode('+ info');
    favInfoLink.appendChild(favInfoLinkContent);
    // make info link react to click
    favInfoLink.addEventListener('click', function () {
        showInfo(newFav);
    });

    //DELETE BUTTON
    const favDeleteButton = document.createElement('div');
    favDeleteButton.classList.add('aside__favList--deleteButton', 'button__grayRound');
    favInfoBox.appendChild(favDeleteButton);
    const favDeleteButtonContent = document.createElement('i');
    favDeleteButtonContent.classList.add('fas', 'fa-times', 'button__grayRound--icon');
    favDeleteButton.appendChild(favDeleteButtonContent);
    //make X icons react to click
    favDeleteButton.addEventListener('click', function () {
        addOrRemoveFavourite(newFav.id.toString());
        changeCardStyle(newFav.id.toString());
    });

};

function showInfo(info) {

    //Vaciar sección de info previa
    clearMainPanel();

    //Dirigir la web a la sección de info
    window.location = '#';
    mainSection.scroll(0, 0);

    const showInfoBoxContent = document.createElement('div');
    showInfoBoxContent.classList.add('mainInfo__showContent');
    showInfoBox.appendChild(showInfoBoxContent);

    //IMAGE
    const showImage = document.createElement('img');
    showImage.classList.add('mainInfo__showContent--image');
    const imageSource = info.image !== null ? info.image.original : 'https://via.placeholder.com/400x562?text=TV';
    showImage.src = imageSource;
    showInfoBoxContent.appendChild(showImage);

    //Text box
    const showInfoText = document.createElement('div');
    showInfoText.classList.add('mainInfo__showContent--text');
    showInfoBoxContent.appendChild(showInfoText);

    //TITLE
    const showTitle = document.createElement('p');
    showTitle.classList.add('mainInfo__showContent--text-title', 'text__section--title');
    showInfoText.appendChild(showTitle);
    const showTitleContent = document.createTextNode(info.name);
    showTitle.appendChild(showTitleContent);

    //RATING
    const showRating = document.createElement('p');
    showRating.classList.add('mainInfo__showContent--text-rating', 'text__base');
    showInfoText.appendChild(showRating);
    const showRatingContent = info.rating.average !== null ? document.createTextNode(info.rating.average) : document.createTextNode('no hay información de puntuación');
    showRating.appendChild(showRatingContent);

    //SUMMARY
    const showSummary = document.createElement('p');
    showSummary.classList.add('mainInfo__showContent--text-summary', 'text__base');
    showInfoText.appendChild(showSummary);
    showSummary.innerHTML = info.summary !== null ? info.summary : 'no hay información de resumen';

    //OFFICIAL SITE
    const showOfficialSite = document.createElement('a');
    showOfficialSite.classList.add('mainInfo__showContent--text-officialSite', 'text__base');
    showInfoText.appendChild(showOfficialSite);
    showOfficialSite.href = info.officialSite;
    showOfficialSite.target = '_blank';
    const showOfficialSiteContent = info.officialSite !== null ? document.createTextNode(info.officialSite) : document.createTextNode('no hay información de web oficial');
    showOfficialSite.appendChild(showOfficialSiteContent);

};

//# sourceMappingURL=main.js.map

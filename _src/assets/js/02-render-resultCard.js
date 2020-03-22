function renderSearchResultShows(show) {
    //LI
    const resultCard = document.createElement('li');
    resultCard.id = show.show.id;
    resultCard.classList.add('main__resultsList--card')
    if (parseInt(favShows.indexOf(resultCard.id)) !== (-1)) {
      resultCard.classList.add('main__favShowStyle')
    }
    searchResultsList.appendChild(resultCard);
    //TITLE
    const resultCardTitle = document.createElement('p');
    resultCardTitle.classList.add('main__resultsList--title', 'text__card--title')
    if (parseInt(favShows.indexOf(resultCard.id)) !== (-1)) {
      resultCardTitle.classList.add('text__card--titleFav')
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
      changeCardStyle(resultCard.id)
    });
  }
  
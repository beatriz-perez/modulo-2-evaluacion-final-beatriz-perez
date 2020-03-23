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

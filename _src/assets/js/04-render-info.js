function showInfo(info) {
    searchResultsIntro.innerHTML = '';
    searchResultsInstructions.innerHTML = '';
    alertText.innerHTML = '';
    searchResultsList.innerHTML = '';
    showInfoBox.innerHTML = '';

    window.location = '#';
    mainSection.scroll(0,0);

    console.log(info);

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
        const showRatingContent = document.createTextNode(info.rating.average);
        showRating.appendChild(showRatingContent);

        //SUMMARY
        const showSummary = document.createElement('p');
        showSummary.classList.add('mainInfo__showContent--text-summary', 'text__base');
        showInfoText.appendChild(showSummary);
        showSummary.innerHTML = info.summary;

        //
        const showOfficialSite = document.createElement('a');
        showOfficialSite.classList.add('mainInfo__showContent--text-officialSite', 'text__base');
        showInfoText.appendChild(showOfficialSite);
        showOfficialSite.href = info.officialSite;
        showOfficialSite.target = '_blank';
        const showOfficialSiteContent = document.createTextNode(info.officialSite);
        showOfficialSite.appendChild(showOfficialSiteContent);

};

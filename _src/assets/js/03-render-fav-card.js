function renderFav(newFav) {

    //LI
    const favCard = document.createElement('li');

    favCard.id = newFav.id + 'FAV';
    favCard.classList.add('aside__favList--card')
    favList.appendChild(favCard);

        //IMAGE
        const favImage = document.createElement('img');
        const imageSource = newFav.image !== null ? newFav.image.medium : 'https://via.placeholder.com/210x295?text=TV';
        favImage.classList.add('aside__favList--image')
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
                favTitle.classList.add('aside__favList--title', 'text__card--title')
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
            const favDeleteButtonContent = document.createElement('i')
            favDeleteButtonContent.classList.add('fas', 'fa-times', 'button__grayRound--icon');
            favDeleteButton.appendChild(favDeleteButtonContent);
            //make X icons react to click
            favDeleteButton.addEventListener('click', function(){
            addOrRemoveFavourite(newFav.id.toString());
            changeCardStyle(newFav.id.toString())
            });
  };
  
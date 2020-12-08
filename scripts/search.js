const listenToSearch = function () {
    search.addEventListener('keydown', function search(e) {
        if (e.keyCode == 13) {
            searchArtist();
        }
    });
}

const searchArtist = async function () {
    if (search.value.substring(0, 15) != "spotify:artist:") {
        ring.classList.add('c-loading-ring');
        found_artists = await fetch(
                `https://spotifind-woutdem.azurewebsites.net/api/artists?name=${search.value}`
                // `http://127.0.0.1:5000/api/v1/artist/${search.value}`
            )
            .then(function (r) {
                if (r.status == 404) showErrorArtistNotFound();
                else return r.json();
            })
            .catch((err) => console.error("An error occurd", err));

        if (found_artists != undefined) {
            ring.classList.remove('c-loading-ring');
            showArtists()
        }

    } else {
        var id = search.value.substring(15, search.value.length);        
        getData(id);
        search.value = '';
    }

}

const showArtists = function () {
    htmlString = '';

    for (var i = 0; i < found_artists.length; i++) {
        url = '';
        artist = found_artists[i];
        if (artist.img) {
            url = artist.img.url;
        }

        if(i === found_artists.length-1) {
            htmlString += `<div class="js-filter c-filter c-filter__no-border" spot-id="${artist.id}">
                                <img class="c-img" src="${url}" alt="">
                                <span class="c-result-name">${artist.name}</span>
                            </div>`

        } else if(i === 0) {
            htmlString += `<div class="js-filter c-filter c-filter__border-top" spot-id="${artist.id}">
                                <img class="c-img" src="${url}" alt="">
                                <span class="c-result-name">${artist.name}</span>
                            </div>`
        } else {
            htmlString += `<div class="js-filter c-filter" spot-id="${artist.id}">
                          <img class="c-img" src="${url}" alt="">
                          <span class="c-result-name">${artist.name}</span>
                     </div>`
        }
        
    }
    results.innerHTML = htmlString;
    listenToFilters()
}

const listenToFilters = function () {
    let filters = document.querySelectorAll('.js-filter');
    for (const result of filters) {
        result.addEventListener('click', function () {
            i = 0;
            getData(result.getAttribute('spot-id'));
            results.innerHTML = '';
            // search_main.addEventListener('click', toggleSearch);
        });
    }
}



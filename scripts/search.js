const listenToSearch = function () {
    search.addEventListener('keydown', function search(e) {
        if (e.keyCode == 13) {
            searchArtist();
        }
    });
}

const searchArtist = async function () {
    console.log(search.value.substring(0, 15))
    if (search.value.substring(0, 15) != "spotify:artist:") {
        ring.classList.add('c-loading-ring');
        found_artists = await fetch(
                // `https://spotifind-woutdem.azurewebsites.net/api/artists?name=${search.value}`
                // `http://localhost:7071/api/artists?name=${search.value}`
                `http://127.0.0.1:5000/api/v1/artist/${search.value}`
            )
            .then(function (r) {
                console.log(r)
                if (r.status == 404) showErrorArtistNotFound();
                else return r.json();
            })
            .catch((err) => console.error("An error occurd", err));

        console.log(found_artists);
        if (found_artists != '') {
            ring.classList.remove('c-loading-ring');
            showArtists()
            //console.log(found_artists);
        }

    } else {
        var id = search.value.substring(15, search.value.length)
        console.log(id)
        getData(id);
        search_main.addEventListener('mouseover', addBG);
        search_main.addEventListener('mouseout', removeBG);
        search_main.addEventListener('click', toggleSearch);
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

        } if(i === 0) {
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

            search_main.addEventListener('mouseover', addBG);
            search_main.addEventListener('mouseout', removeBG);
            search_main.addEventListener('click', toggleSearch);

            results.innerHTML = '';
            search.value = '';
        });
    }
}

function addBG() {
    search_main.classList.add('c-search__collapse-hover');
}

function removeBG() {
    search_main.classList.remove('c-search__collapse-hover');
}

function toggleSearch() {
    i++;
    console.log(i);
    document.querySelector('.js-app').classList.toggle('c-search__collapse');
    if (i == 2) {
        i = 0;
        // icon_enter.style.display = 'block';
        // console.log('YEEE BOOOOY');
        search_main.removeEventListener('mouseover', addBG);
        // search_main.removeEventListener('mouseout', removeBG)
        search_main.removeEventListener('click', toggleSearch);
    }
}
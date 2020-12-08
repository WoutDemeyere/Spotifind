const showErrorArtistNotFound = function (name) {
    console.log('logging error')
    ring.classList.remove('c-loading-ring')
    let errHeader = 'No artist found by this name'
    let errBody = `The spotify search API did not find any artist by that name. Maybe check for spelling errors or if the artists even exists on spotify.
                   If you are certain they exist you can search by their spotify URI(You can find it when you rightclick on an artist and select share). Just copy paste it in the seach bar and then a direct search by ID will be executed.`

    let htmlSring = `<h1 class="c-error-header">${errHeader}</h1>
                    <span class="c-error-main">${errBody}</span>
                    <button class="o-button-reset c-error-button js-error-ok">Ok got it!</button> `;
    errors.innerHTML = htmlSring;
    errors.classList.add('c-error-show')

    document.querySelector('.js-error-ok').addEventListener('click', function(){
        errors.classList.remove('c-error-show')
        errors.innerHTML = '';
    })
}

const showErrorCitiesNotFound = function () {
    console.log('logging error')
    ring.classList.remove('c-loading-ring')
    let errHeader = 'No cities found for this artist :o'
    let errBody = `It appears that the given artist has no city data available. Some smaller artist have no city data or it is just missing. If you are certain that there is data for this artist please let me know, then there is probably a bug in my backend :)`

    let htmlSring = `<h1 class="c-error-header">${errHeader}</h1>
                    <span class="c-error-main">${errBody}</span>
                    <button class="o-button-reset c-error-button js-error-ok">Ok got it!</button> `;
    errors.innerHTML = htmlSring;
    errors.classList.add('c-error-show')

    document.querySelector('.js-error-ok').addEventListener('click', function(){
        errors.classList.remove('c-error-show')
        errors.innerHTML = '';
    })
}

const showErrorNoOriginFound = function () {
    console.log('logging error')
    ring.classList.remove('c-loading-ring')
    let errHeader = 'Note: No origin was found for this artist'
    let errBody = `To get the origin of an artist i crossrefrence the MusicBrainz database. It appears that this artist, or his begin area, was not found in the database. No wories, you can still see their 50 cities there's just no red dot that shows where they started out :)`

    let htmlSring = `<h1 class="c-error-header">${errHeader}</h1>
                    <span class="c-error-main">${errBody}</span>
                    <button class="o-button-reset c-error-button js-error-ok">Ok got it!</button> `;
    errors.innerHTML = htmlSring;
    errors.classList.add('c-error-show')

    document.querySelector('.js-error-ok').addEventListener('click', function(){
        errors.classList.remove('c-error-show')
        errors.innerHTML = '';
    })
}
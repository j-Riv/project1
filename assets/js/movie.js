// TMDb Configuration save to local so we don't have to pull it.
// Will write func to pull if needed
// configuration should never change unless majore api update
var configuration = {
    "images": {
        "base_url": "http://image.tmdb.org/t/p/",
        "secure_base_url": "https://image.tmdb.org/t/p/",
        "backdrop_sizes": [
            "w300",
            "w780",
            "w1280",
            "original"
        ],
        "logo_sizes": [
            "w45",
            "w92",
            "w154",
            "w185",
            "w300",
            "w500",
            "original"
        ],
        "poster_sizes": [
            "w92",
            "w154",
            "w185",
            "w342",
            "w500",
            "w780",
            "original"
        ],
        "profile_sizes": [
            "w45",
            "w185",
            "h632",
            "original"
        ],
        "still_sizes": [
            "w92",
            "w185",
            "w300",
            "original"
        ]
    },
    "change_keys": [
        "adult",
        "air_date",
        "also_known_as",
        "alternative_titles",
        "biography",
        "birthday",
        "budget",
        "cast",
        "certifications",
        "character_names",
        "created_by",
        "crew",
        "deathday",
        "episode",
        "episode_number",
        "episode_run_time",
        "freebase_id",
        "freebase_mid",
        "general",
        "genres",
        "guest_stars",
        "homepage",
        "images",
        "imdb_id",
        "languages",
        "name",
        "network",
        "origin_country",
        "original_name",
        "original_title",
        "overview",
        "parts",
        "place_of_birth",
        "plot_keywords",
        "production_code",
        "production_companies",
        "production_countries",
        "releases",
        "revenue",
        "runtime",
        "season",
        "season_number",
        "season_regular",
        "spoken_languages",
        "status",
        "tagline",
        "title",
        "translations",
        "tvdb_id",
        "tvrage_id",
        "type",
        "video",
        "videos"
    ]
};
var api_key = '564b2e11aa606d7083773b2abc3fb126';

function languageBtns() {
    var languages = [{
            "iso_639_1": "en",
            "name": "English"
        },
        {
            "iso_639_1": "es",
            "name": "Spanish"
        },
        {
            "iso_639_1": "zh",
            "name": "Chinese"
        },
        {
            "iso_639_1": "ja",
            "name": "Japanese"
        },
        {
            "iso_639_1": "ko",
            "name": "Korean"
        },
        {
            "iso_639_1": "fr",
            "name": "French"
        },
        {
            "iso_639_1": "de",
            "name": "German"
        },
        {
            "iso_639_1": "it",
            "name": "Italian"
        },
        {
            "iso_639_1": "ru",
            "name": "Russian"
        },
        {
            "iso_639_1": "pt",
            "name": "Portuguese"
        }
    ];
    Object.keys(languages).forEach(function(key) {
        var languageBtn = `
                <button class="btn btn-dark btn-language" data-id="${languages[key].iso_639_1}">${languages[key].name}</button>
            `;
        $('#languageButtons').append(languageBtn);
        console.log("appended language btn");
    });
}

function ratingBtns() {
    var ratings = [{
            "certification": "G",
            "order": 1
        },
        {
            "certification": "PG",
            "order": 2
        },
        {
            "certification": "PG-13",
            "order": 3
        },
        {
            "certification": "R",
            "order": 4
        }
    ];
    Object.keys(ratings).forEach(function(key) {
        var ratingBtn = `
                <button class="btn btn-dark btn-rating" data-id="${ratings[key].certification}">${ratings[key].certification}</button>
            `;
        $('#ratingButtons').append(ratingBtn);
        // console.log("appended language btn");
    });
}

/**
 * generates buttons used for searching by genre
 */
function genreButtons() {
    // var queryURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=564b2e11aa606d7083773b2abc3fb126&language=en-US&sort_by=popularity.desc';
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    //     response.genres.forEach(genre => {
    //         var button = `
    //             <button class="btn btn-dark btn-genre" data-id="${genre.id}">${genre.name}</button>
    //         `;
    //         $('#genreButtons').append(button);
    //     });
    // });
    // local array for genres
    var genres = [{
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ];
    // loop through genres and generate the buttons
    Object.keys(genres).forEach(function(key) {
        var button = `
                <button class="btn btn-dark btn-genre" data-id="${genres[key].id}">${genres[key].name}</button>
            `;
        $('#genreButtons').append(button);
    });
}

/**
 * gets movies based on the genre
 * @param {string} id - the genres id
 */
function genreSearch(id) {
    var queryURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + id;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        response.results.forEach(result => {
            displayMovie(result, $('#movies'));
        });
        imagesLoaded();
    });
}

/**
 * general serch that gets movie data based on what your searching for (Ex: Tom Cruise, Jurassic Park) and what that is (Ex: Actor, Movie Title).
 * @param {string} q 
 * @param {string} option
 */
function generalSearch(q, option) {
    // search for movie titles
    var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&query=' + q + '&sort_by=popularity.desc';
    getMovies(queryURL);
}

/**
 * gets movies based on a query
 * @param {string} query - the query to find what we are searching for
 */
function getMovies(query) {
    $.ajax({
        url: query,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        response.results.forEach(element => {
            displayMovie(element, $('#movies'));
        });
        showMore(response.page, response.total_pages);
        imagesLoaded();
    });
}

/**
 * creates a template for the movies data to be displayed in.
 * appends the movie to the grid of recommended movies
 * @param {object} movie - the movies object
 * @param {selector} container - the selector for the container to append to
 */
function displayMovie(movie, container) {
    if (movie.poster_path !== null) {
        var poster = configuration.images.secure_base_url + configuration.images.poster_sizes[6] + movie.poster_path;

        var movieContainer = `
            <div class="col-sm-6 col-md-3 movie-container" data-id="${movie.id}">
                <div class="row">
                    <div class="col-sm-12">
                        <img class="movie-poster" src="${poster}" data-id="${movie.id}" data-toggle="modal" data-target="#movieModalCenter">
                    </div>
                </div>
            </div>
        `;
        container.append(movieContainer);
    }
}

// bind click function to document
// movie posters will be dynamically created
$(document).on('click', '.movie-poster', function() {
    var movie_id = $(this).attr('data-id');
    console.log('movie id: ' + movie_id);
    movieDetails(movie_id);
});

/**
 * get movie details by movie id and populate data in modal
 * @param {string} id - the movies id
 */
function movieDetails(id) {
    // the modal
    var modal = $('#movieModalCenter');
    var modalInner = $('#movieModelContent');
    // get movie details
    var queryURL = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + api_key + '&append_to_response=videos';
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var poster = configuration.images.secure_base_url + configuration.images.poster_sizes[6] + response.poster_path;
        var youtube_key = response.videos.results[0].key;
        console.log('youtube: ' + youtube_key);
        // make a template for modal click on movie info
        var content = `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-6">
                        <img src="${poster}" />
                        <p>Avg Rating: ${response.vote_average}</p>
                        <a class="video- btn btn-danger" data-fancybox href="https://www.youtube.com/watch?v=${youtube_key}">
                            <i class="fa fa-play" aria-hidden="true"></i>
                        </a>
                        <button type="button" class="btn btn-danger user-movie-btn hidden" onclick="addToWatchLater(${response.id})"><i class="fas fa-bookmark"></i></button>
                        <button type="button" class="btn btn-danger user-movie-btn hidden" onclick="addToHaveWatched(${response.id})"><i class="fas fa-address-card"></i></button>
                        <button type="button" class="btn btn-danger user-movie-btn hidden" onclick="addToFavorites(${response.id})"><i class="fas fa-heart"></i></button>
                    </div>
                    <div class="col-sm-6">
                        <h3>${response.original_title}</h3>
                        <p>${response.overview}</p>
                    </div>
                </div>
            </div>
        `;
        // add content to modal
        modalInner.html(content);
        // show modal
        modal.addClass('show');
    });
}

/**
 * get search options from url if they exist
 */
function getURLParameters(page) {
    console.log('getting url params');
    // clear
    $('#movies').empty();
    var pageURL = window.location.search.substring(1);
    var urlParams = [];
    var search = pageURL.slice(pageURL.indexOf('?') + 1);
    console.log('the search url: ' + search);
    var urlVariables = search.split('&');
    for (var i = 0; i < urlVariables.length; i++) {
        var p = urlVariables[i].split('=');
        var pObj = {
            name: p[0],
            searchFor: p[1]
        };
        urlParams.push(pObj);
    }
    // make array of objects to search for
    var options = [];
    Object.keys(urlParams).forEach(function(key) {
        // page
        if (urlParams[key].name === 'page') {
            page = urlParams[key].searchFor;
        }
        // favorite actor
        if (urlParams[key].name === 'fActor') {
            var favoriteActorObj = {
                name: 'favorite actor',
                searchFor: urlParams[key].searchFor,
                endPoint: 'search/person'
            };
            options.push(favoriteActorObj);
        }
        if (urlParams[key].name === 'fMovie') {
            var favoriteMovieObj = {
                name: 'favorite movie',
                searchFor: urlParams[key].searchFor,
                endPoint: 'search/movie'
            };
            options.push(favoriteMovieObj);
        }
        // favorite genre
        if (urlParams[key].name === 'fGenre') {
            var favoriteGenreObj = {
                name: 'favorite genre',
                searchFor: urlParams[key].searchFor,
                endPoint: 'discover/movie'
            };
            options.push(favoriteGenreObj);
        }
        // language
        if (urlParams[key].name === 'language') {
            var favoriteLanguageObj = {
                name: 'language',
                searchFor: urlParams[key].searchFor,
                endPoint: 'discover/movie'
            };
            options.push(favoriteLanguageObj);
        }
        // year
        if (urlParams[key].name === 'year') {
            var yearObj = {
                name: 'year',
                searchFor: urlParams[key].searchFor,
                endPoint: 'discover/movie'
            };
            options.push(yearObj);
        }
        // rating
        if (urlParams[key].name === 'rating') {
            var ratingObj = {
                name: 'rating',
                searchFor: urlParams[key].searchFor,
                endPoint: 'discover/movie'
            };
            options.push(ratingObj);
        }
    });
    // calculate how many params and what to search
    var numOfOptions = options.length;
    if (numOfOptions > 1) {
        console.log('running advanced search');
        advancedSearch(options, page);
    }
    // quick search
    else {
        console.log('running quick search option');
        quickSearch(options, page);
    }
}

/**
 * gets and displays results for quick (single) options
 * @param {array} option - array of option objects
 * @param {string} pg - page number
 */
function quickSearch(option, pg) {
    // search for movie titles
    if (option[0].name === 'favorite movie') {
        var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&page=' + pg + '&query=' + option[0].searchFor + ' & sort_by = popularity.desc ';
        getMovies(queryURL);
    }
    // search for genres
    else if (option[0].name === 'favorite genre') {
        var queryURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + pg + '&with_genres=' + option[0].searchFor;
        getMovies(queryURL);
    }
    // search for languages
    else if (option[0].name === 'language') {
        var queryURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + pg + '&language=' + option[0].searchFor;
        getMovies(queryURL);
    }
    // search for ratings
    else if (option[0].name === 'rating') {
        var queryURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + pg + '&certification_country=US&certification.lte=' + option[0].searchFor;
        console.log('rating query: ' + queryURL);
        getMovies(queryURL);
    }
    // search for release year
    else if (option[0].name === 'year') {
        var queryURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + pg + '&primary_release_year=' + option[0].searchFor;
        getMovies(queryURL);
    }
    // search for people - actors/actresses
    else {
        var queryURL = 'https://api.themoviedb.org/3/search/person?api_key=' + api_key + '&language=en-US&page=' + pg + '&query=' + option[0].searchFor;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var person_id = response.results[0].id;
            var newQueryUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + pg + '&with_people=' + person_id;
            getMovies(newQueryUrl);
        });
    }
}

/**
 * gets movies based on multiple options
 * @param {array} options - array of option objects 
 * @param {string} pg - page number
 */
function advancedSearch(options, pg) {
    var finalURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + pg;
    // get ids for parameters that need to be passed by id
    var finalParams = [];
    (function getOptionIDs() {
        if (options.length) {
            var option = options.shift();
            var query = 'https://api.themoviedb.org/3/' + option.endPoint + '?api_key=' + api_key + '&query=' + option.searchFor + '&sort_by=popularity.desc';
            $.ajax({
                url: query,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                // if results?
                if (response.results[0]) {
                    // get movie id - we will need it to filter
                    var foundID = response.results[0].id;
                    console.log('Got ID:(' + foundID + ')');
                    // add id  
                    if (option.name === 'favorite actor') {
                        var param = {
                            id: foundID,
                            prop: '&with_people='
                        }
                    }
                    if (option.name === 'favorite movie') {
                        // get genre ids array
                        var genreIDs = response.results[0].genre_ids;
                        // save array to string
                        genreIDs = genreIDs.toString();
                        // split genreIDS only use first
                        genreIDs = genreIDs.split(',');
                        var param = {
                            id: foundID,
                            // genre_ids: genreIDs,
                            genre_ids: genreIDs[0],
                            prop: '&with_genres='
                        }
                    }
                    finalParams.push(param);
                    getOptionIDs();
                }
                // no results
                else {
                    console.error('no results found for ' + option.name + ', searching for ' + option.searchFor);
                }
            });
        }
        // once no more options left to get id's for
        else {
            // run the final query
            console.log('final parameters:');
            console.log(finalParams);
            // build new url
            var finalURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false';
            var movieID = '';
            Object.keys(finalParams).forEach(function(param) {
                if (finalParams[param].genre_ids) {
                    movieID = finalParams[param].id;
                    finalURL = finalURL + finalParams[param].prop + encodeURI(finalParams[param].genre_ids);
                } else {
                    finalURL = finalURL + finalParams[param].prop + encodeURI(finalParams[param].id);
                }
            });
            // add page number
            finalURL = finalURL + '&page=' + pg;
            console.log('The final url: ' + finalURL);
            // get and display movie recommendations without displaying the users favorite movie
            console.log('running get filtered movies');
            // get filtered movies
            var totalResults;
            $.ajax({
                url: finalURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                totalResults = response.total_results;
                var totalPages = response.total_pages;
                console.log('totalResults: ' + totalResults);
                response.results.forEach(movie => {
                    // do not display their favorite movie
                    if (movie.id !== movieID) {
                        console.log('current movie id: (' + movie.id + ') does not equal filtered id: (' + movieID + ')');
                        displayMovie(movie, $('#movies'));
                    }
                });
                showMore(response.page, response.total_pages);
                imagesLoaded();
                console.log('done running get filtered movies: ' + totalResults);
                // if we end up needing more recommendations
                if (parseInt(totalResults) > 0) {
                    if (parseInt(totalResults) < 8) {
                        console.log('I think we need more movies. Lets get some.');
                        // this might end up showing duplicates though
                        // response.results.forEach(result => {
                        //     var resID = result.id;
                        //     var rec = 'https://api.themoviedb.org/3/movie/' + resID + '/recommendations?api_key=' + api_key + '&language=en-US&page=1';
                        //     getMovies(rec);
                        // });
                        // instead we might just search recommendations of 1st from response list
                        // first or random havent decided
                        var ep = [
                            'recommendations',
                            'similar'
                        ];
                        // random id from results
                        var randomID = response.results[Math.floor(Math.random() * response.results.length)].id;
                        // random endpoint
                        var randomEP = ep[Math.floor(Math.random() * ep.length)];
                        console.log('We will use random id:(' + randomID + ')');
                        // var recID = response.results[0].id;
                        var rec = 'https://api.themoviedb.org/3/movie/' + randomID + '/' + randomEP + '?api_key=' + api_key + '&language=en-US&page=1';
                        addLoaderOverlay();
                        getMovies(rec);
                    }
                }
                // no results
                else {
                    var noResults = `
                        <div class="col-sm-12">
                            <p class="text-center text-light">No Results Found Please Search Again.</p>
                        </div>
                    `;
                    $('#movies').html(noResults);
                }
            });
        }
    })();
}

/**
 * adds the loader & overlay to the dom
 */
function addLoaderOverlay() {
    var loader = `
        <div id="loaderOverlay">
            <div id="pageLoader">
                <div class="loader">
                    <div class="loader">
                        <div class="loader">
                            <div class="loader">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('body').prepend();
}

/**
 * checks to see if images have been loaded then calls the removeLoader function
 */
function imagesLoaded() {
    $('#movies').waitForImages({
        finished: function() {
            // ...
            console.log('All images have loaded');
        },
        each: function() {
            // ...
            console.log('image loaded');
        },
        waitForAll: true
    });
    $('#movies').waitForImages(true).done(function() {
        // ...
        console.log('removing loader');
        removeLoader();
    });
}

/**
 * removes the loader and displays movies
 */
function removeLoader() {
    $('#loaderOverlay').remove();
    $('#movies').show();
}

// general search button
$('#generalSearchBtn').on('click', function() {
    event.preventDefault();
    var search = $('#generalSearchInput').val().trim();
    var redirectURL = 'search.html?fMovie=' + encodeURI(search);
    window.location.href = redirectURL;
});

// year search
$('#yearSearchBtn').on('click', function() {
    event.preventDefault();
    var feedback = $('#yearFeedback');
    var search = $('#yearInput').val().trim();
    // make sure its a valid year (4 digits)
    if (/^\d{4}$/.test(search) && search > 1900) {
        var redirectURL = 'search.html?year=' + search;
        window.location.href = redirectURL;
    } else {
        feedback.html('<span class="text-danger">Please enter a valid 4 digit year greater than 1900.</span>');
    }
});

// genre button search
$(document).on('click', '.btn-genre', function() {
    var genre_id = $(this).attr('data-id');
    var redirectURL = 'search.html?fGenre=' + genre_id;
    window.location.href = redirectURL;
});

// language btn search
$(document).on('click', '.btn-language', function() {
    var language_id = $(this).attr('data-id');
    var redirectURL = 'search.html?language=' + encodeURI(language_id);
    window.location.href = redirectURL;
});
// ratings
$(document).on('click', '.btn-rating', function() {
    var rating = $(this).attr('data-id');
    var redirectURL = 'search.html?rating=' + encodeURI(rating);
    window.location.href = redirectURL;
});

// advanced search form
$('#advancedSearchBtn').on('click', function() {
    event.preventDefault();
    var favoriteActor = $('#favoriteActor').val().trim();
    var favoriteMovie = $('#favoriteMovie').val().trim();
    var arr = [];
    if (favoriteActor) {
        var fActor = 'fActor=' + encodeURI(favoriteActor);
        arr.push(fActor);
    }
    if (favoriteMovie) {
        var fMovie = 'fMovie=' + encodeURI(favoriteMovie);
        arr.push(fMovie);
    }
    var redirectURL = 'search.html?';
    for (var i = 0; i < arr.length; i++) {
        if (i === 0) {
            redirectURL = redirectURL + arr[i];
        } else {
            redirectURL = redirectURL + '&' + arr[i];
        }
    }
    window.location.href = redirectURL;
});

/**
 * creates the show more movies button
 * @param {string} page - current page
 * @param {string} totalPages - total number of pages
 */
function showMore(page, totalPages) {
    if (totalPages > 1 && page < totalPages) {
        // show more button
        var currentURL = window.location.href;
        var nextPageNum = parseInt(page) + 1;
        var nextPageURL = currentURL.replace('page=' + String(page), 'page=' + String(nextPageNum));
        if (nextPageURL === currentURL) {
            nextPageURL = currentURL + '&page=' + nextPageNum;
        }
        var showMore = `
        <div class="col-sm-12 pb-5">
            <a href="${nextPageURL}" id="showMore" class="btn">Show More <i class="fas fa-plus"></i></a>
        </div>
    `;
        $('#next').html(showMore);
    }
}

/**
 * sets up fancybox for dynamic movie trailers
 */
$().fancybox({
    selector: '.movie-trailer'
});

// init functions
// generalSearch();
genreButtons();
languageBtns();
ratingBtns();

$(document).ready(function() {
    if (window.location.href.indexOf('?') > -1) {
        getURLParameters('1');
    } else {
        removeLoader();
    }
});

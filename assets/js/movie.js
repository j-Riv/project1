// TMDB Configuration save to local so we don't have to pull it.
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

$(document).on('click', '.btn-genre', function() {
    // add loader
    addLoader();
    var genre_id = $(this).attr('data-id');
    $('#movies').empty();
    genreSearch(genre_id);
});

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
            displayMovie(result);
        });
        // checks for loaded images
        $('#movies').waitForImages().done(function() {
            // All descendant images have loaded, now slide up.
            console.log('All images have loaded');
            removeLoader();
        });
    });
}

$('#generalSearchBtn').on('click', function() {
    event.preventDefault();
    $('#movies').empty();
    // add loader
    addLoader();
    var q = $('#generalSearch').val().trim();
    var o = $('#searchFor').val();
    console.log('search for: ' + q + ' with ' + o);
    generalSearch(q, o);
});

/**
 * general serch that gets movie data based on what your searching for (Ex: Tom Cruise, Jurassic Park) and what that is (Ex: Actor, Movie Title).
 * @param {string} q 
 * @param {string} option
 */
function generalSearch(q, option) {
    // search for movie titles
    if (option === '1') {
        var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&query=' + q + '&sort_by=popularity.desc';
        getMovies(queryURL);
    }
    // search for people - actors/actresses
    else {
        var queryURL = 'https://api.themoviedb.org/3/search/person?api_key=' + api_key + '&language=en-US&query=' + q;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var person_id = response.results[0].id;
            var newQueryUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_people=' + person_id;
            getMovies(newQueryUrl);
        });
    }
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
            displayMovie(element);
        });
        // checks for loaded images
        $('#movies').waitForImages().done(function() {
            // All descendant images have loaded, now slide up.
            console.log('All images have loaded');
            removeLoader();
        });
    });
}

/**
 * creates a template for the movies data to be displayed in.
 * appends the movie to the grid of recommended movies
 * @param {object} movie - the movies object 
 */
function displayMovie(movie) {
    var poster = configuration.images.base_url + configuration.images.poster_sizes[6] + movie.poster_path;
    var movieContainer = `
        <div class="col-sm-6 col-md-3 movie-container" data-id="${movie.id}">
            <div class="row">
                <div class="col-sm-12">
                    <img class="movie-poster" src="${poster}" data-id="${movie.id}" data-toggle="modal" data-target="#movieModalCenter">
                </div>
            </div>
        </div>
    `;
    $('#movies').append(movieContainer);
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
        var poster = configuration.images.base_url + configuration.images.poster_sizes[6] + response.poster_path;
        var youtube_key = response.videos.results[0].key;
        console.log('youtube: ' + youtube_key);
        // make a template for modal click on movie info
        var content = `
            <div clas="container-fluid">
                <div class="row">
                    <div class="col-sm-6">
                        <img src="${poster}" />
                        <p>Avg Rating: ${response.vote_average}</p>
                        <a class="video-trailer" data-fancybox href="https://www.youtube.com/watch?v=${youtube_key}">
                            <i class="fa fa-play" aria-hidden="true"></i> Trailer
                        </a>
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

// advanced search form
$('#advancedSearchBtn').on('click', function() {
    event.preventDefault();
    // add loader
    addLoader();
    // clear
    $('#movies').empty();
    // get form values if they exist
    if ($('#favoriteActor').val()) {
        var favoriteActor = $('#favoriteActor').val().trim();
    }
    // get form values if they exist
    if ($('#leastFavoriteActor').val()) {
        var hatedActor = $('#leastFavoriteActor').val().trim();
    }
    // get favorite movie to get movie genres
    if ($('#favoriteMovie').val()) {
        var favoriteMovie = $('#favoriteMovie').val().trim();
    }
    // delete -- testing only
    var favoriteActor = 'johnny depp';
    var hatedActor = 'joaquin phoenix';
    var favoriteMovie = 'john wick';
    // checkboxes all get values will go here eventually

    // the query
    // var querySample = 'https://api.themoviedb.org/3/discover/movie?api_key=564b2e11aa606d7083773b2abc3fb126&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=28%2C878&with_people=6384';
    var baseURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false';
    var finalURL = baseURL;
    // get ids for all parameters 1 by 1 with seperate queries for each
    // keep appending the ids as params to final query
    // filter final query to exclude the favorite movie (id)
    if (favoriteActor) {
        // get genre id
        var getActorID = 'https://api.themoviedb.org/3/search/person?api_key=' + api_key + '&query=' + favoriteActor + '&sort_by=popularity.desc';
        $.ajax({
            url: getActorID,
            method: "GET"
        }).then(function(response) {
            console.log('searching for actor and getting id');
            console.log(response);
            // if results?
            if (response.results[0]) {
                // get actor id
                var actorID = response.results[0].id;
                console.log('Got actor id:(' + actorID + ') for ' + favoriteActor);
                // add actor id to query
                finalURL = finalURL + '&with_people=' + encodeURI(actorID);
            }
            // no results
            else {
                console.error('Favorite actor/actress not found - no results for id');
            }
            // get hated actor id
            if (hatedActor) {
                // get actor id
                var getHatedActorID = 'https://api.themoviedb.org/3/search/person?api_key=' + api_key + '&query=' + hatedActor + '&sort_by=popularity.desc';
                $.ajax({
                    url: getHatedActorID,
                    method: "GET"
                }).then(function(response) {
                    console.log('searching for actor and getting id');
                    console.log(response);
                    // if results?
                    if (response.results[0]) {
                        // get actor id
                        var actorID = response.results[0].id;
                        console.log('Got hated actor id:(' + actorID + ') for ' + hatedActor);
                        // add actor id to query
                        finalURL = finalURL + '&without_people=' + encodeURI(actorID);
                    }
                    // no results
                    else {
                        console.error('Hated actor/actress not found - no results for id');
                    }
                    // get favorite movie's genres
                    if (favoriteMovie) {
                        // get genre ids
                        var getGenreIDs = 'https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&query=' + favoriteMovie + '&sort_by=popularity.desc';
                        $.ajax({
                            url: getGenreIDs,
                            method: "GET"
                        }).then(function(response) {
                            console.log('searching for favorite movie and getting ids');
                            console.log(response);
                            // if results?
                            if (response.results[0]) {
                                // get movie id - we will need it to filter
                                var movieID = response.results[0].id;
                                // get genre ids array
                                var genreIDs = response.results[0].genre_ids;
                                // save array to string
                                genreIDs = genreIDs.toString();
                                console.log('Got genre ids:(' + genreIDs + ') for ' + favoriteMovie);
                                // add genre ids to query
                                finalURL = finalURL + '&with_genres=' + encodeURI(genreIDs);
                                console.log('Final Url: ' + finalURL);
                                // get and display movie recommendations without displaying the users favorite movie
                                getFilteredMovies(movieID, finalURL);

                                // if we end up needing more recommendations
                                if (parseInt(response.total_results) < 8) {
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
                                    getMovies(rec);
                                }
                            }
                            // no results
                            else {
                                console.error('Favorite movie not found - no results for genre ids');
                            }
                        });
                    }
                    // if no favorite movie
                    else {
                        // run the query without favorite movie
                        console.log('no favorite movie selected');
                        console.log('Final Url: ' + finalURL);
                        // get and display movie recommendations based on favorite actor/actress
                        // getMovies(finalURL);
                    }
                });
            }
            // if no hated actor
            else {
                console.error('no favorite actor selected');
            }
        });
    }
    // if no favorite actor
    else {
        console.error('no favorite actor selected');
    }
});

/**
 * gets movies based on a query
 * it excludes the movie searched
 * @param {string} movieID - the movie id for movie to exclude
 * @param {string} query - the query
 */
function getFilteredMovies(movieID, query) {
    $.ajax({
        url: query,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        response.results.forEach(movie => {
            // do not display their favorite movie
            if (movie.id !== movieID) {
                console.log('current movie id: (' + movie.id + ') does not equal filtered id: (' + movieID + ')');
                displayMovie(movie);
            }
        });
        // checks for loaded images
        $('#movies').waitForImages().done(function() {
            // All descendant images have loaded, now slide up.
            console.log('All images have loaded');
            removeLoader();
        });
    });
}

/**
 * adds loader to dom
 */
function addLoader() {
    $('#movies').hide();
    var loader = `
        <div id="circle">
            <div class="loader">
                <div class="loader">
                    <div class="loader">
                        <div class="loader">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('#loader').append(loader);
}

function removeLoader() {
    $('#circle').remove();
    $('#movies').show();
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
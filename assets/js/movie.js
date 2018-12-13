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

// img url build
// base_url, size and file_path
// https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg
// var src = configuration.images.base_url + configuration.images.poster_sizes[6] + response.poster_path;

$(document).on('click', '.movie-poster', function() {
    var movie_id = $(this).attr('data-id');
    console.log('movie id: ' + movie_id);
    movieDetails(movie_id);
});

function movieDetails(id) {
    $('#movies').empty();
    // get movie details
    var queryURL = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + api_key + '&append_to_response=videos';
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var src = configuration.images.base_url + configuration.images.poster_sizes[6] + response.poster_path;
        var youtube_key = response.videos.results[0].key;
        console.log('youtube: ' + youtube_key);
        // make a template for modal click on movie info
        var content = `
            <img src="${src}" />
            <a data-fancybox href="https://www.youtube.com/watch?v=${youtube_key}">
                Trailer
            </a>
        `;
        $('#movies').append(content);
    });
}

// 2 queries see above for new way
function movieDetailsOld(id) {
    $('#movies').empty();
    // get movie details
    // var queryURL = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + api_key;
    var queryURL = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + api_key + '&append_to_responses=videos';
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var src = configuration.images.base_url + configuration.images.poster_sizes[6] + response.poster_path;
        // get movie trailer
        var queryURL = 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=564b2e11aa606d7083773b2abc3fb126&language=en-US';
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var youtube_key = response.results[0].key;
            console.log('youtube: ' + youtube_key);
            // make a template for modal click on movie info
            var content = `
                <img src="${src}" />
                <a href="https://www.youtube.com/watch?v=${youtube_key}" target="_blank">
                    Trailer
                </a>
            `;
            $('#movies').append(content);
        });
    });
}

function displayMovie(el) {
    var poster = configuration.images.base_url + configuration.images.poster_sizes[6] + el.poster_path;
    var movie = `
        <div class="col-sm-6 movie-container" data-id="${el.id}">
            <div class="row">
                <div class="col-sm-6">
                    <img class="movie-poster" src="${poster}" data-id="${el.id}">
                </div>
                <div class="col-sm-6">
                    <h2>${el.original_title}</h2>
                    <p>${el.overview}</p>
                    <p>Avg Rating: ${el.vote_average}</p>
                </div>
            </div>
        </div>
    `;
    $('#movies').append(movie);
}

$('#generalSearchBtn').on('click', function() {
    event.preventDefault();
    var q = $('#generalSearch').val().trim();
    console.log('search for: ' + q);
    generalSearch(q);
});

function generalSearch(q) {
    // var q = 'John Wick';
    var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&query=' + q + '&sort_by=popularity.desc';
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        response.results.forEach(element => {
            displayMovie(element);
        });
    });
}

function genreButtons() {
    var queryURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=564b2e11aa606d7083773b2abc3fb126&language=en-US&sort_by=popularity.desc';
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        response.genres.forEach(genre => {
            var button = `
                <button class="btn btn-dark btn-genre" data-id="${genre.id}">${genre.name}</button>
            `;
            $('#genreButtons').append(button);
        });
    });
}

$(document).on('click', '.btn-genre', function() {
    var genre_id = $(this).attr('data-id');
    genreSearch(genre_id);
});

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
    });
}

// generalSearch();
genreButtons();

// fancybox
$().fancybox({
    selector: '.movie-trailer'
});
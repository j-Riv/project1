// Initalize Firebase
var config = {
    apiKey: "AIzaSyAylVXntb7fwfDE1qianf8r6f_jr2Xrd_A",
    authDomain: "proj-1-eeee7.firebaseapp.com",
    databaseURL: "https://proj-1-eeee7.firebaseio.com",
    projectId: "proj-1-eeee7",
    storageBucket: "proj-1-eeee7.appspot.com",
    messagingSenderId: "592938209987"
};
// firebase.initializeApp(config);

var uiConfig = {
    'signInSuccessUrl': 'http://localhost/projects/project1/movie.html',
    'signInOptions': [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    'tosUrl': '<Terms of service url>',
};
var app = firebase.initializeApp(config);
var auth = app.auth();
var ui = new firebaseui.auth.AuthUI(auth);

/**
 * init for login page funcs
 * checks if user is logged in
 * if user logged in get user data - forward to search
 * else generate sign in/sign up form & sign in with google
 */
function loginInit() {
    // check if user is signed in
    // recommended way to check for user
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log('user signed in');
            console.log(user);
            console.log('user uuid' + user.uid);
            window.location.href = 'movie.html';
        } else {
            // No user is signed in.
            console.log('no user is signed in');
            ui.start('#firebaseui-auth-container', uiConfig);
            // email & password create user
            // validate email
            $('#signUp').on('click', function(event) {
                event.preventDefault();
                var email = $('#signupEmail').val().trim();
                var password = $('#signupPassword').val().trim();
                createUser(email, password);
            });
            // email & password create user
            // validate email
            $('#signIn').on('click', function(event) {
                event.preventDefault();
                var email = $('#signinEmail').val().trim();
                var password = $('#signinPassword').val().trim();
                loginUser(email, password);
            });
        }
    });
}

/**
 * init for search/movie page firebase funcs
 * gets user data if user is signed in
 */
function searchInit() {
    // add logout functionality
    var btn = $('#login-logout');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log('user signed in');
            console.log(user);
            console.log('user uuid' + user.uid);
            var navBar = $('#navList');
            var li = `
                <li class="nav-item">
                    <button type="button" id="signOut" class="btn btn-outline-light">Sign Out</button>
                </li>
            `;
            navBar.append(li);
            // check db for user data if no data write user data
            checkDB(user);
        } else {
            // No user is signed in.
            console.log('no user is signed in');
        }
    });
}

/**
 * displays users data
 * @param {object} user - the user data object
 */
function userInfo(user) {
    var name, email, photoUrl, uid, emailVerified;
    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        var userProfile = $('<div>');
        userProfile.attr('id', 'userProfile');
        userProfile.append(`<p>Email: ${email}</p>`);
        if (name !== null) {
            userProfile.append(`<p>Name: ${name}</p>`);
        }
        if (photoUrl !== null) {
            userProfile.append(`<p><img src="${photoUrl}" /></p>`);
        }
        $('#profile').append(userProfile);
    }
}

/**
 * updates the users data
 * @param {string} user - the user uid 
 */
function updateUserInfo(user) {
    user.updateProfile({
        displayName: "Jose A. Rivera",
        photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
        // Update successful.
    }).catch(function(error) {
        // An error happened.
        console.error('update user info: ' + error);
    });
}

// Get a reference to the database service
var database = firebase.database();

/**
 * checks the database for the current users data
 * gets data if it exists
 * creates data if it doesn't
 * @param {object} user - the user data object
 */
function checkDB(user) {
    database.ref('/users/' + user.uid).once('value', function(snapshot) {
            var data = snapshot.val();
            console.log('user data');
            console.log(data);
            if (data === null) {
                // create it
                writeUserData(user);
            }
        },
        function(errorObject) {
            // If any errors are experienced, log them to console.
            console.error("The read failed: " + errorObject.code);
        });
}

/**
 * saves the users data to database for future use
 * @param {object} user - the user data object
 */
// userId, name, email, imageUrl
function writeUserData(user) {
    // save the user's profile into Firebase so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    database.ref('users/' + user.uid).set({
        email: user.email
            //some more user data
    });
}

/**
 * creates new user with email & password
 * @param {string} email - new users email
 * @param {string} password - new users password
 */
function createUser(email, password) {
    console.log('user created');
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

/**
 * signs in user with email & password
 * @param {string} email - users email
 * @param {string} password - users password
 */
function loginUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

$(document).on('click', '#signOut', function() {
    signOut();
});

/**
 * signs out current user from firebase only
 * if user is signed in with google they will remain signed in to google
 */
function signOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        var url = 'index.html';
        $(location).attr('href', url);
    }).catch(function(error) {
        // An error happened.
    });
}
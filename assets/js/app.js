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
    'signInSuccessUrl': 'http://localhost/project/movie-finder/search.html',
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

// ui.start('#firebaseui-auth-container', uiConfig);

// check if user is signed in
// recommended way to check for user
// login page
function loginInit() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log('user signed in');
            console.log(user);
            console.log('user uuid' + user.uid);
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
// search page
function searchInit() {
    var btn = $('#login-logout');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log('user signed in');
            console.log(user);
            console.log('user uuid' + user.uid);
            btn.append('<button type="button" id="signOut" class="btn btn-outline-light">Sign Out</button>');
            // check db for user data if no data write user data
            checkDB(user);
        } else {
            // No user is signed in.
            console.log('no user is signed in');
            btn.append('<a href="index.html" role="button" aria-pressed="true" class="btn btn-outline-light">Sign In</a>');
        }
    });
}

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
// save the user's profile into Firebase so we can list users,
// use them in Security and Firebase Rules, and show profiles
// userId, name, email, imageUrl
function writeUserData(user) {
    database.ref('users/' + user.uid).set({
        email: user.email
            //some more user data
    });
}

// create new user with email & password
function createUser(email, password) {
    console.log('user created');
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

// normal email & pass sign on
function loginUser() {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

$('#signOut').on('click', function() {
    signOut();
});
// signout 
function signOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        var url = 'http://localhost/project/movie-finder/index.html';
        $(location).attr('href', url);
    }).catch(function(error) {
        // An error happened.
    });
}

function loader() {
    if ($('.firebaseui-id-page-provider-sign-in').length) {
        // kill loader
        clearInterval();
        $('#loader').remove();
        $('#theForm').show();
    } else {
        // check again
        window.setInterval(function() {
            /// call your function here
            loader();
        }, 500);
    }
}
// loader();
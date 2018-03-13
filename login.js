//login con firebase
var provider = new firebase.auth.GoogleAuthProvider();
$('#login').click(function(){
    firebase.auth()
    .signInWithPopup(provider).then(function(result) {
      console.log(result.user);
        $('#login')});
});

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCKrr1DaJn5pk7YYccD1itP5FDlxgXerIE",
    authDomain: "venus-ecommerce.firebaseapp.com",
    databaseURL: "https://venus-ecommerce.firebaseio.com",
    projectId: "venus-ecommerce",
    storageBucket: "venus-ecommerce.appspot.com",
    messagingSenderId: "829622324466"
  };
  firebase.initializeApp(config);

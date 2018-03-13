//login con firebase
var provider = new firebase.auth.GoogleAuthProvider();
   
$('#login').click(function(){
    firebase.auth()
    .signInWithPopup(provider)
    .then(function(result) {
     });
     console.log(result.user);
    //     $('#login').hide();
    //     $().append('<img src'"+result.user.photoURL+"'/>')
});

  // Initialize Firebase

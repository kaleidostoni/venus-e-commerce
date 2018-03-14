var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function(){
    firebase.auth()
    .signInWithPopup(provider)
    .then(function(result) {
        console.log(result.user);
        save(result.user);
        $('#login').hide();
        $('#pseudo').innerHTML = "";
        
        $('#pseudo').append('<img width="50vh" vspace=10vh; src="'+result.user.photoURL+'" />')
      });
      
});
//función que guardo los datos automaticamente
function save(user) {
  var user = {
    uid:user.uid,
    nombre:user.displayName,
    email:user.email,
    foto:user.photoURL
  }
  firebase.database().ref('venus/' + user.iud) //guarda en rama siempre que el usuario inicie sesión
  .set(user)
}

//guardar en base de datos
$('#pseudo').click(function () {
  firebase.database().ref('venus')
  .set({
    // nombre: 'prueba',
    // edad: '0',
  })        
});

// //Base de datos
// firebase.database().ref('venus')
// .on('child_added', function(s){
//   var user = s.val();
//   $('#pseudo').append('<img width="50vh" vspace=10vh; src= "'+user.foto+'"/>');  
//   // document.getElementById('login').innerHTML = 'logout';
// })
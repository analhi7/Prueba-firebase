const registrer = document.getElementById("registrar");

registrer.addEventListener('click', ()=>{

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

firebase.auth().createUserWithEmailAndPassword(email, password)
.then(function(){
    verify()
})
.catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorCode)
    alert(errorMessage)
    // ...
  });
})


const inicioSesion = document.getElementById('inicioSesion');

inicioSesion.addEventListener('click', ()=>{
    const email2 = document.getElementById('email2').value;
    const password2 = document.getElementById('password2').value;
    firebase.auth().signInWithEmailAndPassword(email2, password2)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorCode)
        alert(errorMessage)
      });

})


const watcher = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          welcome();
          var displayName = user.displayName;
          var email = user.email;
          console.log(user)
          console.log(emailVerified)
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          console.log('no existe usuario activo')
          // ...
        }
      });
      
}

watcher();


const welcome = () => {
    const content= document.getElementById('content')
    content.innerHTML = `
    <p> Holiwis my friend<p>
    
   `
}


const logout = document.getElementById('logout');

logout.addEventListener('click', ()=>{
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('saliendo')
      }).catch(function(error) {
        // An error happened.
        
      });

})


const verify = () =>{
var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
  console.log('Send an email')
}).catch(function(error) {
  // An error happened.
});

}
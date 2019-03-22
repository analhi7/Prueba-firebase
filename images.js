window.onload = inicializar;
var fichero;
var storageRef;
function inicializar () {
    fichero= document.getElementById('fichero');
    fichero.addEventListener('change', subirImagenAFirebase, false);

    storageRef= firebase.storage().ref();


}

function subirImagenAFirebase(){
   var imagenSubir = fichero.files[0];

var uploadTask = storageRef.child('imagenes/' + imagenSubir.name).put(imagenSubir);

uploadTask.on('state_changed', function(snapshot){

    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    // Handle unsuccessful uploads
  }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
      alert(downloadURL);
    });
  });

}



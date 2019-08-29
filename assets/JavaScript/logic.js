//Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAvjILnVHNxxPPiHgFUd5wG-C8cO5nHj_M",
    authDomain: "north-west-railway.firebaseapp.com",
    databaseURL: "https://north-west-railway.firebaseio.com",
    projectId: "north-west-railway",
    storageBucket: "",
    messagingSenderId: "451555401707",
    appId: "1:451555401707:web:fb0577ecc4fa2574"
  };

  firebase.initializeApp(firebaseConfig);

  //Variable to store database
  var database = firebase.database();
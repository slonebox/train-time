//Variables to store trains and destinations users can select
var trainNames = ["Bill", "Ben", "Diesel", "Donald", "Douglas", "Duck", "Edward", "Emily", "Gordon", "Henry", "James", "Oliver", "Percy", "Rebecca", "Thomas", "Toby"];

var destinations = ["Abbey", "Arlesburgh - Bridge Street", "Arlesburgh West", "Arlesdale Green", "Arlesdale Road", "Ballahoo", "Barrow", "Brendam", "Bryreck", "Cronk", "Crosby", "Crosny Cuirn", "Crovan's Gate", "Culdee Fell Summit", "Devil's Back", "Dryaw", "Elsbridge", "Ffarquhar East", "Ffarquhar West", "Glennock", "Hackenbeck", "Harwick", "Haultraugh", "Kellsthorpe Road", "Kildane", "Kirk Machan", "Kirk Roran", "Knapford", "Lakeside", "Maron", "Marth Waite", "Norramby", "Peel Godred", "Rheneas", "Rolf's Castle", "Shiloh", "Skarloey", "Skarloey Road", "Suddery", "Tid Mouth", "Vicarstown", "Wellsworth"];

//Function that dynamically adds these options to the HTML <form>
for (i = 0; i < trainNames.length; i++) {
    trainOption = $("<option>").text(trainNames[i]);
    $("#train-name-input").append(trainOption);
};

for (i = 0; i < destinations.length; i++) {
    destinationOption = $("<option>").text(destinations[i]);
    $("#destination-input").append(destinationOption);
};

//Initialize Firebase
const firebaseConfig = {
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

//
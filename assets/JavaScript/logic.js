//Variables to store trains and destinations users can select
var trains = ["Bill", "Ben", "Diesel", "Donald", "Douglas", "Duck", "Edward", "Emily", "Gordon", "Henry", "James", "Oliver", "Percy", "Rebecca", "Thomas", "Toby"];

var destinations = ["Abbey", "Arlesburgh - Bridge Street", "Arlesburgh West", "Arlesdale Green", "Arlesdale Road", "Ballahoo", "Barrow", "Brendam", "Bryreck", "Cronk", "Crosby", "Crosny Cuirn", "Crovan's Gate", "Culdee Fell Summit", "Devil's Back", "Dryaw", "Elsbridge", "Ffarquhar East", "Ffarquhar West", "Glennock", "Hackenbeck", "Harwick", "Haultraugh", "Kellsthorpe Road", "Kildane", "Kirk Machan", "Kirk Roran", "Knapford", "Lakeside", "Maron", "Marth Waite", "Norramby", "Peel Godred", "Rheneas", "Rolf's Castle", "Shiloh", "Skarloey", "Skarloey Road", "Suddery", "Tid Mouth", "Vicarstown", "Wellsworth"];

//Function that dynamically adds these options to the HTML <form>
for (i = 0; i < trains.length; i++) {
    trainOption = $("<option>").text(trains[i]);
    $("#train-name-input").append(trainOption);
};

for (i = 0; i < destinations.length; i++) {
    destinationOption = $("<option>").text(destinations[i]);
    $("#destination-input").append(destinationOption);
};

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAVb9JYY9gt4N4e8Ez7lL9D0g9NuMQfWaI",
  authDomain: "north-west-railway-8171e.firebaseapp.com",
  databaseURL: "https://north-west-railway-8171e.firebaseio.com",
  projectId: "north-west-railway-8171e",
  storageBucket: "",
  messagingSenderId: "241521170212",
  appId: "1:241521170212:web:9fbf84815e557b01"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//Function to write to database new train schedules
$("#schedule-train-button").on("click", function (event){
  event.preventDefault();

  //Select user inputs
  trainInput = $("#train-name-input").val().trim();
  destinationInput = $("#destination-input").val().trim();
  timeInput = $("#hours-input").val().trim() + ":" + $("#minutes-input").val().trim();
  frequencyInput = $("#frequency-input").val().trim();

  console.log(trainInput);
  console.log(destinationInput);
  console.log(timeInput);
  console.log(frequencyInput);

  //Create new object
  newTrain = {
    name: trainInput,
    destination: destinationInput,
    time: timeInput,
    frequency: frequencyInput
  };

  console.log(newTrain);

  database.ref().push(newTrain);

})

//Function to read train schedules and display in the HTML table
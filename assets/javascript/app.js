$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB8Yjz8mJmG2o43Yt-wzarbSPCDXft5pN8",
        authDomain: "train-scheduler-e5e4f.firebaseapp.com",
        databaseURL: "https://train-scheduler-e5e4f.firebaseio.com",
        projectId: "train-scheduler-e5e4f",
        storageBucket: "train-scheduler-e5e4f.appspot.com",
        messagingSenderId: "808159732952"
    };

    var nextTrainDisplay;

    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    $("#submit").on("click", function (event) {

        event.preventDefault();

        // Code in the logic for storing and retrieving the most recent user.
        var name = $("#trainName-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = $("#firstTrain-input").val().trim();
        var frequency = $("#frequency-input").val().trim();

        if (name !== "" && destination !== "" && firstTrain !== "" && frequency !== "") {
            database.ref().push({
                name: name,
                destination: destination,
                firstTrain: firstTrain,
                frequency: frequency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });

        } else {
            alert("Please enter all fields!")
        }

        $("#trainName-input").val("");
        $("#destination-input").val("");
        $("#firstTrain-input").val("");
        $("#frequency-input").val("");

    });


    firebase.database().ref().on("child_added", function (childSnapshot) {

        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var firstTime = childSnapshot.val().firstTrain;
        var tFrequency = childSnapshot.val().frequency;
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        // console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        // console.log("Current Time: " + currentTime);

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log("Difference Time: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        // console.log("Remainder: " + tRemainder);

        // Minutes Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        // console.log("Minutes Until Train: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        nextTrainDisplay = moment(nextTrain).format("HH:mm");




        var tableData = $("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + tFrequency + "</td><td>" + nextTrainDisplay + "</td><td>" + tMinutesTillTrain + "</td></tr>");
        // console.log(tableData);
        $("#trainScheduleData").append(tableData);

    });



});
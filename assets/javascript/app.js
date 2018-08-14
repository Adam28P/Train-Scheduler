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


        firebase.database().ref().orderByChild("dateAdded").limit(1).on("child_added", function (childSnapshot) {
            var tableData = $("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>TBD</td><td>TBD</td></tr>");
            $("#trainScheduleData").append(tableData);

        });


    })

    firebase.database().ref().orderByChild("dateAdded").on("child_added", function (childSnapshot) {
        var tableData1 = $("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>TBD</td><td>TBD</td></tr>");
        $("#trainScheduleData").append(tableData1);
    })

});
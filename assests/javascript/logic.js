var payroll = [];


$("#submit").on("click", function (event) {
    event.preventDefault()

    var nameText = $("#name").val();
    var destText = $("#dest").val();
    var freqText = $("#freq").val();
    var firstText = $("#first").val();
    // var monthlyRateText = $("#monthlyRate").val();
    var newData = {
        name: nameText,
        dest: destText,
        freq: freqText,
        first: firstText,
    }
    payroll.push(newData)

    database.ref().push(newData)
})
// Initialize Firebase
var config = {
    apiKey: "AIzaSyB1km8mEHGQxG4AlMa61apnXW0KU6hEAEw",
    authDomain: "trains-6a840.firebaseapp.com",
    databaseURL: "https://trains-6a840.firebaseio.com",
    projectId: "trains-6a840",
    storageBucket: "trains-6a840.appspot.com",
    messagingSenderId: "307549473569"
  };


firebase.initializeApp(config);
var database = firebase.database();
database.ref().on("child_added", function (snapshot) {
    
    var newName = $("<td>" + snapshot.val().name + "</td>")
    var newDest = $("<td>" + snapshot.val().dest + "</td>")
    var newFreq = $("<td>" + snapshot.val().freq + "</td>")
    var newArrText = $("<td>")
    var newTime = $("<td>")


    var first = snapshot.val().first
    console.log(first)
    var hFirst = first.slice(0,2)
    hFirst = hFirst*60
    console.log(hFirst)
    var mFirst = first.slice(4,6)
    console.log(mFirst)
    var mmFirst = parseInt(hFirst) + parseInt(mFirst)
    console.log(mmFirst)
    var freq = snapshot.val().freq
    var newArr = parseInt(mmFirst) + parseInt(freq)
    console.log(newArr)
    var now = moment().format('HHmm');
    // console.log(now)
    // var hNow = now.slice(0,2)
    // hNow = hNow*60
    // console.log(hNow)
    // var mNow = now.slice(4,5)
    // console.log(mNow)
    // var mmNow = parseInt(hNow) + parseInt(mNow)
    // console.log(mmNow)

    while (now > newArr){
        newArr = parseInt(newArr) + parseInt(freq);
    }
    console.log(newArr)
    var hNewArr = Math.floor(newArr/ 100)
    console.log(hNewArr)
    var mNewArr = newArr-(hNewArr*100)
    console.log(mNewArr)
    if (hNewArr > 12) {
        hNewArr -= 12
    }
    console.log(hNewArr + ":" + mNewArr )
    



    var timeTil = parseInt(newArr) - parseInt(now);
    console.log(newArr)
    console.log(timeTil)
    var newRow = $("<tr>")
    newArrText.append("" + hNewArr + ":" + mNewArr + "</td>")
    newTime.append("" + timeTil + "</td>")
    newRow.append(newName, newDest, newFreq, newArrText, newTime)
    // newRow.append(newMonthsWorked, totalBilled)
    $("tbody").append(newRow)
    console.log(snapshot.val())
})
// var config = {
//   apiKey: "AIzaSyDHQWb-9NmoPuKRzAwt9Tja7FNEyYECQnU",
//   authDomain: "eventfinder-1e474.firebaseapp.com",
//   databaseURL: "https://eventfinder-1e474.firebaseio.com",
//   projectId: "eventfinder-1e474",
//   storageBucket: "eventfinder-1e474.appspot.com",
//   messagingSenderId: "338849867147"
// };

// firebase.initializeApp(config);


// var myFirebase = firebase.database().ref("addEvents");


// $(window).load(function() {
// 	var x = "";
// 	// var toDisplay = myFirebase.orderByChild('organization').equalto('Latin Club');
// 	myFirebase.once('value',function(snapshot) 
// 	{
// 		snapshot.forEach(function(_child) {		
// 			var obj = snapshot.val();
// 			x = x + "<p>" + obj.description + "</p>"
// 		});
// 	});
// 	document.getElementById('pgContent').innerHTML = x
// });

// function openNav() {
//     document.getElementById("mySidenav").style.width = "250px";
//     document.getElementById("main").style.marginLeft = "250px";
// }

// function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
//     document.getElementById("main").style.marginLeft= "0";
// }
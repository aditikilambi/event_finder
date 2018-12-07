// Initialize Firebase
var config = {
  apiKey: "AIzaSyDHQWb-9NmoPuKRzAwt9Tja7FNEyYECQnU",
  authDomain: "eventfinder-1e474.firebaseapp.com",
  databaseURL: "https://eventfinder-1e474.firebaseio.com",
  projectId: "eventfinder-1e474",
  storageBucket: "eventfinder-1e474.appspot.com",
  messagingSenderId: "338849867147"
};

firebase.initializeApp(config);


var myFirebase = firebase.database().ref();

var allEvents = myFirebase.child("allEvents");

var addEvents = function () {

	localStorage.setItem("eventcreate", "true");


	var confirm = window.confirm("Publish Event?");
	if(!confirm) return false;
	var name = $("#eventName").val();
	var organization = "Latin Club";
	var date = $("#date").val();
	var location = $("#location").val();
  	var startTime = $("#startTime option:selected").val() + ":" + $("#startTime2 option:selected").val() + " " + $("#ampm1 option:selected").val();
  	var endTime = $("#endTime option:selected").val() + ":" + $("#endTime2 option:selected").val() + " " + $("#ampm2 option:selected").val();
	var description = $("#description").val();
	var longd = $("#long-description").val();
	var tags = $("#tags").val().split(" ");
	var eventType = $("#eventType option:selected").val();
	var url = $("#imageurl").val();

	if(url == '') {
		url = "./images/imageSenior.jpg";
	}

	allEvents.push({
		"name": name,
		"organization": organization,
		"date": date,
		"location": location,
		"startTime": startTime,
		"endTime": endTime,
		"description": description,
		"longDes": longd,
		"tags": tags,
		"eventTypes": eventType,
		"imageURL" : url,
	});
};

var editEvents = function () {

	localStorage.setItem("eventedit", "true");


	var confirm = window.confirm("Publish Changes?");
	if(!confirm) return false;
	var name = $("#eventName").val();
	var organization = "Latin Club";
	var date = $("#date").val();
	var location = $("#location").val();
  	var startTime = $("#startTime option:selected").val() + ":" + $("#startTime2 option:selected").val() + " " + $("#ampm1 option:selected").val();
  	var endTime = $("#endTime option:selected").val() + ":" + $("#endTime2 option:selected").val() + " " + $("#ampm2 option:selected").val();
	var description = $("#description").val();
	var longd = $("#longdescription").val();
	var tags = $("#tags").val().split(" ");
	var eventType = $("#eventType option:selected").val();
	var url = $("#imageurl").val();

	if(url == '') {
		url = "./images/imageSenior.jpg";
	}

	allEvents.push({
		"name": name,
		"organization": organization,
		"date": date,
		"location": location,
		"startTime": startTime,
		"endTime": endTime,
		"description": description,
		"longDes": longd,
		"tags": tags,
		"eventTypes": eventType,
		"imageURL" : url,
	});

	allEvents.child(localStorage.getItem('toEdit')).remove();
	// window.location.href = "./myEvents.html";

};

// function confirmLeaving(callback) {
// 		$.confirm({
// 		    title: 'Confirm!',
// 		    content: 'Simple confirm!',
// 		    buttons: {
// 		        confirm: function () {
// 		            $.alert('Confirmed!');
// 		        },
// 		        cancel: function () {
// 		            $.alert('Canceled!');
// 		            return false;
// 		        },
// 		    }
// 		});
// 	callback();
// }


function addTag(id){
	document.getElementById('tags').value+= id + " ";
}

function searchTag(id){
	document.getElementById('tags').value = id;
}

$(window).load(function() {
	$('#addEventForm').submit(addEvents);
});

$(window).load(function() {
	$('#editEventForm').submit(editEvents);
});

function parseString(toParse) {
	return toParse.split(" ")[0];
}

function showMessage() {
	document.getElementById('message').style.display = 'block';

}

function hideMessage() {
	document.getElementById('message').style.display = 'none';
}

function showMessage1() {
	document.getElementById('message1').style.display = 'block';

}

function hideMessage1() {
	document.getElementById('message1').style.display = 'none';
}

var searchterms = function() {
	var organization = $( "#Organization option:selected" ).val();
	var eventTypeS = $( "#eventTypeSearch option:selected" ).val();
	var searchTag = $("#tags").val().split(" ")[0];
	localStorage.setItem('search', true);
	localStorage.setItem('orgSearch', organization);
	localStorage.setItem('type', eventTypeS);
	localStorage.setItem('tags', searchTag);
}

$(window).load(function() {
	$('#searchbar').submit(searchterms);
});


function date(dateString){
	var month = dateString.substring(5,7);
	var returnMonth = '';
	if(month === "01")returnMonth = 'Jan';
	else if(month === "02")returnMonth = 'Feb';
	else if(month === "03")returnMonth = 'Mar';
	else if(month === "04")returnMonth = 'Apr';
	else if(month === "05")returnMonth = 'May';
	else if(month === "06")returnMonth = 'Jun';
	else if(month === "07")returnMonth = 'Jul';
	else if(month === "08")returnMonth = 'Aug';
	else if(month === "09")returnMonth = 'Sep';
	else if(month === "10")returnMonth = 'Oct';
	else if(month === "11")returnMonth = 'Nov';
	else if(month === "12")returnMonth = 'Dec';

	return returnMonth + '   ' + dateString.substring(8,10);
}

$(document).ready(function() {
    var text_max = 99;
    $('#textarea_feedback').html(text_max + ' characters remaining');

    $('#description').keyup(function() {
        var text_length = $('#description').val().length;
        var text_remaining = text_max - text_length;

        $('#textarea_feedback').html(text_remaining + ' characters remaining');
        console.log(text_remaining);
        	document.getElementById('textarea_feedback').style.color = 'white';
        if(text_remaining <= 10) {
        	document.getElementById('textarea_feedback').style.color = '#FFCD00';
	    }
    });
});


function editEvent(key){
	localStorage.setItem("toEdit", key.toString());
}

function deleteEvent(key){
	var toDelete = window.confirm('Are you sure you would like to delete this event?');
	if(!toDelete) return false;
	localStorage.setItem('eventDeleted', "true");
	allEvents.child(key).remove();
	document.location.href = './myEvents.html';
}

function populatePage(){

		var myRef = firebase.database().ref().child("allEvents");
		console.log(localStorage.getItem('toEdit'));
		myRef.child(localStorage.getItem('toEdit')).once('value',function(snapshot) {
			var obj=snapshot.val();
	        document.getElementById('eventName').value = obj.name;
	        document.getElementById('toChange').innerHTML = "Editing <i>" + obj.name + "</i> Event";
	        document.getElementById('date').value = obj.date;
	        document.getElementById('location').value = obj.location;
	        document.getElementById('description').value = obj.description;
	        document.getElementById('longdescription').value = obj.longDes;
	        $(document).ready(function(){
	        	var array = parseTime(obj.startTime);
	        	console.log(array);
      			$('[name="start"]').val(array.hours);
      			$('[name="startmin"]').val(array.min);
      			$('[name="startam"]').val(array.pm);
    		});
    		$(document).ready(function(){
	        	var array1 = parseTime(obj.endTime);
	        	console.log(array1);
      			$('[name="end"]').val(array1.hours);
      			$('[name="endmin"]').val(array1.min);
      			$('[name="endam"]').val(array1.pm);
    		});
    		$(document).ready(function() {
    			$('[name="type"]').val(obj.eventTypes);
    		});
    		document.getElementById('imageurl').value = obj.imageURL;
    		document.getElementById('tags').value = totagString(obj.tags);
	     });
}


function parseTime(timeString){
	var hours = timeString.split(':');
	hours = hours[0];

	var min = timeString.split(':');
	min = min[1].split(' ')[0];

	var pm = timeString.split(' ');
	pm = pm[1];

	return {hours, min, pm};
}

function totagString(tagArray) {
	var arrayLength = tagArray.length;
	var toAppend = '';
	for (var i = 0; i < arrayLength; i++) {
		toAppend = toAppend + tagArray[i] + ' ';
	}
	return toAppend;
}

/*  Method for populating myEvents Page with only events from the organization */

$(window).load(function() {
	allEvents.orderByChild('date').once('value',function(snapshot)
	{
		var x = ' ';
		var i = 0;
		snapshot.forEach(function(snapshot) {
			var obj = snapshot.val();
			var key = snapshot.key;
			var toEdit = JSON.stringify({

				name: obj.name,
				date: obj.date,
				startTime: obj.startTime,
				endTime: obj.endTime,
				description: obj.description,
				longboi: obj.longDes,
				location: obj.location
			});
			if(obj.organization === "Latin Club") {
					x = x +
		        	"<div class='container event'>" +
		          		"<div class='row'>" +
				            "<div class='col-sm-3 date'>" +
				       		 	"<p>" + date(obj.date) + "</p>" +
				       		 "</div>" +

				       		 "<div class='col-sm-8 title'>"+
				       		 	"<p>" + obj.name + "</p>" +
				       		 "</div>" +

							"<div class='share' style='padding: 15px; text-align: center;'>" +
				         	 	"<a href='editEvent.html' id='" + key + "'onclick='editEvent(this.id);'><button class='edit'>Edit Event</button></a>&nbsp;<a href='#' id='" + key + "'onclick='deleteEvent(this.id);'><button class='edit'>Delete Event</button></a><br><br>" +
							"</div>" +
		       		 	"</div>"+

			       		 "<div class='col-sm-3' id='eventimage'>" +
			          		"<img class='img-responsive crop' src='" + obj.imageURL + "'/>" +
			          		"<a data-toggle='modal' href='#clubModal" + parseString(obj.organization) + "' id='org" + i + "' class='dontshow'><button>" + obj.organization + " Information</button></a>"+
			        	 "</div>" +

			        	 "<div class='col-sm-9 description'>"+

			        	 	"<p> <strong>Time:</strong> " + obj.startTime + " - " + obj.endTime +
			        	 	"<p> <strong>Organization: </strong>" + obj.organization + "</a></p>" +
			        	 	"<p> <strong>Location: </strong><a href='http://maps.google.com'>" + obj.location + "</a></p>" +
			        	 	"<p> <strong>Description: </strong>" + obj.description + "</p>" +
			        	 	"<div id='longBoi" + i + "' class='dontshow'> <p><strong> Details: </strong></p>" + obj.longDes + "</div>" +


			              "<div id='seemore" + i + "'class='displayIt' onclick='clickIt(" + i + ")'>" +
			            	"<p><button>see more</button></p>" +
			              "</div>" +

				          "<div id='seeless" + i + "'class='dontshow' onclick='clickItBack("+ i + ")'>" +
				          	"<br><p><button>see less</button></p>" +
            			  "</div>" +
			              "</div>" +
		              "</div> <br><br><br>";
	            }
		 	if (document.getElementById('myEventContent') == null) return;
		 	document.getElementById('myEventContent').innerHTML = x;
		 	i = i + 1;
		});
	});
});



$(window).load(function() {
	if(localStorage.getItem('search') == null) {
		allEvents.orderByChild('date').once('value',function(snapshot)
		{
			var x = ' ';
			var i = 0;
			snapshot.forEach(function(snapshot) {
				var obj = snapshot.val();
				var key = snapshot.key;
				if(obj.organization === "Latin Club") {
						x = x +
			        	"<div class='container event'>" +
			          		"<div class='row'>" +
					            "<div class='col-sm-3 date'>" +
					       		 	"<p>" + date(obj.date) + "</p>" +
					       		 "</div>" +

					       		 "<div class='col-sm-8 title'>"+
					       		 	"<p>" + obj.name + "</p>" +
					       		 "</div>" +

								"<div class='share' style='padding: 15px; text-align: center;'>" +
					         	 	"<a href='editEvent.html' id='" + key + "'onclick='editEvent(this.id);'><button class='edit'>Edit Event</button></a>&nbsp;<a href='#' id='" + key + "'onclick='deleteEvent(this.id);'><button class='edit'>Delete Event</button></a><br><br>" +
								"</div>" +
			       		 	"</div>"+

				       		 "<div class='col-sm-3' id='eventimage'>" +
				          		"<img class='img-responsive crop' src='" + obj.imageURL + "'/>" +
				          		"<a data-toggle='modal' href='#clubModal" + parseString(obj.organization) + "' id='org" + i + "' class='dontshow'><button>" + obj.organization + " Information</button></a>"+
				        	 "</div>" +

				        	 "<div class='col-sm-9 description'>"+

				        	 	"<p> <strong>Time:</strong> " + obj.startTime + " - " + obj.endTime +
				        	 	"<p> <strong>Organization: </strong>" + obj.organization + "</a></p>" +
				        	 	"<p> <strong>Location: </strong><a href='http://maps.google.com'>" + obj.location + "</a></p>" +
				        	 	"<p> <strong>Description: </strong>" + obj.description + "</p>" +
				        	 	"<div id='longBoi" + i + "' class='dontshow'> <p><strong> Details: </strong></p>" + obj.longDes + "</div>" +


				              "<div id='seemore" + i + "'class='displayIt' onclick='clickIt(" + i + ")'>" +
				            	"<p><button>see more</button></p>" +
				              "</div>" +

					          "<div id='seeless" + i + "'class='dontshow' onclick='clickItBack("+ i + ")'>" +
					          	"<br><p><button>see less</button></p>" +
	            			  "</div>" +
				              "</div>" +
			              "</div> <br><br><br>";
		           }
				else{
					x = x +
		        	"<div class='container event'>" +
		          		"<div class='row'>" +
				            "<div class='col-sm-3 date'>" +
				       		 	"<p>" + date(obj.date) + "</p>" +
				       		 "</div>" +

				       		 "<div class='col-sm-8 title'>"+
				       		 	"<p>" + obj.name + "</p>" +
				       		 "</div>" +

							"<div class='share' style='padding: 15px; text-align: center;'>" +
				       		 "</div>" +
		       		 	"</div>"+

			       		 "<div class='col-sm-3' id='eventimage'>" +
			          		"<img class='img-responsive crop' src='" + obj.imageURL + "'/>" +
			          		"<a data-toggle='modal' href='#clubModal" + parseString(obj.organization) + "' id='org" + i + "' class='dontshow'><button>" + obj.organization + " Information</button></a>"+
			        	 "</div>" +

			        	 "<div class='col-sm-9 description'>"+

			        	 	"<p> <strong>Time:</strong> " + obj.startTime + " - " + obj.endTime +
			        	 	"<p> <strong>Organization:</strong> " + obj.organization + "</p>" +
			        	 	"<p> <strong>Location: </strong><a href='http://maps.google.com'>" + obj.location + "</a></p>" +
			        	 	"<p> <strong>Description: </strong>" + obj.description + "</p>" +
			        	 	"<div id='longBoi" + i + "' class='dontshow'> <p><strong> Details: </strong></p>" + obj.longDes + "</div>" +


			              "<div id='seemore" + i + "'class='displayIt' onclick='clickIt(" + i + ")'>" +
			            	"<p><button>see more</button></p>" +
			              "</div>" +

				          "<div id='seeless" + i + "'class='dontshow' onclick='clickItBack("+ i + ")'>" +
				          	"<br><p><button>see less</button></p>" +
            			  "</div>" +
			              "</div>" +
		              "</div> <br><br><br>";
		             }
			 	if (document.getElementById('allEventContent') == null) return;
			 	document.getElementById('allEventContent').innerHTML = x;
			 	i = i + 1;
			});
		});
	}
});

$(window).load(function() {

	if(localStorage.getItem('search')) {


		var orgToSearch = localStorage.getItem('orgSearch');
		var etypeToSearch = localStorage.getItem('type');

		var tempEvents= myFirebase.child("allEvents");
		var both = false;
		if(orgToSearch != "" && etypeToSearch != ""){
			var searchRef = querybase.ref(tempEvents, ['organization']).where({
					organization: orgToSearch,
			});
			both = true;
		}
		else if(orgToSearch != ""){
			var searchRef = querybase.ref(tempEvents, ['organization']).where({
					organization: orgToSearch,
			});
		}
		else if(etypeToSearch != ""){
			var searchRef = querybase.ref(tempEvents, ['eventTypes']).where({
					eventTypes: etypeToSearch,
			});
		}
		else {
			var searchRef = allEvents.orderByChild('date');
		}

		console.log(orgToSearch + '.' + etypeToSearch + '.' + localStorage.getItem('tags'));

		if (orgToSearch == '') orgToSearch = 'Any organization';
		if (etypeToSearch == '') etypeToSearch = 'Any category';
		if (localStorage.getItem('tags') == '') var tagstring = 'Any tags';


		searchRef.once('value',function(snapshot)
		{

			var orgString = localStorage.getItem('orgSearch') == '' ? '' : localStorage.getItem('orgSearch');
			var typeString = localStorage.getItem('type') == '' ? '' : localStorage.getItem('type');
			var tagstring = localStorage.getItem('tags') == '' ? '' : localStorage.getItem('tags');

			var cool =  '<strong>Searching for:</strong> '  + orgString + ' '  + typeString + ' '  + tagstring;
			document.getElementById('searchEventsCover').innerHTML = cool;

			var x = '';
			var i = 0;

			if(!both){
				snapshot.forEach(function(snapshot) {
						var obj = snapshot.val();
						console.log(localStorage.getItem('tags'));

						if(localStorage.getItem('tags') == '' || obj.tags.includes(localStorage.getItem('tags'))){
							x = x +
				        	"<div class='container event'>" +
				          		"<div class='row'>" +
						            "<div class='col-sm-3 date'>" +
						       		 	"<p>" + date(obj.date) + "</p>" +
						       		 "</div>" +

						       		 "<div class='col-sm-8 title'>"+
						       		 	"<p>" + obj.name + "</p>" +
						       		 "</div>" +

									"<div class='share' style='padding: 15px; text-align: center;'>" +
						       		 "</div>" +
				       		 	"</div>"+

					       		 "<div class='col-sm-3' id='eventimage'>" +
					          		"<img class='img-responsive crop' src='" + obj.imageURL + "'/>" +
					          		"<a data-toggle='modal' href='#clubModal" + parseString(obj.organization) + "' id='org" + i + "' class='dontshow'><button>" + obj.organization + " Information</button></a>"+
					        	 "</div>" +

					        	 "<div class='col-sm-9 description'>"+

					        	 	"<p> <strong>Time:</strong> " + obj.startTime + " - " + obj.endTime +
					        	 	"<p> <strong>Organization:</strong> " + obj.organization + "</p>" +
					        	 	"<p> <strong>Location:</strong> " + obj.location + "</p>" +
					        	 	"<p> <strong>Description: </strong>" + obj.description + "</p>" +
					        	 	"<div id='longBoi" + i + "' class='dontshow'> <p><strong> Details: </strong></p>" + obj.longDes + "</div>" +


					              "<div id='seemore" + i + "'class='displayIt' onclick='clickIt(" + i + ")'>" +
					            	"<p><button>see more</button></p>" +
					              "</div>" +

						          "<div id='seeless" + i + "'class='dontshow' onclick='clickItBack("+ i + ")'>" +
						          	"<br><p><button>see less</button></p>" +
		            			  "</div>" +
					              "</div>" +
				              "</div> <br><br><br>";

						 	if (document.getElementById('allEventContent') == null) return;
						 	document.getElementById('allEventContent').innerHTML = x;
						    i = i + 1;
						}

					});
				}
			if(both){
				snapshot.forEach(function(snapshot) {
					var obj = snapshot.val();
					if(localStorage.getItem('type') == obj.eventTypes) {
						if(localStorage.getItem('tags') == '' || obj.tags.includes(localStorage.getItem('tags'))){
							x = x +
				        	"<div class='container event'>" +
				          		"<div class='row'>" +
						            "<div class='col-sm-3 date'>" +
						       		 	"<p>" + date(obj.date) + "</p>" +
						       		 "</div>" +

						       		 "<div class='col-sm-8 title'>"+
						       		 	"<p>" + obj.name + "</p>" +
						       		 "</div>" +

									"<div class='share' style='padding: 15px; text-align: center;'>" +
						       		 "</div>" +
				       		 	"</div>"+

					       		 "<div class='col-sm-3' id='eventimage'>" +
					          		"<img class='img-responsive crop' src='" + obj.imageURL + "'/>" +
					          		"<a data-toggle='modal' href='#clubModal" + parseString(obj.organization) + "' id='org" + i + "' class='dontshow'><button>" + obj.organization + " Information</button></a>"+
					        	 "</div>" +

					        	 "<div class='col-sm-9 description'>"+

					        	 	"<p> <strong>Time:</strong> " + obj.startTime + " - " + obj.endTime +
					        	 	"<p> <strong>Organization:</strong> " + obj.organization + "</p>" +
					        	 	"<p> <strong>Location:</strong> " + obj.location + "</p>" +
					        	 	"<p> <strong>Description: </strong>" + obj.description + "</p>" +
					        	 	"<div id='longBoi" + i + "' class='dontshow'> <p><strong> Details: </strong></p>" + obj.longDes + "</div>" +


					              "<div id='seemore" + i + "'class='displayIt' onclick='clickIt(" + i + ")'>" +
					            	"<p><button>see more</button></p>" +
					              "</div>" +

						          "<br><div id='seeless" + i + "'class='dontshow' onclick='clickItBack("+ i + ")'>" +
						          	"<br><p><button>see less</button></p>" +
		            			  "</div>" +
					              "</div>" +
				              "</div> <br><br><br>";

						 	if (document.getElementById('allEventContent') == null) return;
						 	document.getElementById('allEventContent').innerHTML = x;
						    i = i + 1;
						}
					}
				});
			}
			if(i == 0) document.getElementById('allEventContent').innerHTML = "<p style='font-size: 24px; padding: 0 5%;''> No events apply to that search. Try again!  </p>";

		});

	}
		localStorage.removeItem('search');
});

//http://191.109.247.195:80/nowplayingsfo/
//var phpServerUrl = "http://192.168.1.36:80/twitterconnect/s00/php/";
var phpServerUrl = ""; //"http://191.109.247.195:80/nowplayingsfo/";
var phpScriptRelativePath = "php/twitterconnect.php";
var theCompleteUrl = phpServerUrl + phpScriptRelativePath;


//var locationString = "-22.912214,-43.230182,1000km";
var locationString;

var searchRadius = 20000;

/** 
Get the Search results
First gets user location; waits for the user to accept and then sends an ajaz request with the current location.
*/
function getSearchResults() {
	//console.log("Getting search started");
	//getLocation();
	getLocation(function(res) { /* do something with the result */ });
}

// Once location is set; continue searching.
/*
function getSearchResultsSolvedLocation() {
	sendQueryToPhpServerIterate();
}
*/
// Get user location;
function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position){
                callback(position.coords.latitude + "," + position.coords.longitude + "," + searchRadius + "km" )
				locationString = position.coords.latitude + "," + position.coords.longitude + "," + searchRadius + "km";
				//locationString = "-22.912214,-43.230182,1000km";
				//console.log(locationString);
				sendQueryToPhpServer();
            }
        );
    } else {
		locationString = "-22.912214,-43.230182,1000km";
		sendQueryToPhpServer();
    }
}

// Sends an ajax request to search under current location!!!
function sendQueryToPhpServer() {
	$.ajax({//Make the Ajax Request
		type: "GET",
		url: theCompleteUrl,
		crossDomain: true,
		data: "localizationString=" + locationString,
		//dataType: "json",
		success: function(response){ 
			theResponseTwitterObjects = createTwitterObjectsFromStringResponse(response);
			//theResponseTwitterObjects = tmpTwitterObjects.slice(0);
			//updateTwitterObjects(tmpTwitterObjects);
			reloadSite();
			}
	});
}

function sendQueryToPhpServerIterate() {
	$.ajax({//Make the Ajax Request
		type: "GET",
		url: theCompleteUrl,
		crossDomain: true,
		data: "localizationString=" + locationString,
		//dataType: "json",
		success: function(response){ 
			var tmpTwitterObjects = createTwitterObjectsFromStringResponse(response);
			//theResponseTwitterObjects = tmpTwitterObjects.slice(0);
			updateTwitterObjects(tmpTwitterObjects);
			//reloadSite();
			}
	});
}

var splitChar = "\nqq";
// Map php's text response to a twitter object
function createTwitterObjectsFromStringResponse(response) {
	// each entry has 6 fields and an extera character
	var theTwitterObjects = [];
	var fields = response.split(splitChar);
	//console.log("Lines: " + fields.length);
	var numberOfObjects = fields.length/6;	// 6 is the number of fields for eath Twitter Object
	for (var n= 0; n<numberOfObjects; n++ ) {
		theTwitterObjects[n] = new TweetObject(fields[(n*6)+0], fields[(n*6)+1], fields[(n*6)+2], fields[(n*6)+3], fields[(n*6)+4], fields[(n*6)+5]);
	}
	return theTwitterObjects;
}

function submitPost(){
	//videoInput
	var theVideoToSubmit = $('#thevideourlid').val();
	var theCommentToSubmit = $('#thecommentid').val();
	//tweetInput
	console.log(theVideoToSubmit + " - " + theCommentToSubmit);
	
	$.ajax({//Make the Ajax Request
		type: "GET",
		url: "php/postTweet.php",
		crossDomain: true,
		data: "thevideourl=" + theVideoToSubmit + "&thecomment=" + theCommentToSubmit,
		//dataType: "json",
		success: function(response){ 
			console.log("Tweeted!");
			}
	});
	
	
}
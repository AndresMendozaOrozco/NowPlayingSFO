//var phpServerUrl = "http://192.168.1.36:80/twitterconnect/s00/php/";
var phpServerUrl = "";
var phpScriptRelativePath = "php/twitterconnect.php";
var theCompleteUrl = phpServerUrl + phpScriptRelativePath;




function getSearchResults() {
	$.ajax({//Make the Ajax Request
		type: "GET",
		url: theCompleteUrl,
		crossDomain: true,
		//data: "from_js_to_php",
		//dataType: "json",
		success: function(response){ 
			theResponseTwitterObjects = createTwitterObjectsFromStringResponse(response);
			initApp();
			}
	});
}

var splitChar = "\nqq";
function createTwitterObjectsFromStringResponse(response) {
	// each entry has 6 fields and an extera character
	var theTwitterObjects = [];
	var fields = response.split(splitChar);
	//console.log("Lines: " + fields.length);
	var numberOfObjects = fields.length/6;
	for (var n= 0; n<numberOfObjects; n++ ) {
		theTwitterObjects[n] = new TweetObject(fields[(n*6)+0], fields[(n*6)+1], fields[(n*6)+2], fields[(n*6)+3], fields[(n*6)+4], fields[(n*6)+5]);
	}
	return theTwitterObjects;
}

// Expand t.co link
function expandTCoLink(tcoLink) {
	
	//http://expandurl.appspot.com/expand?url=http%3A%2F%2Ft.co%2FgLP0Ucg
	//var baseUrl = "https://www.googleapis.com/urlshortener/v1/url?shortUrl=";
	var baseUrl = "http://www.linkexpander.com/?url=";
	//var baseUrl = "http://expandurl.appspot.com/expand?url=";
	//var encodedTco = encodeURI(tcoLink);
	var encodedTco = tcoLink;
	var completeUrl = baseUrl + encodedTco;
	$.ajax({//Make the Ajax Request
		type: "GET",
		url: completeUrl,
		crossDomain: true,
		//data: "from_js_to_php",
		//dataType: "json",
		success: function(response){ 
			console.log("Decoded");
			}
	});
}
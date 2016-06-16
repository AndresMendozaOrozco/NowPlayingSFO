//http://191.109.247.195:80/nowplayingsfo/
//var phpServerUrl = "http://192.168.1.36:80/twitterconnect/s00/php/";
var phpServerUrl = ""; //"http://191.109.247.195:80/nowplayingsfo/";
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
function expandTCoLink(theVideoIFrame, tcoLink, titleElement) {
	var phpHelperUrl = "php/unshorten.php";
	$.ajax({//Make the Ajax Request
		type: "GET",
		url: phpHelperUrl,
		crossDomain: true,
		data: "shortUrl=" + tcoLink,	//"shortUrl=https://t.co/LAyHzDxy1J",
		dataType: "text",
		success: function(response){ 
			setTheLongId(response, theVideoIFrame, titleElement);
			return response;
			}
	});
}

/**
* Synchronous handler for ajax request!
*/
function setTheLongId(response, theVideoIFrame, titleElement) {
	try {
		if (response == null || !response)
			theVideoLinkLongId = "";
		else {
			var extract = response.match(/=(.*)&feature/).pop();
			//console.log(response);
			theVideoLinkLongId = extract;
			theVideoIFrame.setAttribute("src", getYoutubeEmbededLink(theVideoLinkLongId));
			//console.log(theVideoLinkLongId);
			//console.log(getYoutubeEmbededLink(theVideoLinkLongId));
			setVideoTitleSynch(titleElement, theVideoLinkLongId)
		}
	}
	catch(err) {
		// set default video
		theVideoIFrame.setAttribute("src", getYoutubeEmbededLink("rrVDATvUitA"));
		//setVideoTitleSynch(titleElement, "rrVDATvUitA")
		titleElement.innerHTML = "Default video (resolve error)";
		//console.log(err);
	}
}

function setVideoSource(theVideoIFrame, tweetText, titleElement) {
	var theVideoSource = getYoutubeShortLink(tweetText);
	//var theVideoSourceId = getYoutubeShortLinkId(theVideoSource);
	expandTCoLink(theVideoIFrame, theVideoSource, titleElement);
	
	//theVideoIFrame.setAttribute("src", getYoutubeEmbededLink(theVideoLinkLongId));
}

function setVideoTitleSynch(titleElement, idVideo) {
	//console.log("idVideo: " + idVideo);
	$.ajax({//Make the Ajax Request
		type: "GET",
		url: "php/youtubetitle.php",
		crossDomain: true,
		data: "theid=" + idVideo,	//"shortUrl=https://t.co/LAyHzDxy1J",
		dataType: "text",
		success: function(response){ 
			//console.log("Vid Title: " + response);
			titleElement.innerHTML = response;
			return response;
			},
		error: function() {
			titleElement.innerHTML = "Unreachable title";
		}
	});
}
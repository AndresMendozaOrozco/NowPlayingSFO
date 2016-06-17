/**
* Append element in the first position
*/
function appendFirst(container, childNode){
	//console.log(container.childNodes.length);
	//console.log(container.firstChild);
	// Initial case; empty list
	if (container.childNodes.length == 0) {
		container.appendChild(childNode);
	}
	// General case
	else {
		container.insertBefore(childNode, container.firstChild);
	}
}

/**
* Create an embeded link to Youtube, given the video Id
*/
function getYoutubeEmbededLink(videoId) {
	return "http://www.youtube.com/embed/" + videoId
}

/**
* Create a direct link to Youtube, given the video Id
*/
function getYoutubeDirectLink(videoId) {
	return "https://www.youtube.com/watch?v=" + videoId
}


/**
* Use a regular Expression to find the twitter short link for the youtube video
*/
function getYoutubeShortLink(responseTex) {
	var regExpObj = /https:\/\/t.co\/([A-Za-z0-9_]+)/;
	
	var myArray = regExpObj.exec(responseTex);
	if (myArray == null)
		return null;
	else 
		return myArray[0];
}

function getYoutubeShortLinkId(completeShortLink) {
	if (completeShortLink == null)
		return null;
	
	else  {
		// https://t.co/
		var strLngth = completeShortLink.length;
		var theVidId = completeShortLink.substring(13, strLngth);
		return theVidId;
	}
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
			//console.log("To Expand: " + tcoLink);
			//console.log("Expanded: " + response);
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

// Sets the youtube video source
function setVideoSource(theVideoIFrame, tweetText, titleElement) {
	var theVideoSource = getYoutubeShortLink(tweetText);
	//var theVideoSourceId = getYoutubeShortLinkId(theVideoSource);
	expandTCoLink(theVideoIFrame, theVideoSource, titleElement);
	
	//theVideoIFrame.setAttribute("src", getYoutubeEmbededLink(theVideoLinkLongId));
}

// Gets youtube title using Youtube api, and sets it to the current iFrame
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

// Checks for any changes in the posts. If so, update the site!
function updateTwitterObjects(tmpTwitterObjects){
	// if the first new element is different than the first current, add it and delete the lastone
	try {
		//if(tmpTwitterObjects[tmpTwitterObjects.length - 1].theId != theResponseTwitterObjects[theResponseTwitterObjects.length - 1].theId) {
		if(tmpTwitterObjects[0].theId != theResponseTwitterObjects[0].theId) {
			console.log("New Video!");
			// Delete
			element = document.getElementById("videos_container");
			element.removeChild(element.lastChild);
			//element.removeChild(element.firstChild);
			// Add
			createNewVideoFrameFirst(tmpTwitterObjects[0]);
			//createNewVideoFrame("gPEerWySn1E", tmpTwitterObjects[tmpTwitterObjects.length - 1]);
			// Update theResponseTwitterObjects
			theResponseTwitterObjects[0] = tmpTwitterObjects[0];
			//theResponseTwitterObjects[theResponseTwitterObjects.length - 1] = tmpTwitterObjects[tmpTwitterObjects.length - 1];
		}
	} catch (err) {
		console.log(err);
	}
}

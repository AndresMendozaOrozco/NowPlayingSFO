
// Gets youtube title using Youtube api, and sets it to the current iFrame
function setTheVideoTitleSynch(titleElement, idVideo) {
	//var titleElement = document.getElementById(titleElementId);
	$.ajax({//Make the Ajax Request
		type: "GET",
		url: "php/youtubetitle.php",
		crossDomain: true,
		data: "theid=" + idVideo,	//"shortUrl=https://t.co/LAyHzDxy1J",
		dataType: "text",
		success: function(response){ 
			titleElement.innerHTML = response;
			return response;
			},
		error: function() {
			console.log("error getting video title!");
			titleElement.innerHTML = "Unreachable title";
		}
	});
}

/**
* Validate if the returned object does have a valid youutube video link. It's first controlled by php query, but here we filter more
*/ 
function validateYoutubeUrl(expanded_url) {
	// contains: (www.youtube.com and watch) or youtu.be
	//return ( ( (expanded_url.indexOf("www.youtube.com")>-1) && (expanded_url.indexOf("watch")>-1) ) || ( (expanded_url.indexOf("youtu.be")>-1) ) );
	return ( (expanded_url.indexOf("www.youtube.com")>-1) && (expanded_url.indexOf("watch")>-1) );
}

/**
* Get youtube id from expanded url
* "https://www.youtube.com/watch?v=XXXXXX&"
*/
function getYoutubeId(expandedYoutube) {
	var longId = expandedYoutube.substring(32, expandedYoutube.length);
	//console.log("Long: " + longId);
	var shortId = longId.match(/[^&]*/i)[0];
	//console.log("Short: " + shortId);
	return shortId;
}

/**
* Create an embeded link to Youtube, given the video Id
*/
function getYoutubeEmbededLink(videoId) {
	return "http://www.youtube.com/embed/" + videoId
}

/**
* Get the youtube video title; Youtube Api
*/
// Gets youtube title using Youtube api, and sets it to the current iFrame
function setVideoTitleSynch(titleElement, idVideo) {
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

/**
* Get id from youtube expanded url
*/
function getVideoId(videoUrl){
	var videoId = videoUrl.substring(28, videoUrl.length);
	return videoId;
}


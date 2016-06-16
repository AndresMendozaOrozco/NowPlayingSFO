// Div container for new posts
var videoContainerDiv;
var theResponseTwitterObjects;
var maxResults = 15;

var theVideoLinkLongId;

// a function called when a click event is registered on 
// an element with the id of 'submit'
$('#submit').click(function(){
  // create a simple array with one member key 
  // this is the twitter search term, feel free to modify this
  console.log("Clicked");
  getSearchResults();
});

$( document ).ready(function() {
    getSearchResults();
});

/**
* Initialization function after load; I preffer to use this method instead of a closure.
*/
function initApp() {
	// Initialize vars
		// Div container for new posts
	videoContainerDiv = document.getElementById("videos_container");	//console.log(videoContainerDiv.offsetHeight);
	var totalOfVideos = Math.min(maxResults, theResponseTwitterObjects.length);
	for (var i=0; i<totalOfVideos; i++) {
		var firstVideoId = "gPEerWySn1E";
		createNewVideoFrame(firstVideoId, theResponseTwitterObjects[i]);
	}
}

/**
* Object representing a Tweeter Post
*/
function TweetObject(theId, fullName, avatar, userName, tweetText, timeText) {
	this.theId = theId;
	this.fullName = fullName;
	this.avatar = avatar;
	this.userName = userName;
	this.tweetText = tweetText;
	this.timeText = timeText;
}

/**
* Creates a new tweet post on the page
*/
function createNewVideoFrame(videoId, tweeterObject) {
	//console.log(tweeterObject);
	// Create row div
	var rowDiv = document.createElement("p");
		// Set row class
		rowDiv.className = "row borderrow";
	
	var titleDiv = document.createElement("div");
		// set column (7) class
		titleDiv.className = "col-xs-12 h3strong truncate";
	var titleElement = document.createElement("h2");
		titleElement.className = "truncate";
		//setVideoTitleSynch(titleElement);
		
	// append
	titleDiv.appendChild(titleElement);
	
	// Create the video div
	var videoDiv = document.createElement("div");
		// set column (7) class
		videoDiv.className = "col-md-7";
	// Create the anchor element
	var theAnchor = document.createElement("a");
		// Set href
		theAnchor.href = tweeterObject.url;
	// Create video class div
	var videoClassDiv = document.createElement("div");
		// set class
		videoClassDiv.className = "vid-responsive";
	// Create iFrame
	var videoIFrame = document.createElement("iframe");
		// set link
		setVideoSource(videoIFrame, tweeterObject.tweetText, titleElement);
		// set class
		videoIFrame.className = "iframe-center";
		
	// Append
	videoClassDiv.appendChild(videoIFrame);
	theAnchor.appendChild(videoClassDiv);
	videoDiv.appendChild(theAnchor);
	
	// Create the tweeter div
	var tweeterDiv = document.createElement("div");
		// set class
		tweeterDiv.className = "col-md-5 tweetembed";
	
	var avatar = document.createElement("img");
	avatar.src = tweeterObject.avatar;
	avatar.className = "tweetimg";
	
	var fullNameText = document.createElement("p");
	fullNameText.className = "avatar_p";
	fullNameText.innerHTML = tweeterObject.fullName;
	
	var userNameText = document.createElement("p");
	userNameText.className = "username_p";
	userNameText.innerHTML = tweeterObject.userName;
	
	var namesAndAvatarDiv = document.createElement("div");
	namesAndAvatarDiv.className = "col-md-8";
	
	var tweetText = document.createElement("p");
	tweetText.className = "col-xs-12 tweet_text_p";
	tweetText.innerHTML = tweeterObject.tweetText;

	var logoDiv = document.createElement("div");
	logoDiv.className = "col-xs-4";
	
	var creationTime = document.createElement("p");
	creationTime.className = "col-xs-12 time_text_p";
	creationTime.innerHTML = tweeterObject.timeText;
	
	var tweetlogo = document.createElement("img");
	tweetlogo.src ="resources/img/tweet.png";
	tweetlogo.className = "tweetlogo";
	
	
	// append
	namesAndAvatarDiv.appendChild(avatar);
	namesAndAvatarDiv.appendChild(fullNameText);
	namesAndAvatarDiv.appendChild(userNameText);
	
	logoDiv.appendChild(tweetlogo);
	
	
	tweeterDiv.appendChild(namesAndAvatarDiv);
	tweeterDiv.appendChild(logoDiv);
	tweeterDiv.appendChild(tweetText);
	tweeterDiv.appendChild(creationTime);
	
	rowDiv.appendChild(titleDiv);
	rowDiv.appendChild(videoDiv);
	rowDiv.appendChild(tweeterDiv);
	
	videoContainerDiv.appendChild(rowDiv);
	//appendFirst(videoContainerDiv, rowDiv);
	
	// Insert row
	var newRow = document.createElement("hr");
	videoContainerDiv.appendChild(newRow);
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
* Append element in the first position
*/
function appendFirst(container, childNode){
	console.log(container.childNodes.length);
	console.log(container.firstChild);
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

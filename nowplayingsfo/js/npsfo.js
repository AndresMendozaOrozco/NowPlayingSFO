// Div container for new posts
var videoContainerDiv;
var theResponseTwitterObjects;
var maxResults = 15;

var refreshRate = 5000;

var theVideoLinkLongId;

var videoInput = document.getElementById("thevideourlid");
var tweetInput = document.getElementById("thecommentid");

$( document ).ready(function() {
	$.when($.ajax(getSearchResults())).then(function () {
		setTimeout(startSearching(), 15000);	// wait 10 seconds for the first call to completely load
	});
	
    //getSearchResults();
	/*
	$.when($.ajax(getLocation())).then(function () {
		getSearchResults();
	});
	*/
});

/**
* Initialization function after load; I preffer to use this method instead of a closure.
*/
function reloadSite() {
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
//function createNewVideoFrame(tweeterObject) {
	//console.log(tweeterObject);
	// Create row div
	var rowDiv = document.createElement("p");
		// Set row class
		rowDiv.className = "row borderrow";
		// Set id; used later if we want to remove
		rowDiv.setAttribute("id", tweeterObject.theId);
	
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
		videoDiv.className = "col-md-7 col-xs-12";
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
		tweeterDiv.className = "col-md-5 col-xs-12 tweetembed";
	
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
	namesAndAvatarDiv.className = "col-xs-8";
	
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

function createNewVideoFrameFirst(tweeterObject) {
	// Create row div
	var rowDiv = document.createElement("p");
		// Set row class
		rowDiv.className = "row borderrow";
		// Set id; used later if we want to remove
		rowDiv.setAttribute("id", tweeterObject.theId);
	
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
		videoDiv.className = "col-md-7 col-xs-12";
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
		tweeterDiv.className = "col-md-5 col-xs-12 tweetembed";
	
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
	namesAndAvatarDiv.className = "col-xs-8";
	
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
	
	//videoContainerDiv.appendChild(rowDiv);
	appendFirst(videoContainerDiv, rowDiv);
	
	// Insert row
	var newRow = document.createElement("hr");
	videoContainerDiv.appendChild(newRow);
}


// Asynchronic function; keeps asking for new video posts
function startSearching() {
	window.setInterval(function(){
	  console.log("Searching for changes!");
	  //getSearchResultsSolvedLocation();
	  sendQueryToPhpServerIterate();
	}, refreshRate);
}




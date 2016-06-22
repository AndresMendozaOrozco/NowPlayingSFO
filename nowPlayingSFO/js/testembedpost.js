var thecontainer = document.getElementById("container");
var maxTweetsPerPage = 10;
var refreshRate = 5000;

var newTweet = null;
var currentTweets = [];

var locationString;
var searchRadius = 2000;

/** 
* Kickoff function!
* Assure document is loaded
*/
$( document ).ready(function() {
	// First time; get current location
	getLocation(function(res){});
	// Ask for new posts at a defined rate!
	window.setInterval(function(){
		console.log("Searching new posts!");
		sendQueryToPhpServer();
	}, refreshRate);
});

/** 
* Sends an ajax request to search under current location!!!
*/
function sendQueryToPhpServer() {
	$.ajax({//Make the Ajax Request
		type: "GET",
		url: "php/twitterconnect.php",
		crossDomain: true,
		data: "localizationString=" + locationString,
		//dataType: "json",
		success: function(response){ 
			//console.log(response);
			manageEmbededTweet(response);
		},
		error: function(response){ 
			console.log(response);
		}
		
	});
}

/** 
* A new embeded post is received; 
* If it's different than the last one, add it.
* If maximum number of posts is reached, delete lastone. (Not yet implemented!)
*/
function manageEmbededTweet(result) {
	try {
		//newTweet = null;
		//console.log(result);
		newTweet = JSON.parse(result);
		var newStatusId = newTweet.theresobjec.id;
		console.log(newStatusId);
		// Validate if it exists
		// initial case
		if (currentTweets.length==0) {
			// Validate if it has a youtube link; filter not necessary working
			if( newTweet.theresobjec.entities.urls.length>0 ) {	
				if( (validateYoutubeUrl(newTweet.theresobjec.entities.urls[0].expanded_url)) ) {		
					addTweet(newTweet);
					currentTweets.push(newTweet);
				}
			}
		}
		// general case
		else {
			
			var currUrl = currentTweets[currentTweets.length-1].url;
			var currId = currentTweets[currentTweets.length-1].theresobjec.id;
			if (newStatusId != currId) {
				// Validate if it has a youtube link; filter not necessary working
				if( newTweet.theresobjec.entities.urls.length>0 ) {	
					if( (validateYoutubeUrl(newTweet.theresobjec.entities.urls[0].expanded_url)) ) {
						// add it
						addTweet(newTweet);
						// update Tweet Array
						currentTweets.push(newTweet);
						// if maximum tweets reached, remove older
						if (currentTweets.length>=maxTweetsPerPage) {
							thecontainer.removeChild(thecontainer.lastChild);
							currentTweets.splice(0, 1);
						}
					}
				}
			} //else {console.log("No new tweets");}
		}
	} catch (err) {
		console.log("Error: " + err);
	}
}

/**
* Decoupled adding function
*/
function addTweet(item){
	var childNode = document.createElement("div");	//document.createElement("row");
		// Set row class
		childNode.className = "row borderrow";
		// Set id; used later if we want to remove
		childNode.setAttribute("id", item.theresobjec.id);
	
	var titleDiv = document.createElement("div");
		// set column (7) class
		titleDiv.className = "col-xs-12 h3strong truncate";
	var titleDivContent = document.createElement("h3");
		titleDivContent.className = "truncate";
		titleDivContent.setAttribute("id", "h3" + item.theresobjec.id);
		var theVideoUrl = item.theresobjec.entities.urls[0].expanded_url;
		var theVideoId = getYoutubeId(theVideoUrl);
		setTheVideoTitleSynch(titleDivContent, theVideoId);
	// append
	titleDiv.appendChild(titleDivContent);
		
	// Create the video div
	var videoDiv = document.createElement("div");
		// set column (7) class
		videoDiv.className = "col-md-7 col-xs-12";
	// Create the anchor element
	var theAnchor = document.createElement("a");
		// Set href
		theAnchor.href = item.theresobjec.url ;
	// Create video class div
	var videoClassDiv = document.createElement("div");
		// set class
		videoClassDiv.className = "vid-responsive";
	// Create iFrame
	var videoIFrame = document.createElement("iframe");
		// set class
		videoIFrame.className = "iframe-center";
		// set link
		var theEmbededYoutubeLink = getYoutubeEmbededLink(theVideoId);
		videoIFrame.setAttribute("src", theEmbededYoutubeLink);
	
	// appends
	videoClassDiv.appendChild(videoIFrame);
	theAnchor.appendChild(videoClassDiv);
	videoDiv.appendChild(theAnchor);
	
	// Create the tweeter div
	var tweeterDiv = document.createElement("div");
		// set class
		tweeterDiv.className = "col-md-5 col-xs-12 tweetembed";
	
	var avatar = document.createElement("img");
	avatar.src = item.theresobjec.user.profile_image_url;
	avatar.className = "tweetimg";
	
	var fullNameText = document.createElement("p");
	fullNameText.className = "avatar_p";
	fullNameText.innerHTML = item.theresobjec.user.name;
	
	var userNameText = document.createElement("p");
	userNameText.className = "username_p";
	userNameText.innerHTML = "@" + item.theresobjec.user.screen_name;
	
	var namesAndAvatarDiv = document.createElement("div");
	namesAndAvatarDiv.className = "col-xs-8";
	
	var tweetText = document.createElement("p");
	tweetText.className = "col-xs-12 tweet_text_p";
	tweetText.innerHTML = item.html;
	

	var logoDiv = document.createElement("div");
	logoDiv.className = "col-xs-4";
	
	var creationTime = document.createElement("p");
	creationTime.className = "col-xs-12 time_text_p";
	creationTime.innerHTML = item.theresobjec.created_at;
	
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

	
	childNode.appendChild(titleDiv);
	childNode.appendChild(videoDiv);
	childNode.appendChild(tweeterDiv);
	
	// Initial case; empty list
	if (thecontainer.childNodes.length == 0) {
		thecontainer.appendChild(childNode);
	}
	// General case
	else {
		thecontainer.insertBefore(childNode, thecontainer.firstChild);
	}
}



/**
* Get currrent position
*/
function getLocation(callback) {
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(
			function(position){
                callback(position.coords.latitude + "," + position.coords.longitude + "," + searchRadius + "km" )
				locationString = position.coords.latitude + "," + position.coords.longitude + "," + searchRadius + "km";
				console.log("Current location: " + locationString);
				sendQueryToPhpServer();
            }
        );
    } else {
		// Send default location: San Francisco. CA!
		locationString = "37.773972,-122.431297,1000km";
		sendQueryToPhpServer();
    }
}

/**
* Submit; tweet
*/
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


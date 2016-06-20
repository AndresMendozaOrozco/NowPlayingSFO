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

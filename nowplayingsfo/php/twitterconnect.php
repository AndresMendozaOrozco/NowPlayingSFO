<?php
// Allow cross domain/origin requests (from ajax POST)
header("access-control-allow-origin: *");

// Required Authenticaion libraries
require "vendor/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;
 
define('CONSUMER_KEY', 'CXVNsTDohsJaIxl0cjpuLKXYr');
define('CONSUMER_SECRET', 'Y49dNi2NPN9vJaPS95QnRLslOqisEuC7v934lHOfN05cVjbtDB');
define('ACCESS_TOKEN', '2834545563-QYQqm8hnLPiU3eFyAD8SGtKhfIYW7gMp8fGh8Xd');
define('ACCESS_TOKEN_SECRET', 'SUquQt3XC2ve3IIa8JbwMa4bsRCpZSJuCVKYAXLUTDBBT');
 

// Search function definition!
function search(array $query) {
  $toa = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
  //return $toa->get('https://api.twitter.com/1.1/statuses/user_timeline.json?count=5&screen_name=@BInowplaying&exclude_replies=true');
  return $toa->get('search/tweets', $query);
}

// Get embeded tweet from status id
function getEmbededTweet($statusId) {
	$toa = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
	//return $toa->get('statuses/oembed', array ( "url" => "https://twitter.com/Interior/status/" . $statusId , "hide_media" => "false") );
	//$theQuery = getEmbededQuery($statusId);
	//return $toa->get('statuses/oembed', $theQuery );
	return $toa->get('statuses/oembed', getEmbededQuery($statusId) );
	//return $toa->get('statuses/oembed', array ( "url" => "https://twitter.com/Interior/status/" . $statusId) );
}

function getEmbededQuery($statusId) {
	$theQu = array(
		"url" => "https://twitter.com/Interior/status/" . $statusId,
		"hide_media" => "false",
		"cards" => "true",
		"widget_type" => "video",
	);
	return $theQu;
}
 
// Coordinates
$localizationFilter = $_GET["localizationString"];
// Results limit
$countMax = $_GET["numresults"];

// The query!
$query = array(
  "q" => "'youtube' '#nowplaying' filter:links",
  //"q" => "'youtube' '#nowplaying'",
  "count" => $countMax,
  "geocode" => $localizationFilter,
  "result_type" => "recent",
);

// Get statuses by query
$results = search($query);

$formatedresults = array();

$splitChar = "\nqq";
// Send as Ajax response: the embeded tweet and the tweet object
foreach ($results->statuses as $result) {
	$tmpEmbededTweet = (array)(getEmbededTweet($result->id));
	$tmpEmbededTweet["theresobjec"] = $result;
	echo json_encode($tmpEmbededTweet) . $splitChar;
}
?>
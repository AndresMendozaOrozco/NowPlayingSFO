<?php
// Allow cross domain/origin requests (from ajax POST)
header("access-control-allow-origin: *");

require "vendor/autoload.php";

use Abraham\TwitterOAuth\TwitterOAuth;

//setDecodeJsonAsArray(True);

$access_token = "2834545563-QYQqm8hnLPiU3eFyAD8SGtKhfIYW7gMp8fGh8Xd";
$access_token_secret = "SUquQt3XC2ve3IIa8JbwMa4bsRCpZSJuCVKYAXLUTDBBT";
/*
define('CONSUMER_KEY', getenv('CONSUMER_KEY'));
define('CONSUMER_SECRET', getenv('CONSUMER_SECRET'));
define('OAUTH_CALLBACK', getenv('OAUTH_CALLBACK'));
*/

define("CONSUMER_KEY", "CXVNsTDohsJaIxl0cjpuLKXYr");	// gEFEbGdkVTDfzVgyiiCbzUImi	//CXVNsTDohsJaIxl0cjpuLKXYr
define("CONSUMER_SECRET", "Y49dNi2NPN9vJaPS95QnRLslOqisEuC7v934lHOfN05cVjbtDB");
define("OAUTH_CALLBACK", "");

/*
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token, $access_token_secret);
$content = $connection->get("account/verify_credentials");
*/
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);

// Generating a req token
$request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => OAUTH_CALLBACK));

// Sessions
$_SESSION['oauth_token'] = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
/*
$_SESSION['oauth_token'] = $access_token;
$_SESSION['oauth_token_secret'] = $access_token_secret;
*/
// Authorize
$url = $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));

//$statuses = $connection->get("statuses/home_timeline", ["count" => 25, "exclude_replies" => true]);
//$theSearchQ = "YouTube good OR amazing OR awesome filter:links";
//$theSearchQ = "youtube.com good OR amazing OR awesome filter:links";
$theSearchQ = "youtube.com filter:links";
//$theSearchQ = rawurlencode('near:"Bogotá, D.C., Colombia" within:15mi');
$tweets = $connection->get('search/tweets', ['q' => $theSearchQ]);

$encodedtweets = json_encode($tweets); 

$splitChar = "\nqq";
foreach ($tweets->statuses as $result) {
  echo 
	$result->id_str . $splitChar . 
	$result->user->name . $splitChar . 	
	$result->user->profile_image_url . $splitChar . 
	$result->user->screen_name . $splitChar . 
	$result->text . $splitChar . 	
	$result->created_at . $splitChar;
}
?>
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
function postTweet(array $newPost)
{
  $toa = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
  return $toa->post('statuses/update', $newPost);
}


$theVideo = $_GET["thevideourl"];
$theTweetText = $_GET["thecomment"];

$theCompletePost = "#nowplaying " . $theVideo . " - " . $theTweetText;

// The post!
$newPost = array(
  //"status" => "#nowplaying " . "Check this video: https://www.youtube.com/watch?v=bOJjqjl8_-4",
  "status" => $theCompletePost,
);

//echo $newPost['status'];
$results = postTweet($newPost);

?>
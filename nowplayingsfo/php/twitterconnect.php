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
function search(array $query)
{
  $toa = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
  return $toa->get('search/tweets', $query);
}
 
// Coordinates
$localizationFilter = $_GET["localizationString"];
// Results limit
$countMax = 5;

// The query!
$query = array(
  "q" => "'youtube' '#nowplaying' filter:links",
  "count" => $countMax,
  "geocode" => $localizationFilter,
);

  
$results = search($query);
  
$splitChar = "\nqq";
foreach ($results->statuses as $result) {
  echo 
	$result->id_str . $splitChar . 
	$result->user->name . $splitChar . 	
	$result->user->profile_image_url . $splitChar . 
	$result->user->screen_name . $splitChar . 
	$result->text . $splitChar . 	
	$result->created_at . $splitChar;
}
?>
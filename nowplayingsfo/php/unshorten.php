<?php
// Allow cross domain/origin requests (from ajax POST)
header("access-control-allow-origin: *");

$shortFileName = $_GET["shortUrl"];
//$shortFileName = "https://t.co/LAyHzDxy1J";

$baseUrl = "http://api.unshorten.it?shortURL=";
$theKey = "&apiKey=r6OV0xeTCApneG2JlnL6sOA81c5Xy6x2";

$completeUrQuery = $baseUrl . $shortFileName . $theKey;


$curl_handle=curl_init();
curl_setopt($curl_handle, CURLOPT_URL, $completeUrQuery);
curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl_handle, CURLOPT_USERAGENT, 'now playing sfo');
$query = curl_exec($curl_handle);
curl_close($curl_handle);


//$longFileName = file_get_contents($baseUrl . $shortFileName . $theKey);

$longFileName = $query;

echo $longFileName;
?>
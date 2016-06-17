<?php
$id = $_GET["theid"];

//$id = "rrVDATvUitA";

$content = file_get_contents("http://youtube.com/get_video_info?video_id=".$id);
parse_str($content, $ytarr);
if (isset($ytarr['title']))
	echo $ytarr['title'];
else 
	echo '[Unresolved Title]';
?>
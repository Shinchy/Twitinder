<?php
// php

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Gather ALL Social Content and then serve that info in the response
require_once('twitter.php');
// require_once('instagram.php');

if( isset( $_GET['q'] ) ) {

	// Get the Twitter Feed
	if( ! isset( $_GET['no_twitter'] ) ) {
		$twitterFeed = getTwitterFeed();
	} else {
		$twitterFeed = array();
	}
	// if( ! isset( $_GET['no_instagram'] ) ) {
	// 	$instagramFeed = getInstagramFeed();
	// } else {
	// 	$instagramFeed = array();
	// }

	// Combine the Feed
	// $jsonArray = array_merge( $instagramFeed, $twitterFeed );
	$jsonArray = array_merge( $twitterFeed );

	usort( $jsonArray, 'date_compare' );

	// echo json_encode( $jsonArray, JSON_FORCE_OBJECT );
	// We are using a JSONP callback as I don't have CORS all set up
	echo $_GET['callback'] . '('.json_encode($jsonArray).')';

} else {
	echo '({"errors":"no query set"})';
}



// 
function date_compare($a, $b)
{
    $t1 = strtotime( $a['time'] );
    $t2 = strtotime( $b['time'] );
    return $t1 - $t2;
}


// end of php
?>
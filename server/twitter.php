<?php

// ***Note 
// This makes use of both PHP and Curl, so ensure you have that setup on your server

// Brilliant Class library to help handle functions, I've modified it to add some
// personal stuff that I wanted
require_once('TwitterAPIExchange.php');

// This file holds the following values:
// $_OAUTH_ACCESS_TOKEN
// $_OAUTH_ACCESS_TOKEN_SECRET
// $_CONSUMER_KEY
// $_CONSUMER_SECRET
require_once('twitter-settings.php');


// Go and grab those Tweets
function getTwitterFeed() {

	header('content-type: application/json; charset=utf-8');

	// One of the most horrible things about PHP right here
	global $_OAUTH_ACCESS_TOKEN;
	global $_OAUTH_ACCESS_TOKEN_SECRET;
	global $_CONSUMER_KEY;
	global $_CONSUMER_SECRET;
	
	// Set access tokens here, all these are contianed within the twitter-settings.php
	// file. I haven't included this file as it's got my secrets within it... those deep
	// dark secrets. So, simply create your own version of that. :)
	$settings = array(
	    'oauth_access_token' => $_OAUTH_ACCESS_TOKEN,
	    'oauth_access_token_secret' => $_OAUTH_ACCESS_TOKEN_SECRET,
	    'consumer_key' => $_CONSUMER_KEY,
	    'consumer_secret' => $_CONSUMER_SECRET
	);

	// The Url we are using is the 1.1 version of the Twitter API
	$url = 'https://api.twitter.com/1.1/search/tweets.json';

	// Set up default requests that will be made
	$hashTag = '';
	$max_id = '';
	$includeEntities = '';

	// Check the Hash Tag Query is set (this is set via a URL)
	if( isset( $_GET['q'] ) ) {
		$hashTag = $_GET['q'];
		$getfield = '?q=#' . $hashTag;
	}
	// Check if this is a next page request
	if( isset( $_GET['max_id'] ) ) {
		$nextLoad = $_GET['max_id'];
		$includeEntities = $_GET['include_entities'];
		// add these to the url
		$getfield = '?max_id=' . $nextLoad . '&q=#' . $hashTag . '&include_entities=' . $includeEntities;
	}

	$requestMethod = 'GET';	
	
	// Instantiate a new version of the TwitterAPIExchange
	$twitter = new TwitterAPIExchange($settings);

	$jsonItem = $twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest();

	//echo $jsonItem;
	$results = json_decode( $jsonItem, true );


	$twitterArray = array();

	//Now parse through the $results array to display your results... 
	foreach($results['statuses'] as $item){
		// $image_link = $item['images']['low_resolution']['url'];
		// echo '<img src="'.$image_link.'" />';
		$instaItem = array(
			'api'	=>'twitter',
			'text'	=>$item['text'],
			'time'	=>date( $item['created_at'] ),
			'geo'	=>$item['coordinates'],
			'link'	=>$item['entities']['urls'],
			'img'	=>'',
			'thumb'	=>'',
			'tags'	=>$item['entities']['hashtags'],
			'likes'	=>$item['retweet_count'],
			'user'	=>$item['user']['screen_name']
		);

		array_push( $twitterArray, $instaItem );
	}

	// echo $inst_stream;
	return $twitterArray;
}




?>

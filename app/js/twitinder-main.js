/*
	Twitter Game - Main JS File

	Everything happens within this file, you can use some ES6 features as they 
	will transpile down with Babel

*/
(function() {

	// Some scoped variables that can be used and accessed by anything within this IIFE
	var currentScore 	= 0,
		currentPos 		= 0,
		likedItems		= [];


	// Set up the game modules within this system
	// All below ...


	// Since the Twitter API really doesn't play nicely with Javascript we
	// shall instead call an instance of the loader from a server, in this case 
	// the server loads in the files using a little bit of PHP code.
	var twitterLoader = (function() {

		var settings = {
			serverURL: 'http://www.shinchy.com/twitinder/',
			serverQuery: ''
		};

		return {
			getHashTags: function( query, onCompleteFunction, url ) {
				var serverRequest = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
				serverRequest.open("GET", ( url || settings.serverURL + '?q=' + query ));
				serverRequest.onreadystatechange = function() {
					if (serverRequest.readyState===4 && serverRequest.status===200) 
						onCompleteFunction( serverRequest.responseText );
					else if( serverRequest.status===404 )
						throw "Failed to load Server Request, no response";
				};
				serverRequest.send();
			}
		};

	});

	var gameLogic = (function(){
		// A set of functions that control how the Liked / Disliked style game works
		return {
			addToGood: function($item) {
				likedItems.push($item);
			},
			increaseScore: function() {
				currentScore += 1;
			},
			increasePos: function() {
				currentPos += 1;
			},
			loadNextItem: function() {
				// Load in the next item on the list
			},
			removeItemFromList: function($item) {
				// Remove the item from the list
			},
			restart: function() {
				// Restart the game
			},
			start: function() {
				// Start the game ... the setup lives here
			}
		};
	})();

	// Each item should be it's own specific Object so that it can contain all it's elements
	var placeCard = (function(){

		var info = {
			image: '',
			name: '',
			opp: ''
		};

		return {
			animatedMove: function() {

			},
			dragged: function() {

			},
			liked: function() {
				// This is one I like
			},
			disliked: function() {
				// This is not good
			}
		};

	})();


	// The game modules are added to a returned Object OR in this case we can just call an init method,
	// this just enables the only items we want to be exported to be done so.
	
	gameLogic.start();


})();

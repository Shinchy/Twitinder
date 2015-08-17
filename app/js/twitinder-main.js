/*
	Twitter Game - Main JS File

	Everything happens within this file, you can use some ES6 features as they 
	will transpile down with Babel

*/
(function() {

	// Some scoped variables that can be used and accessed by anything within this IIFE
	var _currentScore 	= 0,
		_currentPos 	= 0,
		_likedItems		= [];


	// Set up the game modules within this system
	// All below ...


	// Since the Twitter API really doesn't play nicely with Javascript we
	// shall instead call an instance of the loader from a server, in this case 
	// the server loads in the files using a little bit of PHP code.
	var twitterLoader = (function() {

		// The location and settings for the files we will load in
		var settings = {
			serverURL: 'http://www.shinchy.com/twitinder/',
			serverQuery: ''
		};

		// The returned methods
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
			},
			// Go through all the data and refine it into an Array
			// This is hard coded and based on the current set up for the Twitter Data
			refineTrends: function refineTrend( twitterData ) {
				var returnArray = [];				

				// Should return something akin to this
				var mockReturnData = [{image: 'some', name: 'some', url: 'some'},{image: 'some', name: 'some', url: 'some'},{image: 'some', name: 'some', url: 'some'}];

				// Return the mock data
				return mockReturnData;
			}
		};

	})();

	var gameLogic = (function(){
		// A set of functions that control how the Liked / Disliked style game works
		return {
			addToGood: function( item ) {
				likedItems.push(item);
			},
			increaseScore: function() {
				currentScore += 1;
			},
			increasePos: function() {
				currentPos += 1;
			},
			loadNextItem: function( card ) {
				// Load in the next item on the list
				
			},
			removeItemFromList: function( item ) {
				// Remove the item from the list
			},
			restart: function() {
				// Restart the game
			},
			createCards: function createCard(cards, current, returnArray) {
				current = current || 0;
				returnArray = returnArray || [];
				returnArray[current] = placeCard( 
							(cards[current].image || 'none'),
							(cards[current].name || 'none'),
							(cards[current].url || 'none')
						);
				return (current+1 >= cards.length) ? returnArray : createCard( cards, current+=1, returnArray);
			},
			start: function( data ) {				
				// Start the game ... the setup lives here
				// If we have no data, we can't start
				if (!data) return false;

				// Call the data function with the information we have so that
				// we can create an array of cards
				var arrayOfContent = this.createCards( data );

				// Add the current card to the stage
				this.loadNextItem( arrayOfContent[_currentScore] );

				// All is okay to return a positive
				return true;
			}
		};
	})();

	// Each item should be it's own specific Object so that it can contain all it's elements
	var placeCard = function( image, name, url ) {

		var info = {
			image: image,
			name: name,
			url: url,
			pos: _currentPos
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
			},
			createElement: function( text, img, url ) {
				// Load in the next item on the list
				var cardElement = document.createElement("div");
				var cardContent = document.createTextNode(text);
				cardElement.appendChild(cardContent);
				return(cardElement);
			}
		};

	};


	// The game modules are added to a returned Object OR in this case we can just call an init method,
	// this just enables the only items we want to be exported to be done so.

	// Export the a new object as a Module
	var GameModule = {
		twitterLoader: twitterLoader,
		logic: gameLogic,
		placeCard: placeCard
	};
	module.exports = GameModule;


})();

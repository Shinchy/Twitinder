// Test Suite for the Revlon Game
// 
// import GameModule from '../app/js/twitinder-main.js';
var GameModule = require('../app/js/twitinder-main.js');



describe("Game units tests", function() {

	// Used by all
	// Quick reference for the Game Module 
	var game = GameModule;
	// Mock data from the mock server
	var	mockTrendingData = ['Hello','Test','Something'];
	var	mockTweetsData = '';
	// Get the correct data from our mock, uses the trend data
	var mockReturnData = game.twitterLoader.refineTrends(trendData);	



	// Note on Mock Data
	// We are loading in two basic JSON files, one is trendData and the other is tweetsData
	// both are available to the whole test suite, the trends data houses the current trends
	// the tweets houses the tweets we have recieved from that response		

	it("Should fail when no data is given", function() {
		expect(game.logic.start(null)).toBe(false);
	});

	it("Should return an array of cards when we pass in the data", function() {
		expect(game.logic.createCards(mockReturnData)).toEqual(jasmine.any(Array));
	});

	it("Should discard a disliked card", function() {
		// expect(game.logic.addToGood()).toBe(true);
	});

	it("Should add a liked card to the array", function() {
		//- Test
	});

	it("should show a new card once one has been used", function() {
		// Test
	});

	it("Should end after 5 cards are liked", function() {
		// Test
	});

	it("Should respond with a message when the cards have run out", function() {
		// Test
	});

	it("Should reset all variables and values on a restart", function() {

	});


});
var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;


var client = new Twitter ({
	consumer_key: 'iaNqTHso7oQdAatGR64Jm2I1K',
  consumer_secret: '72DLesnLdtaSCCzayC2QHok6zAeKXyeVuLYmK4Ww3FLp2YxVF9',
  access_token_key: '912906690609270784-0fL5ktuzEOMZtkdLxBCpVoRrpsASMuV',
  access_token_secret: 'LtvQpS6YZ9qqpFNXRPJnmjkxfjEVERR0eqVWYslQMdtK2'
});

var spotify = new Spotify({
	id:'4ec3a0ca1246423ca69ef68106578266',
	secret:'d776d791c525407bbac65c8c750d6f6d'
})

var command = process.argv[2];
var value = "";
var nodeArgs = process.argv;
var queryURL = "";

for (var i = 3; i < nodeArgs.length; i++) {
	value = value + " " + nodeArgs[i];
}


switch (command) {
	case "my-tweets":
	tweets();
	break;

	case "spotify-this-song":
	songs();
	break;

	case "movie-this":
	movie();
	break;

	case "do-what-it-says":
	random();
	break;
}




//Twitter function
function tweets() {
	var params = {screen_name: "Test04434093"};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(error) {
			console.log("Error retrieving tweets" + error);
		} else {
			for (var i = 0; i < tweets.length; i++) {
				console.log('Tweet: ' + tweets[i].text + '\n' + 'Created on: ' + tweets[i].created_at + '\n');
			}
		}
	});
}

//Spotify function
function songs(){
	if(value === ""){
		value = "American Pie";
		songsFeed();
	} else {
		songsFeed();
	}

function songsFeed(){
spotify
  .search({ type: 'track', query: value })
  .then(function(response) {	
  	var obj = response.tracks.items;
  	value = value.trim();
  	if (obj[0].name = value){
  	console.log("Artist(s): " + obj[0].artists[0].name);
  	console.log("The song's name: " + obj[0].name);
	for (var key in obj[0].artists[0].external_urls) {
		  	fs.appendFile("log.txt","\r\nA preview link of the song from Spotify: " + obj[0].artists[0].external_urls[key], function(err) {
			if (err){
			return console.log(err);
			}
			}) 
	console.log("A preview link of the song from Spotify: " + obj[0].artists[0].external_urls[key]);
}
  	console.log("The album that the song is from: " + obj[0].album.name);
	} else{
		console.log("Sorry, no matches found");
	}
  })
  .catch(function(err) {
    console.log(err);
  });
}
}

//Movie function
function movie(){
	if (value === ""){
		queryURL = "http://www.omdbapi.com/?t=Gattaca&apikey=40e9cece";
		console.log("check it out!");
		movieFeed();
	} else {
		queryURL = "http://www.omdbapi.com/?t=" + value +"&apikey=40e9cece";
		movieFeed();
	}

function movieFeed() {
	request(queryURL, function(error, response,body){
		if (error) {
			console.log(error);
		} else {
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Country: "  + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
}
}

//Do What it says function
function random() {
	fs.readFile("random.txt", "utf-8", function(error, data) {
		if(error) {
			console.log(error);
		} else {
			var randomFeed = data.split(",");
				for (var i = 0; i < randomFeed.length; i++) {
					command = randomFeed[0];
					value = randomFeed[1];
					songs();
				}
		}
	});
}













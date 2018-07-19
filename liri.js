require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var userInput = process.argv
var userCommand = process.argv[2];

var songName = "";
var movieName = "";

/////// Twitter Function ///////

function getTweets() {
    var params = {screen_name: 'linalockheart', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          for (var i = 0; i < tweets.length; i++) {
              console.log(tweets[i].text);
              console.log(tweets[i].created_at);
              console.log("--------------------------------");
          }
      }
    });
}

/////// Spotify Function ///////

function getSong() {

    for (var i = 3; i < userInput.length; i++) {
        songName = songName + " " + userInput[i];
      }
      console.log(songName);

    if (songName !== "") {
        spotify.search({ type: 'track', query: songName}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
            else {
                console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
                console.log("Song: " + data.tracks.items[0].name);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("Preview: " + data.tracks.items[0].preview_url);
            }
    
        })
    }
    else {
        songName = "the sign";
        console.log(songName);
        spotify.search({ type: 'track', query: songName}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
            else {
                console.log("Artist: " + data.tracks.items[5].album.artists[0].name); 
                console.log("Song: " + data.tracks.items[5].name);
                console.log("Album: " + data.tracks.items[5].album.name);
                console.log("Preview: " + data.tracks.items[5].preview_url);
            }
        })

    }
}

/////// OMDB Function ///////

function getMovie() {

    for (var i = 3; i < userInput.length; i++) {
    
      if (i > 3 && i < userInput.length) {
        movieName = movieName + "+" + userInput[i];
      }
    
      else {
        movieName += userInput[i];
      }

    }

    if (movieName !== "") {

        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("--------------------------------");
            }
        });

    }

    else {

        movieName = "Mr. Nobody";
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("--------------------------------");
            }
        });

    }
}

/////// Random Function ///////

function whatItSays() {

    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
        return console.log(err);
      }
      else {
      data = data.split(",");
      userCommand = data[0];
      songName = data[1];
      getSong();
    }
  })
}

/////// Call Functions ///////

if (userCommand === "my-tweets") {
    getTweets();
}

if (userCommand === "spotify-this-song") {
    getSong();
}

if (userCommand === "movie-this") {
    getMovie();
}

if (userCommand === "do-what-it-says") {
    whatItSays();
}
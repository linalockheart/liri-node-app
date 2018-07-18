require("dotenv").config();
var keys = require("./keys.js");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var userInput = process.argv
var userCommand = process.argv[2];



if (userCommand === "my-tweets") {
     
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

///////

if (userCommand === "spotify-this-song") {
    
    var songName = "";

    for (var i = 3; i < userInput.length; i++) {
    
      if (i > 3 && i < userInput.length) {
        songName = songName + "+" + userInput[i];
      }
    
      else {
        songName += userInput[i];
      }

    }
}

    // function spotifySong(song){}

    // spotify.search({ type: 'track', query: 'song', limit: 5 }, function(err, data) {
    //     if (err) {
    //       return console.log('Error occurred: ' + err);
    //     }
    //     if (title === "") {
    //         title = "The Sign";
    //     }
       
    //   console.log(data.tracks.items); 
    //   });
    // });


///////

if (userCommand === "movie-this") {

    var movieName = "";

    for (var i = 3; i < userInput.length; i++) {
    
      if (i > 3 && i < userInput.length) {
        movieName = movieName + "+" + userInput[i];
      }
    
      else {
        movieName += userInput[i];
      }

    }
}

if (movieName !== "") {

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("--------------------------------");
        }
    });

}

else {

    var queryUrl = "http://www.omdbapi.com/?t=" + 'Mr. Nobody' + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("--------------------------------");
        }
    });

}
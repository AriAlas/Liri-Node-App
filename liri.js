require("dotenv").config();

//spotify Keys
var keys = require('./keys');

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

//User input
var command = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

//liri-movie-this
function movieThis(){

    if (userInput === ''){
        userInput = "Mr. Nobody";  }
    

axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
    function(response){

        

        // console.log(response.data);
        console.log("-----------------------");
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("Rating: " + response.data.imdbRating);
        console.log("Metascore: " + response.data.Metascore);
        console.log("Country: " + response.data.Country);
        console.log("Lenguage: " + response.data.Lenguage);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("-----------------------");
       
        fs.appendFile("log.txt", command + ", " + userInput + ", ", function(err){
            if(err){
                console.log("Error");
            }
            console.log ("Command has been logged in log.txt");
        });
    
    });

};

//liri-spotify-this
function spotifyThis (){

    if (userInput === ''){
        userInput = "The Sign Ace";  }

    spotify.search(
        {
        type: "track",
        query: userInput,
        limit: "2"
    }, function(err, data){
        if (err){
            console.log("Error ocurred" + err);
        }
        console.log("\nArtist(s) name: " + data.tracks.items[0].artists[0].name + "\nSong's name: " + data.tracks.items[0].name +
        "\nPreview Link: "+ data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name + "\n");
        
        fs.appendFile("log.txt", command + ", " + userInput + ", ", function(err){
            if (err){
                console.log("error");
            }
            console.log("Comman has been logged in log.txt");
        });
    }
    )};

//liri-concert-this
function concertThis(){


    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(function(response){
        // console.log(response.data);
        console.log("\nName of the Venue: " + response.data[0].venue.name);
        console.log("Name of the Venue: " + response.data[0].venue.city + " " + response.data[0].venue.country);
        console.log("Date of the Venue: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\n");

        fs.appendFile("log.txt", command + ", " + userInput + ", ", function(err){
            if (err){
                console.log("Error");
            }
            console.log("Command has been logged in log.txt");
        });
    
    });
};

//liri-do-what-it-says
function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err){
            console.log("Error");
        }
        fs.appendFile("log.txt", command + ", ", function(err){
            if (err){
                console.log("error");
            }
            console.log("Command has been logged in log.txt");
        });
        

        if (data[0] === "m"){
            command = data.slice(0, 9);
            userInput = data.slice(11, (data.length - 1));
            movieThis();
        }
        
        
        else if (data[0] === "s"){
            command = data.slice(0, 17);
            userInput = data.slice(19, (data.length - 1));
            spotifyThis();
        }
        else if (data[0] === "c"){
            command = data.slice(0, 12);
            userInput = data.slice(14, (data.length - 1));
            concertThis();
        }
      

    });
};


//Conditional statements to trigger functions depending on user input arguments on the CL


if (command === "movie-this"){
    movieThis();
    
}
else if (command === "spotify-this-song"){
    spotifyThis();
}
else if (command === "concert-this"){
    concertThis();
}
else if (command === "do-what-it-says"){
    doWhatItSays();
}








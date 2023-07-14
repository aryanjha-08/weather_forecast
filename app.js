const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get('/', function(req, res) { 

    res.sendFile(__dirname + '/index.html');
    
});

app.post('/', function(req, res) {

    const query = req.body.cityName;
    const apiKey = "a3947e078c432cfe4bd9099539d9b664";
    const units = "metric";


    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;


    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on('data', function(data) {
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"


            res.render("result", {cityName: query, temp: temp, desc: desc, imgUrl: imgUrl});

            // res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
            // res.write("<p>The weather is currently " + desc + ".</p>");
            // res.write("<img src="+ imgUrl +" alt='weather type image'>")
            // res.send();
        });
    })
});




app.listen(3000, function() {
    console.log('Server is running at http://localhost:3000');
})
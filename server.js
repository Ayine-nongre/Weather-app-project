const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

var baseURL = "https://api.openweathermap.org/data/2.5/weather?q=" 
var apiKEY = "&appid=---"
var location = "Accra"

app.get("/", function(req, res){
    finalURL = baseURL + location + apiKEY

    request(finalURL, function(error, response, body){
        var data = JSON.parse(body);
        var temp = data.main.temp - 273.15;
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;
        var pressure = data.main.pressure;
        var visible = data.visibility;
        var currentLocation = data.name;
        var feels = data.main.feels_like - 273.15;
        console.log(data)
        res.render('index', {temp_c:temp.toFixed(2), humid:humidity, windy:windSpeed, Pressure:pressure, visibility:visible, place:currentLocation, ctemp:feels.toFixed(2)});
    })
    
})

app.post("/", function(req, res){
    location = req.body.place 
    res.redirect("/")
})


app.listen(process.env.PORT || 5000, function(){{
    console.log("Server is running")
}})
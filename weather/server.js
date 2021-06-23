  
const express = require ("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){

  res.sendFile(__dirname+ "/index.html");

})

app.post("/", function(req,res){

  const query = req.body.cityName
   const apiKey = "e0b414163b0c82465b55278a92db7ddd";
   const unit = "metric"

 const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+ "&appid=" + apiKey +"&units=" + unit

   https.get(url, function(response){

   console.log(response.statusCode);

   response.on("data", function(data){
     const weatherData = JSON.parse(data)
     const temp = weatherData.main.feels_like
     const description = weatherData.weather[0].description
     const icon = weatherData.weather[0].icon
     const image = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"

     res.write("<h1>The temparature in "  + query + " is " + temp + " celsius</h1>");
     res.write("<p>The weather is currently" + description + "</P>");
     res.write("<img src=" + image + ">");
     res.send()



   })

 })

})


app.listen(3000, function(){

  console.log("Server is running on port 3000.");

})
const express = require('express');
const fs = require('fs');
const requests =require('requests');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();
const port = process.env.PORT||3000
app.set('view engine','ejs');
app.use('/assets',express.static('assets'));

app.get("/",function(req,res){
	res.render('weather');
});
app.post('/weatherSuccess',urlencodedParser,function(req,res){
	const body = req.body;
	let location = body.cityName;
	//console.log(location);
	requests(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=53680e5850d541676eabd045b29c7469`)
	.on('data', function (chunk) {
		//The data we are getting is in JSON. Now we need to convert it into objects. So
		const weatherObjs = JSON.parse(chunk);
		//Now we convert the objects into an array of objects.
		const weatherData = [weatherObjs];
		//console.log(weatherData);
		const temp = JSON.stringify(weatherData[0].main.temp);
		//console.log("Printing the temp variable: "+temp);
		res.render('weatherDisplay',{temp:temp});
	})
	.on('end', function (err) {
		if (err) return console.log('connection closed due to errors', err);
		console.log('end');
	});
	//res.render('weather');
	
});

app.listen(port,function(){
	console.log("Listening to port 3000...");
});	

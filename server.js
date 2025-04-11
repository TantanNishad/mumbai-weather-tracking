const express = require('express');
const https = require('https');
const app = express();
const port = 3000;

const apiKey = '61c63995c7ebe967284a0481e8926e96';
const city = 'Mumbai';
const units = 'metric';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

// Serve static files from "public" folder
app.use(express.static('public'));

// API route to send temperature as JSON
app.get('/temperature', (req, res) => {    //request and response set on express web portal.      
                                          // http://localhost:3000/temperature   get api data json format like   {"temperature":27.4,"time":"8:21:46 AM"}
  https.get(url, (apiRes) => {             ////request and response set on node backend server.
    let data = '';
    apiRes.on('data', chunk => data += chunk);  // let data = '';
                                                // Collect all the chunks.
                                                // Wait until it's all done.
                                                // Then process the full response.
                                                // "data" is an event — it gets called every time a new piece of data arrives.
                                                // Each piece (chunk) is added to the data variable.
                                                // We're building a complete string like: "{"main":{"temp":27.8}}..."
    apiRes.on('end', () => {
                              // Now 'data' contains the full response!
                              // "end" is another event — it means no more data is coming.
                              // Now we can safely JSON.parse() the full string to get a JavaScript object.
      try {
        const weather = JSON.parse(data);
        res.json({   //response send to express web portal.
          temperature: weather.main.temp,
          time: new Date().toLocaleTimeString()
        });
      } catch (err) {
        res.status(500).json({ error: 'Error parsing weather data' });
      }
    });
  }).on('error', err => {
    res.status(500).json({ error: 'Error fetching weather data' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`🌍 Server is running at http://localhost:${port}`);
});

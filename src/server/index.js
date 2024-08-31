var path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fetch = require("node-fetch");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("../../dist"));

console.log(__dirname);

// Variables for url and api key
const geoURL = `http://api.geonames.org/searchJSON?maxRows=3&username=${process.env.GEONAMES_USERNAME}`;
const weather16daysForecast = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_KEY}`
const weatherHistoricalForecast = `https://api.weatherbit.io/v2.0/history/daily?key=${process.env.WEATHERBIT_KEY}`
const pixabayUrl = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&image_type=photo&safesearch=true&per_page=3`


//http://api.geonames.org/searchJSON?q=london&maxRows=10&username=groovy2040
const trips = []

app.get("/", function (req, res) {
  //   res.sendFile(path.resolve(__dirname, "../client/views/index.html"));
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
});

// POST Route

function dateFormatter(date = new Date()) {//=>YYYY-MM-DD
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month
  }
  let day = date.getDate();
  if (day < 10) {
    day = '0' + day
  }
  return `${year}-${month}-${day}`
}

app.get('/api/trips', (req, res) => {
  res.status(200).json(trips)
})
app.delete('/api/trips/:id', (req,res)=>{
  const id = Number(req.params.id)
  const indexToDelete = trips.findIndex(trip=>trip.id === id );
  trips.splice(indexToDelete,1)
  res.status(204).json({message:`trip with id ${id} was successfully deleted`})
})


app.post("/api/location", async (req, res) => {
  const { city, start = dateFormatter(), end = dateFormatter() } = req.body
  console.log(req.body);
  try {
    const response = await fetch(
      `${geoURL}&q=${city}`
    )
    const result = await response.json()
    const { lng, lat } = result.geonames[0];

    let start_date = new Date(start)
    let end_date = new Date(end)
    //if date is more then 16 days possible forecast we will take last year hystorical forecast
    let future16daysfromnow = new Date()
    future16daysfromnow.setDate(future16daysfromnow.getDate() + 16)
    let weatherUrl = weather16daysForecast
    if (start_date > future16daysfromnow) {
      start_date.setFullYear(start_date.getFullYear() - 1)
      end_date.setFullYear(end_date.getFullYear() - 1)
      weatherUrl = `${weatherHistoricalForecast}&start_date=${dateFormatter(start_date)}&end_date=${dateFormatter(end_date)}`;
    }

    const weatherResponse = await fetch(`${weatherUrl}&lat=${lat}&lon=${lng}`)
    const weatherResult = await weatherResponse.json()

    const pixabayResponse = await fetch(`${pixabayUrl}&q=${city}`)
    const pixabayResult = await pixabayResponse.json()

 

  const payload = {
    id:trips.length+1,
    city, start, end,
    country: result.geonames[0].countryName,
    weather: weatherResult.data.filter(day => {
      let date = new Date(day.datetime)
      return date >= start_date && date <= end_date
    }),
    imageUrl: pixabayResult.hits[0].webformatURL
  }
  trips.push(payload)
  res.status(201).json(payload)

} catch (e) {
  res.status(422).json({ error: e, message: 'pixabay problem' })
}
});

function generateid(){//1,3
  if(trips.length == 0){
    return 1
  }else{
    let lastTripId = trips.at(-1).id;
    return lastTripId + 1//4
  }
}

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});

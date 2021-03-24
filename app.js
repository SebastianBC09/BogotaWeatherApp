const express = require('express')
const https = require('https')
const port = 3000
const app = express()

/* API ID deleted for security reasons. But get request is working great & nice. Have to check how to protect the ID token.*/
const iconURL = "http://openweathermap.org/img/wn/"
const size = "@2x.png"

app.use(express.urlencoded({}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
  const city = req.body.cityName
  const apiKey = ""
  const units = "metric"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`

  https.get(`${url}`, function(response){
  console.log(response.statusCode)

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const weatherIcon = weatherData.weather[0].icon
      const getIcon = iconURL + weatherIcon + size
      res.write(`<h1>The temperature in ${city} is ${temp} degrees celsius.</h1>`)
      res.write(`<p>The weather is currently ${weatherDescription}.</p>`)
      res.write(`<img src=${getIcon}></img>`)
      res.send()
    })
  })
})




app.listen(port, function() {
  console.log(`Server is running on port:${port}`)
})
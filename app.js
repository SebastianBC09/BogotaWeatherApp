const express = require('express')
const https = require('https')

const port = 3000
const app = express()
const url = "https://api.openweathermap.org/data/2.5/weather?q=Bogotá&units=metric&"
/* API ID deleted for security reasons. But get request is working great & nice. Have to check how to protect the ID token.*/

app.get("/", function(req, res) {
  https.get(`${url}`, function(response){
    console.log(response.statusCode)

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      console.log(weatherData)
      const temp = weatherData.weather[0].description
      console.log(temp)
    })

  })

  res.send("Server is up & running.")
})


app.listen(port, function() {
  console.log(`Server is running on port:${port}`)
})
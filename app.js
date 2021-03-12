const express = require('express')

const port = 3000
const app = express()

app.get("/", function(req, res) {
  res.send("Server is up & running.")
})


app.listen(port, function() {
  console.log(`Server is running on port:${port}`)
})
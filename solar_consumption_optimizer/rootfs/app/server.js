const express = require('express')
const path = require('path')
const app = express()
const port = 3000


app.get("/api/entities", function (req, res) {
    res.send(JSON.stringify({
      message: "Sending HA entity data .."
    }));   
});

app.use('/', express.static(path.join(__dirname, 'static')));

app.listen(port, () => {
  console.log(`Socopt Addon listening on port ${port}`)
});
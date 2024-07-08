const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use('/static', express.static(path.join(__dirname, 'static')))

/*
app.get("*", function (req, res) {
    res.send("Express Fallback Route");   
});
*/

app.listen(port, () => {
  console.log(`Socopt Addon listening on port ${port}`)
});
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use('/static', express.static(path.join(__dirname, 'static')))

/*
app.get('/', (req, res) => {
  res.send('Hello World!')
})
  */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
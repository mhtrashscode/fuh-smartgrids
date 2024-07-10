import express from 'express';
import path from 'path';
import fetch from 'node-fetch';

import config from "./config.js";

//const express = require('express');
//const path = require('path');
const app = express();

console.log(`Supervisor Token: ${config.haToken}`);

app.get("/api/entities", function (req, res) {
  getEntities().then(data => {
    res.send(data);
  })
});

app.use('/', express.static(path.join(process.cwd(), 'static')));

app.listen(config.port, () => {
  console.log(`Socopt Addon listening on port ${port}`)
});

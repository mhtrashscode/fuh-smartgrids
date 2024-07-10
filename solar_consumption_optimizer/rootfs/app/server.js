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

async function getEntities() {
  try {
    // read HA entity states
    const response = await fetch(`${config.haURL}/states`, {
      headers: {
        "Authorization": `Bearer ${process.env.SUPERVISOR_TOKEN}`,
        "Content-Type": "application/json"
      }
    });
    if (response.status >= 300) {
      throw { message: "Unable to read entity data" };
    }
    const data = await response.json();
    // filter entities related to power readings
    let entities = [];
    for (const entity of data) {
      if (entity.attributes && entity.attributes.device_class && entity.attributes.device_class == "power") {
        entities.push({
          id: entity.entity_id,
          name: entity.attributes.friendly_name,
          device_class: entity.attributes.device_class,
          unit_of_measurement: entity.attributes.unit_of_measurement
        });
      }
    }
    return entities;
  } catch (error) {
    console.error(error);
    return { message: error.message };
  }
}
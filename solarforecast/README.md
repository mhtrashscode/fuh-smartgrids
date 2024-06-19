# Solar Forecast Service

[Solar Forecast Service Homepage](https://forecast.solar/)

## Test Data Central Germany
- Latitude    51.27
- Longitude   9.54
- Declination 45°
- Peak Power  3.5 KWP

## Solar Forecast Endpoints

Check Location <br>
```https://api.forecast.solar/check/:lat/:lon```

Check Plane <br>
```https://api.forecast.solar/check/:lat/:lon/:dec/:az/:kwp```

Estimate Solar Production <br>
```https://api.forecast.solar/estimate/:lat/:lon/:dec/:az/:kw```
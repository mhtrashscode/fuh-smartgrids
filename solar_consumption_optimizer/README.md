# Solar Consumption Optimizer
A home assistant addon supporting users to optimize direct solar power consumption.

## Addon Web API

<details>
<summary><code>GET</code> <code>/api/entities</code></summary>

##### Read available power sensor entities
TODO
##### Example Response Body

```json
{
    "some": "attribute"
}
```
</details>

<details>
<summary><code>GET</code> <code>/api/recordings</code></summary>

##### Read energy consumption recordings

##### Query Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  optional | string                  | Consumption recording ID to read a single recording. If omitted, all recordings are retrieved.|


##### Example Response Body

```json
[
    {
        "id":"GqGsGEUkFb3TesIZmZZMs",
        "name":"Laundry Program A",
        "entityId":"sensor.randometer",
        "totalConsumption":3292,
        "recordedAt":"2024-07-10T17:37:10+02:00",
        "intervalLength":5,
        "intervals":[
            {"average_power":1499,"std_deviation":1134},
            {"average_power":1605,"std_deviation":1027},
            ...
        ]
    }
]
```
</details>

<details>
<summary><code>POST</code> <code>/api/recordings</code></summary>

##### Create an energy consumption recording

##### Example Request Body

```json
{
    "name":"Laundry Program A",
    "entityId":"sensor.randometer",
    "begin":"2024-07-10T17:37:10+02:00",
    "end":"2024-07-10T20:00:00+02:00",
    "intervalLength":5
}
```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `text/plain;charset=UTF-8`        | `{ message: "Recording created successfully", recording: {...}}`    |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |
> | `404`         | `application/json`                | `{"code":"404","message":"Entity not found"}`                       |
> 
</details>

<details>
<summary><code>DELETE</code> <code>/api/recordings/:id</code></summary>

##### Remove an energy consumption recording

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  mandatory | string                  | Consumption recording ID to be removed. |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | `{ message: "recording ${id} deleted" }`                                    |
> | `404`         | `application/json`                | `{ message: "recording ${id} not found" }`                    |
> 
</details>

<details>
<summary><code>GET</code> <code>/api/predictions/:id?span,upto</code></summary>

##### Get energy coverage predictions

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  mandatory | string                 | Consumption recording ID for which energy coverage should be predicted.|
> | span      |  optional | number                  | Time span between coverage predictions.                               |
> | upto      |  optional | number                  | Maximum number of predictions to be retrieved.                        |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | See example below.                                                  |
> | `404`         | `application/json`                | `{"code":"404","message":"Recording not found"}`                    |

##### Example Response Body

```json
[
    {
        "begin": "2024-06-20 10:00:00",
        "recordingId": "ABC123",
        "energyConsumption": 6900, // watt hours
        "energyCovered": 2500, // watt hours
        "coverage": 0.24, // 24%
        "intervals": [
            {
                "begin": "2024-06-20 10:00:00",
                "powerRequired": 400,
                "powerAvailable": 380,
                "coverage": 0.90
            }
            ...
        ]
    }    
]
```
</details>

<details>
<summary><code>GET</code> <code>/api/solarinfo/</code></summary>

##### Get energy coverage predictions


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | See example below.                                                  |
> | `500`         | `application/json`                | `{"message":"Solar information is invalid"}`                        |

##### Example Response Body

```json
{
    "latitude": "52° 16' 12\" N",
    "longitude": "09° 36' 24\" E",
    "declination": "45°",
    "azimuth": "45°",
    "power": "3.5 kWp",
    "place": "Hauptstraße 37, 01234 Heidenheim, Germany",
    "timezone": "Europe/Berlin"
    }
```
</details>
const ha = {
    port: 3000,
    haURL: "http://supervisor/core/api",
    haToken: process.env.SUPERVISOR_TOKEN,
    solarInfo: {
        latitude: 51.27,
        longitude: 9.54,
        declination: 45,
        azimut: 45,
        maxPower: 3.5
    }
}

const local = {
    port: 3001,
    haURL: "http://127.0.0.1:8122/api",
    haToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwMDgzZjNhYjNkMGM0YTgwOGJmMTEzMTRjNGQ0MjUwOCIsImlhdCI6MTcyMDQyODc0MCwiZXhwIjoyMDM1Nzg4NzQwfQ.uvuR1yOlRJSxDcsszMMvXA4iLGSJiMPZ3cIHoRPOSuo",
    solarInfo: {
        latitude: 51.27,
        longitude: 9.54,
        declination: 45,
        azimut: 45,
        maxPower: 3.5
    }
}

export default local;
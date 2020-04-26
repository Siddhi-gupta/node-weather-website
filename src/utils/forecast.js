const request = require('request')

const forecast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=84554c6a0f29c828610cf2cb7855a356&query=${lat},${long}&units=f`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined)
        } else if (body.error) {
            callback('Unable to find the location. Try another search', undefined)
        } else {
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees outside. It feels like ${body.current.feelslike} degrees out. Humidity is ${body.current.humidity}`);
        }
    })
}

module.exports = forecast
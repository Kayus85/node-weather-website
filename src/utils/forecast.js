const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=cfac855c1e9920abd8fde7e9e4212eee&query=${latitude},${longitude}`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback(`code: ${body.error.code}\n${body.error.type}\n${body.error.info}`, undefined)
        } else {
            const {current} = body
            callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out. There is ${current.humidity}% humidity`)
        }
    })
}

module.exports = forecast
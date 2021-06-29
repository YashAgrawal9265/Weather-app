const request = require('postman-request');

const geocode = function (address, callback) {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoieWFzaDQzNTciLCJhIjoiY2tudng2czQ4MDZ4NTJvcGJmYnhpN2MybiJ9.D0N4nl6A9FfG2E7YoE5cng`;

    // {url,json:true} is same as {url:url,json:true}
    // we are destructuring response object to {body} so instead of response.body.feature.length we can use body.feature.length
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location service!", undefined);
        }
        else if (body.features.length === 0) {
            callback("Unable to find location. Search for another location.", undefined);
        }
        else {

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })

}
module.exports = geocode;
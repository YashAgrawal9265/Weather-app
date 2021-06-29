const express = require("express");
const path = require("path");
const hbs = require("hbs");
const request = require("postman-request");
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express();

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');


// Setup the handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

// Setup the static directory to serve
app.use(express.static(publicDirectoryPath));
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yash Agrawal'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Yash Agrawal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a page for helping others',
        name: 'Yash Agrawal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide the address."
        });
    }
    const address = req.query.address;
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error}); // same as {erro:error}
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                forecast:forecastData,
                location, // shorthand this is similar to location: location
                address  // similar to address:address
            });
           
        })

    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yash Agrawal',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yash Agrawal',
        errorMessage: 'Page not found'
    })
})

app.listen(80, () => {
    console.log("Server is up on port 80");
})
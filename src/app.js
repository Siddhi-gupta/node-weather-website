const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const app = express();

//Define path for express config
const staticDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(staticDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Siddhi Gupta'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Using handlebars to create dynamic html pages',
        name: 'Siddhi Gupta'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Siddhi Gupta'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide the address'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            console.log('Location:', location)
            console.log('Weather Details: ' + forecastData)
            res.send(
                {
                location,
                forecastData,
                'address': req.query.address})
          })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: '404 Page',
        message: 'Help article not found.',
        name: 'Siddhi Gupta' 
    })
})

app.get('/*', (req, res) => {
    res.render('notFound', {
        title: '404 Page',
        message: 'Page not found.',
        name: 'Siddhi Gupta' 
    })
})

app.listen(port, () => {
    console.log('Server started on port' + port)
})
const express = require('express')
const compression = require('compression')
const http = require('http')
const path = require('path')
const fetch = require('node-fetch')
const cors = require('cors')
require('dotenv').config()


const port = 8000 || process.env.PORT
//you will need API token from LocationIQ
const token = process.env.LOCATION_TOKEN

const dist = __dirname + '/dist/durhambrews'

const app = express()

app.use(express.static(dist))
app.use(compression())

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname))
})


app.get('/api/getZip', cors(), (req, res) => {
     //requires lat and long in query
    //ex. api/getZip?lat=lat&long=long
    let lat = req.query.lat
    let long = req.query.long
    //fetch to locationiq to reverse geocode for location information
    fetch(`https://us1.locationiq.com/v1/reverse.php?key=${token}&lat=${lat}&lon=${long}&format=json`)
    //fetch returns JSON containing address,city,postcode etc
    .then(res => res.json())
    .then(json => {
        //response JSON postcode only
        res.send(JSON.stringify(json.address.postcode))
    })
    //if err log err
    .catch(err => {
        console.error(err)
    })
})


app.get('/api/getMap', cors(),(req,res) => {
    //requires lat and long to be in query
    //ex /api/getMap?lat=lat&long=long
    let lat = req.query.lat
    let long = req.query.long
    //fetch to locationiq to get static map image with zoom settting,size,format,and map marker settings
    fetch(`https://maps.locationiq.com/v2/staticmap?key=${token}&center=${lat},${long}&zoom=16.5&size=300x300&format=png&markers=icon:small-blue-cutout|${lat},${long}`)
    .then(res => res.blob())
     //covert blob to array buffer
    .then(blob=>  blob.arrayBuffer())
    .then(data => {
        //coverts array buffer to Uint8Array 
        let array = new Uint8Array(data)
        //covert Uint8Array to string_char
        let string_char = String.fromCharCode.apply(null,array)
        //return JSON response containing string_char
        //string_char later coverted to base64string on client side and used to create data URL for <img> src
        res.send(JSON.stringify(string_char))
    })
    //if err log error
    .catch(err => {
        console.error(err)
    })
})

const server = http.createServer(app)
server.listen(port, () => console.log('running.....'))

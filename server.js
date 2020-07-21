const express = require('express')
const app = express()
const compression = require('compression')
const http = require('http')
const path = require('path')
const fetch = require('node-fetch')
const cors = require('cors')
require('dotenv').config()


const port = 8000 || process.env.PORT
const token = process.env.LOCATION_TOKEN

const dist = __dirname + '/dist/durhambrews'

app.use(express.static(dist))
app.use(compression())

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname))
})


app.get('/api/getZip', cors(), (req, res) => {
    let lat = req.query.lat
    let long = req.query.long
    fetch(`https://us1.locationiq.com/v1/reverse.php?key=${token}&lat=${lat}&lon=${long}&format=json`)
    .then(res => res.json())
    .then(json => {
        res.send(JSON.stringify(json.address.postcode))
    })
    .catch(err => {
        console.error(err)
    })
})


app.get('/api/getMap', cors(),(req,res) => {
    let lat = req.query.lat
    let long = req.query.long
    fetch(`https://maps.locationiq.com/v2/staticmap?key=${token}&center=${lat},${long}&zoom=16.5&size=300x300&format=png&markers=icon:small-blue-cutout|${lat},${long}`)
    .then(res => res.blob())
    .then(blob=>  blob.arrayBuffer())
    .then(data => {
        let array = new Uint8Array(data)
        let string_char = String.fromCharCode.apply(null,array)
        res.send(JSON.stringify(string_char))
    })
    .catch(err => {
        console.error(err)
    })
})

const server = http.createServer(app)
server.listen(port, () => console.log('running.....'))
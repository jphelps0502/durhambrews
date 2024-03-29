# durhambrews

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4 and operates on a node server

## Installation
- Run **npm install** in the root directory of the project
- To run on localhost use **node server.js** in command line

## Features
- OpenBrewery DB API for brewery retrieval
- Search breweries by Zip code
- Geolocation and Reverse Geocoding
  - **api/getZip**
  - ex: **api/getZip?lat=latitude&long=longitude**
- Static Maps
  - **api/getMap**
  - ex: **api/getMap?lat=latitude&long=longitude**

## Requirements
**You will need an API token from LocationIQ in order to use reverse geocoding API and static map API**
- More information on LocationIQ API here: <https://locationiq.com/docs>
- More information on Open Brewery DB here: <https://www.openbrewerydb.org/documentation>

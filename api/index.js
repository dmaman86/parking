'use strict'

var path = require('path');
var { DocumentStore } = require('ravendb');
var express = require('express');
var bodyParser = require('body-parser');
var settings = require('./settings.json');
var config = require('./config');

var docStore = new DocumentStore(settings.ravendb.url, settings.ravendb.database);

docStore.initialize();

var app = express();

class ParkingArea{
    constructor( parkingAreaName, weekDaysHourlyRate,  weekendHourlyRate, discountPercentage){
        this.parkingAreaName = parkingAreaName;
        this.weekDaysHourlyRate = weekDaysHourlyRate;
        this.weekendHourlyRate = weekendHourlyRate;
        this.discountPercentage = discountPercentage;
    }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

var handleErrors = fn => (req, res, next) => {
    Promise.resolve(fn (req, res, next)).catch(next);
};

app.get('/', (req, res) => {
    res.status(200).send({
        message: "Welcome to Sample test with Nodejs and RavenDB"
    });
});

app.route('/api/parkingArea').post( handleErrors( async( req, res, next) => {
    var content = req.body;
    var session = docStore.openSession();

    var parkingArea = new ParkingArea(
        content.parkingAreaName,
        content.weekDaysHourlyRate,
        content.weekendHourlyRate,
        content.discountPercentage
    );

    await session.store( parkingArea );
    await session.saveChanges();

    return res.status(200).send({ parkingArea });

}));

app.route('/api/allParkings').get(handleErrors( async(req, res, next) =>{

    var session = docStore.openSession();

    session.query({ collection: "ParkingAreas" })
        .all()
        .then( result => {
            // console.log(result.length);

            var item = {
                count: result.length,
                parkings: result
            };

            res.status(200).send({ item });
        })
        .catch( reason => {
            next(reason);
        });
    
}));

app.route('/api/parking/:id').get( handleErrors( async(req, res, next) =>{
    var id = req.params.id;
    // console.log(id);
    var session = docStore.openSession();

    var parking = await session.load('ParkingAreas/' + id);
    // console.log(parking);
    return res.status(200).send({ parking });
}));

app.route('/api/update-parking/:id').put( handleErrors( async (req, res, next) => {
    var id = req.params.id;
    var params = req.body;

    // console.log('id ', id );
    // console.log( 'params ', params );

    var session = docStore.openSession();

    var newParking = await session.load('ParkingAreas/' + id);
    newParking.parkingAreaName = params.parkingAreaName;
    newParking.weekDaysHourlyRate = params.weekDaysHourlyRate;
    newParking.weekendHourlyRate = params.weekendHourlyRate;
    newParking.discountPercentage = params.discountPercentage;
    await session.saveChanges();

    return res.status(200).send({ newParking });
}));

app.route('/api/delete-parking/:id').delete( handleErrors( async (req, res, next) => {

    var id = req.params.id;

    var session = docStore.openSession();

    var parking = await session.load('ParkingAreas/' + id );
    await session.delete(parking);
    await session.saveChanges();

    return res.status(200).send({
        message: 'Parking was delete'
    });
}));


app.listen(config.port, () => {
    console.log(`Example app listening on port ${ config.port }`);
});
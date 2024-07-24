//Bring in the DB connection and the Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');

//Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));


//Currently receiving error:
//MongooseError: Operation `trips.deleteMany()` buffering timed out after 10000ms

//delete any existing records then insert seed data
const seedDB = async () => {
    await Trip.deleteMany();
    await Trip.insertMany(trips);
};

//Close the MongoDB connection and exist
seedDB().then(async() => {
    await Mongoose.connection.close();
    process.exit(0);
});
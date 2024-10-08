const express = require('express'); //Express app
const router = express.Router();    //Router logic
//Added by lab guide but conflicts with updated changes from step 9
//const jwt = require('jsonwebtoken');

//Added from text
const {expressjwt:jwt} = require("express-jwt");
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    algorithms: ["HS256"],
});

//Method to authenticate our JWT
function authenticateJWT (req, res, next){
    console.log('In Middleware');

    const authHeader = req.headers['authorization'];
    console.log('Auth Header: ' + authHeader);

    if(authHeader == null){
        console.log('Auth Header required but NOT PRESENT');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if(headers.length < 1){
        console.log('Not enough tokens in Auth Header: ' +
            headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    console.log('Token: ' + token);

    if(token == null){
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    console.log(process.env.JWT_SECRET);
    console.log(jwt.decode(token));
    console.log("decode worked");
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err,
        verified) =>{
            if(err){
                return res.sendStatus(401).json('Token Validation Error!');
            }
            req.auth = verified;    //Set auth param to the decoded object
        });
    next(); //We need to continue or this will hang forever
}

//This is where we import the controllers we will route
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

//Define route for registration endpoint
router
    .route('/register')
    .post(authController.register);

//Define route for login endpoint
router
    .route('/login')
    .post(authController.login);

//Define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList)    //GET Method routes tripList
    .post(auth, tripsController.tripsAddTrip);    //POST Method Adds a trip
    //Removed JWTAuthentication function since this auth currently breaks the function

//Get method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);
    //Removed JWTAuthentication function since this auth currently breaks the function

module.exports = router;
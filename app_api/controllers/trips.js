const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //register model
const Model = mongoose.model('trips');
const User = mongoose.model("users");

//GET: /trips - lists all the trips
//regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {

    const q = await Model
        .find({})  //no filter, return all records
        .exec();

        //Uncomment the following line to show results of the query
        // on the console
        // console.log(q);
    
    if(!q){
        //Database returned no data
        return res
                .status(404)
                .json(err);
    }
    else{
        //Return resulting trip list
        return res
                .status(200)
                .json(q);
    }
};

//GET: /trips/:tripCode - lists all the trips
//regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({ 'code' : req.params.tripCode})  //return single record
        .exec();

        //Uncomment the following line to show results of the query
        // on the console
        // console.log(q);
    
    if(!q){
        //Database returned no data
        return res
                .status(404)
                .json(err);
    }
    else{
        //Return resulting trip list
        return res
                .status(200)
                .json(q);
    }
};

const getUser = async(req, res, callback) => {
    if (req.auth && req.auth.email){
        try{
            console.log("getUser called");
            const user = await User.findOne({email: req.auth.email}).exec();
            if(!user){
                return res.status(404).json({ message: "User not found1"});
            }
            callback(req,res,user.name);
        }
        catch(err){
            console.log(err);
            return res.status(404).json({ message: "User not found2"});
        }
    }
};

//PUT: /trips/:tripCode - Updates a trip
//Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) =>{
    //Uncomment for debugging
    console.log(req.params);
    console.log(req.body);
    await getUser(req, res, (req, res) =>{
        try{
            const q = Model.findOneAndUpdate(
                {   code: req.params.tripCode},
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }
            ).exec();
    
            if(!q){
                //Database returned no data
                return res
                    .status(404)
                    .json({ message: "Trip not found" });
            }
            else{
                //Return resulting updated trip
                return res
                    .status(200)
                    .json(q);
            }
        }
        catch(error){
            console.error("Error updating trip:", error);
            return res.status(500).json({ error: "Internal server error"});
        }
    });

};


//POST: /trips - Adds a new trip
//Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    await getUser(req, res, (req, res) => {
        const q = Model.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        })
        .then((data) =>{
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
    });   
};


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
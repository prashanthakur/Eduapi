var express = require('express');
const app = express();
const port = process.env.PORT||8210;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
//const mongourl =  "mongodb://localhost:27017";
const mongourl = "mongodb+srv://thakurgmail_com:1239910@cluster0.z32tm.mongodb.net/Edu_August?retryWrites=true&w=majority";
let db;


app.get('/',(req,res) => {
    res.send("<h1>Welcome to Node Api application made by thakur</h1>")
})
//list of cities or location
app.get('/location',(req,res) => {
    db.collection('location').find().toArray((err,result) =>{
        if (err) throw err;
        res.send(result)
    })
})

//restaurants wrt t0 city
//example of params
app.get('/restaurant/:cityId',(req,res) => {
    var cityId = req.params.cityId;
    //console.log("data>>>>>",cityId); city in db
    db.collection('restaurants').find({city:cityId}).toArray((err,result) =>{
        if (err) throw err;
        res.send(result)
    })
})

//restaurants wrt t0 city
//example of query param
app.get('/restaurant',(req,res) => {
    var cityId = req.query.cityId; //or  var cityId= req.query.cityId?req.query.cityId:"2";
    db.collection('restaurants').find({city:cityId}).toArray((err,result) =>{
        if (err) throw err;
        res.send(result)
    })
})
//try and test case live url
//list of restaurants
app.get('/restaurants',(req,res) => {
    db.collection('restaurants').find().toArray((err,result) =>{
        if (err) throw err;
        res.send(result)
    })
})
//quick search list
app.get('/quicksearch',(req,res) => {
    db.collection('mealType').find().toArray((err,result) =>{
        if (err) throw err;
        res.send(result)
    })
})



//coonection with database
MongoClient.connect(mongourl,(err,client) => {
    if (err) throw err;
    db = client.db('Edu_August');
    app.listen(port,() => {
        console.log(`running on port no : ${port}`);
    });
})


// Importing modules
const express = require("express")
const path  = require("path")
const bodyparser = require("body-parser")
const app = express();
port= 3054;

// To use local files
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// making schema 
const ContactSchema = new mongoose.Schema({
    Name: String,
    number: String,
    email: String,
    adress: String,
    desc: String
  });

// making schema model
const Contact = mongoose.model('Contact', ContactSchema);
// const bodyparser = require("body-parser");

// PUG SETUP
app.set('views engine','pug')
app.set('views', path.join(__dirname, 'views'))

// END POINTS
app.get('/',(res, req)=>{
    
    req.status(200).render('home.pug')
})
app.get('/contact',(res, req)=>{
    req.status(200).render('contact.pug')
})


app.post('/contact',(req, res)=>{

    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("The data has been saved to the database");
    }).catch( () =>{
        res.status(400).send("Couldn't save to the database");
    });
// res.status(200).render('contact.pug');
})


// start the server
app.listen(port, () =>{
    console.log(`this app is running on port ${port}`)
})
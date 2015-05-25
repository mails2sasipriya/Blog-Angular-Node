
var express = require('express');
var router = express.Router();


var mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost/test', function(err){
    if(err) console.log("Could not connect to mongoose");
    else console.log("Successfully connected to mongoose");
});

var BlogModel = mongoose.model('Blog', {
    title : String,
    content: String
});

// following order matters

router.post('/blogs', function(req, res){
    (new BlogModel(req.body)).save(function(err, result){
         if(err) res.status(500).json({message: 'Sorry! something broke'});
        else res.status(201).json(result);
    });
});

// get a contact for a given id
router.get('/blogs/:id', function(req, res){
    BlogModel.findById(req.params.id, function(err, result){
        console.log(result);
        if (err) res.status(500).json({ message: 'Sorry! Something broke in get!' })
        else res.status(200).json(result);
    });
});

// edit contact for a given id
router.put('/blogs/:id', function (req, res) {
    BlogModel.findByIdAndUpdate(req.params.id, req.body, function (err, result){

        if (err) res.status(500).json({ message: 'Sorry! Something broke in put!' });
        else res.status(200).json(result);
    });
});


// delete contact for a given id
router.delete('/blogs/:id', function (req, res) {
    BlogModel.findByIdAndRemove(req.params.id, function (err, result){
        if (err) res.status(500).json({ message: 'Sorry! Something broke in delete!' });
        else res.status(200).json(result);
    });
});

// get all contact
router.get('/blogs', function(req, res){
    BlogModel.find(function(err, result){
        if(err) res.status(500).json({message: 'Sorry! something broke in get'});
        else res.status(200).json(result);
    });
});






/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
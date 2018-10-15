var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Riddle = mongoose.model('Riddle');

router.get('/riddles', function(req,res,next){
console.log("xd")
  
	Riddle.find(function(err,riddles){
		if(err){return next(err);}
		res.json(riddles);
	});
});

router.post('/riddles',function(req,res,next){
	var riddle = new Riddle(req.body);
	riddle.save(function(err,riddles){
		if(err){return next(err);}
		res.json(riddle);
	});
});
module.exports = router;
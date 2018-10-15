exports.pages = function(req, res){
console.log("xd")
  
  var filename = req.params.filename;
  if(!filename) return;  // might want to change this
  res.render(filename );
};

exports.index = function(req, res){
console.log("xd")
  
  res.render('index', {message:""});
};

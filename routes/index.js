
/*
 * GET home page.
 */

exports.index = function(req, res){
	arreh = ["Blog", "Text Compressor", "when", "where", "why"];
	sterf = "QR Code Generator";
  res.render('index',{stuff : sterf, arr: arreh});
};

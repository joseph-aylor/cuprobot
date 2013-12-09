function getImgID(){
	var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890';
	var id = '';
	for(var i=0; i<7; i++) {
		id += chars[Math.floor(Math.random() * chars.length)];
	}
	return id;
}

index = function(req, res){
	res.render('imgurand');
}

getri = function(req, res)
{
	sendValidImgurID(req, res);
}

sendValidImgurID = function(req, res, id){
	var request = require('request');
	id = typeof id !== 'undefined' ? id : getImgID();
	var url = 'http://i.imgur.com/' + id + '.jpg';
	request(url, function (error, response, body) {
		if(!error && response.statusCode == 200 && body.indexOf('File not found') == -1
			&& body.indexOf('Sorry!') == -1 && response.headers['content-length'] != '503'
			&& response.headers['content-length'] != '902' && response.body.length != 492) {
			res.send(id);
		}
		else {
			if (id.length > 5)
			{
				sendValidImgurID(req, res, id.substring(0,id.length -1));
			}
			else
			{
				sendValidImgurID(req, res);
			}
		}
	});
}

exports.index = index;
exports.getri = getri;

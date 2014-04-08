/*
 *
 * The app.js no longer has a link to the getri function
 * everything is done throught the client-side image fetcher.
 * 
 *
 */




/*
 * Generate a 7 character string that COULD be an imgurid
 */
function getImgID(){
	var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890';
	var id = '';
	for(var i=0; i<7; i++) {
		id += chars[Math.floor(Math.random() * chars.length)];
	}
	return id;
}

/*
 * Goes through IDs from getImgID and gets a 5-7 character string that returns something good from
 * imgur
 */
sendValidImgurID = function(req, res, id){
	//Use request Libarary to make request.
	var request = require('request');

	id = typeof id !== 'undefined' ? id : getImgID();

	var url = 'http://i.imgur.com/' + id + '.jpg';

	request(url, function (error, response, body) {
		//The request is valid if it matches the easy to understand things below PLUS
		// the default imgur "This image is removed" fits everything, but either has
		// a content length of 902 or 492
		if(!error && response.statusCode == 200 && body.indexOf('File not found') == -1
			&& body.indexOf('Sorry!') == -1 && response.headers['content-length'] != '503'
			&& response.headers['content-length'] != '902' && response.body.length != 492) {
			res.send(id);
		}
		else {
			//If it doesn't fit, try a substring, we can go down to 5
			//If it's already 5, start over from scratch.
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


/*
 * Make the imgurand view, that includes a client-side random imgurer.
 */
index = function(req, res){
	res.render('imgurand');
}

/*
 * Get a 5-7 character string that is the ID of an imgur image
 */
getri = function(req, res)
{
	sendValidImgurID(req, res);
}

exports.index = index;
exports.getri = getri;

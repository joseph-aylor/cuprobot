
//var draw_qrcode = function(text, typeNumber, errorCorrectLevel) {
//	document.write(create_qrcode(text, typeNumber, errorCorrectLevel) );
//};

var create_qrcode = function(text, typeNumber, errorCorrectLevel, cellSize, margin) {
	//correct levels: L,M,Q,H
	//typenumbers
	try
	{
		var qr = qrcode(typeNumber || 4, errorCorrectLevel || 'H');
		qr.addData(text);
		qr.make();
		//cellsize,margin
		result= qr.createImgTag(cellSize || 20, margin || 10);
	}
	catch(err)
	{
		if(err.toString().match(/^Error: code length overflow/i))
		{
			result = "The text that was entered is longer than allowed with the current settings.  Please increase code number.";
		}
		else
		{
			result = err;
		}
	}
	
	return result;
};

var update_qrcode = function() {
	var text = $('#txt').val().replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
	var codeNum = $('#codeNumber').val();
	var errorCorrect = $('#errorCorrect').val();
	var cellSz = $('#cellSize').val();
	var mgn = $('#margin').val();
	document.getElementById('qr').innerHTML = create_qrcode(text, codeNum, errorCorrect, cellSz, mgn);
};


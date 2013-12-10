var showImages = false;

getImgurId = function () {
		var imgurId = "";
		var chars = "abcdefghijklmnopqrstuvwxyzABCDEFG";
		chars += "HIJKLMNOPQRSTUVWXYZ0123456789";
		for (var i = 0; i < 7; i++) {
				var index = Math.floor(Math.random() * chars.length).toString();
				imgurId += chars[index];
		}
		return imgurId;
};

tryUrl = function (imgUrl){

	var img = new Image();
	img.onload = function() {
		//height needs to be set, not zero and not 81
		//81 is the height of the "Not Found and/or Removed image.
		if(img.height && img.height !== 81)
		{
			$("#images").append(
				'<a target="_blank"  href ="' 
				+ img.src 
				+ '">'
				+ imgUrl
				+ '<br>'
				+ '<img src="' + img.src + '"/>'
				+ '</a>');
			$("#images").append('<br>');
			$("#images").append('<br>');
			//number of images ++
			$("#numImages").text(parseInt($("#numImages").text())+1);
		}
	}
	img.src = imgUrl;
}

fillImages = function () {
			var id = getImgurId();
			var imgUrl = 'http://i.imgur.com/' + id.substring(0,5) + '.jpg';
			tryUrl(imgUrl);
			var imgUrl = 'http://i.imgur.com/' + id + '.jpg';
			tryUrl(imgUrl);
			if(showImages){
				setTimeout(fillImages, 1000);
			}
};

$("#start").click(function(){ showImages=true; fillImages();});
$("#stop").click(function(){ showImages=false;});
$("#clear").click(function(){ 
	$("#images").empty();
	$("#numImages").text("0");
});



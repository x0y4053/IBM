var API_KEY = 'a5e95177da353f58113fd60296e1d250';
var USER_ID = '24662369@N07';

var photos = new Array();


$().ready(function(){
  
  $.getJSON("https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=" + API_KEY 
  	+"&user_id=" + USER_ID +"&format=json&nojsoncallback=1",
    function(data){
      var ID = "";
      var title = "";
      $.each(data.photos.photo, function(i,sampleImgObj){	     
	      var urlDefault = 'https://farm' + sampleImgObj.farm + '.staticflickr.com/' + sampleImgObj.server + '/' + sampleImgObj.id + '_' + sampleImgObj.secret + '.jpg';
		  var urlLarge = 'https://farm' + sampleImgObj.farm + '.staticflickr.com/' + sampleImgObj.server + '/' + sampleImgObj.id + '_' + sampleImgObj.secret + '_b.jpg';
		  var img = '<tr><td> <div class="row"> \
		  				<div class="col-sm-6"><img src="' +urlDefault+'"</img></div> \
		  				<div class="col-sm-6"> \
		  					<div>Title:</div> \
		  				    <div>' + sampleImgObj.title +'</div> \
		  				    <div>ID:</div> \
		  				    <div>' + sampleImgObj.id +'</div> \
		  				    <div>Owner:</div> \
		  				    <div>' + sampleImgObj.owner +'</div> \
		  				    <div>Server:</div> \
		  				    <div>' + sampleImgObj.server +'</div> \
		  				</div></td></tr>';

		 
	      photos.push(img);

	     
    });
    $("#gallery2").html(photos);
    $('#gallery').DataTable();


  });
});
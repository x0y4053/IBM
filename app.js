var API_KEY = 'a5e95177da353f58113fd60296e1d250';
var USER_ID = '24662369@N07';
var PAGE_SIZE =100;

var photos = new Array();


function checkLargeImgExist(urlDefault,sampleImgObj){
	$.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + API_KEY 
  	+"&user_id=" + USER_ID +"&format=json&nojsoncallback=1&photo_id=" +sampleImgObj.id,
    function(data){
      var largeExist = false;
      for (var i=0; i<data.sizes.size.length;i++) {
      		if (data.sizes.size[i].label == 'Large') {
      			largeExist = true;
      			break;
      		}
      }
      var urlImg = urlDefault;
      if (largeExist) {
      	var urlLarge = 'https://farm' + sampleImgObj.farm + '.staticflickr.com/' + sampleImgObj.server + '/' + sampleImgObj.id + '_' + sampleImgObj.secret + '_b.jpg';
      	urlImg = urlLarge;
      }
      prepareDisplay(urlImg,sampleImgObj);
     

  });
}

function prepareDisplay(urlImg,sampleImgObj) {
	var img = '<tr><td> <div class="row wow bounceInUp"> \
		  				<div class="col-sm-6"><img class="photos" src="' +urlImg+'"</img></div><br> \
		  				<div class="col-sm-6"> \
		  					<div class="subHeading col-xs-2">Title:</div> \
		  				    <div class="col-xs-10 desc">' + sampleImgObj.title +'</div> \
		  				    <div class="subHeading col-xs-2">ID:</div> \
		  				    <div class="col-xs-10 desc">' + sampleImgObj.id +'</div> \
		  				    <div class="subHeading col-xs-2">Owner:</div> \
		  				    <div class="col-xs-10 desc">' + sampleImgObj.owner +'</div> \
		  				    <div class="subHeading col-xs-2">Server:</div> \
		  				    <div class="col-xs-10 desc">' + sampleImgObj.server +'</div> \
		  				</div></td></tr>';
		 
	photos.push(img);

	if (photos.length == PAGE_SIZE ) {
		displayResult();
	}

}

function displayResult() {
	$("#gallery2").html(photos);
   	//move paging control to top
    $('#gallery').DataTable({ "sDom": '<"top"flp>rt<"bottom"i><"clear">'});
}

$().ready(function(){
  
  $.getJSON("https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=" + API_KEY 
  	+"&user_id=" + USER_ID +"&format=json&nojsoncallback=1",
    function(data){
     
      $.each(data.photos.photo, function(i,sampleImgObj){	     
	      var urlDefault = 'https://farm' + sampleImgObj.farm + '.staticflickr.com/' + sampleImgObj.server + '/' + sampleImgObj.id + '_' + sampleImgObj.secret + '.jpg';
		  if ($(window).width() > 768) {
		  	//check if there is a large size
		  	checkLargeImgExist(urlDefault,sampleImgObj);
		  }
		  else {
		  	var urlImg = urlDefault;
		  	prepareDisplay(urlImg,sampleImgObj);
		  }
		  

	     
    });
    


  });
});
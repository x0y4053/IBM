var API_Key = 'a5e95177da353f58113fd60296e1d250';
var USER_ID = '24662369@N07';

$().ready(function(){
  $.getJSON("https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=API_KEY&user_id=USER_ID&format=json&nojsoncallback=1",
    function(data){
    var photosetID = "";
    var title = "";
    $.each(data.photos.photo, function(i,photo){
    photosetID = set.id;
    title = set.title._content;
    ids.push(photosetID);
    titles.push(title);
    });

  });
});
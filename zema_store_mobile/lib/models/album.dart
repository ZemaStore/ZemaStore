class Album {

  Album({
    //required this.album_id,
   required this.artist_id,
   required this.title,
   required this.imageUrl,
   required this.released_date,
});
  //final String album_id;
  final String artist_id;
  final String title;
  final String imageUrl;
  final DateTime released_date;

  factory Album.fromJson(Map<String,dynamic> json){
    return Album(
      //album_id: json['album_id'],
      artist_id: json['artist_id'],
      title :json['title'],
      imageUrl:json['imageUrl'],
      released_date:json['released_date'],
    );
  }
}
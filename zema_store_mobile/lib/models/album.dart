class Album {

  Album({
    required this.album_id,
   required this.artist_id,
   required this.title,
   required this.cover_url,
   required this.released_date,
});
  final String album_id;
  final String artist_id;
  final String title;
  final String cover_url;
  final DateTime released_date;

  factory Album.fromJson(Map<String,dynamic> json){
    return Album(
      album_id: json['album_id'],
      artist_id: json['artist_id'],
      title :json['title'],
      cover_url :json['cover_url'],
      released_date:json['released_date'],
    );
  }
}
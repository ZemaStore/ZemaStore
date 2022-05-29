import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:zema_store_mobile/models/models.dart';

class Album {

  Album({
   required this.artist_id,
   required this.title,
   required this.imageUrl,
   required this.released_date,
    required this.songs
});
  final String artist_id;
  final String title;
  final String imageUrl;
  final String  released_date;
  final int songs;

  factory Album.fromJson(Map<String,dynamic> json){
    return Album(
      artist_id: json ['album']['artistId'],
      title :json['album']['title'],
      imageUrl:json['album']['imageUrl'],
      released_date:json['album']['releaseDate'],
      songs: json['songs']
    );
  }
}
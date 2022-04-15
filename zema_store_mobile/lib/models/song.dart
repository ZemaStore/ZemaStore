import 'package:zema_store_mobile/models/album.dart';
import 'package:zema_store_mobile/models/artist.dart';

class Song {
  Song({
    required this.resource_id,
    required this.url,
    required this.title,
    required this.genre,
    required this.isSingle,
    required this.album_id,
    required this.tags,
    required this.artist_id,
    required this.views,
    required this.length,
    required this.releasedDate,
});
  final String resource_id;
  final String url;
  final String title;
  final Genre genre;
  final bool isSingle;
  final String  album_id;
  final List<String> tags;
  final String artist_id;
  final int views;
  final Duration length;
  final DateTime releasedDate;

  factory Song.fromJson(Map<String,dynamic> json){
    return Song(
        resource_id: json['resource_id'],
        url: json['url'],
        title: json['title'],
        genre: json['genre'],
        isSingle: json['isSingle'],
        album_id: json['album_id'],
        tags: json['tags'],
        artist_id: json['artist_id'],
        views: json['views'],
        length: json['length'],
        releasedDate:json['releasedDate']
    );
  }
  factory Song.fromMap(Map<String,dynamic> map){
    return Song(resource_id: map['resource_id'],
        url: map['url'],
        title: map['title'],
        genre: map['genre'],
        isSingle: map['isSingle'],
        album_id: map['album_id'],
        tags: map['tags'],
        artist_id: map['artist_id'],
        views: map['views'],
        length: map['length'],
        releasedDate: map['releasedDate']);
  }

}
enum Genre {
  rock,country, punk, hiphop, dance_music,pop
}

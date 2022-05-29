import 'dart:convert';

import 'package:flutter_icons/flutter_icons.dart';
import 'package:zema_store_mobile/models/album.dart';
import 'package:zema_store_mobile/models/artist.dart';

import 'models.dart';

class Song {
  Song({
    required this.id,
    required this.song,
    required this.title,
    required this.genre,
    //required this.isSingle,
    required this.album_id,
    required this.artist_id,
    required this.listenersCount,
    required this.length,
    required this.releaseDate,
});
  final String id;
  final String song;
  final String title;
  final String genre;
  //final bool isSingle;
  final String  album_id;

  final String artist_id;
  final int listenersCount;
  final String length;
  final String releaseDate;

  factory Song.fromJson(String source){
   return Song.fromMap(json.decode(source));
  }
  Map<String, dynamic> toMap() {
    return {
       '_id':id,
      'song':song,
      'title': title,
      'genre': genre,
      'albumId':album_id,
      'artistId': artist_id,
      'listenersCount': listenersCount,
      'length': length,
      'releaseDate': releaseDate,
    };
  }
  String toJson() => json.encode(toMap());
  factory Song.fromMap(Map<String,dynamic> map){
    return Song(
       id:  map['_id'],
        song: map['song'],
        title: map['title'],
        genre: map['genre'],
        //isSingle: map['isSingle'],
        album_id: map['albumId'],
        artist_id: map['artistId'],
        listenersCount: map['listenersCount'],
        length: map['length'],
        releaseDate: map['releaseDate']);
  }

}

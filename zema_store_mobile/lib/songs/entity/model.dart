import 'package:flutter/material.dart';

class Songs{
  final String id;
  final String albumId;
  final String artistId;
  final String title;
  final String songUri;
  final String genre;
  final int listenersCount;
  final String length;
  final String releaseDate;


 Songs({required this.albumId, required this.artistId, required this.listenersCount, required this.length, required this.releaseDate, required this.title, required this.id, required this.songUri, required this.genre});

 factory Songs.fromJson(Map<String, dynamic> json) {
      return Songs(
          id: json['_id'] ,
          albumId: json['albumId'] ,
          artistId: json['artistId'] ,
          title: json['title'] ,
          songUri: json['song'],
          genre: json['genre'] ,
          listenersCount: json['listenersCount'],
          length: json['length'] ?? '',
          releaseDate: json['releaseDate'],
      );
  }
}
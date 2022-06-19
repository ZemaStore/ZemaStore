import 'package:flutter/material.dart';
import 'package:tt/songs/entity/model.dart';

class Playlist{
  final String id;
  final String userId;
  final String title;
  final List<Songs> songs;

 Playlist({required this.title, required this.id, required this.userId, required this.songs});

 factory Playlist.fromJson(Map<String, dynamic> json) {
   final songsList = json['songs'] as List;
      return Playlist(
        id: json['_id'] ,
        title: json['title'],
        userId: json['userId'],
        songs: songsList.map((song) => Songs.fromJson(song)).toList(),
      );
  }
}
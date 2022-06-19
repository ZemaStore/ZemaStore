import 'package:flutter/material.dart';
import 'package:tt/artists/entity/model.dart';

class Album {
  final String id;
  final ArtistProfile artistProfile;

  Album({required this.id, required this.artistProfile});

  factory Album.fromJson(Map<String, dynamic> json) {
    print('now hhere $json');
    return Album(id: json['_id']??'', artistProfile: json['artistId']);
  }
}

class Albums {
  final String id;
  final String title;
  final String imageUrl;
  final String releaseDate;
  final ArtistProfile artistProfile;
  final int songs;

  Albums(
      {required this.title,
      required this.imageUrl,
      required this.id,
      required this.releaseDate,
      required this.artistProfile,
        required this.songs
      });

  factory Albums.fromJson(Map<String, dynamic> json) {
    // debugPrint(json['urlToImage']);
    print('we got ehre');
    final album = json['album'];
    print(json);
    return Albums(
      id: album['_id'] ?? '',
      title: album['title'] ?? 'title',
      imageUrl: album['imageUrl'] ?? 'description',
      releaseDate: album['releaseDate'] ?? 'url',
      artistProfile: ArtistProfile.fromJson(album['artistId']),
      songs: json['songs']
    );
  }
}

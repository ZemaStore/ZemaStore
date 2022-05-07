
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:zema_store_mobile/models/models.dart';
class SongDataProvider {
  final _baseUrl = 'https://zema-store.herokuapp.com/api';
  final http.Client httpClient;
  final String token;

  SongDataProvider({required this.httpClient,required this.token});

  Future<Song> createSong(Song song) async{
    var data = {
      //'resource_id':song.resource_id,
      'url':song.url,
      'title':song.title,
      'genre':song.genre,
      'isSingle':song.isSingle,
      'album_id':song.album_id,
      'tags':song.tags,
      'artist_id':song.artist_id,
      'listenersCount':song.listenersCount,
      'length':song.length,
      'releasedDate':song.releasedDate,

    };
    try{
      final response = await http.post("$_baseUrl/songs",
          headers: <String, String>{
            "authorization": "Bearer $token",
            'Content-Type': 'application/json',
          },
          body: jsonEncode(data));
      var jsonResponse = jsonDecode(response.body);
      print("response is $jsonResponse");

      if (response.statusCode == 201) {
        return Song.fromJson(jsonDecode(response.body));
      } else {
        throw Exception('Failed to create Song.');
      }
    }catch(err){
      throw Exception('failed to create Song !') ;
    }

  }
  Future<Song> getSong(String id) async{
    final response = await http.get('$_baseUrl/songs/$id');

    if(response.statusCode == 200){
      var song = jsonDecode(response.body);
      Song selectedSong = Song.fromMap(song);
      return selectedSong;
    }else {
      throw Exception('failed to get songs');
    }
  }
  Future<void> deleteSong(String id) async{
    final response  = await http.delete(
      '$_baseUrl/songs/$id',

      headers: <String,String>{
        "authorization": "$token",
        'Content-Type': 'application/json',
      },
    );
    if(response.statusCode != 200 ){
      throw Exception('failed to delete song !!');
    }
  }
  Future<Song> updateSong(String id, Song song) async {
    var data = {
      //'resource_id':song.resource_id,
      'url':song.url,
      'title':song.title,
      'genre':song.genre,
      'isSingle':song.isSingle,
      'album_id':song.album_id,
      'tags':song.tags,
      'artist_id':song.artist_id,
      'listenerCount':song.listenersCount,
      'length':song.length,
      'releasedDate':song.releasedDate,

    };

      final response = await http.put("$_baseUrl/songs/$id",
          headers: <String, String>{
            "authorization": "$token",
            'Content-Type': 'application/json',
          },
          body: jsonEncode(data));
      var jsonResponse = jsonDecode(response.body);
      print("response is $jsonResponse");

      if (response.statusCode == 201) {
        return Song.fromJson(jsonDecode(response.body));
      } else {
        throw Exception('Failed to update Song.');
      }

  }

  Future<List<Song>> getSongs() async {
    final response = await http.get("$_baseUrl/songs");

    if (response.statusCode == 200) {
      final songs = jsonDecode(response.body) as List;
      List<Song> songList = songs.map((song) => Song.fromMap(song)).toList();

      return songList;
    } else {
      throw Exception('Failed to load jobs');
    }
  }
  Future<List<Song>> getSongsByArtistId(String artistId) async {
    final response = await http.get("$_baseUrl/songs/artist/$artistId");

    if (response.statusCode == 200) {
      final songs = jsonDecode(response.body) as List;
      print("${songs.length} $songs");
      List<Song> songList = songs.map((song) => Song.fromMap(song)).toList();

      return songList;
    } else {
      throw Exception('Failed to load song');
    }
  }
  Future<List<Song>> getSongsByGenre(String genreId) async {
    final response = await httpClient.get(
      Uri.http(_baseUrl, "/$genreId/songs"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
    );

    if (response.statusCode == 200) {
      final songs = jsonDecode(response.body) as List;
      return songs.map((song) => Song.fromJson(song)).toList();
    } else {
      throw Exception('Failed to load jobs');
    }
  }

}
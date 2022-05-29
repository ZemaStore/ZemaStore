
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:zema_store_mobile/models/models.dart';
class SongDataProvider {
  final _baseUrl = 'https://zema-store.herokuapp.com/api/';
  final http.Client? httpClient;
  final String? token;
  List<Song> songLis = [];
  SongDataProvider({this.httpClient,this.token});


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

  Future<List<Song>> getSongs() async {
    final response = await http.get("https://zema-store.herokuapp.com/api/songs");
    Song s ;
    print(' !!!!!!!!!!!!!!!!!!!!!!!!!!!!! ${response.body}!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    if (response.statusCode == 200) {
      final songs = jsonDecode(response.body)['data']['songs']as List;

      List<Song> songList = songs.map((song) => Song.fromMap(song)).toList();
      return songList;
    } else {
      throw Exception('Failed to load jobs');
    }
  }
  Future<List<Song>> getSongsByArtistId(String artistId) async {
    final response = await http.get("$_baseUrl/songs/artists/$artistId");

    if (response.statusCode == 200) {
      final songs = jsonDecode(response.body) as List;
      print("${songs.length} $songs");
      List<Song> songList = songs.map((song) => Song.fromMap(song)).toList();

      return songList;
    } else {
      throw Exception('Failed to load songs');
    }
  }
  Future<List<Song>> getSongsByAlbum(String albumId) async {
    final response = await http.get("$_baseUrl/songs/albums/$albumId");

    if (response.statusCode == 200) {
      final songs = jsonDecode(response.body) as List;
      print("${songs.length} $songs");
      List<Song> songList = songs.map((song) => Song.fromMap(song)).toList();

      return songList;
    } else {
      throw Exception('Failed to load songs');
    }
  }
  Future<List<Song>> getSongsByGenre(String genreId) async {
    final response = await httpClient!.get(
      Uri.http(_baseUrl, "/songs/$genreId"),
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

  Future<List<Song>> searchSongs(String title) async {
    var response =
    await http.get('https://zema-store.herokuapp.com/api/songs?search=$title');

    if (response.statusCode == 200) {
      print("##################### ${response.body}###############################");
      var data = json.decode(response.body)['data']['songs'] as List;
      print("the song here is ${data.toString()}");

      List<Song> songList = data.map((song) => Song.fromMap(song)).toList();
      return songList;
    } else {
      throw Exception('Failed');
    }
  }


}
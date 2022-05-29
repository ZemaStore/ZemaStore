import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/models/playlist.dart';
class PlayListDataProvider {

  final _baseUrl = 'https://zema-store.herokuapp.com/api/playlists';
  late http.Client httpClient;

  Future<Playlist> createPlaylist(Playlist playlist) async{
    final response  = await http.post('$_baseUrl',
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String,dynamic>{
          'userId' : playlist.user_id,
          'title' : playlist.title,
          'songs' : playlist.songs,
        })
    );
    if(response.statusCode == 200){
      final playlist = Playlist.fromJson(jsonDecode(response.body));
      return playlist;
    }else{
      throw Exception('failed to create playlists');
    }
  }
  Future<List<Playlist>> getPlaylists() async {
    final response = await http.get("$_baseUrl");
    if (response.statusCode == 200) {
      final playlists = jsonDecode(response.body) as List;
      final result = playlists.map((playlist) {
        var resultPlaylist = Playlist.fromJson(playlist);
        return resultPlaylist;
      }).toList();
      return result;
    } else {
      throw Exception('Failed to load playlists');
    }
  }
  Future<Playlist> getPlaylist(String id) async {
    final response = await http.get("$_baseUrl/$id");
    if (response.statusCode == 200) {
      final playlist = jsonDecode(response.body) ;
      Playlist result = Playlist.fromJson(playlist);
      return result;
    } else {
      throw Exception('Failed to load playlist');
    }
  }
  Future<void> updatePlaylist(Playlist playlist,String id) async {
    final http.Response response = await httpClient.patch(
      '$_baseUrl/${id}',
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'userId' : playlist.user_id,
        'title' : playlist.title,
        'songs' : playlist.songs,


      }),
    );

    if (response.statusCode != 204) {
      throw Exception('Failed to update playlists');
    }
  }

  Future<void> deletePlaylist(String id) async {
    final http.Response response = await http.delete(
      '$_baseUrl/$id',
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to delete playlists');
    }
  }

}
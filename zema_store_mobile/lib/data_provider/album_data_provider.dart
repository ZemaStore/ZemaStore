
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:zema_store_mobile/models/models.dart';
class AlbumDataProvider {
  final _baseUrl = 'https://zema-store.herokuapp.com/api';
  final http.Client? httpClient;
  final String? token;

  AlbumDataProvider({ this.httpClient,this.token});



  Future<Album> getAlbum(String id) async{
    final response = await http.get('_$_baseUrl/$id');

    if(response.statusCode == 200){
      var album = jsonDecode(response.body) ['data']['albums'];
      Album selectedSAlbum = Album.fromJson(album);
      return selectedSAlbum;
    }else {
      throw Exception('failed to get album');
    }
  }
  Future<List<Album>> getAlbums() async {
    final response = await http.get("$_baseUrl/albums");

    if (response.statusCode == 200) {
      print("################################## ${response.body}##################################################");
      final albums = jsonDecode(response.body)['data']['albumList'] as List;

      List<Album> albumList = albums.map((album) => Album.fromJson(album)).toList();
      print(" ?????????????????????????? ${albumList[0]}???????????????????????????????");
      return albumList;
    } else {
      throw Exception('Failed to load albums');
    }
  }
  Future<List<Album>> searchAlbum(String title) async {
    var response =
    await http.get('https://zema-store.herokuapp.com/api/albums?search=$title');
    if (response.statusCode == 200) {
      var data = json.decode(response.body)['data']['songs'] as List;
      print("the song here is ${data.toString()}");

      List<Album> albumList = data.map((album) => Album.fromJson(album)).toList();
      return albumList;
    } else {
      throw Exception('Failed');
    }
  }


  Future<List<Album>> getAlbumsByArtist(String artistId) async {
    final response = await http.get("/artists/$artistId");

    if (response.statusCode == 200) {
      final albums = jsonDecode(response.body) as List;
      List<Album> albumList = albums.map((album) => Album.fromJson(album)).toList();

      return albumList;
    } else {
      throw Exception('Failed to load album');
    }
  }


}
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:zema_store_mobile/models/models.dart';
class ArtistDataProvider {
  final _baseUrl = 'https://zema-store.herokuapp.com/api';
  final http.Client? httpClient;
  final String? token;

  ArtistDataProvider({this.httpClient,this.token});


  Future<Artist> getArtist(String id) async{
    final response = await http.get('$_baseUrl/artists/$id');

    if(response.statusCode == 200){
      var artist = jsonDecode(response.body);
      Artist selectedArtist = Artist.fromJson(artist);
      return selectedArtist;
    }else {
      throw Exception('failed to get artists');
    }
  }
  Future<List<Artist>> getArtists() async {
    final response = await http.get("$_baseUrl/artists");

    if (response.statusCode == 200) {
      print('######################## ${response.body}#########################################3');
      final artists = jsonDecode(response.body)['data']['artists'] as List;
      print("################################### ${artists[0]}##################################33");
      List<Artist> artistList = artists.map((artist) => Artist.fromJson(artist)).toList();

      return artistList;
    } else {
      throw Exception('Failed to load artists');
    }
  }
  Future<List<Artist>> searchArtist(String title) async {
    var response =
    await http.get('https://zema-store.herokuapp.com/api/artists?search=$title');
    if (response.statusCode == 200) {
      var data = json.decode(response.body)['data']['songs'] as List;
      print("the song here is ${data.toString()}");

      List<Artist> artistList = data.map((artist) => Artist.fromJson(artist)).toList();
      return artistList;
    } else {
      throw Exception('Failed');
    }
  }






}
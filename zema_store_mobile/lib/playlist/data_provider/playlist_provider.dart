import 'dart:convert';

import 'package:tt/auth/data_provider/secure_storage.dart';

import '../entity/model.dart';
import 'package:http/http.dart' as http;

class PlaylistProvider {
  final http.Client httpClient;

  PlaylistProvider({required this.httpClient});

  final String _baseUrl = 'https://zema-store.herokuapp.com/api';
  SecureStorage secureStorage = SecureStorage();

  Future<List<Playlist>> getPlaylist() async {
    final userToken = await secureStorage.getToken();

    final response =
        await httpClient.get(Uri.parse('$_baseUrl/playlists'), headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer $userToken',
    });
    if (response.statusCode == 200) {
      final articles = jsonDecode(response.body)['data']['playlists'] as List;
      final playlists =
          articles.map((playlist) => Playlist.fromJson(playlist)).toList();

      return playlists;
    } else {
      throw Exception('Something went wrong');
    }
  }

  Future<bool> addUserPreference(List<String> artist, List<String> genere) async {
    final userToken = await secureStorage.getToken();
print(artist);
print(genere);
    final response = await httpClient.post(
        Uri.parse('$_baseUrl/playlists/add-user-preference'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $userToken',
        },
        body: jsonEncode(<String, dynamic>{
          "artists": artist.map((e) => e.toString()).toList(),
          "genres": genere
        }));
    print('Addpre, ${response.statusCode.toString()}');
    print(response.body);
    if (response.statusCode == 201) {
      print("Heeeyaaa");
      // final articles = jsonDecode(response.body)['data']['playlists'] as List;
      // final playlists =
      //     articles.map((playlist) => Playlist.fromJson(playlist)).toList();

      return true;
    } else {
      throw Exception('Something went wrong');
    }
  }

  Future<List<Playlist>> getPopularPlaylist() async {
    final userToken = await secureStorage.getToken();

    final response =
    await httpClient.get(Uri.parse('$_baseUrl/playlists/get-popular'), headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer $userToken',
    });
    print(response.statusCode);
    print(response.body);
    if (response.statusCode == 200) {
      // final articles = jsonDecode(response.body)['data']['playlists'] as List;
      // final playlists =
      // articles.map((playlist) => Playlist.fromJson(playlist)).toList();

      return [];
    } else {
      throw Exception('Something went wrong');
    }
  }
}

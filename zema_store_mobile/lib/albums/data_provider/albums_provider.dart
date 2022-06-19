import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:tt/albums/entity/model.dart';
import 'package:tt/auth/data_provider/secure_storage.dart';

import '../../songs/entity/model.dart';

class AlbumsProvider {
  final http.Client httpClient;
  AlbumsProvider({required this.httpClient});
  final String _baseUrl = 'https://zema-store.herokuapp.com/api/albums';
  SecureStorage secureStorage = SecureStorage();

  Future<List<Albums>> getAlbums() async {
    // final client = http.Client();
    final userToken = await secureStorage.getToken();
    final response = await httpClient.get(
        Uri.parse(
          _baseUrl,
        ),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $userToken',
        });
    print(response.statusCode.toString());
    print(response.body);
    if (response.statusCode == 200) {
      final articles = jsonDecode(response.body)['data']['albumList'] as List;
      final albums = articles.map((news) => Albums.fromJson(news)).toList();
      debugPrint('what about this');

      return albums;
    } else {
      throw Exception('Something went wrong');
    }
  }

  Future<List<Songs>> getSingleAlbum(String albumId) async {
    // final client = http.Client();
    final userToken = await secureStorage.getToken();
    // print
    final response = await httpClient.get(
        Uri.parse('https://zema-store.herokuapp.com/api/songs/album/$albumId'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $userToken',
        });
    print(response.body);
    if (response.statusCode == 200) {
      final articles = jsonDecode(response.body)['data']['songs'] as List;
      final albums = articles.map((e) => Songs.fromJson(e)).toList();

      return albums;
    } else {
      throw Exception('Something went wrong');
    }
  }
}

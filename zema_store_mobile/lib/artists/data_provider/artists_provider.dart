import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:tt/auth/data_provider/secure_storage.dart';

import '../entity/model.dart';
import 'package:http/http.dart' as http;

class ArtistsProvider {
  final http.Client httpClient;
  ArtistsProvider({required this.httpClient});
  final String _baseUrl = 'https://zema-store.herokuapp.com/api';
  SecureStorage secureStorage = SecureStorage();

  Future<List<Artist>> getArtists() async {
    // final client = http.Client();
    final userToken = await secureStorage.getToken();

    final response =
        await httpClient.get(Uri.parse('$_baseUrl/artists'),
            headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer $userToken',
    });

    if (response.statusCode == 200) {
      final articles = jsonDecode(response.body)['data']['artists'] as List;
      final artistList = articles.map((news) => Artist.fromJson(news)).toList();
      debugPrint('what about this');

      return artistList;
    } else {
      throw Exception('Something went wrong');
    }
  }
}

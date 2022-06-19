import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:tt/auth/data_provider/secure_storage.dart';

import '../entity/model.dart';
import 'package:http/http.dart' as http;

class ArtistsProvider {
  static List<String> userFollowsArtist = [];
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

  Future<bool> addFollow(String artistProfileId) async {
    // final client = http.Client();
    final userToken = await secureStorage.getToken();
    final userProfileID = await secureStorage.getLoginData();

    final response =
    await httpClient.post(Uri.parse('https://zema-store.herokuapp.com/api/follows'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $userToken',
        }, body: jsonEncode(<String, dynamic>{
    "artistId": artistProfileId,
    "customerId": userProfileID.user.profileId

        }));
print('follow ${response.statusCode}');
    if (response.statusCode == 200) {
      final response =
      await httpClient.get(Uri.parse('$_baseUrl/follows/${userProfileID.user.profileId}'),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer $userToken',
          });
      print('artsts');
      print(response.body);

      // final articles = jsonDecode(response.body)['data']['artists'] as List;
      // final artistList = articles.map((news) => Artist.fromJson(news)).toList();
      // debugPrint('what about this');

      return true;
    } else {
      throw Exception('Something went wrong');
    }
  }
}

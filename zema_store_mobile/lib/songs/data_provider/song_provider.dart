import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:tt/auth/data_provider/secure_storage.dart';

import '../entity/model.dart';
import 'package:http/http.dart' as http;

class SongsProvider {
  final http.Client httpClient;
  SongsProvider({required this.httpClient});
  final String _baseUrl = 'https://zema-store.herokuapp.com/api/';
  SecureStorage secureStorage = SecureStorage();

  Future<List<Songs>> getSongs() async {
    final userToken = await secureStorage.getToken();
    final response =
        await httpClient.get(Uri.parse('$_baseUrl/songs'), headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer $userToken',
    });
    print(response.body);
    if (response.statusCode == 200) {
      final songs = jsonDecode(response.body)['data']['songs'] as List;
      final songsList = songs.map((song) => Songs.fromJson(song)).toList();

      return songsList;
    } else {
      throw Exception('Something went wrong');
    }
  }

  Future<List<Songs>> getSongsOfArtist(String artistID) async {
    final userToken = await secureStorage.getToken();
    final response =
    await httpClient.get(Uri.parse('$_baseUrl/songs/artist/$artistID'), headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer $userToken',
    });
    print('song of arti');
    print(response.body);
    if (response.statusCode == 200) {
      final songs = jsonDecode(response.body)['data']['songs'] as List;
      final songsList = songs.map((song) => Songs.fromJson(song)).toList();

      return songsList;
    } else {
      throw Exception('Something went wrong');
    }
  }


  Future<SongDownload> getSingleSong(String songID) async {
    final userToken = await secureStorage.getToken();
    final response =
        await httpClient.get(Uri.parse('$_baseUrl/songs/$songID'), headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer $userToken',
    });
    print('loading Single');
    print(response.body);
    if (response.statusCode == 200) {
      final songs = jsonDecode(response.body)['data']['song'];
      // final songsList = Songs.fromJson(songs);

      return SongDownload.fromJson(songs);
    } else {
      throw Exception('Something went wrong');
    }
  }
}

class SongDownload {
  final String aes_iv;
  final String aes_aes;
  final String filepath;
  final String title;

  SongDownload(
      {required this.title,
      required this.aes_aes,
      required this.aes_iv,
      required this.filepath});

  factory SongDownload.fromJson(Map<String, dynamic> json) {
    return SongDownload(
        title: json['title'],
        aes_aes: json['aes_key'],
        aes_iv: json['aes_iv'],
        filepath: json['file_path']);
  }
}

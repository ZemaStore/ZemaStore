

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:tt/songs/entity/model.dart';
import 'package:tt/user/screens/user_page.dart';

import '../entity/model.dart';
import 'package:http/http.dart' as http;

class UsersProvider{
  final http.Client httpClient;
  UsersProvider({required  this.httpClient});
  final String _baseUri = 'https://zema-store.herokuapp.com/api';

  Future<List<User>> getUsers() async {
    final client = http.Client();

    final response = await client.get(Uri.parse('$_baseUri/users'));

    if (response.statusCode == 200){
      final articles = jsonDecode(response.body)['data']['users'] as List;
      debugPrint('Suha');
      final usersList = articles.map((users) => User.fromJson(users)).toList();
      debugPrint('what about this');

      return usersList;
    } else {
     throw Exception('Something went wrong');
    }

  }

}
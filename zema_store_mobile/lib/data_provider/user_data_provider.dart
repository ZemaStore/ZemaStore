import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:zema_store_mobile/models/models.dart';
class UserDataProvider {

  final _baseUrl = 'https://zema-store.herokuapp.com/api';
   late http.Client httpClient;


  Future<List<User>> getUsers() async {
      final response = await http.get("$_baseUrl/users");
      if (response.statusCode == 200) {
        final users = jsonDecode(response.body) as List;
        final result = users.map((user) {
          var resultUser = User.fromJson(user);
          return resultUser;
        }).toList();
        return result;
      } else {
        throw Exception('Failed to load users');
      }
  }
  Future<User> getUser(String profileId) async {
    final response = await http.get("$_baseUrl/users/$profileId");
    if (response.statusCode == 200) {
      final user = jsonDecode(response.body) ;
      User result = User.fromJson(user);
      return result;
    } else {
      throw Exception('Failed to load users');
    }
  }


}
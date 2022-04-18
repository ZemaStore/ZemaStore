import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:zema_store_mobile/models/models.dart';
class UserDataProvider {

  final _baseUrl = 'https://zema-store.herokuapp.com/api';
   late http.Client httpClient;

  Future<User> createUser(User user) async{
    final response  = await http.post('$_baseUrl/user',
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
        body: jsonEncode(<String,dynamic>{
        'profile_id':user.profile_id,
          'email':user.email,
          'password':user.password,
          'role_id':user.role_id,
          'status':user.status,
        })
    );
    if(response.statusCode == 200){
      final user = User.fromJson(jsonDecode(response.body));
      return user;
    }else{
      throw Exception('failed to create user');
    }
  }
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
  Future<void> updateUser(User user) async {
    final http.Response response = await httpClient.patch(
      '$_baseUrl/${user.profile_id}',
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'profile_id': user.profile_id,
        'email': user.email,
        'password': user.password,
        'role_id':user.role_id,
        'status':user.status,
      }),
    );

    if (response.statusCode != 204) {
      throw Exception('Failed to update user');
    }
  }

  Future<void> deleteUser(String id) async {
    final http.Response response = await http.delete(
      '$_baseUrl/$id',
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to delete user');
    }
  }

}
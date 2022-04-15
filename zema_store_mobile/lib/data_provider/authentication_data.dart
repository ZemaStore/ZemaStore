import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:jwt_decode/jwt_decode.dart';
import 'package:zema_store_mobile/models/models.dart';
import 'package:http/http.dart' as http;
class AuthenticationDataProvider{

  final _baseUrl = '';
  late String token;


  Future<User?> getCurrentUser() async {
    var user = getUserFromToken(await getToken()); // return null for now
    return user;
  }

  Future<String> getToken() async {
    final storage = new FlutterSecureStorage();
    String token = await storage.read(key: "jwt_token");
    return "'Bearer $token';";
  }
  Future<User> signInWithEmailAndPassword(String email,String password) async{
    final response = await http.post('$_baseUrl/signin',
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body:
        jsonEncode(<String, String>{'email': email, 'password': password}));

    if (response.statusCode == 200) {
      final Map<String, dynamic> data = jsonDecode(response.body);
      storeJwt(data['token']);

      return User.fromJson(data["user"]);
    } else {
      throw AuthenticationException(message: 'Wrong username or password');
    }
  }

  Future<bool> signUpWithEmailAndPassword(String profile_id,String email,String password,String role_id,String status) async{
    final response = await http.post('$_baseUrl/signup',
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonEncode(<String, String>{
          'username': profile_id,
          'email': email,
          'password': password,
          'role_id': role_id,
          'status':status
        }));
    if (response.statusCode == 201) {
      return true;
    } else {
      throw AuthenticationException(message: 'Wrong username or password');
    }
  }
  @override
  Future<void> signOut() async {
    deleteJwt();
  }

  void storeJwt(token) async {
    final storage = new FlutterSecureStorage();
    await storage.write(key: 'jwt_token', value: token);
  }

  void deleteJwt() async {
    final storage = new FlutterSecureStorage();
    await storage.delete(
      key: 'jwt_token',
    );
  }
  User? getUserFromToken(token) {
    Map<String, dynamic> payload = Jwt.parseJwt(token);

    // To check if token is expired
    bool isExpired = Jwt.isExpired(token);
    print(isExpired);

    // Can be used for auth state
    if (!isExpired) {
      var profile_id = payload['profile_id'];
      var email = payload['email'];
      var password = payload['password'];
      var status = payload['status'];
      var role_id = payload['role_id'];
     var result = User(profile_id: profile_id, email: email, password: password, role_id: role_id, status: status);
      return result;
    } else {
      return null;
    }
  }


}

class AuthenticationException implements Exception{
  final String message;

  AuthenticationException({this.message = 'Unknown error occurred. '});
}
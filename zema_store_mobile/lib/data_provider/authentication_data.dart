import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:jwt_decode/jwt_decode.dart';
import 'package:zema_store_mobile/models/models.dart';
import 'package:http/http.dart' as http;
class AuthenticationDataProvider{

  final _baseUrl = 'https://zema-store.herokuapp.com/api/auth';
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
    final response = await http.post('$_baseUrl/sign-in',
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body:
        jsonEncode(<String, String>{'email': email, 'password': password}));

    if (response.statusCode == 200) {
      final Map<String, dynamic> data = jsonDecode(response.body);
      storeJwt(data['token']);
      print('the Data here is $data');
      return User.fromJson(data["data"]);

    } else {
      throw AuthenticationException(message: 'Wrong username or password');
    }
  }

  Future<bool> signUpWithEmailAndPassword(String fullName,String email,String password,String phone) async{
    final response = await http.post('$_baseUrl/sign-up',
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonEncode(<String, String>{
          'email': email,
          'fullName':fullName,
          'phone': phone,
          'password': password,

        }));
    print('##################  ${response.statusCode}################################################33');
    if (response.statusCode == 200) {
      print( response.body.toString());
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
      //var profile_id = payload['profile_id'];
      var email = payload['email'];
      var password = payload['password'];
      var phone = payload['phone'];
      var fullName = payload['fullName'];
      //var fullName  = payload['fullName'];
     var result = User(
         email: email,
         password: password,
         phone: phone,

     );
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

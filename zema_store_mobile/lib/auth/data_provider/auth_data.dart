import 'dart:convert';
import 'dart:math';

import 'package:http/http.dart' as http;
import 'package:tt/auth/data_provider/secure_storage.dart';
import 'package:tt/auth/entity/login.dart';
import 'package:tt/auth/entity/signup.dart';
import 'package:tt/auth/entity/user.dart';

class LoginData {
  final User user;
  final refreshToken;
  final accessToken;
  LoginData({this.accessToken, this.refreshToken, required this.user});
}

class AuthDataProvider {
  final http.Client httpClient;
  AuthDataProvider({required this.httpClient});

  Future<LoginData> signUp(SignUpCrediential signUpCrediential) async {
    final response = await httpClient.post(Uri.parse('https://zema-store.herokuapp.com/api/auth/sign-up'), headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
        body: jsonEncode(<String, dynamic>{

        "email": signUpCrediential.email,
        "password": signUpCrediential.password,
        "phone": signUpCrediential.phoneNumber,
        "firstName": signUpCrediential.firstName,
        "lastName": signUpCrediential.lastName
      }));
    print('${response.statusCode} gottedi');
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body)['data'];
      print('reg data $data');
      return LoginData(
          user: User.fromJson(data['user']),
          refreshToken: data['refreshToken'],
          accessToken: data['accessToken']);
    } else {
      throw Exception('Email or Phone is duplicated!');
    }
  }

  Future<LoginData> logIn(LoginCredientials loginCredientials) async {
    print('wer ${loginCredientials.password} ${loginCredientials.phoneNumber}');
    final response = await httpClient.post(
        Uri.parse('https://zema-store.herokuapp.com/api/auth/sign-in'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, dynamic>{
          "password": loginCredientials.password,
          "email": loginCredientials.phoneNumber
        }));
    print(response.body);
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body)['data'];
      return LoginData(
          user: User.fromJson(data['user']),
          refreshToken: data['refreshToken'],
          accessToken: data['accessToken']);
    } else {
      throw Exception('Something went wrong');
    }
  }

  Future<String> refresh(String token) async {
    SecureStorage secureStorage = SecureStorage();
    // secureStorage.getToken();getToken
    final response = await httpClient.patch(
        Uri.parse('https://zema-store.herokuapp.com/api/auth/token/refresh'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ${await secureStorage.getToken()}',
        },
        body: jsonEncode(<String, dynamic>{
          "refreshToken": token
        }));
    print(response.body);
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body)['data'];
      return '';
    } else {
      print('hitting here');
      throw Exception('Something went wrong');
    }
  }
}

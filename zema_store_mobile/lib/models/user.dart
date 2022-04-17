import 'package:flutter/foundation.dart';

class User {
  User({
    required this.profile_id,
    required this.email,
    required this.password,
    required this.role_id,
    required this.status
  });
  final String profile_id;
  final String email;
  final String password;
  final String role_id;
  final String status;

  factory User.fromJson(Map<String,dynamic> json ){
    return User (
      profile_id: json['profile_id'],
      email :json['email'],
      password :json['password'],
      role_id :json['location'],
      status: json['status']
    );
  }
}
import 'package:flutter/material.dart';

class Profile{
  final String id;
  final String fullName;
  
  Profile({required this.id, required this.fullName});
  factory Profile.fromJson(Map<String, dynamic> json) {
    return Profile(id: json['_id'], fullName: json['fullName']);
  }
}
class User{
  final String id;
  final String email;
  final Profile profile;
  final bool isActive;

 User({required this.id, required this.email, required this.profile, required this.isActive});

 factory User.fromJson(Map<String, dynamic> json) {
      return User(
        id: json['id'] ?? '',
        email: json['email'] ?? '',
        profile: Profile.fromJson(json['profileId']),
        isActive: json['isActive'] ?? '',
      );
  }
}
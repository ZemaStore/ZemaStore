import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class User {
  User({
    this.profile_id,
    required this.email,
    required this.password,
    this.photoUrl,
    this.roleId,
    this.otp,
    required this.phone,
    this.isActive = false,
    this.subscriptionId,
    this.onModel,

  });
  final String? profile_id;
  final String email;
  final String password;
  final String? photoUrl;
  final String? roleId;
  final otpType? otp;
  final String phone;
  final bool?  isActive;
  final String? subscriptionId;
  final String? onModel;



  factory User.fromJson(Map<String,dynamic> json ){
    return User (
      profile_id: json['profile_id'],
      email :json['email'],
      password :json['password'],
      photoUrl :json['photoUrl'],
      roleId: json['roleId'],
      otp: json['otp'],
      phone: json['phone'],
      isActive: json['isActive'],
      subscriptionId: json['subscriptionId'],
      onModel: json['onModel'],


    );
  }
}
class otpType{
  late final String code;
  late final DateTime createdAt;
}
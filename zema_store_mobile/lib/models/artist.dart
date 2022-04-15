

import 'package:zema_store_mobile/models/models.dart';

class Artist extends User{

  final String first_name;
  final String last_name;
  final String profile_picture;
  final int  follower_number;
  final double listen_hour;

  Artist({
    required String profile_id,
    required String email,
    required String password,
    required String role_id,
    required String status,
    required this.first_name,
    required this.last_name,
    required this.profile_picture,
    required this.follower_number,
    required this.listen_hour,
}) : super(profile_id: profile_id,email: email,password: password,role_id: role_id,status: status);

  factory Artist.fromJson(Map<String,dynamic> json){
    return Artist(profile_id: json['profile_id'],
        email: json['email'],
        password: json['password'],
        role_id: json['role_id'],
        status: json['status'],
        first_name: json['first_name'],
        last_name: json['last_name'],
        profile_picture: json['profile_picture'],
        follower_number: json['follower_number'],
        listen_hour: json['listen_hour']
    );
  }
}
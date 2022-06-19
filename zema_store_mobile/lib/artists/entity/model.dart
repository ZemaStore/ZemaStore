import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:tt/user/entity/model.dart';

class ArtistProfile {
  final String id;
  final int followerNumber;
  final int listenedHour;
  final String fullName;

  ArtistProfile({
    required this.followerNumber,
    required this.listenedHour,
    required this.fullName,
    required this.id,
  });

  factory ArtistProfile.fromJson(Map<String, dynamic> json) {
    print(json);
    print('inside artistProfile');
    return ArtistProfile(
        followerNumber: json['followerNumber']??0,
        listenedHour: json['listenedHour']??0,
        fullName: json['fullName']??'',
        id: json['_id']??'');
  }
}

class Artist {
  final String id;
  final String email;
  final String phone;
  final String photoUrl;
  final ArtistProfile profile;
  final bool isActive;

  Artist(
      {required this.id,
      required this.email,
      required this.phone,
      required this.photoUrl,
      required this.profile,
      required this.isActive});

  factory Artist.fromJson(Map<String, dynamic> json) {
    return Artist(
      id: json['_id']??'',
      email: json['email']??'',
      profile: ArtistProfile.fromJson(json['profileId']),
      phone: json['phone']??'',
      photoUrl: json['photoUrl']?? '',
      isActive: json['isActive']??'',
    );
  }
}

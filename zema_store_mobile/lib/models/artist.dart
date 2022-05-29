
import 'package:zema_store_mobile/models/models.dart';

class Artist{

  final String fullName;
  final String photoUrl;
  final int  followerNumber;
  final double listenedHour;
  Artist({
    required this.fullName,
    required this.photoUrl,
    required this.followerNumber,
    required this.listenedHour,
});

  factory Artist.fromJson(Map<String,dynamic> json){
    return Artist(
      fullName: json['profileId']['fullName'],
      photoUrl: json['photoUrl'],
      followerNumber: json['followerNumber'],
      listenedHour: json['listenedHour']
    );
  }

}
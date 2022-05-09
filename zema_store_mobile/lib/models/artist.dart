
import 'package:zema_store_mobile/models/models.dart';

class Artist{

  final String fullName;
  final String photoUrl;
  final int  followerNumber;
  final double listenHour;

  Artist({
    required this.fullName,
    required this.photoUrl,
    required this.followerNumber,
    required this.listenHour
});

  factory Artist.fromJson(Map<String,dynamic> json){
    return Artist(
      fullName: json['fullName'],
      photoUrl: json['photoUrl'],
      followerNumber: json['followerNumber'],
      listenHour: json['listenHour']
    );
  }
}
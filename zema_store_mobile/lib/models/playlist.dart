import 'models.dart';

class Playlist{


  Playlist({
    required this.user_id,
    required this.title,
    required this.songs,
});
  final String user_id;
  final String title;
  final List<Song> songs;

  factory Playlist.fromJson(Map<String,dynamic> json){
    return Playlist(user_id: json['user_id'], title: json['title'], songs: json['songs']);
  }
}
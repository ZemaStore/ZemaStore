import 'package:tt/playlist/bloc/bloc.dart';

abstract class PlaylistEvent {}

class LoadPlaylist extends PlaylistEvent {
  // final String categoryName;
  // LoadNews({required this.categoryName});
}

class LoadPopularPlaylist extends PlaylistEvent {
  // final String categoryName;
  // LoadNews({required this.categoryName});
}

class AddGeneres extends PlaylistEvent{
  final List<String> artists;
  final List<String> geners;
AddGeneres({required this.artists, required this.geners});
}

class CreatePlayList extends PlaylistEvent{
  final List<String> songIds;
  final String playlistName;
  CreatePlayList({required this.songIds, required this.playlistName});
}


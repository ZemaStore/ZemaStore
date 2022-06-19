



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


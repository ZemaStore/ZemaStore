

import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/models/playlist.dart';

abstract class PlaylistEvent  {
  const PlaylistEvent();
}

class PlaylistLoad extends PlaylistEvent{
  final User user;
  const PlaylistLoad({ required this.user});

  @override
  List<Object> get props => [];
}

class PlaylistCreate extends PlaylistEvent{
  final Playlist playlist;
  final User user;

  const PlaylistCreate(this.playlist,this.user);

  @override
  List<Object> get props => [playlist];

  @override
  String toString() => 'Playlist Created {playlist: $playlist}';

}

class PlaylistUpdate extends PlaylistEvent {
  final String id;
  final Playlist playlist;
  final User user;
  PlaylistUpdate(this.id, this.playlist, this.user);

  @override
  List<Object> get props => [playlist];
  @override
  String toString() => 'Playlist Updated {playlist: $playlist}';

}

class PlaylistDelete extends PlaylistEvent {
  final Playlist playlist;

  PlaylistDelete(this.playlist);
  @override
  List<Object> get props => [playlist];

  @override
  String toString() => 'Playlist Deleted {playlist: $playlist}';

}

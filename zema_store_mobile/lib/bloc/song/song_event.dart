

import 'package:zema_store_mobile/models/models.dart';

abstract class SongEvent  {
  const SongEvent();
}

class SongLoad extends SongEvent {
  final User user;
  const SongLoad({ required this.user});

  @override
  List<Object> get props => [];
}

class SongCreate extends SongEvent {
  final Song song;
  final User user;

  const SongCreate(this.song,this.user);

  @override
  List<Object> get props => [song];

  @override
  String toString() => 'Song Created {song: $song}';
}

class SongUpdate extends SongEvent {
  final String id;
  final Song song;
  final User user;

  SongUpdate(this.id, this.song, this.user);

  @override
  List<Object> get props => [song];
  @override
  String toString() => 'Song Updated {song: $song}';
}

class SongDelete extends SongEvent {
  final Song song;

  SongDelete(this.song);
  @override
  List<Object> get props => [song];

  @override
  String toString() => 'Song Deleted {song: $song}';
}

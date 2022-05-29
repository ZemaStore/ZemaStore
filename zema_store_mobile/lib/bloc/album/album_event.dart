

import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/models/playlist.dart';

abstract class AlbumEvent  {
  const AlbumEvent();
}

class AlbumLoad extends AlbumEvent{
  const AlbumLoad();

  @override
  List<Object> get props => [];
}



class AlbumDelete extends AlbumEvent {
  final Album album;

  AlbumDelete(this.album);
  @override
  List<Object> get props => [Album];

  @override
  String toString() => 'Album Deleted {Album: $album}';

}


import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/models/playlist.dart';

class PlaylistState{
  const PlaylistState();

  List<Object> get props => [];
}
class PlaylistLoading extends PlaylistState{

}
class PlaylistLoadedSucess extends PlaylistState{
  final List<Playlist> playlist ;
  PlaylistLoadedSucess({required this.playlist});

  List<Object> get props => [playlist];

}
class PlaylistOperationFailure extends PlaylistState{

}
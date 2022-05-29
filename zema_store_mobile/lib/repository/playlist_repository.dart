
import 'package:zema_store_mobile/data_provider/data_provider.dart';
import 'package:zema_store_mobile/data_provider/playlist_data_provider.dart';
import 'package:zema_store_mobile/models/event.dart';
import 'package:zema_store_mobile/models/playlist.dart';

class PlaylistRepository{

  PlayListDataProvider playListDataProvider;

  PlaylistRepository({required this.playListDataProvider});

  Future<Playlist> createPlaylist(Playlist playlist){
    return playListDataProvider.createPlaylist(playlist);
  }
  Future<List<Playlist>> getPlaylists(){
    return playListDataProvider.getPlaylists();

  }
  Future<Playlist> getPlaylist(String id){
    return playListDataProvider.getPlaylist(id);

  }
  Future<void> updatePlaylist(Playlist playlist,String id){
    return playListDataProvider.updatePlaylist(playlist,id);
  }
  Future<void> deletePlaylist(String id){
    return playListDataProvider.deletePlaylist(id);
  }
}
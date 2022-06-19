

import 'package:tt/playlist/data_provider/playlist_provider.dart';
import 'package:tt/playlist/entity/model.dart';

class PlaylistRepository {
  final PlaylistProvider provider;
  PlaylistRepository({required this.provider});

  // get News List
  Future<List<Playlist>> getPlaylist() async {
    return await provider.getPlaylist();
  }

  Future<bool> addUserPreference(List<String> artist, List<String> genere) async {
    return await provider.addUserPreference(artist, genere);
  }

  Future<List<Playlist>> getPopularPlaylist() async {
    return await provider.getPopularPlaylist();
  }
}

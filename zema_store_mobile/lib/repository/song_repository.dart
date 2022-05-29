import 'package:zema_store_mobile/data_provider/song_data_provider.dart';
import 'package:zema_store_mobile/models/models.dart';

class SongRepository{

  SongDataProvider songDataProvider;

  SongRepository({required this.songDataProvider});

  Future<List<Song>> getSongs() async{
    return await  songDataProvider.getSongs();
  }
  Future<List<Song>> getSongsByGenre(String id) async {
    return await songDataProvider.getSongsByGenre(id);
  }
  Future<List<Song>> getSongsByArtistId(String artistId) async {
    return await songDataProvider.getSongsByArtistId(artistId);
  }
  Future<List<Song>> searchSong(String query) async{
    return await songDataProvider.searchSongs(query);
  }
  Future<Song> getSong(String id) async{
    return await songDataProvider.getSong(id);
  }




}
import 'package:zema_store_mobile/data_provider/song_data_provider.dart';
import 'package:zema_store_mobile/models/models.dart';

class SongRepository{

  SongDataProvider songDataProvider;

  SongRepository({required this.songDataProvider});

  Future<Song> createSong(Song song)async{
    return songDataProvider.createSong(song);
  }
  Future<Song> getSong(String id) async{
    return songDataProvider.getSong(id);
  }
  Future<Song> updateSong(String id,Song song)async{
    return songDataProvider.updateSong(id, song);

  }
  Future<void> deleteSong(String id) async{
    return songDataProvider.deleteSong(id);

  }
  Future<List<Song>> getSongs() async{
    return songDataProvider.getSongs();
  }
  Future<List<Song>> getSongsByGenre(String id) async {
    return songDataProvider.getSongsByGenre(id);
  }

  Future<List<Song>> getSongsByArtistId(String artistId) async {
    return await songDataProvider.getSongsByArtistId(artistId);
  }
}
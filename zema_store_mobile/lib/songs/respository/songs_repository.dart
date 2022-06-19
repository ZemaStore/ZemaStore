
import 'package:tt/songs/data_provider/song_provider.dart';
import 'package:tt/songs/entity/model.dart';

class SongsRepository {
  final SongsProvider provider;
  SongsRepository({required this.provider});

  // get News List
  Future<List<Songs>> getSongs() async {
    return await provider.getSongs();
  }

  Future<SongDownload> getSingleSong(String songID) async{
    return await provider.getSingleSong(songID);
  }

  Future<List<Songs>> getSongsOfArtist(String artistID) async {
    return await provider.getSongsOfArtist(artistID);
  }
}

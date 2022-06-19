

import 'package:tt/albums/data_provider/albums_provider.dart';
import 'package:tt/albums/entity/model.dart';

import '../../songs/entity/model.dart';

class AlbumsRepository {
  final AlbumsProvider provider;
  AlbumsRepository({required this.provider});

  // get News List
  Future<List<Albums>> getAlbums() async {
    return await provider.getAlbums();
  }

  Future<List<Songs>> getSingleAlbum(String albumId) async{
    return await provider.getSingleAlbum(albumId);
  }
}

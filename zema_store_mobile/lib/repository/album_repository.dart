import 'package:zema_store_mobile/data_provider/album_data_provider.dart';

import 'package:zema_store_mobile/models/models.dart';

class AlbumRepository{

  AlbumDataProvider albumDataProvider;

  AlbumRepository({required this.albumDataProvider});


  Future<Album> getAlbum(String id) async{
    return albumDataProvider.getAlbum(id);
  }
  Future<List<Album>> getAlbums() async{
    return albumDataProvider.getAlbums();
  }
  Future<List<Album>> searchAlbum(String title) async{
    return albumDataProvider.searchAlbum(title);
  }

  Future<List<Album>> getAlbumsByArtistId(String artistId) async {
    return albumDataProvider.getAlbumsByArtist(artistId);
  }


}
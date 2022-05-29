import 'package:zema_store_mobile/data_provider/album_data_provider.dart';
import 'package:zema_store_mobile/data_provider/artist_data_provider.dart';

import 'package:zema_store_mobile/models/models.dart';

class ArtistRepository{

  ArtistDataProvider artistDataProvider;

  ArtistRepository({required this.artistDataProvider});


  Future<Artist> getArtist(String id) async{
    return artistDataProvider.getArtist(id);
  }

  Future<List<Artist>> getArtists() async{
    return artistDataProvider.getArtists();
  }
  Future<List<Artist>> searchArtist(String title) async{
    return artistDataProvider.searchArtist(title);
  }

}


import 'package:tt/artists/data_provider/artists_provider.dart';
import 'package:tt/artists/entity/model.dart';

class ArtistsRepository {
  final ArtistsProvider provider;
  ArtistsRepository({required this.provider});

  // get News List
  Future<List<Artist>> getArtists() async {
    return await provider.getArtists();
  }
}

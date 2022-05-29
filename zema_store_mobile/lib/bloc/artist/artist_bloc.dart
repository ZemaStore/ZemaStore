

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:zema_store_mobile/bloc/artist/artist.dart';
import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/repository/artist_repository.dart';

class ArtistBloc extends Bloc<ArtistEvent, ArtistState> {
  final ArtistRepository artistRepository;

  ArtistBloc({required this.artistRepository})
      : assert(artistRepository != null),
        super(ArtistLoading());

  @override
  Stream<ArtistState> mapEventToState(ArtistEvent event) async* {
    if (event is ArtistLoad) {
      yield ArtistLoading();
      try {
        List<Artist> artists = [];
        artists  = await artistRepository.getArtists();
       // print(" ?????????????????????????????? ${artists}???????????????????????????????????????");
        yield ArtistLoadedSucess(artists: artists);
      } catch (_) {
        yield ArtistOperationFailure();
      }
    }

  }
}

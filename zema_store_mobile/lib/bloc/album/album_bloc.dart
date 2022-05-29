


import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:zema_store_mobile/bloc/album/album.dart';
import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/repository/album_repository.dart';

class AlbumBloc extends Bloc<AlbumEvent, AlbumState> {
  final AlbumRepository albumRepository;

  AlbumBloc({required this.albumRepository})
      : assert(AlbumRepository != null),
        super(AlbumLoading());

  @override
  Stream<AlbumState> mapEventToState(AlbumEvent event) async* {
    if (event is AlbumLoad) {
      yield AlbumLoading();
      try {
        List<Album> albums = [];
        albums  = await albumRepository.getAlbums();

        yield AlbumLoadedSucess(albums: albums);
      } catch (_) {
        yield AlbumOperationFailure();
      }
    }

  }
}

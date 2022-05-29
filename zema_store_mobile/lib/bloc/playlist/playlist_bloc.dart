
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:zema_store_mobile/bloc/playlist/playlist_event.dart';
import 'package:zema_store_mobile/bloc/playlist/playlist_state.dart';
import 'package:zema_store_mobile/models/playlist.dart';
import 'package:zema_store_mobile/repository/playlist_repository.dart';

class PlaylistBloc extends Bloc<PlaylistEvent, PlaylistState> {
  final PlaylistRepository playlistRepository;

  PlaylistBloc({required this.playlistRepository})
      : assert(playlistRepository != null),
        super(PlaylistLoading());

  @override
  Stream<PlaylistState> mapEventToState(PlaylistEvent event) async* {
    if (event is PlaylistLoad) {
      yield PlaylistLoading();
      try {
        List<Playlist> playlists = [];
          playlists  = await playlistRepository.getPlaylists();

        yield PlaylistLoadedSucess(playlist: playlists);
      } catch (_) {
        yield PlaylistOperationFailure();
      }
    }
    if (event is PlaylistCreate) {
      yield PlaylistLoading();
      try {
        await playlistRepository.createPlaylist(event.playlist);

        var playlists;

        playlists = await playlistRepository.getPlaylists();

        yield PlaylistLoadedSucess(playlist: playlists);
      } catch (_) {
        yield PlaylistOperationFailure();
      }
    }

    if (event is PlaylistUpdate) {
      yield PlaylistLoading();
      try {
        final job = await playlistRepository.updatePlaylist(event.playlist,event.id);
        var playlists;
        playlists = playlistRepository.getPlaylists();

        yield PlaylistLoadedSucess(playlist: playlists);
      } catch (_) {
        yield PlaylistOperationFailure();
      }
    }

    if (event is PlaylistDelete) {
      yield PlaylistLoading();
      try {
        await playlistRepository.deletePlaylist(event.playlist.title);
        final playlists = await playlistRepository.getPlaylists();
        yield PlaylistLoadedSucess(playlist: playlists);
      } catch (_) {
        print("there is an error on try catch");
        yield PlaylistOperationFailure();
      }
    }
  }
}

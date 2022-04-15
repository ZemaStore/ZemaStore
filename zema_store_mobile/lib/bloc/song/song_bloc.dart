
import 'package:flutter_bloc/flutter_bloc.dart';
import "package:meta/meta.dart";
import 'package:zema_store_mobile/bloc/song/song.dart';
import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/repository/repository.dart';

class SongBloc extends Bloc<SongEvent, SongState> {
  final SongRepository songRepository;

  SongBloc({required this.songRepository})
      : assert(songRepository != null),
        super(SongLoading());

  @override
  Stream<SongState> mapEventToState(SongEvent event) async* {
    if (event is SongLoad) {
      yield SongLoading();
      try {
        List<Song> songs = [];
        if (event.user.role_id == "") {
          songs  = await songRepository.getSongs();
        } else {
          songs = await songRepository.getSongsByArtistId(event.user.profile_id);
        }

        yield SongLoadedSucess(songs: songs);
      } catch (_) {
        yield SongOperationFailure();
      }
    }
    if (event is SongCreate) {
      yield SongLoading();
      try {
        await songRepository.createSong(event.song);

        var songs;
        if (event.user.role_id == "") {
          songs = await songRepository.getSongs();
        } else {
          songs = await songRepository.getSongsByArtistId(event.user.profile_id);
        }

        yield SongLoadedSucess(songs: songs);
      } catch (_) {
        yield SongOperationFailure();
      }
    }

    if (event is SongUpdate) {
      yield SongLoading();
      try {
        final job = await songRepository.updateSong(event.id, event.song);
        var songs;
        if (event.user.role_id == "") {
          songs = songRepository.getSongs();
        } else {
          songs  = await songRepository.getSongsByArtistId(event.user.profile_id);
        }
        yield SongLoadedSucess(songs: songs);
      } catch (_) {
        yield SongOperationFailure();
      }
    }

    if (event is SongDelete) {
      yield SongLoading();
      try {
        await songRepository.deleteSong(event.song.resource_id);
        final songs = await songRepository.getSongs();
        yield SongLoadedSucess(songs: songs);
      } catch (_) {
        print("there is an error on try catch");
        yield SongOperationFailure();
      }
    }
  }
}

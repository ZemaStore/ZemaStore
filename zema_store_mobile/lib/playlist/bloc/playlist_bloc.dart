
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tt/playlist/bloc/bloc.dart';
import 'package:tt/playlist/respository/playlist_repository.dart';

class PlaylistBloc extends Bloc<PlaylistEvent, PlaylistState>{
  final PlaylistRepository playlistRepository;
  PlaylistBloc({required this.playlistRepository}) : super(InitState()) {
    on<LoadPlaylist>((event, emit) async {
      emit(LoadingState());
      try {
        final playlists = await playlistRepository.getPlaylist();
        debugPrint('is it hear ${playlists.toString()}');

        emit(LoadSuccessState(newsList: playlists));
      } catch (e) {
        debugPrint('who');
        emit(LoadFailureState(errorMessage: e.toString()));
      }
    });

    on<LoadPopularPlaylist>((event, emit) async {
      emit(LoadingPopState());
      try {
        final playlists = await playlistRepository.getPopularPlaylist();
        debugPrint('is it hear ${playlists.toString()}');

        emit(LoadPopularSuccessState(newsList: playlists));
      } catch (e) {
        debugPrint('who');
        emit(LoadFailureState(errorMessage: e.toString()));
      }
    });

    on<AddGeneres>((event, emit) async {
      emit(LoadingAddGenereState());
      try {
        final playlists = await playlistRepository.addUserPreference(event.artists, event.geners);
        debugPrint('is it hear ${playlists.toString()}');

        emit(LoadAddGenereSuccessState());
      } catch (e) {
        debugPrint('who');
        emit(LoadFailureState(errorMessage: e.toString()));
      }
    });
  }
}
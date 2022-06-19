
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tt/songs/bloc/bloc.dart';
import 'package:tt/songs/respository/songs_repository.dart';

class SongsBloc extends Bloc<SongsEvent, SongsState>{
  final SongsRepository songsRepository;
  SongsBloc({required this.songsRepository}) : super(InitState()) {
    on<LoadSongs>((event, emit) async {
      emit(LoadingState());
      try {
        final songs = await songsRepository.getSongs();
        debugPrint('is it hear ${songs.toString()}');

        emit(LoadSuccessState(newsList: songs));
      } catch (e) {
        debugPrint('who');
        emit(LoadFailureState(errorMessage: e.toString()));
      }
    });

    on<LoadSongsOfArtist>((event, emit) async {
      emit(LoadingState());
      try {
        final songs = await songsRepository.getSongsOfArtist(event.artistId);
        debugPrint('is it hear ${songs.toString()}');

        emit(LoadSuccessState(newsList: songs));
      } catch (e) {
        debugPrint('who');
        emit(LoadFailureState(errorMessage: e.toString()));
      }
    });


  }
}
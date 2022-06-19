import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tt/songs/bloc/songle_event.dart';
import 'package:tt/songs/bloc/songle_state.dart';

import '../respository/songs_repository.dart';

class SongsSingleBloc extends Bloc<SongsSingleEvent, SongsSingleState>{
  final SongsRepository songsRepository;
  SongsSingleBloc({required this.songsRepository}) : super(InitSingleState()) {


    on<LoadSingleSong>((event, emit) async {
      emit(LoadingSingleState());
      try {
        final songs = await songsRepository.getSingleSong(event.songID);
        debugPrint('is it hear ${songs.toString()}');

        emit(LoadSingleSuccessState(song: songs));
      } catch (e) {
        debugPrint('who');
        emit(LoadSingleFailureState(errorMessage: e.toString()));
      }
    });
  }

}
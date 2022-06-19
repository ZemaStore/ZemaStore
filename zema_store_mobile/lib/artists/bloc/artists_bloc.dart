
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tt/artists/bloc/bloc.dart';
import 'package:tt/artists/respository/artists_repository.dart';

class ArtistsBloc extends Bloc<ArtistEvent, ArtistState>{
  final ArtistsRepository artistsRepository;
  ArtistsBloc({required this.artistsRepository}) : super(InitState()) {
    on<LoadArtist>((event, emit) async {
      emit(LoadingState());
      try {
        final news = await artistsRepository.getArtists();
        debugPrint('is it hear ${news.toString()}');

        emit(LoadSuccessState(newsList: news));
      } catch (e) {
        debugPrint('who');
        emit(LoadFailureState(errorMessage: e.toString()));
      }
    });

    on<AddFollow>((event, emit) async {
      emit(LoadingState());
      try {
        final news = await artistsRepository.addFollow(event.profileId);
        // debugPrint('is it hear ${news.toString()}');

        emit(LoadSuccessState(newsList: []));
      } catch (e) {
        debugPrint('who');
        emit(LoadFailureState(errorMessage: e.toString()));
      }
    });
  }
}
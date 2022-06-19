
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tt/albums/bloc/bloc.dart';
import 'package:tt/albums/respository/albums_repository.dart';

class AlbumsBloc extends Bloc<AlbumEvent, AlbumsState>{
  final AlbumsRepository albumsRepository;
  AlbumsBloc({required this.albumsRepository}) : super(InitState()) {
    on<LoadAlbum>((event, emit) async {
      emit(LoadingState());
      try {
        final albums = await albumsRepository.getAlbums();
        debugPrint('is it hear ${albums.toString()}');

        emit(LoadSuccessState(newsList: albums));
      } catch (e) {
        emit(LoadFailureState(errorMessage: e.toString()));
      }
    });
    on<LoadSingleAlbum>((event, emit) async{
      emit(LoadingState());
      try{
        final singleAlbum = await albumsRepository.getSingleAlbum(event.albumId);
        emit(LoadSingleSuccessState(newsList: singleAlbum));
      } catch (e) {
        emit(LoadFailureState(errorMessage: e.toString()));
      }
    });
  }
}

import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tt/albums/bloc/album_details_event.dart';
import 'package:tt/albums/bloc/album_details_state.dart';
import 'package:tt/albums/respository/albums_repository.dart';

class AlbumsDetailsBloc extends Bloc<AlbumDetailsEvent, AlbumsDetailsState>{
  final AlbumsRepository albumsRepository;
  AlbumsDetailsBloc({required this.albumsRepository}) : super(InitState()) {
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
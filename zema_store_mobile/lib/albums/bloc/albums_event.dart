

import 'package:tt/albums/bloc/bloc.dart';

abstract class AlbumEvent {}

class LoadAlbum extends AlbumEvent {
  // final String categoryName;
  // LoadNews({required this.categoryName});
}

class LoadSingleAlbum extends AlbumEvent{
  final String albumId;
  LoadSingleAlbum({required this.albumId});
}
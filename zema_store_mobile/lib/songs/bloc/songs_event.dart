import 'package:tt/songs/bloc/bloc.dart';

abstract class SongsEvent {}

class LoadSongs extends SongsEvent {
  // final String categoryName;
  // LoadNews({required this.categoryName});
}

class LoadSongsOfArtist extends SongsEvent{
  final String artistId;
  LoadSongsOfArtist({required this.artistId});
}


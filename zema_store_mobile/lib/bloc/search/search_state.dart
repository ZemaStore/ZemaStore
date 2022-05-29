

import 'package:zema_store_mobile/models/models.dart';

abstract class SearchState  {}

class SearchUninitialized extends SearchState {
  @override
  List<Object> get props => [];
}

class SearchLoaded extends SearchState {
  List<Song> songs;
  SearchLoaded({required this.songs});
  @override
  List<Object> get props => [];
}

class SearchError extends SearchState {
  @override
  List<Object> get props => [];
}

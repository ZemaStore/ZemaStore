

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:zema_store_mobile/bloc/search/search.dart';
import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/repository/repository.dart';

class SearchBloc extends Bloc<SearchEvent, SearchState> {
  SongRepository songRepository;
  SearchBloc({required this.songRepository}) : super(null);

  SearchState get initialState => SearchUninitialized();
  @override
  Stream<SearchState> mapEventToState(SearchEvent event) async* {
    if (event is Search) {
      yield SearchUninitialized();

      try {
        print("here it is  ${event.query}");
        List<Song> songs = await songRepository.searchSong(event.query);
        print('?????????????????????????????????? ${songs.toString()}??????????????????????????????????????');
        yield SearchLoaded(songs: songs);
      } catch (e) {
        yield SearchError();
      }
    }
  }
}
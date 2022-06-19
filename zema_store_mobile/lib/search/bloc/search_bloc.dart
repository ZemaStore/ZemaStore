import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tt/search/bloc/search_event.dart';
import 'package:tt/search/bloc/search_state.dart';

import '../data_repository/search_repository.dart';

class SearchBloc extends Bloc<SearchEvent, SearchState> {
  final SearchRepository searchRepository;
  SearchBloc({required this.searchRepository}) : super(InitState()) {
    on<Search>((event, emit) async {
      emit(LoadingState());
      try{
        final response = await searchRepository.search(event.searchTerm);
        print(response);
        emit(LoadSuccessState(newsList: response));
      }catch (e){
        emit(LoadFailureState(errorMessage: e.toString()));
      }
    });
  }
}

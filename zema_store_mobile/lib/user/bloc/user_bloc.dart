
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tt/user/bloc/bloc.dart';

import '../respository/user_repository.dart';


class UsersBloc extends Bloc<UsersEvent, UsersState>{
  final UsersRepository usersRepository;
  UsersBloc({required this.usersRepository}) : super(InitState()) {
    on<LoadUsers>((event, emit) async {
      emit(LoadingState());
      try {
        final news = await usersRepository.getUsers();
        debugPrint('is it hear ${news.toString()}');

        emit(LoadSuccessState(newsList: news));
      } catch (e) {
        debugPrint('who');
        emit(LoadFailureState(errorMessage: e.toString()));
      }
    });
  }
}
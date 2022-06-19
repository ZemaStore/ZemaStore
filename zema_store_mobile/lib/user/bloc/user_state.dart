import 'package:equatable/equatable.dart';

import '../entity/model.dart';

abstract class UsersState extends Equatable{

}

class InitState extends UsersState{
  @override
  List<Object?> get props =>[];
}

class LoadingState extends UsersState{
  @override
  List<Object?> get props => [];
}

class LoadSuccessState extends UsersState{
  final List<User> newsList;
  @override
  List<Object?> get props => [];

  LoadSuccessState({required this.newsList});
}

class LoadFailureState extends UsersState{
  final String errorMessage;
  @override
  List<Object?> get props => [];

  LoadFailureState({required this.errorMessage});
}



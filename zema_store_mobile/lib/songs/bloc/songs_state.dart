import 'package:equatable/equatable.dart';

import '../entity/model.dart';

abstract class SongsState extends Equatable{

}

class InitState extends SongsState{
  @override
  List<Object?> get props =>[];
}

class LoadingState extends SongsState{
  @override
  List<Object?> get props => [];
}


class LoadSuccessState extends SongsState{
  final List<Songs> newsList;
  @override
  List<Object?> get props => [];

  LoadSuccessState({required this.newsList});
}


class LoadFailureState extends SongsState{
  final String errorMessage;
  @override
  List<Object?> get props => [];

  LoadFailureState({required this.errorMessage});
}



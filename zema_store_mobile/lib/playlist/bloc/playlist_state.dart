import 'package:equatable/equatable.dart';
import 'package:tt/playlist/bloc/bloc.dart';

import '../entity/model.dart';

abstract class PlaylistState extends Equatable{

}

class InitState extends PlaylistState{
  @override
  List<Object?> get props =>[];
}

class LoadingState extends PlaylistState{
  @override
  List<Object?> get props => [];
}

class LoadingPopState extends PlaylistState{
  @override
  List<Object?> get props => [];
}


class LoadSuccessState extends PlaylistState{
  final List<Playlist> newsList;
  @override
  List<Object?> get props => [];

  LoadSuccessState({required this.newsList});
}

class LoadPopularSuccessState extends PlaylistState{
  final List<Playlist> newsList;
  @override
  List<Object?> get props => [];

  LoadPopularSuccessState({required this.newsList});
}

class InitAddGenereState extends PlaylistState{
  @override
  List<Object?> get props =>[];
}

class LoadingAddGenereState extends PlaylistState{
  @override
  List<Object?> get props => [];
}


class LoadAddGenereSuccessState extends PlaylistState{
  @override
  List<Object?> get props => [];

}

class LoadFailureState extends PlaylistState{
  final String errorMessage;
  @override
  List<Object?> get props => [];

  LoadFailureState({required this.errorMessage});
}



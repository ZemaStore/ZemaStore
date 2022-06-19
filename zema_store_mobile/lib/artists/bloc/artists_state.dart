import 'package:equatable/equatable.dart';

import '../entity/model.dart';

abstract class ArtistState extends Equatable{

}

class InitState extends ArtistState{
  @override
  List<Object?> get props =>[];
}

class LoadingState extends ArtistState{
  @override
  List<Object?> get props => [];
}

class LoadSuccessState extends ArtistState{
  final List<Artist> newsList;
  @override
  List<Object?> get props => [];

  LoadSuccessState({required this.newsList});
}

class LoadFailureState extends ArtistState{
  final String errorMessage;
  @override
  List<Object?> get props => [];

  LoadFailureState({required this.errorMessage});
}



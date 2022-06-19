import 'package:equatable/equatable.dart';
import 'package:tt/songs/entity/model.dart';


abstract class SearchState extends Equatable{

}

class InitState extends SearchState{
  @override
  List<Object?> get props =>[];
}

class LoadingState extends SearchState{
  @override
  List<Object?> get props => [];
}


class LoadSuccessState extends SearchState{
  final List<Songs> newsList;
  @override
  List<Object?> get props => [];

  LoadSuccessState({required this.newsList});
}


class LoadFailureState extends SearchState{
  final String errorMessage;
  @override
  List<Object?> get props => [];

  LoadFailureState({required this.errorMessage});
}



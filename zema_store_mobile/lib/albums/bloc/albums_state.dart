import 'package:equatable/equatable.dart';
import 'package:tt/albums/entity/model.dart';
import 'package:tt/songs/entity/model.dart';


abstract class AlbumsState extends Equatable{

}

class InitState extends AlbumsState{
  @override
  List<Object?> get props =>[];
}

class LoadingState extends AlbumsState{
  @override
  List<Object?> get props => [];
}

class LoadSuccessState extends AlbumsState{
  final List<Albums> newsList;
  @override
  List<Object?> get props => [];

  LoadSuccessState({required this.newsList});
}

class LoadSingleSuccessState extends AlbumsState{
  final List<Songs> newsList;
  @override
  List<Object?> get props => [];

  LoadSingleSuccessState({required this.newsList});
}

class LoadFailureState extends AlbumsState{
  final String errorMessage;
  @override
  List<Object?> get props => [];

  LoadFailureState({required this.errorMessage});
}





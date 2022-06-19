import 'package:equatable/equatable.dart';
import 'package:tt/albums/entity/model.dart';
import 'package:tt/songs/entity/model.dart';


abstract class AlbumsDetailsState extends Equatable{

}

class InitState extends AlbumsDetailsState{
  @override
  List<Object?> get props =>[];
}

class LoadingState extends AlbumsDetailsState{
  @override
  List<Object?> get props => [];
}


class LoadSingleSuccessState extends AlbumsDetailsState{
  final List<Songs> newsList;
  @override
  List<Object?> get props => [];

  LoadSingleSuccessState({required this.newsList});
}

class LoadFailureState extends AlbumsDetailsState{
  final String errorMessage;
  @override
  List<Object?> get props => [];

  LoadFailureState({required this.errorMessage});
}





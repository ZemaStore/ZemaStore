import 'package:equatable/equatable.dart';
import 'package:tt/songs/data_provider/song_provider.dart';

import '../entity/model.dart';

abstract class SongsSingleState extends Equatable{

}

class InitSingleState extends SongsSingleState{
  @override
  List<Object?> get props =>[];
}



class LoadingSingleState extends SongsSingleState{
  @override
  List<Object?> get props => [];
}


class LoadSingleSuccessState extends SongsSingleState{
  final SongDownload song;
  @override
  List<Object?> get props => [];

  LoadSingleSuccessState({required this.song});
}

class LoadSingleFailureState extends SongsSingleState{
  final String errorMessage;
  @override
  List<Object?> get props => [];

  LoadSingleFailureState({required this.errorMessage});
}



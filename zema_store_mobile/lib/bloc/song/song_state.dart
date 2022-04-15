
import 'package:zema_store_mobile/models/models.dart';

class SongState{
  const SongState();

  List<Object> get props => [];
}
class SongLoading extends SongState{

}
class SongLoadedSucess extends SongState{
  final List<Song> songs ;
  SongLoadedSucess({required this.songs});

  List<Object> get props => [songs];

}
class SongOperationFailure extends SongState{

}


import 'package:zema_store_mobile/models/models.dart';

class AlbumState{
  const AlbumState();

  List<Object> get props => [];
}
class AlbumLoading extends AlbumState{

}
class AlbumLoadedSucess extends AlbumState{
  final List<Album> albums ;
 AlbumLoadedSucess({required this.albums});

  List<Object> get props => [albums];

}
class AlbumOperationFailure extends AlbumState{

}
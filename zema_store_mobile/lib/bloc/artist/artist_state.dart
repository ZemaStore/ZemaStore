

import 'package:zema_store_mobile/models/artist.dart';

class ArtistState{
  const ArtistState();

  List<Object> get props => [];
}
class ArtistLoading extends ArtistState{

}
class ArtistLoadedSucess extends ArtistState{
  final List<Artist> artists ;
  ArtistLoadedSucess({required this.artists});

  List<Object> get props => [artists];

}
class ArtistOperationFailure extends ArtistState{

}
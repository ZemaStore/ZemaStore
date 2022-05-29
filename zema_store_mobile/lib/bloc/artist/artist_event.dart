

import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/models/playlist.dart';

abstract class ArtistEvent  {
  const ArtistEvent();
}

class ArtistLoad extends ArtistEvent{

  const ArtistLoad();

  @override
  List<Object> get props => [];
}





import 'package:zema_store_mobile/models/models.dart';

abstract class SongEvent  {
  const SongEvent();
}

class SongLoad extends SongEvent {
  const SongLoad();

  @override
  List<Object> get props => [];
}



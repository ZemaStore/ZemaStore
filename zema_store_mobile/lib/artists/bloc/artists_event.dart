

import 'package:tt/artists/bloc/bloc.dart';

abstract class ArtistEvent {}

class LoadArtist extends ArtistEvent {
  // final String categoryName;
  // LoadNews({required this.categoryName});
}

class AddFollow extends ArtistEvent{
  final String profileId;
  AddFollow({required this.profileId});
}

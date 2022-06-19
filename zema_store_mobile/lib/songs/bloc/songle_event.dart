abstract class SongsSingleEvent {}


class LoadSingleSong extends SongsSingleEvent{
  final String songID;
  LoadSingleSong({required this.songID});
}
abstract class AlbumDetailsEvent{}

class LoadSingleAlbum extends AlbumDetailsEvent{
  final String albumId;
  LoadSingleAlbum({required this.albumId});
}
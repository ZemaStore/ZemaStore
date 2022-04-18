import 'package:zema_store_mobile/models/models.dart';

class SampleData{


  List<Song> songs = [
    Song(
        resource_id: '',
        url: 'assets/song.png',
        title: 'Asmerino ',
        genre:Genre.values[0] ,
        isSingle: true,
        album_id: 'Yne zema',
        tags: ['a','b'],
        artist_id: 'Dawit',
        views: 10,
        length: Duration(hours: 2, minutes: 3, seconds: 2),
        releasedDate: DateTime.now()
    ),
    Song(
        resource_id: '2',
        url: 'assets/song.png',
        title: 'Aschilosh',
        genre:Genre.values[0] ,
        isSingle: true,
        album_id: 'Yne Zema',
        tags: ['a','b'],
        artist_id: 'Dawit',
        views: 10,
        length:Duration(hours: 2, minutes: 3, seconds: 2),
        releasedDate: DateTime.now()
    )
  ];

  List<Album> albums = [
    Album(
      album_id: 'album_id',
      artist_id: 'Dawit',
      title: 'Yne zema',
      cover_url: 'assets/album.png',
      released_date: DateTime.now(),
    ),

    Album(
      album_id: 'album_id',
      artist_id: 'Teddy Afro',
      title: 'Ethiopia',
      cover_url: 'assets/album.png',
      released_date: DateTime.now(),
    )
  ];
  List<Artist> artists = [
    Artist(
        profile_id: 'dave',
        email: 'dave@gmai.com',
        password: "0912846672",
        role_id: 'artist',
        status: 'status',
        first_name: 'dawit',
        last_name: 'tsigie',
        profile_picture: "assets/artist.png",
        follower_number: 100,
        listen_hour: 100),
    Artist(
        profile_id: 'teddy',
        email: 'teddy@gmai.com',
        password: "0945487887",
        role_id: 'artist',
        status: 'status',
        first_name: 'Tewodros',
        last_name: 'Kassahun',
        profile_picture: "assets/artist.png",
        follower_number: 100,
        listen_hour: 100)
  ];

  User user = User(profile_id: '1', email: 'hy@gmail.com', password: 'password', role_id: 'customer', status:'status');

}

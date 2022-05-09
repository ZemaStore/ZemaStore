
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:zema_store_mobile/bloc/song/song.dart';
import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/models/playlist.dart';
import 'package:zema_store_mobile/presentation/screens/albums/albums.dart';
import 'package:zema_store_mobile/presentation/screens/artists/artists.dart';
import 'package:zema_store_mobile/presentation/screens/genre/genres.dart';
import 'package:zema_store_mobile/presentation/screens/player/bottom_player.dart';
import 'package:zema_store_mobile/presentation/screens/playlist/playlists.dart';
import 'package:zema_store_mobile/presentation/screens/songs/songs_list.dart';
import 'package:zema_store_mobile/presentation/widgets/custom_appbar.dart';

class HomePage extends StatefulWidget{
  final User user;
  HomePage({required this.user});
  _HomePage createState()=> _HomePage();

}
class _HomePage extends State<HomePage> with SingleTickerProviderStateMixin, AutomaticKeepAliveClientMixin{
  static final String routeName = "/";

  late TabController _tabController;
  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 6,vsync: this);

    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
      statusBarColor: Colors.white,
    ));

  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: DefaultTabController(
        length: choices.length,
        initialIndex: 2,
        child: Scaffold(
          backgroundColor: Colors.black54,
          appBar: CustomAppBar('Your music'),
          body: TabBarView(
            children: choices.map((Choice choice) {
              return ChoicePage(choice: choice,);
            }).toList(),
          ),
          resizeToAvoidBottomInset: true,
          // bottomNavigationBar: PlayerPage(),
          // bottomSheet: BottomPlayer()
        ),
      ),
    );
  }

  @override
  // TODO: implement wantKeepAlive
  bool get wantKeepAlive => true;
}

class SingleUserDetailArguments {
  final  Song song;
  final User user;

  SingleUserDetailArguments({required this.song, required this.user});
}
class Choice {
  final String title;
  const Choice({required this.title});
}
const List<Choice> choices = <Choice>[
  Choice(title: 'STORE'),
  //Choice(title: 'PLAYLIST'),
  Choice(title: 'ALBUMS'),
  Choice(title: 'SONGS'),

  Choice(title: 'ARTISTS'),
  Choice(title: 'GENRES'),
  //Choice(title: 'FAVORITES'),
];

class ChoicePage extends StatelessWidget{
  const ChoicePage({Key? key, required this.choice}) : super(key: key);
  final Choice choice;


  @override
  Widget build(BuildContext context) {
    /*final List<Song> songs = [] ;
    final List<Playlist> playlists = [];
    Song song1 = Song(resource_id: 'resource_id', url: 'assets/no_cover.png', title: 'love you ', genre:Genre.values[0] ,isSingle: true, album_id: '', tags: ['a','b'], artist_id: 'aster', views: 10, length:Duration(hours: 2, minutes: 3, seconds: 2), releasedDate: DateTime.utc(1989, 11, 9));
    Song song2 = Song(resource_id: 'resource_id', url: 'assets/no_cover.png', title: 'love you ', genre:Genre.values[0] ,isSingle: true, album_id: '', tags: ['a','b'], artist_id: 'aster', views: 10, length:Duration(hours: 2, minutes: 3, seconds: 2), releasedDate: DateTime.utc(1989, 11, 9));
    songs.add(song1);
    songs.add(song2);
    Playlist playlist = Playlist(user_id: 'user_id', title: 'MyPLaylist', songs: songs);
    Playlist playlist2 = Playlist(user_id: 'user_id', title: 'MyPLaylist2', songs: songs);
    playlists.add(playlist);playlists.add(playlist2);*/
    final TextStyle? textStyle = Theme.of(context).textTheme.headline4;
    switch(choice.title){
      case "ALBUMS":
        return Albums();
      case "SONGS":
        return Column(
          children: [
            Expanded(flex: 9,child: Songs()),
            Expanded(flex: 1,child: BottomPlayerPage()),
          ],
        );
      /*case "PLAYLIST":
        return PlayLists(playlists: playlists);*/
      case "ARTISTS":
        return Artists();
      case "GENRES":
        return Genres();
  /*    case "FAVORITES":
        return SongsListPage();*/
    }
    return Card(
      color: Colors.white,
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(choice.title, style: textStyle,)
          ],
        ),
      ),
    );
  }
}


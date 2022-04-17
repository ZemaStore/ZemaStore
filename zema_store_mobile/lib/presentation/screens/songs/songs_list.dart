
import 'dart:typed_data';

import 'package:audio_service/audio_service.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:zema_store_mobile/data_provider/sample_data.dart';
import 'package:zema_store_mobile/data_provider/sample_data.dart';
import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/presentation/screens/player/bottom_player.dart';
import 'package:zema_store_mobile/presentation/screens/player/player_page.dart';
import 'package:zema_store_mobile/presentation/widgets/list_item.dart';

import '../../../setup.dart';

class SongsListPage extends StatefulWidget{
  _SongsListPage createState()=> _SongsListPage();
}
class _SongsListPage extends State<SongsListPage>{
  Song song1 = Song(resource_id: 'resource_id', url: 'assets/no_cover.png', title: 'love you ', genre:Genre.values[0] ,isSingle: true, album_id: '', tags: ['a','b'], artist_id: 'aster', views: 10, length:Duration(hours: 2, minutes: 3, seconds: 2), releasedDate: DateTime.utc(1989, 11, 9));
  Song song2 = Song(resource_id: 'resource_id', url: 'assets/no_cover.png', title: 'love you ', genre:Genre.values[0] ,isSingle: true, album_id: '', tags: ['a','b'], artist_id: 'aster', views: 10, length:Duration(hours: 2, minutes: 3, seconds: 2), releasedDate: DateTime.utc(1989, 11, 9));

  List<Song>songs  = [ Song(resource_id: 'resource_id', url: 'assets/no_cover.png', title: 'love you ', genre:Genre.values[0] ,isSingle: true, album_id: '', tags: ['a','b'], artist_id: 'aster', views: 10, length:Duration(hours: 2, minutes: 3, seconds: 2), releasedDate: DateTime.utc(1989, 11, 9)), Song(resource_id: 'resource_id', url: 'assets/no_cover.png', title: 'love you ', genre:Genre.values[0] ,isSingle: true, album_id: '', tags: ['a','b'], artist_id: 'aster', views: 10, length:Duration(hours: 2, minutes: 3, seconds: 2), releasedDate: DateTime.utc(1989, 11, 9))
  ];


  @override
  Widget build(BuildContext context) {
    print('size of songs : $songs');
    return ListView.builder(
        shrinkWrap: true,
      itemCount: songs.length,
      itemBuilder: (context,songIndex){
          Song song = songs[songIndex];
          return ListItemWidget(
              title: Text(song.title),
              subtitle:  Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: <Widget>[
                  Text("Artist: ${song.artist_id}"),
                  Text(
                    "Duration: ${song.releasedDate}",
                    style: TextStyle(
                        fontSize: 14.0, fontWeight: FontWeight.w500),
                  ),
                ],
              ),
              leading: Center(
                child: CircleAvatar(
                          backgroundImage:
                          AssetImage("assets/no_cover.png"),

              )),
              imagePath:"assets/no_cover.png",
              trailing: IconButton(
                onPressed: (){},
                icon: Icon(Icons.playlist_add),
                tooltip: 'Add to Playlist',
              ) ,
              onTap: (){

              },
              selected: true)
          ;
      },
    );
  }
}


class Songs extends StatefulWidget {
  const Songs({Key? key}) : super(key: key);

  @override
  _SongsState createState() => _SongsState();
}

class _SongsState extends State<Songs> {
  bool isLoading = true;
 List<MediaItem> songs = [];

  late String e;

  @override
  void initState() {
    print("####################################");
    print(SampleData().songs.length);
    getTracks();
    super.initState();

  }

  void getTracks() async{

    for(int i = 0; i<SampleData().songs.length;i++){
      var song = MediaItem(
          id: SampleData().songs[i].resource_id,
          album:SampleData().songs[i].album_id ,
          title: SampleData().songs[i].title,
         genre:  SampleData().songs[i].genre.toString(),
        displayTitle: SampleData().songs[i].title,
       artist:  SampleData().songs[i].artist_id,
       artUri: SampleData().songs[i].url,
       displayDescription: SampleData().songs[i].title,
       displaySubtitle: SampleData().songs[i].title,
       duration: SampleData().songs[i].length.inMinutes,
        playable: SampleData().songs[i].isSingle,
        rating: null,

      );
      songs.add(song);
    }
    setState(() {
      isLoading = true;
    });
    try{

      if(SampleData().songs.length == 0){
        setState(() {
          e = 'No songs found';
          isLoading = false;
        });
      }
      else{
        setState(() {
          e = '';
          isLoading = false;
        });
      }
    }catch(err, st){
      setState(() {
        e = err.toString();
        isLoading = false;
      });
    }
  }
  void addToFav(Song songInfo, BuildContext context) async{
    String msg = 'Added to favorite list';
    /*favoriteSongList.setState((s) => s.addToFavoriteList(songInfo));
    bool isExist = await favoriteService.addToFavorite(songInfo);
    if(!isExist){
      msg = "Already exist in favorite list";
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg), backgroundColor: Colors.red,));
    }
    else{
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg), backgroundColor: Colors.green,));
    }*/
  }

  void createPlaylist(Song song, context){
  }
  void showMsg(bool status, String msg){
    if(status){
      Scaffold.of(context).showSnackBar(SnackBar(content: Text(msg),duration: Duration(seconds: 2),backgroundColor: Colors.green,));
    }
    else{
      Scaffold.of(context).showSnackBar(SnackBar(content: Text(msg),duration: Duration(seconds: 2),backgroundColor: Colors.red,));
    }
  }

  void choosePlaylist(Song song, context) async{
  }

  @override
  Widget build(BuildContext context) {
    if(isLoading){
      return Container(
        child: Center(
            child: Image.asset('assets/images/loading.gif')
        ),
      );
    }
    if (songs.length == 0 && !isLoading && e!=''){
      return Container(
          child: Center(
              child: Text(e,
                style: TextStyle(
                    color: Colors.grey
                ),
              )
          )
      );
    }
    if(songs.length !=0 && !isLoading){
      return ListView.separated(
            itemBuilder: (context, index)=>Container(
              decoration: (index==0)?
              BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment(0.8, 0.0), // 10% of the width, so there are ten blinds.
                  colors: <Color>[
                    Color(0xffbf9292),
                    Color(0xffbf7777),
                    Color(0xff563b6c),
                    Color(0xff8047ad),
                  ], // red to yellow
                  tileMode: TileMode.clamp, // repeats the gradient over the canvas
                ),
              ):
              BoxDecoration(),
              child: ListTile(
                // selected: (index==currentSong.state.currentIndex)?true:false,
                // selectedTileColor: currentSong.state.isSelected?Colors.amber:Colors.transparent,
                trailing: PopupMenuButton(
                  // key: _menuKey,
                  onSelected: (value){
                    switch(value){
                      case 'fav':
                        //addToFav(songs[index], context);
                        break;
                      case 'crtnew':
                        //createPlaylist(songs[index], context);
                        break;
                      case 'choose':
                        //choosePlaylist(songs[index], context);
                        break;
                    }
                  },
                  itemBuilder: (BuildContext context) {
                    return <PopupMenuEntry>[
                      PopupMenuItem(child: Text('Recently Played'), value: 'rctlypld',),
                      PopupMenuItem(child: Text('Last Added'), value: 'lstadded',),
                      PopupMenuItem(child: Text('Choose playlist'), value: 'choose',),
                      PopupMenuItem(child: Text('Create New Playlist'), value: 'crtnew',),
                      PopupMenuItem(child: Text('Add To Favorite'), value: 'fav',),
                    ];
                  },
                  child: Icon(
                    Icons.add_box_rounded,
                    size: 30.0,
                    color: Colors.white,
                  ),
                ),
                leading: CircleAvatar(
                  backgroundImage:
                  AssetImage('assets/song.png'),
                  //AssetImage(songs[index].artUri) ,
                ),
                title: Text(
                  songs[index].title,
                  style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold
                  ),
                ),
                subtitle: Text(
                  '${songs[index].artist}  ${songs[index].album}',
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
                onTap: () async {
                  print("############################# here hrereee#");
                  print(index);
                  audioManagerInstance2
                      .start("assets/music ://${songs[index].id}", songs[index].title,
                      desc: songs[index].displayTitle!,
                      auto: true,

                      cover: (songs[index].artUri != null)? songs[index].artUri.toString(): 'assets/song.png'
                  );
                  audioManagerInstance2.play(index: index,auto: true);
                Navigator.push(context, new MaterialPageRoute(builder: (context)=> PlayerPage()));
                },
              ),
            ),

            separatorBuilder: (context, index)=>Divider(color: Colors.grey,thickness: 0.2,),
            itemCount: songs.length,);
    }
    return Container();

  }
}

import 'package:flutter/material.dart';
import 'package:zema_store_mobile/models/playlist.dart';


class PlayLists extends StatefulWidget {
  List<Playlist> playlists = [];
  PlayLists({required this.playlists});

  @override
  _PlayListsState createState() => _PlayListsState();
}

class _PlayListsState extends State<PlayLists> {


  bool isLoading = true;
  late String e;

  @override
  void initState(){
    getPlayLists();
    super.initState();
  }

  void getPlayLists() async{
    setState(() {
      isLoading = true;
    });
    try{
      if(widget.playlists.length == 0){
        setState(() {
          e = 'No playlist found';
          isLoading = false;
        });
      }
      else{
        setState(() {
          e = '';
          isLoading = false;
        });
      }
    }catch(err){
      setState(() {
        e = err.toString();
        isLoading = false;
      });
    }
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
    if (widget.playlists.length == 0 && !isLoading && e!=''){
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
    if (widget.playlists.length != 0 && !isLoading){
      return Container(
        child: GridView.builder(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2),
          itemBuilder: (_, index) => playListWidget(index),
          itemCount: widget.playlists.length,

        ),
      );
    }
    return Container();
  }

  Widget playListWidget(int index){
    return GestureDetector(
      onTap: (){
      },
      child: Card(
        color: Colors.transparent,
        elevation: 0.0,
        child: Container(
          padding: EdgeInsets.only(top: 10, left: 7.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircleAvatar(
                  backgroundImage:AssetImage('assets/images/art.jpg')
              ),
              SizedBox(height: 4,),
              Expanded(
                child: Text(
                  widget.playlists[index].title,
                  style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold
                  ),
                  overflow: TextOverflow.fade,
                ),
              ),
              SizedBox(height: 2,),
              Expanded(
                child: Text(
                  widget.playlists[index].songs.length.toString(),
                  style: TextStyle(
                    color: Colors.grey,
                  ),
                  overflow: TextOverflow.clip,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
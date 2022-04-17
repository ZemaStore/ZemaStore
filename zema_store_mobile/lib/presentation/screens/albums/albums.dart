import 'dart:html';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:zema_store_mobile/data_provider/sample_data.dart';
import 'package:zema_store_mobile/models/album.dart';
import 'package:zema_store_mobile/presentation/screens/common/login.dart';

class Albums extends StatefulWidget{

  _AlbumsState createState() => _AlbumsState();
}
class _AlbumsState extends State<Albums>{
  //List<Album> albums = [];
  bool isLoading = true;
  late String e;

  @override
  void initState() {
    getAlbums();
    super.initState();
  }
  void getAlbums() async{
    setState(() {
      isLoading = true;
    });

    try{
      if(SampleData().albums.length == 0){
        setState(() {
          e = 'No albums found';
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

  @override
  Widget build(BuildContext context) {
    if (isLoading){
      return Container(
        child: Center(
            child: Image.asset('assets/images/loading.gif')
        ),
      );
    }
    if (SampleData().albums.length == 0 && !isLoading && e!=''){
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
    if (SampleData().albums.length != 0 && !isLoading){
      return Container(
        child: GridView.builder(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3),
          itemBuilder: (_, index) => albumWidget(index),
          itemCount: SampleData().albums.length,

        ),
      );
    }
    return Container();
  }
  Widget albumWidget(int index){
    return GestureDetector(
      onTap: (){

      },
      child: Card(
        color: Colors.transparent,
        elevation: 0.0,
        child: Container(
          padding: EdgeInsets.only(top: 4, left: 3.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircleAvatar(
                backgroundImage: SampleData().albums[index].cover_url==null?
                AssetImage('assets/album.png'):
                AssetImage(SampleData().albums[index].cover_url),
              ),
              SizedBox(height: 2,),
              Expanded(
                child: Text(
                  SampleData().albums[index].title,
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
                  SampleData().albums[index].artist_id,
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
import 'package:audio_service/audio_service.dart';
import 'package:flutter/material.dart';
import 'package:zema_store_mobile/data_provider/sample_data.dart';
import 'package:zema_store_mobile/models/artist.dart';



class Artists extends StatefulWidget {
  const Artists({ Key? key }) : super(key: key);

  @override
  _ArtistsState createState() => _ArtistsState();
}

class _ArtistsState extends State<Artists> {
 // List<Artist> artists = [];
  bool isLoading = false;
  late String e;

  @override
  void initState(){
    getArtists();
    super.initState();
  }
  void getArtists() async{

    setState(() {
      isLoading = true;
    });
    try{
      if(SampleData().artists.length == 0){
        setState(() {
          e = 'No artists found';
          isLoading = false;
        });
      }
      else{
        setState(() {
          e = '';
          isLoading = false;
        });
      }
    }catch(err,st){
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
    if (SampleData().artists.length == 0 && !isLoading && e!=''){
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
    if (SampleData().artists.length != 0 && !isLoading){
      return ListView.separated(
        itemBuilder: (context, index)=>ListTile(
          leading: CircleAvatar(
              backgroundImage:AssetImage('assets/artist.png')
          ),
          title: Text(
            '${SampleData().artists[index].fullName}  ',
            style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold
            ),
          ),
          subtitle: Text(
            '${SampleData().artists[index].followerNumber} followers',
            style: TextStyle(
              color: Colors.white,
            ),
          ),
          onTap: (){

          },
        ),
        separatorBuilder: (context, index)=>Divider(color: Colors.grey,thickness: 0.2,),
        itemCount: SampleData().artists.length,);
    }

    return Container();
  }



}
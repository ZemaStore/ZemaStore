import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:zema_store_mobile/presentation/screens/player/player_page.dart';

import '../../../setup.dart';



class BottomPlayerPage extends StatefulWidget{
  _PlayerState createState()=> _PlayerState();
}
class _PlayerState extends State<BottomPlayerPage>{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black54,
      body:Builder(
        builder: (context){
          if(audioManagerInstance2.info == null){
            return Container(
              child: Center(
                child: Text("Select a song to play", style: TextStyle(color: Colors.white),),
              ),
            );
          }
          else{
            return Container(
               height: MediaQuery.of(context).size.height*0.05,
                padding: EdgeInsets.only(left: 5.0),
                color: Colors.black,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        GestureDetector(
                          onTap: (){
                            Navigator.push(context, new MaterialPageRoute(builder:(context)=> PlayerPage()));
                          },
                          child: CircleAvatar(
                              backgroundImage: AssetImage("assets/song.png")
                          ),
                        ),
                      ],
                    ),
                    SizedBox(width: 3.0,),
                    GestureDetector(
                      onTap: (){
                      },
                      child: Container(
                        padding: EdgeInsets.only(top: 5.0),
                        width: MediaQuery.of(context).size.width*0.45,
                        child: Text(
                          audioManagerInstance2.info!.title,
                          overflow: TextOverflow.clip,
                          maxLines: 1,
                          style: TextStyle(
                              color: Colors.white
                          ),
                        ),
                      ),
                    ),
                    Container(
                      width: MediaQuery.of(context).size.width*0.40,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: <Widget>[
                          IconButton(
                              icon: Icon(
                                Icons.skip_previous,
                                size: 25,
                                color: Colors.white,
                              ),
                              onPressed: () => audioManagerInstance2.previous()),
                          IconButton(
                            onPressed: () async {
                              audioManagerInstance2.playOrPause();
                            },
                            padding: const EdgeInsets.all(0.0),
                            icon: Icon(
                              audioManagerInstance2.isPlaying ? Icons.pause : Icons.play_arrow,
                              color: Colors.white,
                              size: 35,
                            ),
                          ),
                          IconButton(
                              icon: Icon(
                                Icons.skip_next,
                                size: 25,
                                color: Colors.white,
                              ),
                              onPressed: () => audioManagerInstance2.next()),
                        ],
                      ),
                    ),
                  ],
                )
            );
          }
        },
      ),
    );


  }
  String _formatDuration(Duration d) {
    if (d == null) return "--:--";
    int minute = d.inMinutes;
    int second = (d.inSeconds > 60) ? (d.inSeconds % 60) : d.inSeconds;
    String format = ((minute < 10) ? "0$minute" : "$minute") +
        ":" +
        ((second < 10) ? "0$second" : "$second");
    return format;
  }
  Widget songProgress(BuildContext context) {

    var style = TextStyle(color: Colors.black);
    return Row(
      children: <Widget>[
        Text(
          _formatDuration(audioManagerInstance2.position),
          style: style,
        ),
        Expanded(
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 5),
            child: SliderTheme(
                data: SliderTheme.of(context).copyWith(
                  trackHeight: 2,
                  thumbColor: Colors.blueAccent,
                  overlayColor: Colors.blue,
                  thumbShape: RoundSliderThumbShape(
                    disabledThumbRadius: 5,
                    enabledThumbRadius: 5,
                  ),
                  overlayShape: RoundSliderOverlayShape(
                    overlayRadius: 10,
                  ),
                  activeTrackColor: Colors.blueAccent,
                  inactiveTrackColor: Colors.grey,
                ),
                child:
                Slider(
                  value: slider ?? 0,
                  onChanged: (value) {
                    setState(() {
                      slider = value;
                    });
                  },
                  onChangeEnd: (value) {
                    if (audioManagerInstance2.duration != null) {
                      Duration msec = Duration(
                          milliseconds:
                          (audioManagerInstance2.duration.inMilliseconds *
                              value)
                              .round());
                      audioManagerInstance2.seekTo(msec);
                    }
                  },
                )),
          ),
        ),
        Text(
          _formatDuration(audioManagerInstance2.duration),
          style: style,
        ),
      ],
    );
  }


}
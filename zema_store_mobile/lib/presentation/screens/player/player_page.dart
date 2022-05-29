import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../setup.dart';

class PlayerPage extends StatefulWidget{
  _PlayerState createState()=> _PlayerState();
}
class _PlayerState extends State<PlayerPage>{

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      body:Container(
        child: Column(children: <Widget>[
          Column(
            children: [
              Container(
                height: MediaQuery.of(context).size.height * 0.80,
                width: MediaQuery.of(context).size.width,
                child: Card(
                  color: Colors.transparent,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.center,

                    children: [
                      Container(
                        width: 130,
                        height: 130,
                        padding: EdgeInsets.all(4),
                        child: Image.asset('assets/images/art.jpg'),
                      ),
                      SizedBox(
                        height: 16,
                      ),
                    ],
                  ),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),

          /*  child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 130,
                  height: 130,
                  padding: EdgeInsets.all(4),
                  child: Image.asset(artist.photoUrl),
                ),
                SizedBox(
                  height: 16,
                ),
                Text(
                  artist.fullName,
                  style: TextStyle(fontSize: 18),
                )
              ],
            ));*/
                ),
              ),
              SizedBox(height: 20,),
            ],
          ),
          Padding(
            padding: EdgeInsets.symmetric(vertical: 5,horizontal: 16),
            child: songProgress(context),
          ),
          Container(
            padding: EdgeInsets.symmetric(vertical: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                CircleAvatar(
                  child: Center(
                    child: IconButton(
                        icon: Icon(
                          Icons.skip_previous,
                          color: Colors.white,
                        ),
                        onPressed: () => audioManagerInstance2.previous()),
                  ),
                  backgroundColor: Colors.cyan.withOpacity(0.3),
                ),
                CircleAvatar(
                  radius: 30,
                  child: Center(
                    child: IconButton(
                      onPressed: () async {
                        audioManagerInstance2.playOrPause();
                      },
                      padding: const EdgeInsets.all(0.0),
                      icon: Icon(
                        audioManagerInstance2.isPlaying ? Icons.pause : Icons.play_arrow,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
                CircleAvatar(
                  backgroundColor: Colors.cyan.withOpacity(0.3),
                  child: Center(
                    child: IconButton(
                        icon: Icon(
                          Icons.skip_next,
                          color: Colors.white,
                        ),
                        onPressed: () => audioManagerInstance2.next()),
                  ),
                ),
              ],
            ),
          ),
        ]),
      ) ,
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
                child: Slider(
                  value: slider ?? 0,
                  onChanged: (value) {
                    setState(() {
                      slider = value;
                    });
                  },
                  onChangeEnd: (value) {
                    if (audioManagerInstance2.duration != null) {
                      Duration msec = Duration(milliseconds: (
                          audioManagerInstance2.duration.inMilliseconds * value).round());
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

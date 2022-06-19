import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:just_audio/just_audio.dart';
import 'package:just_waveform/just_waveform.dart';
import 'package:tt/main.dart';
import 'package:tt/screens/commons/player_buttons.dart';
import 'dart:math' show pi;

import 'package:tt/songs/entity/model.dart';


class Player extends StatefulWidget {
  const Player({Key? key, required this.audioSources, required this.urls, required this.album, required this.songs}) : super(key: key);
  final String audioSources;
  final bool urls ;
  final bool album;
  final List<Songs> songs;

  @override
  _PlayerState createState() => _PlayerState();
}

class _PlayerState extends State<Player> {
  late AudioPlayer _audioPlayer;

  @override
  void initState() {
    super.initState();
    _audioPlayer = AudioPlayer();

    if (widget.urls){
      if(widget.album){
        _audioPlayer
            .setAudioSource(ConcatenatingAudioSource(children:

              widget.songs.map((e) => AudioSource.uri(Uri.parse(e.songUri))).toList()))

            .catchError((error) {
          print("An error occured $error");
        });
      }else{
      _audioPlayer
          .setAudioSource(AudioSource.uri(Uri.parse(widget.audioSources))).catchError((error) {
        // catch load errors: 404, invalid url ...
        print("An error occured $error");
      });}
    }else{
      print('player ${widget.audioSources}');
      _audioPlayer.setFilePath(widget.audioSources);

    }
    // _audioPlayer
    //     .setAudioSource(ConcatenatingAudioSource(children:
    //
    //       // ...widget.audioSources.map((e) => AudioSource.),))
    //   //     AudioSource.uri(Uri.parse(
    //   //     'https://res.cloudinary.com/zema-store/raw/upload/v1651438812/AudioUploads/2022-05-01T21-00-02.644ZEfeligihalew%20-%20Dawit%20Getachew%20.mp3')),
    //   // AudioSource.uri(Uri.parse(
    //   //     'https://res.cloudinary.com/zema-store/raw/upload/v1650218435/AudioUploads/2022-04-17T18-00-28.658ZEfeligihalew%20-%20Dawit%20Getachew%20.mp3')),
    //   // AudioSource.uri(Uri.parse(
    //   //     'https://res.cloudinary.com/zema-store/raw/upload/v1650268501/AudioUploads/2022-04-18T07-54-50.878ZEfeligihalew%20-%20Dawit%20Getachew%20.mp3'))
    //
    //     .catchError((error) {
    //   // catch load errors: 404, invalid url ...
    //   print("An error occured $error");
    // });
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final song = widget.songs[0];


    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor:  Colors.white,
        title: Text('Zema Player', style: GoogleFonts.poppins(color: Colors.black, fontSize: 25),),
        centerTitle: true,
        leading:  IconButton(icon:const Icon(Icons.arrow_back_ios_outlined, color: Colors.black, size: 30,), onPressed: (){
          Navigator.pop(context);
        },),
      ),
      // backgroundColor: const Color(0XFF091227),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
             Image.asset(
                  'assets/music-note.png',
                  width: MediaQuery.of(context).size.width * 0.6,
                ),

            Column(
              children:  [
                Text(song.title, style: GoogleFonts.poppins(fontSize: 25),),
                // Text(widget.songs.artistId, style: const TextStyle(color: Colors.white60, fontSize: 22),)
              ],
            ),
            // Image.asset('assets/dave.jpeg'),
            Container(
                // color: Colors.white,
                height: MediaQuery.of(context).size.height * 0.2,
                width: MediaQuery.of(context).size.width,
                child: Center(child: PlayerButtons(_audioPlayer))),
          ],
        ),
      ),
    );
  }
}


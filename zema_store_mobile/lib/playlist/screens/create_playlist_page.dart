import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:form_field_validator/form_field_validator.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tt/playlist/bloc/bloc.dart' as playlist;
import 'package:tt/songs/bloc/bloc.dart' as song;

import '../../player.dart';
import '../../songs/entity/model.dart';

class CreatePlaylist extends StatefulWidget {
  const CreatePlaylist({Key? key}) : super(key: key);

  @override
  State<CreatePlaylist> createState() => _CreatePlaylistState();
}

class _CreatePlaylistState extends State<CreatePlaylist> {
  GlobalKey<FormState> formkey = GlobalKey<FormState>();
  String playlistName = '';
  List<String> playlistSongs = [];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_ios_outlined,
            color: Colors.black,
          ),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text(
          'Create playlist',
          style: GoogleFonts.poppins(color: Colors.black, fontSize: 25),
        ),
        centerTitle: true,
        elevation: 0,
        backgroundColor: Colors.white,
      ),
      body: BlocBuilder<song.SongsBloc, song.SongsState>(builder: (context, state) {
        if (state is song.LoadSuccessState) {
          return SingleChildScrollView(
            child: Column(children: [
              Text(
                'Total Songs selected ${playlistSongs.length}',
                style: GoogleFonts.poppins(fontSize: 20),
              ),
              Form(
                autovalidateMode: AutovalidateMode
                    .onUserInteraction, 
                key: formkey,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 15),
                  child: TextFormField(
                      onChanged: (value){
                        // phone = value;
                        playlistName = value;
                      },
                      decoration: const InputDecoration(
                          border: const OutlineInputBorder(),
                          labelText: 'Playlist Name',
                          hintText: ''),
                      validator: MultiValidator([
                        RequiredValidator(errorText: "* Required"),
                        PatternValidator(r'^[A-Za-z0-9_]+$', errorText: 'User only A-Z, a-z, 0-9, the _ character'),
                        MinLengthValidator(4, errorText: 'Length should be at least 4')
                        // EmailValidator(errorText: "Enter valid email id"),
                      ])),
                ),
              ),
              const SizedBox(height: 20,),
              ...state.newsList
                  .map((e) => GestureDetector(
                      onTap: () {
                        setState(() {
                          if (playlistSongs.contains(e.id)) {
                            playlistSongs.remove(e.id);
                          } else {
                            playlistSongs.add(e.id);
                          }
                        });
                      },
                      child: buildSongView(
                          e,
                          playlistSongs.contains(e.id)
                              ? Colors.tealAccent
                              : const Color(0xffFFFFF0))))
                  .toList(),
            ]),
          );
        } else if (state is song.LoadingState) {
          return const Center(
            child: CircularProgressIndicator(
              color: Colors.black,
            ),
          );
        } else {
          BlocProvider.of<song.SongsBloc>(context).add(song.LoadSongs());
        }
        return SingleChildScrollView(
          child: Column(),
        );
      }),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
           if(playlistName.isEmpty){
            final snackBar = SnackBar(
              content: const Text('Playlist Name is required!'),
              action: SnackBarAction(
                label: 'Close',
                onPressed: () {
                  // Some code to undo the change.
                },
              ),
            );
            ScaffoldMessenger.of(context).showSnackBar(snackBar);
          }else if(playlistSongs.isEmpty){
             final snackBar = SnackBar(
               content: const Text('No Songs Selected'),
               action: SnackBarAction(
                 label: 'Close',
                 onPressed: () {
                   // Some code to undo the change.
                 },
               ),
             );
             ScaffoldMessenger.of(context).showSnackBar(snackBar);
           }else{
             BlocProvider.of<playlist.PlaylistBloc>(context).add(playlist.CreatePlayList(songIds: playlistSongs, playlistName: playlistName));
           }
        },
        backgroundColor: Colors.black,
        child: Icon(Icons.save),
      ),
    );
  }

  Widget buildSongView(Songs song, Color bgColor) {
    return Padding(
        padding: const EdgeInsets.only(bottom: 15.0, left: 10, right: 10),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            color: bgColor,
          ),
          height: 67,
          child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    children: [
                      const Icon(
                        Icons.music_note_sharp,
                        size: 40,
                        color: Colors.black,
                      ),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            song.title,
                            style: GoogleFonts.poppins(
                              fontSize: 19,
                            ),
                          ),
                          Text(
                            '${DateTime.parse(song.releaseDate).day.toString()} - ${DateTime.parse(song.releaseDate).month.toString()} - ${DateTime.parse(song.releaseDate).year.toString()}',
                            style: GoogleFonts.poppins(fontSize: 15),
                          )
                        ],
                      ),
                    ],
                  ),
                ),
              ]),
        ));
  }
}

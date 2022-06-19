import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:path_provider/path_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tt/search/bloc/search_bloc.dart';
import 'package:tt/search/bloc/search_event.dart';
import 'package:tt/search/bloc/search_state.dart';
import 'package:encrypt/encrypt.dart' as encrypt;
import 'package:http/http.dart' as http;
import '../../auth/data_provider/secure_storage.dart';
import '../../main.dart';
import '../../player.dart';
import '../../songs/entity/model.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({Key? key}) : super(key: key);

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  bool downloaded = false;
  bool downloading = false;
  String path = '';
  String clickedSong = '';
  Icon customIcon = const Icon(Icons.search, color: Colors.black);
  Widget customSearchBar = const Text(
    'Search Page',
    style: TextStyle(color: Colors.black),
  );
  String searchTerm = "";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          leading: IconButton(icon: Icon(Icons.arrow_back_ios_outlined, color: Colors.black,),onPressed: (){
            Navigator.pop(context);
          },),
          backgroundColor: Colors.white,
          elevation: 0,
          automaticallyImplyLeading: false,
          title: customSearchBar,
          centerTitle: true,
          actions: [
            IconButton(
              onPressed: () {
                setState(() {
                  if (customIcon.icon == Icons.search) {
                    customIcon = const Icon(
                      Icons.cancel,
                      color: Colors.black,
                    );
                    customSearchBar = ListTile(
                      leading: const Icon(
                        Icons.search,
                        color: Colors.black,
                        size: 28,
                      ),
                      title: TextField(
                        decoration: const InputDecoration(
                          hintText: 'type song name, genera...',
                          hintStyle: TextStyle(
                            fontSize: 18,
                            fontStyle: FontStyle.italic,
                          ),
                          border: InputBorder.none,
                        ),
                        onChanged: (value) {
                          setState(() {
                            searchTerm = value;
                          });
                        },
                        onSubmitted: (value) {
                          BlocProvider.of<SearchBloc>(context)
                              .add(Search(searchTerm: searchTerm));
                        },
                        style: const TextStyle(color: Colors.black),
                      ),
                    );
                  } else {
                    customIcon = const Icon(Icons.search, color: Colors.black);
                    customSearchBar = const Text(
                      'Search Page',
                      style: TextStyle(color: Colors.black),
                    );
                  }
                });
              },
              icon: customIcon,
            )
          ]),
      body: BlocBuilder<SearchBloc, SearchState>(
        builder: (context, state) {
          print(state);
          if (state is LoadSuccessState){
            return Column(
              children: state.newsList.map((e) => buildSongView(e)).toList(),
            );
          }else if(state is LoadingState){
            return const Center(
              child: CircularProgressIndicator(color: Colors.black,),
            );
          }
          return Center(
            child: Text(searchTerm.isNotEmpty ? searchTerm : 'search page'),
          );
        }
      ),
    );
  }

  Widget buildSongView(Songs song) {
    return Padding(
        padding: const EdgeInsets.only(bottom: 15.0, left: 10, right: 10),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            color: const Color(0xffFFFFF0),
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
                Row(
                  children: [
                    IconButton(
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (_) => Player(
                                  audioSources: song.songUri,
                                  urls: true,
                                  album: false,
                                  songs: [song],
                                )));
                      },
                      icon: const Icon(
                        Icons.play_circle_fill,
                        size: 40,
                      ),
                    ),
                    const SizedBox(
                      width: 10,
                    ),

                  ],
                ),
              ]),
        ));
  }
}



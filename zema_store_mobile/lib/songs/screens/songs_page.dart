import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:path_provider/path_provider.dart';
import 'package:tt/auth/data_provider/secure_storage.dart';
import 'package:tt/extentsions.dart';
import 'package:tt/songs/bloc/bloc.dart';
import 'package:encrypt/encrypt.dart' as encrypt;
import 'package:http/http.dart' as http;

import '../../player.dart';
import '../entity/model.dart';

class SongsPage extends StatefulWidget {
  const SongsPage({Key? key}) : super(key: key);

  @override
  State<SongsPage> createState() => _SongsPageState();
}

class _SongsPageState extends State<SongsPage> {
  bool downloaded = false;
  bool downloading = false;
  String path = '';
  String clickedSong = '';
  @override
  Widget build(BuildContext context) {
    _changeState() {
      setState(() {
        downloaded = true;
      });
    }

    return Scaffold(
      body: RefreshIndicator(
        onRefresh: () async {
          BlocProvider.of<SongsBloc>(context).add(LoadSongs());
        },
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          // crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // GestureDetector(onTap: (){
            //   BlocProvider.of<SongsBloc>(context).add(LoadSongs());
            // },child: const Icon(Icons.refresh)),
            BlocBuilder<SongsBloc, SongsState>(builder: (context, state) {
              if (state is LoadingState) {
                return const Center(child: CircularProgressIndicator(color: Colors.black,));
              } else if (state is LoadSuccessState) {
                return SizedBox(
                    height: MediaQuery.of(context).size.height * 0.70,
                    child: SingleChildScrollView(
                        child: Column(
                            children: state.newsList
                                .map((e) => buildSongView(e))
                                .toList())));
              } else if (state is LoadFailureState) {
                return Text(
                  state.errorMessage,
                  style: const TextStyle(color: Colors.red),
                );
              } else {
                BlocProvider.of<SongsBloc>(context).add(LoadSongs());
              }
              return Container();
            })
          ],
        ),
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
                    IconButton(
                        onPressed: () async  {
                          setState(() {
                            clickedSong = song.id;
                          });
                          try{
                            final source = await download(song.id);
                            setState(() {
                              downloaded = true;
                            });
                          }catch (e){
                            downloading = true;
                          }
                        },
                        icon: clickedSong == song.id
                            ? downloaded?const Icon(
                          Icons.file_download_done_outlined,
                          size: 40,
                        ): CircularProgressIndicator()
                            : const Icon(
                                Icons.download,
                                size: 40,
                              ))
                  ],
                ),
              ]),
        ));
  }
}

Future<String> download(String songID) async {
  var getinfoURL =
      Uri.parse('https://zema-store.herokuapp.com/api/songs/$songID');
  SecureStorage secureStorage = SecureStorage();
  final userToken = await secureStorage.getToken();
  print('download token $userToken');
  var songResponse = await http.get(getinfoURL, headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer $userToken',
  });
  print(songResponse.body);
  final song = jsonDecode(songResponse.body)['data']['song'];
  final key = encrypt.Key.fromUtf8(song['aes_key']);
  final iv = encrypt.IV.fromUtf8(song['aes_iv']);
  final path = song['file_path'] as String;

  print('$key, $iv, ${path.split("/")[3]}');
  var url = Uri.parse(
      'https://zemastore-file-server.herokuapp.com/download/${path.split("/")[3]}');
  print('trying to download file');
  var response = await http.get(url).whenComplete(() => null);
  print(response.body);
  print('atleaset');

  Directory appDocumentsDirectory =
      await getApplicationDocumentsDirectory(); // 1
  String appDocumentsPath = appDocumentsDirectory.path; // 2
  // String fileName = response.headers['content-disposition']!.split(' ')[1];
  String filePath = '$appDocumentsPath/${path.split("/")[3]}';
  // final key = encrypt.Key.fromUtf8("2wFKyN1DutRZ79x0kQHiiizXy3z6q5Ck");
  // final iv = encrypt.IV.fromUtf8('aaEqrlelZ3CNiGWz');
  File file = File(filePath);
  //
  await file.writeAsBytes(response.bodyBytes);
  //
  final encrypter = encrypt.Encrypter(
      encrypt.AES(key, mode: encrypt.AESMode.cbc, padding: null));
  //
  print('if here');
  final decrypted = encrypter
      .decryptBytes(encrypt.Encrypted(await file.readAsBytes()), iv: iv);
  String filePath2 = '$appDocumentsPath/${path.split("/")[3]}';
  File file2 = File(filePath2);
  await file2.writeAsBytes(decrypted);
  return file2.path;
}

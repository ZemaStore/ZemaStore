import 'dart:io';

import 'package:flutter/material.dart';
import 'package:encrypt/encrypt.dart' as encrypt;
import 'package:path_provider/path_provider.dart';
import 'package:http/http.dart' as http;
import 'package:tt/player.dart';
import 'package:tt/songs/entity/model.dart';

class MainCollapsingToolbar extends StatefulWidget {
  const MainCollapsingToolbar({Key? key}) : super(key: key);

  @override
  _MainCollapsingToolbarState createState() => _MainCollapsingToolbarState();
}

class _MainCollapsingToolbarState extends State<MainCollapsingToolbar> {
  bool downloaded = false;
  bool downloading = false;
  String path = '';
  @override
  Widget build(BuildContext context) {
    _changeState() {
      setState(() {
        downloaded = true;
      });
    }

    return Scaffold(
      body: DefaultTabController(
        length: 2,
        child: NestedScrollView(
          headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
            return <Widget>[
              SliverAppBar(
                expandedHeight: 200.0,
                floating: false,
                pinned: true,
                flexibleSpace: FlexibleSpaceBar(
                    centerTitle: true,
                    title: const Text("Collapsing Toolbar",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16.0,
                        )),
                    background: Image.network(
                      "https://images.pexels.com/photos/396547/pexels-photo-396547.jpeg?auto=compress&cs=tinysrgb&h=350",
                      fit: BoxFit.cover,
                    )),
              ),
            ];
          },
          body: SingleChildScrollView(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    decoration: BoxDecoration(
                        color: Color(0xFFB4F1E3FF),
                        borderRadius: BorderRadius.circular(20)),
                    child: Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              const Icon(
                                Icons.music_video,
                                size: 50,
                              ),
                              const SizedBox(
                                width: 20,
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: const [
                                  Text(
                                    'Way Maker',
                                    style: TextStyle(
                                        fontSize: 18,
                                        fontWeight: FontWeight.bold),
                                  ),
                                  Text('Minasie Alemu')
                                ],
                              ),
                            ],
                          ),
                          Row(
                            children: [
                              downloaded
                                  ? InkWell(
                                      child: Icon(Icons.play_arrow),
                                      onTap: () {
                                        Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                                builder: (context) => Player(
                                                      audioSources: path,
                                                      urls: false,
                                                      album: false,
                                                      songs: [Songs(
                                                          artistId: '',
                                                          length: '2',
                                                          listenersCount: 3,
                                                          releaseDate: '',
                                                          title: '',
                                                          id: '',
                                                          songUri: '',
                                                          genre: '',
                                                          albumId: '')],
                                                    )));
                                      },
                                    )
                                  : downloading
                                      ? const CircularProgressIndicator(
                                          color: Colors.black,
                                        )
                                      : InkWell(
                                          child: const Icon(Icons.download),
                                          onTap: () async {
                                            setState(() {
                                              downloaded = false;
                                              downloading = true;
                                            });
                                            path = await download();
                                            _changeState();
                                          },
                                        ),
                              const SizedBox(
                                width: 10,
                              ),
                            ],
                          )
                        ],
                      ),
                    ),
                  ),
                ),
                buildMusicRow(_changeState()),
                buildMusicRow(_changeState()),
                buildMusicRow(_changeState()),
                buildMusicRow(_changeState()),
                buildMusicRow(_changeState()),
                buildMusicRow(_changeState()),
                buildMusicRow(_changeState()),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Padding buildMusicRow(void callback) {
    return Padding(padding: EdgeInsets.zero);
  }
}

class _SliverAppBarDelegate extends SliverPersistentHeaderDelegate {
  _SliverAppBarDelegate(this._tabBar);

  final TabBar _tabBar;

  @override
  double get minExtent => _tabBar.preferredSize.height;
  @override
  double get maxExtent => _tabBar.preferredSize.height;

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return Container(
      child: _tabBar,
    );
  }

  @override
  bool shouldRebuild(_SliverAppBarDelegate oldDelegate) {
    return false;
  }
}

Future<String> download() async {
  var url = Uri.parse(
      'https://zemastore-file-server.herokuapp.com/download/natiawelhussin.mp3');
  print('trying to download file');
  var response = await http.get(url).whenComplete(() => null);

  Directory appDocumentsDirectory =
      await getApplicationDocumentsDirectory(); // 1
  String appDocumentsPath = appDocumentsDirectory.path; // 2
  String fileName = response.headers['content-disposition']!.split(' ')[1];
  String filePath = '$appDocumentsPath/$fileName';
  final key = encrypt.Key.fromUtf8("2wFKyN1DutRZ79x0kQHiiizXy3z6q5Ck");
  final iv = encrypt.IV.fromUtf8('aaEqrlelZ3CNiGWz');
  File file = File(filePath);

  await file.writeAsBytes(response.bodyBytes);

  final encrypter = encrypt.Encrypter(
      encrypt.AES(key, mode: encrypt.AESMode.cbc, padding: null));

  final decrypted = encrypter
      .decryptBytes(encrypt.Encrypted(await file.readAsBytes()), iv: iv);
  String filePath2 = '$appDocumentsPath/${fileName}1';
  File file2 = File(filePath2);
  await file2.writeAsBytes(decrypted);
  return file2.path;
}

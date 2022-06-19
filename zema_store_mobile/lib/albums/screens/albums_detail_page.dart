import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:outline_gradient_button/outline_gradient_button.dart';
import 'package:tt/albums/bloc/album_details_bloc.dart';
import 'package:tt/albums/bloc/album_details_state.dart';
import 'package:tt/albums/bloc/album_details_event.dart';
import 'package:tt/albums/entity/model.dart';
import 'package:tt/player.dart';
import 'package:tt/songs/entity/model.dart';
// import 'package:pull_to_refresh/pull_to_refresh.dart';
import 'package:tt/extentsions.dart';

class AlbumDetailsPage extends StatefulWidget {
  final String albumId;
  final Albums album;
  const AlbumDetailsPage({Key? key, required this.albumId, required this.album})
      : super(key: key);

  @override
  State<AlbumDetailsPage> createState() => _AlbumDetailsPageState();
}

class _AlbumDetailsPageState extends State<AlbumDetailsPage> {
  List<Songs> albumSongs = [];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: const Color(0xFF232450),
      body: SingleChildScrollView(
        child: RefreshIndicator(
          onRefresh: () async {
            // BlocProvider.of<AlbumsDetailsBloc>(context).add(LoadSingleAlbum(albumId: widget.albumId));
          },
          child: SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(10.0),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      GestureDetector(
                          onTap: () {
                            Navigator.pop(context);
                          },
                          child: const Icon(
                            Icons.arrow_back_ios_outlined,
                            size: 30,
                          )),
                      Text(
                        'Album Details',
                        style: GoogleFonts.poppins(fontSize: 25),
                      ),
                      Container(
                        width: MediaQuery.of(context).size.width * 0.15,
                      )
                    ],
                  ),
                  Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Image.network(
                          widget.album.imageUrl,
                          fit: BoxFit.fill,
                          height: MediaQuery.of(context).size.height * 0.3,
                          width: MediaQuery.of(context).size.width * 0.9,
                        ),
                      ),
                      Text(
                        widget.album.title.capitalize(),
                        style: GoogleFonts.poppins(
                            fontSize: 30, color: Colors.black54),
                      ),
                      Text(
                        'released on ${DateTime.parse(widget.album.releaseDate).day.toString()}- ${DateTime.parse(widget.album.releaseDate).month.toString()}-${DateTime.parse(widget.album.releaseDate).year.toString()}',
                        style: GoogleFonts.poppins(
                            fontSize: 18, color: const Color(0xFF6D7187)),
                      ),
                      const SizedBox(
                        height: 30,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          RaisedButton(
                            onPressed: albumSongs.isEmpty? null:() {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (_) => Player(
                                            audioSources: '',
                                            urls: true,
                                            album: true,
                                            songs: albumSongs,
                                          )));
                            },
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(20.0)),
                            padding: const EdgeInsets.all(00.0),
                            child: Ink(
                              decoration: const BoxDecoration(
                                gradient: LinearGradient(colors: [
                                  Color(0xFF6D1BCA),
                                  Color(0xFFCB4EEA)
                                ]),
                                borderRadius:
                                    BorderRadius.all(Radius.circular(80.0)),
                              ),
                              child: Container(
                                constraints: const BoxConstraints(
                                    minWidth: 150.0,
                                    minHeight:
                                        40.0), // min sizes for Material buttons
                                alignment: Alignment.center,
                                child: Text(
                                  'Play All',
                                  textAlign: TextAlign.center,
                                  style: GoogleFonts.poppins(
                                      color: Colors.white, fontSize: 18),
                                ),
                              ),
                            ),
                          ),
                          // OutlineGradientButton(
                          //   backgroundColor: Colors.black54,
                          //   gradient: const LinearGradient(
                          //       colors: [Colors.greenAccent, Colors.yellow]),
                          //   strokeWidth: 4,
                          //   padding: const EdgeInsets.symmetric(
                          //       horizontal: 24, vertical: 12),
                          //   corners: const Corners(
                          //       topRight: Radius.circular(16),
                          //       bottomRight: Radius.circular(16),
                          //       topLeft: Radius.circular(16),
                          //       bottomLeft: Radius.circular(16)),
                          //   // backgroundColor: Colors.lightBlue,
                          //   elevation: 4,
                          //   inkWell: true,
                          //   onTap: () => () {},
                          //   onDoubleTap: () => {},
                          //   onLongPress: () => {},
                          //   child: Text('Purchased',
                          //       style: GoogleFonts.poppins(
                          //           textStyle: const TextStyle(
                          //               color: Colors.white, fontSize: 16))),
                          // ),
                        ],
                      )
                    ],
                  ),
                  const SizedBox(
                    height: 30,
                  ),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: BlocBuilder<AlbumsDetailsBloc, AlbumsDetailsState>(
                        builder: (context, state) {
                      if (state is LoadingState) {
                        return const CircularProgressIndicator(
                          color: Colors.black,
                        );
                      } else if (state is LoadSingleSuccessState) {
                        albumSongs = state.newsList;
                        return state.newsList.isEmpty
                            ? const Center(
                                child: Text('No Songs in this Album'))
                            : Column(children: [
                                Row(
                                  children: [
                                    Text(
                                      '${state.newsList.length}  Songs',
                                      style: GoogleFonts.poppins(fontSize: 25),
                                    )
                                  ],
                                ),
                                ...state.newsList
                                    .map((song) => Padding(
                                        padding:
                                            const EdgeInsets.only(bottom: 20),
                                        child: _buildRecentlyPlayed(song)))
                                    .toList()
                              ]);
                        // state.newsList.map((e) => Text('${e.albumId}')).toList());
                      } else {
                        BlocProvider.of<AlbumsDetailsBloc>(context)
                            .add(LoadSingleAlbum(albumId: widget.albumId));
                      }
                      return Container();
                    }),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  _buildRecentlyPlayed(Songs song) {
    return Container(
      // height: 110,
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
          color: const Color(0xFF22244D),
          borderRadius: BorderRadius.circular(20)),
      width: MediaQuery.of(context).size.width,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        mainAxisSize: MainAxisSize.max,
        // crossAxisAlignment: CrossAxisAlignment.,
        children: [
          Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: Image.asset(
                    'assets/art.jpeg',
                    height: 80,
                    width: 80,
                  )),
              const SizedBox(
                width: 15,
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    song.title,
                    style: GoogleFonts.poppins(
                        fontSize: 18,
                        color: Colors.white,
                        fontWeight: FontWeight.bold),
                  ),
                  Text(
                    song.genre,
                    style: GoogleFonts.poppins(
                        fontSize: 14,
                        color: const Color(0xFFA7ADBD),
                        fontWeight: FontWeight.w200),
                  ),
                  // Text(
                  //   '10:22',
                  //   style: GoogleFonts.poppins(
                  //       fontSize: 18,
                  //       color: const Color(0xFF9532E6),
                  //       fontWeight: FontWeight.bold),
                  // ),
                ],
              ),
            ],
          ),
          const SizedBox(
            width: 10,
          ),
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
                color: Colors.white,
                size: 40,
              ))
        ],
      ),
    );
  }
}

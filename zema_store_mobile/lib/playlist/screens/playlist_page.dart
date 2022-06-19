import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tt/extentsions.dart';
import 'package:tt/playlist/bloc/bloc.dart';
import 'package:tt/playlist/screens/create_playlist_page.dart';

class PlaylistPage extends StatefulWidget {
  const PlaylistPage({Key? key}) : super(key: key);

  @override
  State<PlaylistPage> createState() => _PlaylistPageState();
}

class _PlaylistPageState extends State<PlaylistPage> {
  @override
  Widget build(BuildContext context) {
    String tile = "This text should change";
    return Scaffold(
      body: RefreshIndicator(
        onRefresh: () async {
          BlocProvider.of<PlaylistBloc>(context).add(LoadPlaylist());
        },
        child: Column(
          // mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            BlocBuilder<PlaylistBloc, PlaylistState>(builder: (context, state) {
              if (state is LoadingState) {
                return const Center(child: CircularProgressIndicator());
              } else if (state is LoadSuccessState) {
                return Container(
                  height: MediaQuery.of(context).size.height * 0.3,
                  child: SingleChildScrollView(
                    child: Padding(
                      padding: const EdgeInsets.all(0.0),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(left: 8.0),
                            child: Text(
                              'My Playlist',
                              style: GoogleFonts.poppins(
                                  fontSize: 25, fontWeight: FontWeight.bold),
                            ),
                          ),
                          state.newsList.isEmpty
                              ? Container(
                                  height: 200,
                                  child: const Center(
                                      child: Text('No Playlists found')))
                              : SingleChildScrollView(
                                  scrollDirection: Axis.horizontal,
                                  child: Row(
                                    children: state.newsList
                                        .map((e) => Row(
                                              children: [
                                                Card(
                                                  elevation: 10,
                                                  color: Colors.blueGrey,
                                                  child: Column(
                                                    children: [
                                                      Container(
                                                        decoration: const BoxDecoration(
                                                            image: DecorationImage(
                                                                image: AssetImage(
                                                                    "assets/album.jpeg"))),
                                                        height: 200,
                                                        // color: Colors.blueGrey,
                                                        width: 200,
                                                        child: Center(
                                                          child: Text(
                                                            'Boom',
                                                            style: GoogleFonts
                                                                .poppins(
                                                                    fontSize:
                                                                        30),
                                                          ),
                                                        ),
                                                      ),
                                                      Text(
                                                        e.title.capitalize(),
                                                        style: GoogleFonts
                                                            .poppins(
                                                          fontSize: 20,
                                                        ),
                                                      )
                                                    ],
                                                  ),
                                                ),
                                                const SizedBox(
                                                  width: 20,
                                                ),
                                              ],
                                            ))
                                        .toList(),
                                  ),
                                ),
                        ],
                      ),
                    ),
                  ),
                );
              } else if (state is LoadFailureState) {
                return Center(
                  child: Text(
                    state.errorMessage,
                    style: TextStyle(color: Colors.red),
                  ),
                );
              } else {
                BlocProvider.of<PlaylistBloc>(context).add(LoadPlaylist());
              }
              return Container();
            }),
            const SizedBox(
              height: 30,
            ),
            Padding(
              padding: const EdgeInsets.only(left: 8.0),
              child: Text(
                'Recommended Playlist',
                style: GoogleFonts.poppins(
                    fontSize: 25, fontWeight: FontWeight.bold),
              ),
            ),
            BlocBuilder<PlaylistPopBloc, PlaylistState>(
                builder: (context, state) {
              print('Playlist stae $state');
              if (state is LoadPopularSuccessState) {
                return state.newsList.isEmpty
                    ? Container(height: 200,child: const Center(child: Text('There is no Recommended playlist right now')))
                    : SingleChildScrollView(
                        scrollDirection: Axis.vertical,
                        child: GestureDetector(
                          onTap: () {},
                          child: Column(
                            children: state.newsList
                                .map((e) => Column(
                                      children: [
                                        Card(
                                          elevation: 10,
                                          color: Colors.blueGrey,
                                          child: Container(
                                            decoration: const BoxDecoration(
                                                image: DecorationImage(
                                                    fit: BoxFit.fill,
                                                    image: AssetImage(
                                                        "assets/album3.jpeg"))),
                                            height: 200,
                                            // color: Colors.blueGrey,
                                            width: MediaQuery.of(context)
                                                .size
                                                .width,
                                            child: Center(
                                              child: Text(
                                                'Boom',
                                                style: GoogleFonts.poppins(
                                                    fontSize: 30),
                                              ),
                                            ),
                                          ),
                                        ),
                                        const SizedBox(
                                          height: 20,
                                        )
                                      ],
                                    ))
                                .toList(),
                          ),
                        ),
                      );
              } else if (state is LoadingPopState) {
                return const Center(
                    child: CircularProgressIndicator(
                  color: Colors.black,
                ));
              } else {
                BlocProvider.of<PlaylistPopBloc>(context)
                    .add(LoadPopularPlaylist());
              }
              return Container();
            }),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.black,
        onPressed: () { Navigator.push(context, MaterialPageRoute(builder: (_)=>CreatePlaylist())) ;},
        child: Icon(Icons.add),
      ),
    );
  }
}

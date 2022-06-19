import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tt/albums/bloc/bloc.dart';
import 'package:tt/albums/entity/model.dart';
import 'package:tt/albums/screens/albums_detail_page.dart';
import 'package:http/http.dart' as http;
import 'package:shimmer/shimmer.dart';
import 'package:tt/artists/entity/model.dart';
import 'package:tt/songs/entity/model.dart';
import '../bloc/album_details_bloc.dart';
import '../data_provider/albums_provider.dart';
import '../respository/albums_repository.dart';

class AlbumsPage extends StatefulWidget {
  const AlbumsPage({Key? key}) : super(key: key);

  @override
  State<AlbumsPage> createState() => _AlbumsPageState();
}

class _AlbumsPageState extends State<AlbumsPage> {
  @override
  Widget build(BuildContext context) {
    String tile = "This text should change";
    int timer = 800, offset = 0;
    return Scaffold(
      // backgroundColor: Color(0xFF232450),
      body: Container(
        // height: 59950,
        child: RefreshIndicator(
          onRefresh: () async {
            BlocProvider.of<AlbumsBloc>(context).add(LoadAlbum());
          },
          child: SafeArea(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [

                BlocBuilder<AlbumsBloc, AlbumsState>(builder: (context, state) {
                  if (state is LoadingState) {
                    return SingleChildScrollView(
                      child: SizedBox(
                        height: MediaQuery.of(context).size.height - 200,
                        child: GridView.builder(
                            gridDelegate:
                                const SliverGridDelegateWithMaxCrossAxisExtent(
                                    maxCrossAxisExtent: 200,
                                    crossAxisSpacing: 20,
                                    mainAxisSpacing: 20),
                            itemCount: 8,
                            itemBuilder: (BuildContext ctx, index) {
                              offset += 50;
                              timer = 800 + offset;
                              print(timer);
                              return Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Shimmer.fromColors(
                                  baseColor: Color(0xDCDCDCFF),
                                  highlightColor: Colors.white,
                                  period: Duration(milliseconds: timer),
                                  child: buildAlbumCards(Albums(
                                      title: '',
                                      imageUrl: 'imageUrl',
                                      id: 'id',
                                      releaseDate: 'releaseDate',
                                      artistProfile: ArtistProfile(
                                          followerNumber: 0,
                                          listenedHour: 2,
                                          fullName: '',
                                          id: ''),
                                      songs: 0)),
                                ),
                              );
                            }),
                      ),
                    );
                  } else if (state is LoadSuccessState) {
                    // print(state.newsList[0].imageUrl);
                    return state.newsList.isEmpty
                        ? Center(
                        child: Text(
                          'There are no Albums, Stay tuned!',
                          style: GoogleFonts.poppins(
                              fontSize: 20, fontWeight: FontWeight.w400),
                        ))
                        : SizedBox(
                      height: MediaQuery.of(context).size.height * .719,
                      child: GridView.count(
                          primary: true,
                          padding: const EdgeInsets.only(left: 20,right: 20),
                          crossAxisSpacing: 20,
                          mainAxisSpacing: 20,
                          crossAxisCount: 2,
                          children: state.newsList.map((album) {
                            print(album.id);
                            return buildAlbumCards(album);
                          }).toList()),
                    );
                  } else if (state is LoadFailureState) {
                    return Text(
                      state.errorMessage,
                      style: const TextStyle(color: Colors.red),
                    );
                  } else {
                    // BlocProvider.of<AlbumsBloc>(context).add(LoadAlbum());
                  }
                  return Container();
                })
              ],
            ),
          ),
        ),
      ),
    );

    Widget box() {
      return Container(
        height: 100,
        width: 100,
        color: Colors.grey,
      );
    }
  }

  GestureDetector buildAlbumCards(Albums album) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => BlocProvider(
                create: (_) => AlbumsDetailsBloc(
                  albumsRepository: AlbumsRepository(
                    provider: AlbumsProvider(httpClient: http.Client()),
                  ),
                ),
                child: AlbumDetailsPage(albumId: album.id, album: album,),
              ),
            ));
      },
      child: Container(
        height: 100,
        decoration: BoxDecoration(
            color: Colors.cyan.withOpacity(0.2), borderRadius: BorderRadius.circular(10)),
        child: Column(
mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            const SizedBox(height: 10,),
            CircleAvatar(
              radius: 50,
              backgroundImage: NetworkImage(
                album.imageUrl == ''
                    ? 'https://images.unsplash.com/photo-1547721064-da6cfb341d50'
                    : album.imageUrl,
              ),
            ),
            Text(
              album.title,
              style: GoogleFonts.poppins(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  ),
            ),
            Text(
              album.artistProfile.fullName,
              style: GoogleFonts.poppins(
                  textStyle: const TextStyle(
                      fontStyle: FontStyle.italic, )),
            )
          ],
        ),
      ),
    );
  }
}

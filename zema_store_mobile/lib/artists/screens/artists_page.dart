import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tt/artists/bloc/bloc.dart';
import 'package:tt/artists/entity/model.dart';
import 'package:tt/extentsions.dart';
import 'package:tt/main.dart';
import "dart:math";


// generates a new Random object
final _random = new Random();



class ArtistsPage extends StatefulWidget {
  const ArtistsPage({Key? key}) : super(key: key);

  @override
  State<ArtistsPage> createState() => _ArtistsPageState();
}

class _ArtistsPageState extends State<ArtistsPage> {
  final artistImages = ['assets/microphone.png','assets/singer.png','assets/singer (1).png','assets/singer (2).png','assets/singer (3).png','assets/singer (4).png',];
  @override
  Widget build(BuildContext context) {
    String tile = "This text should change";
    return Scaffold(
      // backgroundColor: Color(0xFF232450),
      body: RefreshIndicator(
        onRefresh: () async {
          BlocProvider.of<ArtistsBloc>(context).add(LoadArtist());
        },
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          // crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            BlocBuilder<ArtistsBloc, ArtistState>(builder: (context, state) {
              if (state is LoadingState) {
                return const Center(child: CircularProgressIndicator());
              } else if (state is LoadSuccessState) {
                return state.newsList.isEmpty
                    ? Center(
                    child: Text(
                      'There are no Any Artists, Stay tuned!',
                      style: GoogleFonts.poppins(
                          fontSize: 20, fontWeight: FontWeight.w400),
                    ))
                    : Container(
                  height: MediaQuery.of(context).size.height * 0.719,
                  child: SingleChildScrollView(
                    child: Column(
                      children: state.newsList
                          .map((artist) => Padding(
                                padding: const EdgeInsets.only(bottom: 20.0),
                                child: GestureDetector(
                                    onTap: () {
                                      Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (_) =>
                                                  MyApp(artist: artist)));
                                    },
                                    child: buildArtistCard(context, artist)),
                              ))
                          .toList(),
                    ),
                  ),
                );
              } else if (state is LoadFailureState) {
                return Text(
                  state.errorMessage,
                  style: const TextStyle(color: Colors.red),
                );
              } else {
                BlocProvider.of<ArtistsBloc>(context).add(LoadArtist());
              }
              return Container();
            })
          ],
        ),
      ),
    );
  }

  Card buildArtistCard(BuildContext context, Artist artist) {
    print('artis phote ${artist.photoUrl}');
    return Card(
      elevation: 20,
      margin: const EdgeInsets.only(left: 0.0, right: 0.0, top: 5.0),
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CircleAvatar(
              foregroundImage: NetworkImage(
                artist.photoUrl,
              ),
              radius: 50,
              backgroundImage: NetworkImage(
                artist.photoUrl,
              ),child: artist.photoUrl.isEmpty? Image.asset(artistImages[_random.nextInt(artistImages.length)]): Image.network(artist.photoUrl ),
            ),
            const SizedBox(
              width: 30,
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  artist.profile.fullName.capitalize(),
                  style: GoogleFonts.poppins(
                      fontSize: 25, fontWeight: FontWeight.bold),
                ),
                Container(
                    decoration: BoxDecoration(
                      color: Colors.blueGrey,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.only(
                          top: 5, bottom: 5, left: 15.0, right: 15),
                      child: Text(
                        '${artist.profile.followerNumber.toString()} followers',
                        style: GoogleFonts.poppins(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.w400),
                      ),
                    )),
                Container(
                    decoration: BoxDecoration(
                      color: Colors.black12,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.only(
                          top: 5, bottom: 5, left: 15.0, right: 15),
                      child: Text(
                        '${artist.profile.listenedHour.toString()} listen hours',
                        style: GoogleFonts.poppins(
                            color: Colors.black,
                            fontSize: 18,
                            fontWeight: FontWeight.w500),
                      ),
                    )),
              ],
            )
          ],
        ),
      ),
    );
  }
}

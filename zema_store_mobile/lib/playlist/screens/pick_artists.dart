import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tt/playlist/bloc/bloc.dart';
import 'package:tt/playlist/screens/pick_geners.dart';

class ArtistElement {
  final String fullName;
  final String imageURL;

  ArtistElement({required this.fullName, required this.imageURL});
}

class PickSomeArtists extends StatefulWidget {
  static const String routeName = "/pickSomeArtists";

  @override
  _PickSomeArtistState createState() => _PickSomeArtistState();
}

class _PickSomeArtistState extends State<PickSomeArtists> {
  final List<ArtistElement> generas = [
    ArtistElement(fullName: 'Dawit Getachew', imageURL: "assets/dave.jpeg"),
    ArtistElement(fullName: 'Tauren Walles', imageURL: "assets/tauren.jpeg"),
    ArtistElement(fullName: 'Bereket Testfaye', imageURL: "assets/beki.jpeg"),
    ArtistElement(fullName: 'Bethelhem Tezera', imageURL: "assets/betty.jpeg"),
    ArtistElement(fullName: 'Fenan Befikadu', imageURL: "assets/fenan.jpeg"),
    ArtistElement(fullName: 'Jamie Grace', imageURL: "assets/jamie.jpg"),
    // ArtistElement(fullName: 'Lauren Diagle', imageURL: "assets/laure.webp"),
    ArtistElement(fullName: 'Meskerem Getu', imageURL: "assets/meski.jpeg"),
    ArtistElement(fullName: 'Yishehak Sedik', imageURL: "assets/yise.jpeg"),
    ArtistElement(fullName: 'Yohannes Girma', imageURL: "assets/john.jpeg"),
  ];
  List<String> selected = [];
  _elementSelected(element) {
    return selected.contains(element);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Center(
                child: Text(
              'Pick some Artists you Like',
              style: GoogleFonts.poppins(
                fontSize: 25,
              ),
            )),
            Wrap(
                spacing: 6.0,
                runSpacing: 6.0,
                children: generas
                    .map((artist) => Container(
                          child: GestureDetector(
                              onTap: () {
                                setState(
                                  () {
                                    if (selected.contains(artist.fullName)) {
                                      selected.remove(artist.fullName);
                                    } else {
                                      selected.add(artist.fullName);
                                    }
                                  },
                                );
                              },
                              child: _buildChip(
                                  artist,
                                  selected.contains(artist.fullName)
                                      ? Colors.blueGrey
                                      : Colors.grey)),
                        ))
                    .toList()),
            BlocBuilder<PlaylistBloc, PlaylistState>(builder: (context, state) {
              if (state is LoadingAddGenereState) {
                return const CircularProgressIndicator(
                  color: Colors.black,
                );
              } else if (state is LoadAddGenereSuccessState) {
                Navigator.pushNamed(context, '/');
              }
              return ElevatedButton(
                  style: ElevatedButton.styleFrom(primary: Colors.black),
                  onPressed: selected.isEmpty
                      ? null
                      : () {
                          BlocProvider.of<PlaylistBloc>(context).add(AddGeneres(
                              artists: selected,
                              geners: PickSomeGeneres.selected));
                        },
                  child: Padding(
                    padding: const EdgeInsets.only(
                        top: 8.0, bottom: 8, left: 20, right: 20),
                    child: Text(
                      'Continue',
                      style: GoogleFonts.poppins(fontSize: 25),
                    ),
                  ));
            })
          ],
        ),
      ),
    );
  }

  Widget _buildChip(ArtistElement artist, Color color) {
    return Card(
      elevation: 10,
      child: Container(
        height: 150,
        width: 100,
        decoration:
            BoxDecoration(color: color, borderRadius: BorderRadius.circular(6)),
        child: Padding(
          padding: const EdgeInsets.all(4.0),
          child: Column(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Image.asset(
                  artist.imageURL,
                  fit: BoxFit.fill,
                ),
              ),
              Text(
                artist.fullName,
                style: GoogleFonts.poppins(
                    fontSize: 15,
                    fontWeight: FontWeight.w500,
                    color: Colors.white),
              )
            ],
          ),
        ),
      ),
    );
    // return Chip(
    //   labelPadding: EdgeInsets.all(2.0),
    //   avatar: CircleAvatar(
    //     backgroundColor: Colors.white70,
    //     child: Image.asset("assets/album.jpeg")
    //     // Text(
    //     //   artist.fullName[0].toUpperCase(),
    //     //   style: GoogleFonts.poppins(
    //     //       fontSize: 20, color: Colors.black, fontWeight: FontWeight.bold),
    //     // ),
    //   ),
    //   label: Text(artist.fullName,
    //       style: GoogleFonts.poppins(
    //           fontSize: 16, color: Colors.white, fontWeight: FontWeight.w500)),
    //   backgroundColor: color,
    //   elevation: 6.0,
    //   shadowColor: Colors.grey[60],
    //   padding: const EdgeInsets.all(8.0),
    // );
  }
}

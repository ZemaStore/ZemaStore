import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tt/playlist/screens/pick_artists.dart';

class PickSomeGeneres extends StatefulWidget {
  static const String routeName = "/pickSomeGenera";
  static List<String> selected = [];

  @override
  _PickSomeGeneresState createState() => _PickSomeGeneresState();
}

class _PickSomeGeneresState extends State<PickSomeGeneres> {
  final List<String> generas = [
    "Pop",
    "Hip hop",
    "Rock",
    "Rhythm and blues",
    "Soul",
    "Reggae",
    "Country",
    "Funk",
    "Folk music",
    "Jazz",
    "Disco",
    "Classical",
    "Electronic",
        "Blues",
    "Ska"
  ];



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
              'Pick some Geners you Like',
              style: GoogleFonts.poppins(
                fontSize: 25,
              ),
            )),
            Wrap(
                spacing: 6.0,
                runSpacing: 6.0,
                children: generas
                    .map((genere) => Container(
                          child: GestureDetector(
                              onTap: () {
                                setState(
                                  () {
                                    if (PickSomeGeneres.selected.contains(genere)) {
                                      PickSomeGeneres.selected.remove(genere);
                                    } else {
                                      PickSomeGeneres.selected.add(genere);
                                    }
                                  },
                                );
                              },
                              child: _buildChip(
                                  genere,
                                  PickSomeGeneres.selected.contains(genere)
                                      ? Colors.blueGrey
                                      : Colors.grey)),
                        ))
                    .toList()),
            ElevatedButton(
                style: ElevatedButton.styleFrom(primary: Colors.black),
                onPressed: PickSomeGeneres.selected.isEmpty?null: () {
                  Navigator.pushNamed(context, PickSomeArtists.routeName);
                },
                child: Padding(
                  padding: const EdgeInsets.only(
                      top: 8.0, bottom: 8, left: 20, right: 20),
                  child: Text(
                    'Continue',
                    style: GoogleFonts.poppins(fontSize: 25),
                  ),
                ))
          ],
        ),
      ),
    );
  }

  Widget _buildChip(String label, Color color) {
    return Chip(
      labelPadding: EdgeInsets.all(2.0),
      avatar: CircleAvatar(
        backgroundColor: Colors.white70,
        child: Text(
          label[0].toUpperCase(),
          style: GoogleFonts.poppins(
              fontSize: 20, color: Colors.black, fontWeight: FontWeight.bold),
        ),
      ),
      label: Text(label,
          style: GoogleFonts.poppins(
              fontSize: 16, color: Colors.white, fontWeight: FontWeight.w500)),
      backgroundColor: color,
      elevation: 6.0,
      shadowColor: Colors.grey[60],
      padding: const EdgeInsets.all(8.0),
    );
  }
}

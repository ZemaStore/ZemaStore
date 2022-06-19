import 'package:anim_search_bar/anim_search_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:material_floating_search_bar/material_floating_search_bar.dart';
import 'package:shimmer/shimmer.dart';
import 'package:tt/albums/bloc/bloc.dart';
import 'package:tt/auth/bloc/auth_bloc.dart';
import 'package:tt/auth/bloc/auth_event.dart';
import 'package:tt/auth/bloc/auth_state.dart';
import 'package:tt/search/screen/search_page.dart';

import '../collapsing.dart';
import '../colors.dart';

class HomePageMain extends StatefulWidget {
  const HomePageMain({Key? key}) : super(key: key);

  @override
  State<HomePageMain> createState() => _HomePageMainState();
}

class _HomePageMainState extends State<HomePageMain> {
  @override
  Widget build(BuildContext context) {
    int timer = 800, offset = 0;

    final isPortrait =
        MediaQuery.of(context).orientation == Orientation.portrait;
    final diff = DateTime.now().subtract(const Duration(days: 9));
    return Scaffold(
      // backgroundColor: const Color(0xFF1C1F3E),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(12.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.09,
                ),
                BlocBuilder<AuthBloc, AuthState>(
                  builder: (context, state) {
                    print('currentstate $state');

                    if (state is AuthLoginSuccessState) {
                      return Text(
                        'Hello ${state.loginData.user.phone},',
                        style: GoogleFonts.poppins(
                            wordSpacing: 4,
                            textStyle: const TextStyle(
                                fontSize: 25, fontWeight: FontWeight.w400)),
                      );
                    }
                    // if(state is AuthInitialState){
                    //   // BlocProvider.of<AuthBloc>(context).add(AppStarted());
                    //   return const Scaffold();
                    // }
                    return Text(
                      'Welcome Back,',
                      style: GoogleFonts.poppins(
                          wordSpacing: 4,
                          textStyle: const TextStyle(
                              fontSize: 25, fontWeight: FontWeight.w400)),
                    );
                  },
                ),
                Text(
                  'What you want to hear today?',
                  style: GoogleFonts.poppins(
                      wordSpacing: 4,
                      color: const Color(0xFF8489A2),
                      textStyle: const TextStyle(
                          fontSize: 18, fontWeight: FontWeight.w400)),
                ),
                const SizedBox(
                  height: 30,
                ),
                // AnimSearchBar(
                //     width: MediaQuery.of(context).size.width,
                //     textController: TextEditingController(),
                //     onSuffixTap: () {}),

                InkWell(
                  onTap: () {
                    print('hgfgh');
                    Navigator.push(context,
                        MaterialPageRoute(builder: (_) => SearchPage()));
                  },
                  child: TextField(
                    autofocus: false,
                    style: GoogleFonts.poppins(
                        textStyle: const TextStyle(
                            fontSize: 20.0, color: Colors.white)),
                    decoration: InputDecoration(
                        border: InputBorder.none,
                        hintText: 'Search',
                        hintStyle: GoogleFonts.poppins(
                            color: Colors.white,
                            textStyle: const TextStyle(fontSize: 18)),
                        filled: true,
                        fillColor: const Color(0xFF232450),
                        contentPadding: const EdgeInsets.only(
                            left: 14.0, bottom: 6.0, top: 8.0),
                        focusedBorder: OutlineInputBorder(
                          // borderSide:
                          //     const BorderSide(color: Color(0xFF262652)),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        enabledBorder: UnderlineInputBorder(
                          // borderSide:
                          //     const BorderSide(color: Color(0xFF2D2E62)),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        icon: Container(
                          height: 40,
                          width: 40,
                          decoration: BoxDecoration(
                              color: Colors.black,
                              borderRadius: BorderRadius.circular(7)),
                          child: const Icon(
                            Icons.search,
                            color: Colors.white,
                          ),
                        ),
                        suffix: const Icon(
                          Icons.filter,
                          color: Colors.white,
                        )),
                  ),
                ),
                const SizedBox(
                  height: 20,
                ),
                Container(
                  // height: 230,
                  child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: BlocBuilder<AlbumsBloc, AlbumsState>(
                      builder: (context, state) {
                        if (state is LoadSuccessState) {
                          return Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: state.newsList
                                  .map((song) => Row(
                                        children: [
                                          buildSongCard(
                                            song.imageUrl,
                                            song.title,
                                            song.artistProfile.fullName,
                                            false,
                                          ),
                                          const SizedBox(
                                            width: 20,
                                          )
                                        ],
                                      ))
                                  .toList()

                              );
                        } else if (state is LoadingState) {
                          return SizedBox(
                              height: 200,
                              width: MediaQuery.of(context).size.width,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: const [
                                   Center(
                                    child: CircularProgressIndicator(color: Colors.black,),

                                  ),
                                  SizedBox(height: 20,),
                                  Text('Loading Albums')
                                ],
                              ));
                        } else {
                          BlocProvider.of<AlbumsBloc>(context).add(LoadAlbum());
                        }
                        return Container();
                      },
                    ),
                  ),
                ),
                const SizedBox(
                  height: 30,
                ),
                Text(
                  'Recently Played',
                  style: GoogleFonts.poppins(fontSize: 25, ),
                ),
                SizedBox(
                  height: 20,
                ),
                Column(
                  children: [
                    _buildRecentlyPlayed(),
                    const SizedBox(
                      height: 15,
                    ),
                    _buildRecentlyPlayed(),
                    const SizedBox(
                      height: 15,
                    ),
                    _buildRecentlyPlayed()
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  _buildRecentlyPlayed() {
    return Container(
      height: 110,
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
          color: const Color(0xFF22244D),
          borderRadius: BorderRadius.circular(20)),
      width: MediaQuery.of(context).size.width,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: Image.asset(
                'assets/art.jpeg',
                height: 100,
                width: 100,
              )),
          Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Efeligihalehu',
                style: GoogleFonts.poppins(
                    fontSize: 18,
                    color: Colors.white,
                    fontWeight: FontWeight.bold),
              ),
              Text(
                'by Dawit Getachew',
                style: GoogleFonts.poppins(
                    fontSize: 14,
                    color: const Color(0xFF6B708E),
                    fontWeight: FontWeight.w200),
              ),
              Text(
                '10:22',
                style: GoogleFonts.poppins(
                    fontSize: 18,
                    color: const Color(0xFF9532E6),
                    fontWeight: FontWeight.bold),
              ),
            ],
          ),
          Flexible(
            child: Center(
              child: Flex(
                  // fit: FlexFit.tight,
                  direction: Axis.vertical,
                  children: [
                    MaterialButton(
                      height: 45,
                      color: const Color(0xFF9532E6),
                      shape: const CircleBorder(),
                      onPressed: () {},
                      child: Center(
                        // padding: EdgeInsets.all(11),
                        child: Image.asset(
                          'assets/play.png',
                          height: 20,
                          width: 20,
                        ),
                      ),
                    ),
                  ]),
            ),
          )
        ],
      ),
    );
  }

  _buildSearchBar(bool isPortrait) {
    return FloatingSearchBar(
      hint: 'Search...',
      scrollPadding: const EdgeInsets.only(top: 16, bottom: 56),
      transitionDuration: const Duration(milliseconds: 800),
      transitionCurve: Curves.easeInOut,
      physics: const BouncingScrollPhysics(),
      axisAlignment: isPortrait ? 0.0 : -1.0,
      openAxisAlignment: 0.0,
      width: isPortrait ? 600 : 500,
      debounceDelay: const Duration(milliseconds: 500),
      onQueryChanged: (query) {
        // Call your model, bloc, controller here.
      },
      // Specify a custom transition to be used for
      // animating between opened and closed stated.
      transition: CircularFloatingSearchBarTransition(),
      actions: [
        FloatingSearchBarAction(
          showIfOpened: false,
          child: CircularButton(
            icon: const Icon(Icons.filter),
            onPressed: () {},
          ),
        ),
        FloatingSearchBarAction.searchToClear(
          showIfClosed: false,
        ),
      ],
      builder: (context, transition) {
        return ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: Material(
            color: Colors.white,
            elevation: 4.0,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: Colors.accents.map((color) {
                return Container(height: 112, color: color);
              }).toList(),
            ),
          ),
        );
      },
    );
  }

  Column buildSongCard(
      String imageLink, String title, String subTitle, bool newSong) {
    return Column(
      children: [
        GestureDetector(
          onTap: () {
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const MainCollapsingToolbar()));
          },
          child: Column(
            children: [
              Stack(children: [
                Container(
                  decoration: BoxDecoration(
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.8),
                        spreadRadius: 3,
                        blurRadius: 2,
                        offset:
                            const Offset(5, 7), // changes position of shadow
                      ),
                    ],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: Image.network(
                      imageLink,
                      height: MediaQuery.of(context).size.width * 0.52,
                      width: MediaQuery.of(context).size.width * 0.7,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                newSong
                    ? Positioned.fill(
                        child: Align(
                        alignment: Alignment.bottomCenter,
                        child: Padding(
                          padding: const EdgeInsets.only(bottom: 10.0),
                          child: Container(
                            height: 40,
                            width: MediaQuery.of(context).size.width * 0.6,
                            decoration: BoxDecoration(
                                color: const Color(0xFF2D1759).withOpacity(0.8),
                                borderRadius: BorderRadius.circular(20)),
                            child: Padding(
                              padding:
                                  const EdgeInsets.only(left: 8.0, right: 8),
                              child: Row(
                                children: [
                                  Container(
                                    decoration: BoxDecoration(
                                      color: const Color(0xFFAD37FF),
                                      borderRadius: BorderRadius.circular(20),
                                    ),
                                    child: Padding(
                                      padding: const EdgeInsets.fromLTRB(
                                          8.0, 2, 8, 2),
                                      child: Text(
                                        'New!',
                                        style: GoogleFonts.poppins(
                                            color: Colors.white),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(
                                    width: 10,
                                  ),
                                  Text(
                                    subTitle,
                                    style: GoogleFonts.poppins(
                                        color: Colors.white, fontSize: 11),
                                  )
                                ],
                              ),
                            ),
                          ),
                        ),
                      ))
                    : Container()
              ]),
              const SizedBox(
                height: 12,
              ),
              Text(
                title,
                style: GoogleFonts.poppins(
                    textStyle: const TextStyle(
                        color: Colors.black54,
                        fontSize: 20,
                        fontWeight: FontWeight.bold)),
              ),
              const SizedBox(
                height: 2,
              ),
              Text(
                subTitle,
                style: GoogleFonts.poppins(
                    textStyle: TextStyle(color: Colors.black, fontSize: 14)),
              )
            ],
          ),
        ),
      ],
    );
  }
}

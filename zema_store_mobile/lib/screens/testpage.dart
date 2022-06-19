import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tab_indicator_styler/tab_indicator_styler.dart';
import 'package:tt/albums/screens/albums_page.dart';
import 'package:tt/artists/screens/artists_page.dart';
import 'package:tt/playlist/screens/playlist_page.dart';
import 'package:tt/screens/homepage.dart';
import 'package:tt/songs/screens/songs_page.dart';



class MyApp4 extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(const PageStorageKey('')),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage(Key key, ) : super(key: key);


  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> with TickerProviderStateMixin {

  late TabController _tabController;
  @override
  initState(){
    _tabController = TabController(length: 6, vsync: this);
  }

  int _currentIndex = 0;


  _handleTabSelection() {
    if (_tabController.indexIsChanging) {
      setState(() {
        _currentIndex = _tabController.index;
      });
    }
  }

  @override
  Widget build(BuildContext context) {

    return SafeArea(
      child: Scaffold(
        // backgroundColor: const Color(0xFF22244D),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SingleChildScrollView(
              child: Container(height: 50,
              child: Center(child: Text('Albums Pages', style: GoogleFonts.poppins(color: Colors.black, fontSize: 25),)),),
            ),
            SizedBox(
              height: MediaQuery.of(context).size.height*.8,
              child: Flexible(
                child: DefaultTabController(
                  length: 6,
                  child: Scaffold(
                    // backgroundColor: const Color(0xFF22244D),
                      appBar: AppBar(
                        toolbarHeight: 25,
                        elevation: 0,
                        // backgroundColor: const Color(0xFF22244D),
                        backgroundColor: Colors.white,
                        bottom: PreferredSize(
                            preferredSize: const Size.fromHeight(30.0),
                            child: TabBar(
                              controller: _tabController,
                                isScrollable: true,
                                unselectedLabelColor: Colors.white.withOpacity(0.3),
                                indicatorColor: Colors.white,
                                tabs: const [
                                  Tab(
                                    child: Text('Albums', style: TextStyle(color: Colors.black),),
                                  ),
                                  Tab(
                                    child: Text('Artists', style: TextStyle(color: Colors.black)),
                                  ),
                                  Tab(
                                    child: Text('Songs', style: TextStyle(color: Colors.black)),
                                  ),
                                  Tab(
                                    child: Text('Playlist', style: TextStyle(color: Colors.black)),
                                  ),
                                  Tab(
                                    child: Text('Tab 5', style: TextStyle(color: Colors.black)),
                                  ),
                                  Tab(
                                    child: Text('Tab 6'),
                                  )
                                ])),

                      ),
                      body: TabBarView(
                        controller: _tabController,
                        children: <Widget>[
                          AlbumsPage(),
                          ArtistsPage(),
                          SongsPage(),
                          PlaylistPage(),
                          Container(
                            child: const Center(
                              child: Text('Tahb 5'),
                            ),
                          ),
                          Container(
                            child: const Center(
                              child: Text('Tab 6'),
                            ),
                          ),
                        ],
                      )),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
import 'package:flutter/material.dart';
import 'package:flutter_awesome_buttons/flutter_awesome_buttons.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:jwt_decode/jwt_decode.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tt/albums/bloc/album_details_bloc.dart';
import 'package:tt/albums/bloc/bloc.dart';
import 'package:tt/albums/data_provider/albums_provider.dart';
import 'package:tt/albums/respository/albums_repository.dart';
import 'package:tt/artists/bloc/bloc.dart';
import 'package:tt/artists/data_provider/artists_provider.dart';
import 'package:tt/artists/entity/model.dart';
import 'package:tt/artists/respository/artists_repository.dart';
import 'package:tt/auth/bloc/auth_bloc.dart';
import 'package:tt/auth/data_provider/auth_data.dart';
import 'package:tt/auth/repository/auth_repository.dart';
import 'package:tt/auth/screens/login/login_page.dart';
import 'package:tt/events/bloc/bloc.dart';
import 'package:tt/events/data_provider/event_provider.dart';
import 'package:tt/events/respository/events_repository.dart';
import 'package:tt/events/screens/events_page.dart';
import 'package:tt/payment/pages/payment_page.dart';
import 'package:http/http.dart' as http;
import 'package:tt/playlist/bloc/bloc.dart';
import 'package:tt/playlist/data_provider/playlist_provider.dart';
import 'package:tt/playlist/respository/playlist_repository.dart';
import 'package:tt/routes.dart';
import 'package:tt/screens/homepage.dart';
import 'package:tt/screens/testpage.dart';
import 'package:tt/search/bloc/search_bloc.dart';
import 'package:tt/search/data_provider/search_provider.dart';
import 'package:tt/search/data_repository/search_repository.dart';
import 'package:tt/songs/bloc/bloc.dart';
import 'package:tt/songs/bloc/songle_dart.dart';
import 'package:tt/songs/data_provider/song_provider.dart';
import 'package:tt/songs/respository/songs_repository.dart';
import 'package:tt/user/bloc/bloc.dart';
import 'package:tt/user/data_provider/user_provider.dart';
import 'package:tt/user/respository/user_repository.dart';

import 'auth/data_provider/secure_storage.dart';
import 'collapsing.dart';
import 'colors.dart';

bool? isLoggedIn = false;
List<String>? downloadedSongs = [];

_checkLoggedIn() async {
  final SecureStorage loggedIN = SecureStorage();
  final response = await loggedIN.hasToken();
  if (response) {
    final token = await loggedIN.getToken();
    final isExpired = Jwt.isExpired(token!);
    print('isEcpired = $isExpired');
    isLoggedIn = !isExpired;
    print('isLogged $isLoggedIn');
  }
}

_loadDownloadedSongs() async {
  SharedPreferences preferences = await SharedPreferences.getInstance();
  await preferences.setStringList('downloadSongs', ['value']);
  final songs = preferences.getStringList('downloadSongs');
  print('we got here $songs');
  if (songs!.isNotEmpty) {
    downloadedSongs = songs;
  }
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await _checkLoggedIn();
  await _loadDownloadedSongs();
  await dotenv.load(fileName: "assets/.env");
  Stripe.publishableKey = dotenv.env['STRIPE_PUBLICATION_KEY'].toString();
  final http.Client httpClient = http.Client();
  runApp(MaterialApp(
      debugShowCheckedModeBanner: false,
      title: "App",
      home: MultiBlocProvider(
        providers: [
          // User bloc
          BlocProvider(
            create: (_) => UsersBloc(
              usersRepository: UsersRepository(
                provider: UsersProvider(httpClient: httpClient),
              ),
            ),
          ),
          //Albums bloc
          BlocProvider(
            create: (_) => AlbumsBloc(
              albumsRepository: AlbumsRepository(
                provider: AlbumsProvider(httpClient: httpClient),
              ),
            ),
          ),
          // Artists Bloc
          BlocProvider(
            create: (_) => ArtistsBloc(
              artistsRepository: ArtistsRepository(
                provider: ArtistsProvider(httpClient: httpClient),
              ),
            ),
          ),
          // Events provider
          BlocProvider(
            create: (_) => EventsBloc(
              eventsRepository: EventsRepository(
                provider: EventsProvider(httpClient: httpClient),
              ),
            ),
          ),
          // Playlist BLoC
          BlocProvider(
            create: (_) => PlaylistBloc(
              playlistRepository: PlaylistRepository(
                provider: PlaylistProvider(httpClient: httpClient),
              ),
            ),
          ),
          // Songs BLoC
          BlocProvider(
            create: (_) => SongsBloc(
              songsRepository: SongsRepository(
                provider: SongsProvider(httpClient: httpClient),
              ),
            ),
          ),
          BlocProvider(
            create: (_) => AlbumsDetailsBloc(
              albumsRepository: AlbumsRepository(
                provider: AlbumsProvider(httpClient: httpClient),
              ),
            ),
          ),
          BlocProvider(
            create: (_) => AuthBloc(
              authRepository: AuthRepository(
                provider: AuthDataProvider(httpClient: httpClient),
              ),
            ),
          ),
          BlocProvider(
            create: (_) => SongsSingleBloc(
              songsRepository: SongsRepository(
                provider: SongsProvider(httpClient: httpClient),
              ),
            ),
          ),
          BlocProvider(
            create: (_) => PlaylistPopBloc(
              playlistRepository: PlaylistRepository(
                provider: PlaylistProvider(httpClient: httpClient),
              ),
            ),
          ),
          BlocProvider(
            create: (_) => SearchBloc(
              searchRepository: SearchRepository(
                  provider: SearchProvider(httpClient: httpClient)),
            ),
          )
        ],
        child: MaterialApp(
          debugShowCheckedModeBanner: false,
          initialRoute:
              (isLoggedIn ?? false) ? '/' : LoginFormValidation.routeName,
          onGenerateRoute: PageRouter.generateRoute,
        ),
      )));
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;
  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold);
  static final List<Widget> _widgetOptions = <Widget>[
    const HomePageMain(),
    MyApp4(),
    // Player(
    //   audioSources: "",
    //   urls: true,
    //   album: false,
    // ),
    const EventsPage(),
    // AlbumDetailsPage(albumId: '62a2fbfa6cb5c525f456252e')
    const PaymentPage()
    // HomePageMain()
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _widgetOptions.elementAt(_selectedIndex),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(
              Icons.home,
              color: Colors.grey,
            ),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.man_sharp, color: Colors.grey),
            label: 'Artist',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.music_note_outlined, color: Colors.grey),
            label: 'Events',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings, color: Colors.grey),
            label: 'Settings',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.blueGrey,
        onTap: _onItemTapped,
      ),
    );
  }
}

class MyApp extends StatelessWidget {
  final Artist artist;
  const MyApp({Key? key, required this.artist}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Center(
          child: Column(
            children: [
              Container(
                height: MediaQuery.of(context).size.height * .5,
                width: MediaQuery.of(context).size.width,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    colorFilter: ColorFilter.mode(
                        Colors.black.withOpacity(0.2), BlendMode.dstOut),
                    image: const AssetImage("assets/singer.png") ,
                    fit: BoxFit.cover,
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    SuccessButton(
                      title: "${artist.profile.followerNumber} Listeners",
                      onPressed: () {},
                    ),
                    const SizedBox(
                      width: 2.0,
                    ),
                    DarkButtton(
                      onPressed: () {
                        print(artist.profile.id);
                        BlocProvider.of<ArtistsBloc>(context).add(AddFollow(profileId: artist.profile.id));
                      },
                      title: "Follow",
                    ),
                  ],
                ),
              ),
              Container(
                color: const Color(0xFF091227),
                height: MediaQuery.of(context).size.height * 0.5,
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text(
                              artist.profile.fullName.split(' ')[0],
                              style: const TextStyle(
                                  fontSize: 40,
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold),
                            ),
                            // Text('Getachew', style: TextStyle(fontSize: 25, color: Colors.white),)
                          ],
                        ),
                        const SizedBox(
                          height: 5,
                        ),
                        Row(
                          children: [
                            const Icon(
                              Icons.group,
                              color: Colors.white,
                            ),
                            Text(
                              '${artist.profile.followerNumber.toString()} Followers',
                              style: const TextStyle(
                                  fontSize: 20, color: Colors.white),
                            )
                          ],
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        const Text(
                          // artist.artistprofile.profile
                          "I'm Gospel Singer Dawit Getachew",
                          style: TextStyle(color: Colors.white, fontSize: 20),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        const Text("#AtHomeWithZemaStore",
                            style:
                                TextStyle(color: Colors.white, fontSize: 20)),
                        const SizedBox(
                          height: 30,
                        ),
                        Column(
                          children: [
                            const Text(
                              'Latest Releases',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 30),
                            ),
                            const SizedBox(
                              height: 20,
                            ),
                            SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                children: [
                                  buildRow('assets/download.jpeg'),
                                  const SizedBox(
                                    width: 40,
                                  ),
                                  buildRow('assets/tauren.jpeg'),
                                  const SizedBox(
                                    width: 40,
                                  ),
                                  buildRow('assets/dave.jpeg'),
                                  const SizedBox(
                                    width: 40,
                                  ),
                                  buildRow('assets/download.jpeg'),
                                  const SizedBox(
                                    width: 40,
                                  ),
                                  buildRow('assets/download.jpeg'),
                                ],
                              ),
                            )
                          ],
                        )
                      ]),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  buildRow(String imageUrl) {
    return Row(
      children: [
        Image.asset(
          imageUrl,
          height: 120,
          width: 120,
          fit: BoxFit.cover,
        ),
        const SizedBox(
          width: 20,
        ),
        Column(
          children: const [
            Text(
              'Efelgihalehu',
              style: TextStyle(
                  fontSize: 25,
                  color: Colors.white,
                  fontWeight: FontWeight.bold),
            ),
            Text(
              'Dawit Getachew',
              style: TextStyle(
                  fontSize: 20,
                  color: Colors.white,
                  fontWeight: FontWeight.w200),
            )
          ],
        )
      ],
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
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
                bottom: const TabBar(
                  labelColor: Colors.black87,
                  unselectedLabelColor: Colors.grey,
                  tabs: [
                    Tab(icon: Icon(Icons.info), text: "Tab 1"),
                    Tab(icon: Icon(Icons.lightbulb_outline), text: "Tab 2"),
                  ],
                ),
              ),
            ];
          },
          body: const Center(
            child: Text("Sample text"),
          ),
        ),
      ),
    );
  }
}

class Scrolls extends StatefulWidget {
  const Scrolls({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<Scrolls> createState() => _ScrollsState();
}

class _ScrollsState extends State<Scrolls> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    _buildDrawer() {
      return Drawer(
        // Add a ListView to the drawer. This ensures the user can scroll
        // through the options in the drawer if there isn't enough vertical
        // space to fit everything.
        child: ListView(
          // Important: Remove any padding from the ListView.
          padding: EdgeInsets.zero,
          children: [
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text('Drawer Header'),
            ),
            ListTile(
              title: const Text('Item 1'),
              onTap: () {
                // Update the state of the app.
                // ...
              },
            ),
            ListTile(
              title: const Text('Item 2'),
              onTap: () {
                // Update the state of the app.
                // ...
              },
            ),
          ],
        ),
      );
    }

    return SafeArea(
      child: Scaffold(
        drawer: _buildDrawer(),
        backgroundColor: backgroundColor,
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(10.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    InkWell(
                      onTap: () {
                        // Navigator.push(context, MaterialPageRoute(builder: (){return AudioPlayer()}))
                      },
                      child: Image.asset(
                        'assets/hamburger.png',
                        height: 30,
                        width: 30,
                        color: Colors.white,
                      ),
                    ),
                    Image.asset(
                      'assets/search.png',
                      height: 30,
                      width: 30,
                      color: Colors.white,
                    )
                  ],
                ),
                const SizedBox(
                  height: 30,
                ),
                const Text(
                  'Recommended for you',
                  style: TextStyle(
                      color: titleColor,
                      fontSize: 20,
                      fontFamily: 'Gilory',
                      fontWeight: FontWeight.bold),
                ),
                const SizedBox(
                  height: 15,
                ),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    // crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      buildSongCard('assets/album3.jpeg', 'Monsters Go Bump',
                          'ERICA RECINOS'),
                      const SizedBox(
                        width: 20,
                      ),
                      buildSongCard('assets/album1.jpeg', 'Monsters Go Bump',
                          'ERICA RECINOS'),
                      const SizedBox(
                        width: 20,
                      ),
                      buildSongCard('assets/art.jpeg', 'Monsters Go Bump',
                          'ERICA RECINOS'),
                      const SizedBox(
                        width: 20,
                      ),
                      buildSongCard('assets/album.jpeg', 'Monsters Go Bump',
                          'ERICA RECINOS')
                    ],
                  ),
                ),

                // second part

                const SizedBox(
                  height: 30,
                ),
                const Text(
                  'My Playlist',
                  style: TextStyle(
                      color: titleColor,
                      fontSize: 20,
                      fontFamily: 'Gilory',
                      fontWeight: FontWeight.bold),
                ),
                const SizedBox(
                  height: 15,
                ),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    // crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      buildSongCard('assets/album.jpeg', 'Monsters Go Bump',
                          'ERICA RECINOS'),
                      const SizedBox(
                        width: 20,
                      ),
                      buildSongCard('assets/album1.jpeg', 'Monsters Go Bump',
                          'ERICA RECINOS'),
                      const SizedBox(
                        width: 20,
                      ),
                      buildSongCard('assets/art.jpeg', 'Monsters Go Bump',
                          'ERICA RECINOS'),
                      const SizedBox(
                        width: 20,
                      ),
                      buildSongCard('assets/album3.jpeg', 'Monsters Go Bump',
                          'ERICA RECINOS')
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
        // floatingActionButton: FloatingActionButton(
        //   onPressed: _incrementCounter,
        //   tooltip: 'Increment',
        //   child: const Icon(Icons.add),
        // ), // This trailing comma makes auto-formatting nicer for build methods.
      ),
    );
  }

  GestureDetector buildSongCard(
      String imageLink, String title, String subTitle) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => const MainCollapsingToolbar()));
      },
      child: Column(
        children: [
          Container(
            decoration: BoxDecoration(
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.8),
                  spreadRadius: 3,
                  blurRadius: 2,
                  offset: const Offset(5, 7), // changes position of shadow
                ),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: Image.asset(
                imageLink,
                height: MediaQuery.of(context).size.width * 0.5,
                width: MediaQuery.of(context).size.width * 0.5,
              ),
            ),
          ),
          const SizedBox(
            height: 12,
          ),
          Text(
            title,
            style: const TextStyle(color: Colors.white),
          ),
          const SizedBox(
            height: 2,
          ),
          Text(
            subTitle,
            style: TextStyle(color: subTitleColor, fontSize: 11),
          )
        ],
      ),
    );
  }
}

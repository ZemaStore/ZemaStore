import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/flutter_icons.dart';
import 'package:page_transition/page_transition.dart';
import 'package:zema_store_mobile/constants/color.dart';
import 'package:zema_store_mobile/data_provider/songs_json.dart';
import 'package:zema_store_mobile/presentation/screens/common/album_page.dart';
import 'package:zema_store_mobile/presentation/widgets/song_row.dart';


class HomePageScreen12 extends StatefulWidget {
  static const String routeName = "/";
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePageScreen12> {
  int activeMenu1 = 0;
  int activeMenu2 = 2;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: black,
      appBar:getAppBar(),
      body: getBody(),
    );
  }

  getAppBar() {
    return AppBar(
      backgroundColor: black,
      elevation: 0,
      title: Padding(
        padding: const EdgeInsets.only(left: 10, right: 10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              "Explore",
              style: TextStyle(
                  fontSize: 20, color: white, fontWeight: FontWeight.bold),
            ),


            Icon(Entypo.list),
            IconButton(
              icon:Icon(Icons.search),
              onPressed: (){

              },
            ),
          ],
        ),
      ),
    );
  }

  Widget getBody() {
    return SingleChildScrollView(
      scrollDirection: Axis.vertical,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.only(left: 30, top: 10),
                  child: Row(
                      children: List.generate(song_type_1.length, (index) {
                        return Padding(
                          padding: const EdgeInsets.only(right: 25),
                          child: GestureDetector(
                            onTap: () {
                              setState(() {
                                activeMenu1 = index;
                              });
                            },
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  song_type_1[index],
                                  style: TextStyle(
                                      fontSize: 15,
                                      color: activeMenu1 == index ? primary : grey,
                                      fontWeight: FontWeight.w600),
                                ),
                                SizedBox(
                                  height: 3,
                                ),
                                activeMenu1 == index
                                    ? Container(
                                  width: 10,
                                  height: 3,
                                  decoration: BoxDecoration(
                                      color: primary,
                                      borderRadius: BorderRadius.circular(5)),
                                )
                                    : Container()
                              ],
                            ),
                          ),
                        );
                      })),
                ),
              ),
              SizedBox(
                height: 20,
              ),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.only(left: 30),
                  child: Row(
                    children: List.generate(songs.length - 5, (index) {
                      return Padding(
                        padding: const EdgeInsets.only(right: 30),
                        child: GestureDetector(
                          onTap: () {
                            Navigator.push(
                                context,
                                PageTransition(
                                    alignment: Alignment.bottomCenter,
                                    child: AlbumPage1(
                                      song: songs[index],
                                    ),
                                    type: PageTransitionType.scale));
                          },
                          child: Column(
                            children: [
                              Container(
                                width: 180,
                                height: 180,
                                decoration: BoxDecoration(
                                    image: DecorationImage(
                                        image: AssetImage(songs[index]['img']),
                                        fit: BoxFit.cover),
                                    color: primary,
                                    borderRadius: BorderRadius.circular(10)),
                              ),
                              SizedBox(
                                height: 20,
                              ),
                              Text(
                                songs[index]['title'],
                                style: TextStyle(
                                    fontSize: 15,
                                    color: white,
                                    fontWeight: FontWeight.w600),
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              Container(
                                width: 180,
                                child: Text(
                                  songs[index]['description'],
                                  maxLines: 1,
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      fontSize: 12,
                                      color: grey,
                                      fontWeight: FontWeight.w600),
                                ),
                              )
                            ],
                          ),
                        ),
                      );
                    }),
                  ),
                ),
              ),

            ],
          ),
          SizedBox(
            height: 10,
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.only(left: 30, top: 20),
                  child: Row(
                      children: List.generate(song_type_2.length, (index) {
                        return Padding(
                          padding: const EdgeInsets.only(right: 25),
                          child: GestureDetector(
                            onTap: () {
                              setState(() {
                                activeMenu2 = index;
                              });
                            },
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  song_type_2[index],
                                  style: TextStyle(
                                      fontSize: 15,
                                      color: activeMenu2 == index ? primary : grey,
                                      fontWeight: FontWeight.w600),
                                ),
                                SizedBox(
                                  height: 3,
                                ),
                                activeMenu2 == index
                                    ? Container(
                                  width: 10,
                                  height: 3,
                                  decoration: BoxDecoration(
                                      color: primary,
                                      borderRadius: BorderRadius.circular(5)),
                                )
                                    : Container()
                              ],
                            ),
                          ),
                        );
                      })),
                ),
              ),
              SizedBox(
                height: 20,
              ),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.only(left: 30),
                  child: Row(
                    children: List.generate(songs.length - 5, (index) {
                      return Padding(
                        padding: const EdgeInsets.only(right: 30),
                        child: GestureDetector(
                          onTap: () {
                            Navigator.push(
                                context,
                                PageTransition(
                                    alignment: Alignment.bottomCenter,
                                    child: AlbumPage1(
                                      song: songs[index + 5],
                                    ),
                                    type: PageTransitionType.scale));
                          },
                          child: Column(
                            children: [
                              Container(
                                width: 180,
                                height: 180,
                                decoration: BoxDecoration(
                                    image: DecorationImage(
                                        image:
                                        AssetImage(songs[index + 5]['img']),
                                        fit: BoxFit.cover),
                                    color: primary,
                                    borderRadius: BorderRadius.circular(10)),
                              ),
                              SizedBox(
                                height: 20,
                              ),
                              Text(
                                songs[index + 5]['title'],
                                style: TextStyle(
                                    fontSize: 15,
                                    color: white,
                                    fontWeight: FontWeight.w600),
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              Container(
                                width: 180,
                                child: Text(
                                  songs[index + 5]['description'],
                                  maxLines: 1,
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      fontSize: 12,
                                      color: grey,
                                      fontWeight: FontWeight.w600),
                                ),
                              )
                            ],
                          ),
                        ),
                      );
                    }),
                  ),
                ),
              ),
            // SizedBox(height: 20,),


            ],
          ),
          /*SizedBox(height: 20,),
          Container(
            child: Text(
              'TOP MUSICS',
              textAlign: TextAlign.center,

            ),
          ),
          SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child:Container(
              height: MediaQuery.of(context).size.height * 0.3 ,
              child: ListView.separated(
                itemBuilder: (context, index)=>Container(
                  decoration: (index==0)?
                  BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment(0.8, 0.0), // 10% of the width, so there are ten blinds.
                      colors: <Color>[
                        Color(0xffbf9292),
                        Color(0xffbf7777),
                        Color(0xff563b6c),
                        Color(0xff8047ad),
                      ], // red to yellow
                      tileMode: TileMode.clamp, // repeats the gradient over the canvas
                    ),
                  ):
                  BoxDecoration(),
                  child: ListTile(
                    trailing: PopupMenuButton(
                      // key: _menuKey,
                      onSelected: (value){
                        switch(value){
                          case 'fav':
                          // addToFav(songs[index], context);
                            break;
                          case 'crtnew':
                          //createPlaylist(SampleData().songs[index], context);
                            break;
                          case 'choose':
                          //choosePlaylist(SampleData().songs[index], context);
                            break;
                        }
                      },
                      itemBuilder: (BuildContext context) {
                        return <PopupMenuEntry>[
                          PopupMenuItem(child: Text('Recently Played'), value: 'rctlypld',),
                          PopupMenuItem(child: Text('Last Added'), value: 'lstadded',),
                          PopupMenuItem(child: Text('Choose playlist'), value: 'choose',),
                          PopupMenuItem(child: Text('Create New Playlist'), value: 'crtnew',),
                          PopupMenuItem(child: Text('Add To Favorite'), value: 'fav',),
                        ];
                      },
                      child: Icon(
                        Icons.add_box_rounded,
                        size: 30.0,
                        color: Colors.white,
                      ),
                    ),
                    leading: CircleAvatar(
                      backgroundImage:
                      AssetImage('assets/song.png'),
                      //AssetImage(songs[index].artUri) ,
                    ),
                    title: Text(
                      songs[index]['title'],
                      style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold
                      ),
                    ),
                    subtitle: Text(
                      '${songs[index]['description']}',
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                    onTap: () async {

                      // Navigator.push(context, new MaterialPageRoute(builder: (context)=> PlayerPage()));
                    },
                  ),
                ),

                separatorBuilder: (context, index)=>Divider(color: Colors.grey,thickness: 0.2,),
                itemCount: songs.length,),
            ) ,
          )*/
        ],
      ),
    );
  }
}

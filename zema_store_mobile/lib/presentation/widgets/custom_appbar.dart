import 'package:audio_service/audio_service.dart';
import 'package:autocomplete_textfield/autocomplete_textfield.dart';
import 'package:flutter/material.dart';
import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/presentation/screens/common/login.dart';
import 'package:zema_store_mobile/presentation/screens/common/home_page.dart';


class CustomAppBar extends StatefulWidget with PreferredSizeWidget {
  final String _title;

  @override
  final Size preferredSize;

  CustomAppBar(this._title, { Key? key}) : preferredSize = Size.fromHeight(160.0),
        super(key: key);

  @override
  _CustomAppBarState createState() => _CustomAppBarState();
}

class _CustomAppBarState extends State<CustomAppBar> {

  TextEditingController searchController = TextEditingController();
  GlobalKey<AutoCompleteTextFieldState<Song>> key = GlobalKey();
  late AutoCompleteTextField searchTextField;
  Song song1 = Song(resource_id: 'resource_id', url: 'assets/no_cover.png', title: 'love you ', genre:Genre.values[0] ,isSingle: true, album_id: '', tags: ['a','b'], artist_id: 'aster', views: 10, length:Duration(hours: 2, minutes: 3, seconds: 2), releasedDate: DateTime.utc(1989, 11, 9));
  Song song2 = Song(resource_id: 'resource_id', url: 'assets/no_cover.png', title: 'love you ', genre:Genre.values[0] ,isSingle: true, album_id: '', tags: ['a','b'], artist_id: 'aster', views: 10, length:Duration(hours: 2, minutes: 3, seconds: 2), releasedDate: DateTime.utc(1989, 11, 9));

  List<Song>songs  = [ Song(resource_id: 'resource_id', url: 'assets/no_cover.png', title: 'love you ', genre:Genre.values[0] ,isSingle: true, album_id: '', tags: ['a','b'], artist_id: 'aster', views: 10, length:Duration(hours: 2, minutes: 3, seconds: 2), releasedDate: DateTime.utc(1989, 11, 9)), Song(resource_id: 'resource_id', url: 'assets/no_cover.png', title: 'love you ', genre:Genre.values[0] ,isSingle: true, album_id: '', tags: ['a','b'], artist_id: 'aster', views: 10, length:Duration(hours: 2, minutes: 3, seconds: 2), releasedDate: DateTime.utc(1989, 11, 9))

  ];
  @override
  Widget build(BuildContext context) {

    return AppBar(
      backgroundColor: Colors.black,
      flexibleSpace: SafeArea(
        child: Container(
          padding: EdgeInsets.only(left: 5.0),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Text(
                        'YOUR MUSIC',
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.w600
                        ),
                      )
                    ],
                  ),
                  Row(
                    children: [
                      IconButton(onPressed: ()=>{
                        showDialog(
                            context: context,
                            barrierColor: Colors.transparent,
                            builder: (BuildContext context) =>LoginPage()
                        )
                      }, icon: Icon(
                        Icons.menu,
                        color: Colors.brown,
                      )),
                    ],
                  ),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                      width: MediaQuery.of(context).size.width/1.6,
                      child: Column(
                        children: [
                          searchTextField = AutoCompleteTextField<Song>(
                            key: key,
                            itemBuilder: (context, item) {
                              return Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Column(
                                    children: [
                                      Expanded(child: Text(item.title,
                                        style: TextStyle(color: Colors.white),
                                      )),
                                      Expanded(child: Text(item.title,
                                        style: TextStyle(color: Colors.white),
                                      )),
                                    ],
                                  ),
                                  Expanded(child: Text(
                                    item.releasedDate.toString(),
                                    style: TextStyle(color: Colors.white),
                                  ))
                                ],
                              );
                            },
                            itemFilter: (item, query){
                              return item.title.toLowerCase().startsWith(query.toLowerCase());
                            },
                            itemSorter: (a, b) {
                              return a.title.compareTo(b.title);
                            },
                            itemSubmitted: (item){
                              setState(() {
                                searchTextField.textField.controller!.text = item.title;
                              });
                            },
                            suggestions: songs,
                            style: TextStyle(
                                color: Colors.grey
                            ),
                            decoration: InputDecoration(
                              prefixIcon: Icon(
                                Icons.search,
                                color: Colors.grey,
                              ),
                              hintText: 'Search Zema_store Songs',
                              hintStyle: TextStyle(
                                  color: Colors.grey
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.all(
                                  Radius.circular(15.0),
                                ),
                                borderSide: BorderSide(
                                  color: Colors.grey,
                                  width: 1.0,
                                ),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.all(
                                  Radius.circular(15.0),
                                ),
                                borderSide: BorderSide(
                                  color: Colors.grey,
                                  width: 1.0,
                                ),
                              ),
                            ),
                          ),
                        ],
                      )
                  ),
                  Row(
                    children: [
                      IconButton(onPressed: ()=>{}, icon: Icon(
                        Icons.shopping_cart,
                        color: Colors.pinkAccent,
                      )),
                      IconButton(onPressed: ()=>{}, icon: Icon(
                        Icons.settings_outlined,
                        color: Colors.brown,
                      )),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
      bottom: TabBar(
        isScrollable: true,
        tabs: choices.map<Widget>((Choice choice){
          return Tab(
            text: choice.title,
          );
        }).toList(),
        indicatorColor: Colors.transparent,
        labelStyle: TextStyle(
            fontWeight: FontWeight.w900,
            fontSize: 17.0
        ),
        unselectedLabelStyle: TextStyle(
            fontSize: 12.0,
            fontWeight: FontWeight.w400
        ),
      ),

    );
  }
}

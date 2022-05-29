

import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:zema_store_mobile/bloc/search/search.dart';
import 'package:zema_store_mobile/bloc/song/song.dart';
import 'package:zema_store_mobile/constants/color.dart';
import 'package:zema_store_mobile/presentation/widgets/song_row.dart';


class SongPageScreen extends StatefulWidget {
  static const String routeName = "/";
  @override
  _SongPageState createState() => _SongPageState();
}

class _SongPageState extends State<SongPageScreen> {
  SongBloc? songBloc;

  @override
  void initState() {
    songBloc = BlocProvider.of<SongBloc>(context);
    songBloc!.add(SongLoad());
    //searchFoodBloc.add(TextChanged(query: ))
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor:black,
      appBar: AppBar(
        actions: [
          IconButton(
              icon: Icon(Icons.search),
              onPressed: () {
                showSearch(
                    context: context,
                    delegate: SongSearch(
                        searchBloc: BlocProvider.of<SearchBloc>(context)));
              }),
        ],
      ),
      body: Container(
        child: BlocConsumer<SongBloc, SongState>(listener: (context, state) {
          if (state is SongOperationFailure) {
            Scaffold.of(context).showSnackBar(
              SnackBar(content: Text("There is an error")),
            );
          } else if (state is SongLoading) {
            CircularProgressIndicator();
          } else if (state is SongLoading || state is SongLoadedSucess && state.songs.length == 0) {
            Text("No Songs Are Available");
          }
        }, builder: (context, state) {
          if (state is SongLoading) {
            return CircularProgressIndicator();
          } else if (state is SongLoadedSucess) {
            if (state.songs.length > 0) {
              return ListView.separated(
                itemBuilder: (context, index)=>Container(
                  decoration: (index==0)?
                  BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment(0.8, 0.0), // 10% of the width, so there are ten blinds.
                      colors: <Color>[Color(0xffbf9292), Color(0xffbf7777), Color(0xff563b6c), Color(0xff8047ad),
                      ], // red to yellow
                      tileMode: TileMode.clamp, // repeats the gradient over the canvas
                    ),
                  ):
                  BoxDecoration(),
                  child: ListTile(
                    trailing: PopupMenuButton(
                      onSelected: (value){
                        switch(value){
                          case 'crtnew':
                            break;
                          case 'choose':

                            break;
                        }
                      },
                      itemBuilder: (BuildContext context) {
                        return <PopupMenuEntry>[
                          PopupMenuItem(child: Text('Choose playlist'), value: 'choose',),
                          PopupMenuItem(child: Text('Create New Playlist'), value: 'crtnew',),
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
                      AssetImage('assets/images/img_8.jpg')
                    ),
                    title: Text(
                      state.songs[index].title,
                      style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold
                      ),
                    ),
                    subtitle: Text(
                      '${state.songs[index].length}',
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                    onTap: () async {
                    },
                  ),
                ),

                separatorBuilder: (context, index)=>Divider(color: Colors.grey,thickness: 0.2,),
                itemCount: state.songs.length,);
            }
            return Card(
                child: Container(
                  width: double.infinity,
                  padding:
                  const EdgeInsets.symmetric(vertical: 10.0, horizontal: 15.0),
                  child: Text("No Songs Are Available",
                      style:
                      TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold)),
                ));
          }
          return Container();
        }),
      ),
    );
  }
}

class SongSearch extends SearchDelegate<List> {
  SearchBloc searchBloc;
  SongSearch({required this.searchBloc});
  String? queryString;
  @override
  List<Widget> buildActions(BuildContext context) {
    return [
      IconButton(
          icon: Icon(Icons.clear),
          onPressed: () {
            query = '';
          })
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {

    return IconButton(
      icon: Icon(Icons.arrow_back_ios),
      onPressed: () {
        Navigator.pop(context);
      },
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    queryString = query;
    searchBloc.add(Search(query: query));
    return BlocBuilder<SearchBloc, SearchState>(
      builder: (BuildContext context, SearchState state) {
        if (state is SearchUninitialized) {
          return Center(child: CircularProgressIndicator());
        }
        if (state is SearchError) {
          return Center(
            child: Text('Failed To Load the song'),
          );
        }
        if (state is SearchLoaded) {
          if (state.songs.isEmpty) {
            return Center(
              child: Text('CAN NOT found the song'),
            );
          }
          return Card(
            color: Colors.black54,
            child: ListView.builder(
                itemBuilder: (BuildContext context, int index) {
                  return Container(
                    child: InkWell(
                      onTap: () {

                      },
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                              height: 90,
                              width: 100,
                              child:Image(
                                image: AssetImage(
                                    'assets/images/img_8.jpg'
                                ),

                              )),
                          SizedBox(
                            width: 20,
                            height: 20,
                          ),
                          Text(state.songs[index].title),
                        ],
                      ),
                    ),
                  );

                  //Text(state.recipes[index].title);
                },
                padding: EdgeInsets.all(10.0),
                itemCount: state.songs.length),
          );
        }
        return Scaffold();
      },
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    return Center(
      child: Text('Search Songs'),
    );
  }
}


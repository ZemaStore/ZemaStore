import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:page_transition/page_transition.dart';
import 'package:zema_store_mobile/bloc/album/album.dart';
import 'package:zema_store_mobile/bloc/artist/artist.dart';
import 'package:zema_store_mobile/data_provider/songs_json.dart';
import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/presentation/screens/common/album_page.dart';


class AlbumPage extends StatefulWidget{

  _AlbumPageState createState() => _AlbumPageState();
}

class _AlbumPageState extends State<AlbumPage>{
  bool isLoading = true;
  late String e;
  AlbumBloc? albumBloc;

  @override
  void initState() {
    albumBloc = BlocProvider.of<AlbumBloc>(context);
    albumBloc!.add(AlbumLoad());
    super.initState();
  }
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      backgroundColor: Colors.black54,
      appBar: AppBar(
        title: Text('Pick  Some Album You Like'),
        centerTitle: true,
      ),
      body:  Container(
        child: BlocConsumer<AlbumBloc, AlbumState>(listener: (context, state) {
          if (state is AlbumOperationFailure) {
            Scaffold.of(context).showSnackBar(
              SnackBar(content: Text("There is an error")),
            );
          } else if (state is AlbumLoading) {
            CircularProgressIndicator();
          } else if (state is AlbumLoading || state is AlbumLoadedSucess && state.albums.length == 0) {
            Text("No Albums Are Available");
          }
        }, builder: (context, state) {
          if (state is AlbumLoading) {
            return CircularProgressIndicator();
          } else if (state is AlbumLoadedSucess) {
            if (state.albums.length > 0) {
              return Directionality(
                  textDirection: TextDirection.ltr,
                  child:  GestureDetector(
                        onTap: (){
                          Navigator.push(
                              context,
                              PageTransition(
                                  alignment: Alignment.bottomCenter,
                                  child: AlbumPage1(
                                      song:songs[1]
                                  ),
                                  type: PageTransitionType.scale));
                        },
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 5),
                          child: AnimationLimiter(
                              child: GridView.builder(
                                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                                      crossAxisCount: 4),
                                  itemCount: state.albums.length,
                                  itemBuilder: (BuildContext context, int index) {
                                    return AnimationConfiguration.staggeredGrid(
                                        columnCount: 3,
                                        position: index,
                                        duration: Duration(milliseconds: 1000),
                                        child: ScaleAnimation(
                                            child: FadeInAnimation(
                                                delay: Duration(milliseconds: 100),
                                                child: listItem(state.albums[index]))));
                                  })),
                        ) ,
                      ));
            }
            return Card(
                child: Container(
                  width: double.infinity,
                  padding:
                  const EdgeInsets.symmetric(vertical: 10.0, horizontal: 15.0),
                  child: Text("No Albums Are Available",
                      style:
                      TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold)),
                ));
          }
          return Container();
        }),
      ),
    );

  }

  Widget listItem(Album album) {
    return Card(

        color: Colors.transparent,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 130,
              height: 130,
              padding: EdgeInsets.all(4),
              child: Image.network(album.imageUrl),
            ),
            SizedBox(
              height: 16,
            ),
            Text(
              album.title,
              style: TextStyle(fontSize: 18),
            )
          ],
        ));
  }

}
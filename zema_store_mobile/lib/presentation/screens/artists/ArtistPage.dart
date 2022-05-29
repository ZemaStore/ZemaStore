import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:page_transition/page_transition.dart';
import 'package:zema_store_mobile/bloc/artist/artist.dart';
import 'package:zema_store_mobile/constants/color.dart';
import 'package:zema_store_mobile/data_provider/songs_json.dart';

import 'package:zema_store_mobile/models/artist.dart';
import 'package:zema_store_mobile/presentation/screens/common/album_page.dart';
import 'package:zema_store_mobile/presentation/screens/common/login_page.dart';


class ArtistPage extends StatefulWidget{
 _ArtistPageState createState() => _ArtistPageState();
}

class _ArtistPageState  extends State<ArtistPage> {

  bool isLoading = false;
  late String e;
  ArtistBloc? artistBloc;

  @override
  void initState(){
    artistBloc = BlocProvider.of<ArtistBloc>(context);
    artistBloc!.add(ArtistLoad());

    super.initState();
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black54,
      appBar: AppBar(
        title: Text('Pick  Some Artist You Like'),
        centerTitle: true,
      ),
      body:  Container(
        child: BlocConsumer<ArtistBloc, ArtistState>(listener: (context, state) {
          if (state is ArtistOperationFailure) {
            Scaffold.of(context).showSnackBar(
              SnackBar(content: Text("There is an error")),
            );
          } else if (state is ArtistLoading) {
            CircularProgressIndicator();
          } else if (state is ArtistLoading || state is ArtistLoadedSucess && state.artists.length == 0) {
            Text("No Artists Are Available");
          }
        }, builder: (context, state) {
          if (state is ArtistLoading) {
            return CircularProgressIndicator();
          } else if (state is ArtistLoadedSucess) {
            if (state.artists.length > 0) {
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
                              itemCount: state.artists.length,
                              itemBuilder: (BuildContext context, int index) {
                                return AnimationConfiguration.staggeredGrid(
                                    columnCount: 3,
                                    position: index,
                                    duration: Duration(milliseconds: 1000),
                                    child: ScaleAnimation(
                                        child: FadeInAnimation(
                                            delay: Duration(milliseconds: 100),
                                            child: listItem(state.artists[index]))));
                              })),
                    ) ,
                  ));
            }
            return Card(
                child: Container(
                  width: double.infinity,
                  padding:
                  const EdgeInsets.symmetric(vertical: 10.0, horizontal: 15.0),
                  child: Text(" No Artists  Are Available",
                      style:
                      TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold)),
                ));
          }
          return Container();
        }),
      ),
    );

  }

  Widget listItem(Artist artist) {
    return Card(

      color: Colors.transparent,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 60,
              height: 60,
              padding: EdgeInsets.all(4),
              child: Image.network(artist.photoUrl),
            ),
            SizedBox(
              height: 16,
            ),
            Text(
              artist.fullName,
              style: TextStyle(fontSize: 18),
            )
          ],
        ));
  }

}
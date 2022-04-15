
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:zema_store_mobile/bloc/song/song.dart';
import 'package:zema_store_mobile/models/models.dart';

// ignore: must_be_immutable
class HomePage extends StatelessWidget {
  static final String routeName = "/";
  final User user;
  HomePage({required this.user});

  @override
  Widget build(BuildContext context) {
    context.read<SongBloc>().add(SongLoad(user: user));

    return Scaffold(
      //drawer: MyDrawer(),
      appBar: AppBar(
        title: Text("Song List"),
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
              return ListView.builder(
                  itemCount: state.songs.length,
                  itemBuilder: (context, index) {
                    return InkWell(
                      onTap: () {

                      },
                    );
                  });
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
      floatingActionButton: (user.role_id == "")
          ? FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () {
        },
      )
          : null,
    );
  }
}

class SingleJobDetailArguments {
  final  Song song;
  final User user;

  SingleJobDetailArguments({required this.song, required this.user});
}

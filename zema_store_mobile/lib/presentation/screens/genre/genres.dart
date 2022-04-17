import 'package:flutter/material.dart';
import 'package:zema_store_mobile/models/genre.dart';

class Genres extends StatefulWidget {
  const Genres({ Key? key }) : super(key: key);

  @override
  _GenresState createState() => _GenresState();
}

class _GenresState extends State<Genres> {
  List<Genre> genres = [];
  bool isLoading = true;
  late String e;

  @override
  void initState(){
    getGenres();
    super.initState();
  }

  void getGenres() async{
    Genre  genre2 = Genre(id: 'id', name: 'POP');
    Genre  genre3 = Genre(id: 'id', name: 'Reggae');
    genres.add(genre2); genres.add(genre3);
    setState(() {
      isLoading = true;
    });
    try{
      if(genres.length == 0){
        setState(() {
          e = 'No genres found';
          isLoading = false;
        });
      }
      else{
        setState(() {
          e = '';
          isLoading = false;
        });
      }
    }catch(err){
      setState(() {
        e = err.toString();
        isLoading = false;
      });
    }
  }


  @override
  Widget build(BuildContext context) {
    if(isLoading){
      return Container(
        child: Center(
            child: Image.asset('assets/images/loading.gif')
        ),
      );
    }
    if (genres.length == 0 && !isLoading && e!=''){
      return Container(
          child: Center(
              child: Text(e,
                style: TextStyle(
                    color: Colors.grey
                ),
              )
          )
      );
    }
    if(genres.length !=0 && !isLoading){
      return Container(
        padding: EdgeInsets.all(10.0),
        child: GridView.builder(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2),
          itemBuilder: (_, index) => genreWidget(index),
          itemCount: genres.length,
        ),
      );
    }
    return Container();
  }

  Widget genreWidget(int index){
    return GestureDetector(
      onTap: (){
      },
      child: Container(
        margin: EdgeInsets.all(10.0),
        decoration: BoxDecoration(
            color: Colors.transparent,
            border: Border.all(
                color: Colors.grey,
                width: 1.2
            )
        ),
        child: Center(
          child: Text(
            genres[index].name,
            style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold
            ),
          ),
        ),
      ),
    );
  }

}
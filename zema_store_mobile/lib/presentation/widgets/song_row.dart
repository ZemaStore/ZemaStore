

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:zema_store_mobile/models/models.dart';

class SongRow extends StatelessWidget {
  final Song song;
  static final DateFormat formatter = DateFormat.MMMEd();

  const SongRow({Key? key, required this.song}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 20.0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Image.asset(
              'assets/images/img_1.jpg',
              scale: 1.0,
              height: 80.0,
              width: 60.0,
            ),
            SizedBox(
              width: 10.0,
            ),
            Container(
              alignment: Alignment.center,
              height: 100.0,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        song.title,
                        style: TextStyle(fontSize: 20.0),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 20.0,
                  ),
                  Text(
                      '',),//"Posted ${DateTime.now().difference(song.releaseDate).inDays} days ago"),
                  /*SizedBox(
                    height: 20.0,
                  ),*/
                  Row(
                    children: [
                      Text(
                          "${(song.length)} Length")
                    ],
                  ),
                ],
              ),
            )

          ],
        ),
      ),
    );
  }
}

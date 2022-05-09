import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class DialogBox {
  loading(BuildContext context){
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return Dialog(
          child: new Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              new CircularProgressIndicator(),
              new Text("Loading"),
            ],
          ),
        );
      },
    );
  }

  information(BuildContext context, String title, String description) {
    return showDialog(
      context: context,
      barrierDismissible: true,
      builder: (context) {
        return AlertDialog(
          title: Text(title),
          content: SingleChildScrollView(
            child: ListBody(
              children: [Text(description)],
            ),
          ),
          actions: [
            FlatButton(onPressed: ()=>Navigator.pop(context), child: Text('OK')),
          ],
        );
      },
    );
  }
}

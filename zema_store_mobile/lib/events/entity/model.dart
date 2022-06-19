import 'package:flutter/material.dart';

class Events{
  final String id;
  final String title;
  final String summery;
  final String urlToImage;
  final Map<String, dynamic> venue;
  final DateTime date;


  Events({required this.title, required this.summery, required this.urlToImage, required this.id, required this.date, required this.venue});

 factory Events.fromJson(Map<String, dynamic> json) {
   debugPrint('minasie');
      return Events(
        id: json['_id'] ?? 'Author',
        title: json['title'] ?? 'title',
        summery: json['summary']?? 'description',
        urlToImage: json['imageUrl'] ?? 'url',
        venue: json['venue'],
        date: DateTime.parse(json['date'])
      );
  }
}
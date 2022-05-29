import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:zema_store_mobile/models/event.dart';
import 'package:zema_store_mobile/models/models.dart';
class EventDataProvider {

  final _baseUrl = 'https://zema-store.herokuapp.com/api';
  late http.Client httpClient;



  Future<List<Event>> getEvents() async {
    final response = await http.get("$_baseUrl/events");
    if (response.statusCode == 200) {
      final events = jsonDecode(response.body) as List;
      final result = events.map((event) {
        var resultEvent = Event.fromJson(event);
        return resultEvent;
      }).toList();
      return result;
    } else {
      throw Exception('Failed to load events');
    }
  }
  Future<Event> getEvent(String id) async {
    final response = await http.get("$_baseUrl/events/$id");
    if (response.statusCode == 200) {
      final events = jsonDecode(response.body) ;
      final result = events.map((event) {
        var resultEvent = Event.fromJson(event);
        return resultEvent;
      });
      return result;
    } else {
      throw Exception('Failed to load event');
    }
  }




}
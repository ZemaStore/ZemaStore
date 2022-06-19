import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:tt/auth/data_provider/secure_storage.dart';

import '../entity/model.dart';
import 'package:http/http.dart' as http;

class EventsProvider {
  final http.Client httpClient;
  final SecureStorage secureStorage = SecureStorage();
  EventsProvider({required this.httpClient});

  Future<List<Events>> getEvents() async {
    final userToken = await secureStorage.getToken();

    final response = await httpClient.get(
        Uri.parse('https://zema-store.herokuapp.com/api/events'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $userToken',
        });

    if (response.statusCode == 200) {
      print(response.body);
      final events = jsonDecode(response.body)['data']['events'] as List;
      final eventsList = events.map((event) => Events.fromJson(event)).toList();
      debugPrint('what about this');

      return eventsList;
    } else {
      throw Exception('Something went wrong');
    }
  }
}

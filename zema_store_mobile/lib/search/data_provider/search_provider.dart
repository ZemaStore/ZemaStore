import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:tt/auth/data_provider/secure_storage.dart';

import '../../songs/entity/model.dart';
class SearchProvider{
  final http.Client httpClient;

  SearchProvider({required this.httpClient});
  SecureStorage secureStorage = SecureStorage();

  Future<List<Songs>> search(String searchTerm) async{
    final userToken = await secureStorage.getToken();
    final response = await httpClient.get(Uri.parse("https://zema-store.herokuapp.com/api/songs?search=title:$searchTerm"), headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer $userToken',
    });
    print(response.statusCode);
    if(response.statusCode == 200){
      print('passs');
      final songs = jsonDecode(response.body)['data']['songs'] as List;
      print(songs);
      final songsList = songs.map((song) => Songs.fromJson(song)).toList();

      return songsList;
    }else{
      print('oppps');
      throw Exception('jlskjdlfk');
    }

  }
}
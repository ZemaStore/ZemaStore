import 'package:tt/search/data_provider/search_provider.dart';

import '../../songs/entity/model.dart';

class SearchRepository{
  final SearchProvider provider;

  SearchRepository({required this.provider});
  Future<List<Songs>> search(String searchTerm) async{
    return await provider.search(searchTerm);
  }
}
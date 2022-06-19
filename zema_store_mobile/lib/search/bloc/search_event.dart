abstract class SearchEvent {}

class Search extends SearchEvent {
  final String searchTerm;
  Search({required this.searchTerm});
}



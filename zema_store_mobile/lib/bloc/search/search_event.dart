
import 'package:flutter/cupertino.dart';

abstract class SearchEvent {}

class Search extends SearchEvent {
  String query;

  Search({required this.query});

  @override
  List<Object> get props => [];
}

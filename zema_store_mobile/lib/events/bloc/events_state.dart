import 'package:equatable/equatable.dart';

import '../entity/model.dart';

abstract class EventsState extends Equatable{

}

class InitState extends EventsState{
  @override
  List<Object?> get props =>[];
}

class LoadingState extends EventsState{
  @override
  List<Object?> get props => [];
}

class LoadSuccessState extends EventsState{
  final List<Events> newsList;
  @override
  List<Object?> get props => [];

  LoadSuccessState({required this.newsList});
}

class LoadFailureState extends EventsState{
  final String errorMessage;
  @override
  List<Object?> get props => [];

  LoadFailureState({required this.errorMessage});
}



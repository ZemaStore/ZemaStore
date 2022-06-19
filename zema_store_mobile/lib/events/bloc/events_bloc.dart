
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tt/events/bloc/bloc.dart';
import 'package:tt/events/respository/events_repository.dart';

class EventsBloc extends Bloc<EventsEvent, EventsState>{
  final EventsRepository eventsRepository;
  EventsBloc({required this.eventsRepository}) : super(InitState()) {
    on<LoadEvents>((event, emit) async {
      emit(LoadingState());
      try {
        final events = await eventsRepository.getEvents();
        debugPrint('is it hear ${events.toString()}');

        emit(LoadSuccessState(newsList: events));
      } catch (e) {
        debugPrint('who');
        emit(LoadFailureState(errorMessage: e.toString()));
      }
    });
  }
}
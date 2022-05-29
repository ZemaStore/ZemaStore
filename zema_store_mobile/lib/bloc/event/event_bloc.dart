

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:zema_store_mobile/bloc/event/event.dart';
import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/repository/event_repository.dart';

class EventBloc extends Bloc<Event_Event, EventState> {
  final EventRepository eventRepository;

  EventBloc({required this.eventRepository})
      : assert(eventRepository != null),
        super(EventLoading());

  @override
  Stream<EventState> mapEventToState(Event_Event event) async* {
    if (event is EventLoad) {
      yield EventLoading();
      try {
        List<Event> events = [];
        events  = await eventRepository.getEvents();
        yield EventLoadedSucess(events: events);
      } catch (_) {
        yield EventOperationFailure();
      }
    }
  }
}

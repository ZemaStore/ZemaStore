

import 'package:zema_store_mobile/models/models.dart';

abstract class Event_Event  {
  const Event_Event();
}

class EventLoad extends Event_Event {
  final Event event;
  const EventLoad({ required this.event});

  @override
  List<Object> get props => [];
}

import 'package:zema_store_mobile/models/models.dart';

class EventState{
  const EventState();

  List<Object> get props => [];
}
class EventLoading extends EventState{

}
class EventLoadedSucess extends EventState{
  final List<Event> events ;
  EventLoadedSucess({required this.events});

  List<Object> get props => [events];

}
class EventOperationFailure extends EventState{

}

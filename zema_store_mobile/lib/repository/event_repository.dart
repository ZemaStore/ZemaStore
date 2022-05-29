
import 'package:zema_store_mobile/data_provider/data_provider.dart';
import 'package:zema_store_mobile/models/event.dart';

class EventRepository{

  EventDataProvider eventDataProvider;

  EventRepository({required this.eventDataProvider});


  Future<List<Event>> getEvents(){
    return eventDataProvider.getEvents();
  }

  Future<Event> getEvent(String id){
    return eventDataProvider.getEvent(id);
  }


}
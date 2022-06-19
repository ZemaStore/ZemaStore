
import 'package:tt/events/data_provider/event_provider.dart';
import 'package:tt/events/entity/model.dart';

class EventsRepository {
  final EventsProvider provider;
  EventsRepository({required this.provider});

  // get News List
  Future<List<Events>> getEvents() async {
    return await provider.getEvents();
  }
}

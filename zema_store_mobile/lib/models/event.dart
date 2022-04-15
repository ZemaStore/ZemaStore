class Event{
  Event({
    required this.title,
    required this.venue,
    required this.event_date
});
  final String title;
  final String venue;
  final DateTime event_date;

  factory Event.fromJson(Map<String,dynamic> json){
    return Event(title: json['title'], venue: json['venue'], event_date: json['event_date']);
  }
}
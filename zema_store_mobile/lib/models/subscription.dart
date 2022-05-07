import 'dart:ffi';

class Subscription{

  Subscription({
    required this.subscriptionType,
    required this.subscriptionId,
    required this.summary,
    required this.price
  });
  final String subscriptionType;
  final String subscriptionId;
  final String summary;
  final Double price;

  factory Subscription.fromJson(Map<String,dynamic> json){
    return Subscription(
      subscriptionType: json['subscriptionType'], 
      subscriptionId: json['subscriptionId'], 
      summary: json['summary'], 
      price: json['price']
      );
  }
}



import 'models.dart';

class Customer {

  final String fullName;
  final String subscriptionId;



  Customer({
    required this.fullName,
    required this.subscriptionId
   });

  factory Customer.fromJson(Map<String,dynamic> json){
    return Customer(
      fullName: json['fullName'],
      subscriptionId: json['subscriptionId']
    );
  }
}


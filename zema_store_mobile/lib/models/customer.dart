


import 'models.dart';

class Customer extends User{

  final String first_name;
  final String last_name;
  final String customer_id;
  final String subscription_id;



  Customer({
    required String profile_id,
    required String email,
    required String password,
    required String role_id,
    required String status,
    required this.first_name,
    required this.last_name,
    required this.customer_id,
    required this.subscription_id,

   }) : super(profile_id: profile_id,email: email,password: password,role_id: role_id,status: status);

  factory Customer.fromJson(Map<String,dynamic> json){
    return Customer(profile_id: json['profile_id'],
        email: json['email'],
        password: json['password'],
        role_id: json['role_id'],
        status: json['status'],
        first_name: json['first_name'],
        last_name: json['last_name'],
        customer_id:json ['customer_id'],
        subscription_id: json['subscription_id']
    );
  }
}



enum subscription_level {
  subscribed,
  unsubscribed
}
class User {
  final String email;
  final String phone;
  final String profileId;
  final bool isActive;

  final String id;

  User(
      {required this.phone,
      required this.email,
      required this.id,
      required this.isActive,
      required this.profileId});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
        phone: json['phone'],
        email: json['email'],
        id: json['id'],
        isActive: json['isActive'],
        profileId: json['profileId']);
  }
}

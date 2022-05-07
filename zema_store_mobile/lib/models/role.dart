class Role {
  Role({
    required this.name,
    required this.createdAt,
    required this.updatedAt,
    });


  final String name;
  final DateTime createdAt;
  final DateTime updatedAt;

  @override
  List<Object> get props => [ name,createdAt,updatedAt];

  factory Role.fromJson(Map<String, dynamic> json) {
    
    return Role(
      name: json['name'],
      createdAt: json['createdAt'],
      updatedAt: json['updatedAt']
    );
  }
}
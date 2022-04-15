class Role {
  Role({required this.id, required this.name});

  final String id;
  final String name;

  @override
  List<Object> get props => [id, name];

  factory Role.fromJson(Map<String, dynamic> json) {
    return Role(
      id: json['_id'],
      name: json['name'],
    );
  }
}
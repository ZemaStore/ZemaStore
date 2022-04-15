abstract class RegisterEvent  {
  @override
  List<Object> get props => [];
}

class RegisterUser extends RegisterEvent {
  final String profile_id;
  final String email;
  final String password;
  // ignore: non_constant_identifier_names
  final String role_id;
  final String status;

  // ignore: non_constant_identifier_names
  RegisterUser({required this.profile_id, required this.email, required this.password, required this.role_id,required this.status});

  @override
  List<Object> get props => [profile_id, email, password, role_id,status];
}

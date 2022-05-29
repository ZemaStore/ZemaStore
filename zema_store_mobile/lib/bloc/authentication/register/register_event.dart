abstract class RegisterEvent  {
  @override
  List<Object> get props => [];
}

class RegisterUser extends RegisterEvent {

  final String email;
  final String password;
  // ignore: non_constant_identifier_names
  final String phone;
  final String fullName;
  // ignore: non_constant_identifier_names
  RegisterUser({
    required this.email,
    required this.fullName,
    required this.phone,
    required this.password,


  }
  );

  @override
  List<Object> get props => [ email, password,phone];
}

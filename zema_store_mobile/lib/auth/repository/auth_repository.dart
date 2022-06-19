import 'package:tt/auth/data_provider/auth_data.dart';
import 'package:tt/auth/entity/login.dart';

import '../entity/signup.dart';

class AuthRepository {
  final AuthDataProvider provider;
  AuthRepository({required this.provider});
  Future<LoginData> signUp(SignUpCrediential signUpCrediential) async {
    return await provider.signUp(signUpCrediential);
  }

  Future<LoginData> login(LoginCredientials loginCredientials) async {
    return await provider.logIn(loginCredientials);
  }

  Future<String> refresh(String token) async {
    return await provider.refresh(token);
  }
}

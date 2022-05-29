import 'package:zema_store_mobile/data_provider/authentication_data.dart';
import 'package:zema_store_mobile/models/models.dart';

class AuthenticationRepository {
  final AuthenticationDataProvider authenticationDataProvider;
  AuthenticationRepository({
    required this.authenticationDataProvider
});

  Future<User> login({required String email,required String password}) async{
    return await authenticationDataProvider.signInWithEmailAndPassword(email, password);

  }
  Future<bool> register({required String fullName,required String email,required String password,required String phone}) async{
    return await  authenticationDataProvider.signUpWithEmailAndPassword(fullName,email,password,phone);
  }

  Future<User?> getCurrentUser() async{
    return await authenticationDataProvider.getCurrentUser();
  }
  void logOut(){
    authenticationDataProvider.signOut();
  }
}
import 'package:zema_store_mobile/data_provider/authentication_data.dart';
import 'package:zema_store_mobile/models/models.dart';

class AuthenticationRepository {
  late final AuthenticationDataProvider authenticationDataProvider;
  AuthenticationRepository({
    required this.authenticationDataProvider
});

  Future<User> login({required String email,required String password}) async{
    return authenticationDataProvider.signInWithEmailAndPassword(email, password);

  }
  Future<bool> register({required String profile_id,required String email,required String password,required String role_id,required String status}) async{
    return authenticationDataProvider.signUpWithEmailAndPassword(profile_id, email, password, role_id, status);
  }

  Future<User?> getCurrentUser() async{
    return await authenticationDataProvider.getCurrentUser();
  }
  void logOut(){
    authenticationDataProvider.signOut();
  }
}
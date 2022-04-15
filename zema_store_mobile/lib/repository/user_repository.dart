

import 'package:zema_store_mobile/data_provider/user_data_provider.dart';
import 'package:zema_store_mobile/models/models.dart';

class UserRepository {
  final UserDataProvider userDataProvider;

  UserRepository({required this.userDataProvider});


  Future<User> createUser(User user) async{
    return userDataProvider.createUser(user);
  }


  Future<List<User>> getUsers() async {
    return await userDataProvider.getUsers();
  }

  Future<void> updateUser(User user) async {
    await userDataProvider.updateUser(user);
  }

  Future<void> deleteUser(String id) async {
    await userDataProvider.deleteUser(id);
  }
}
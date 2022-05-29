

import 'package:zema_store_mobile/data_provider/user_data_provider.dart';
import 'package:zema_store_mobile/models/models.dart';

class UserRepository {
  final UserDataProvider userDataProvider;

  UserRepository({required this.userDataProvider});

  Future<List<User>> getUsers() async {
    return await userDataProvider.getUsers();
  }

}
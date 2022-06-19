

import 'package:tt/user/data_provider/user_provider.dart';
import 'package:tt/user/entity/model.dart';

class UsersRepository {
  final UsersProvider provider;
  UsersRepository({required this.provider});

  // get News List
  Future<List<User>> getUsers() async {
    return await provider.getUsers();
  }
}

import 'package:zema_store_mobile/data_provider/role_data.dart';
import 'package:zema_store_mobile/models/models.dart';

class RoleRepository{
  RoleDataProvider roleDataProvider;

  RoleRepository({required this.roleDataProvider});

  Future<Role> createRole(Role role) async{
    return await roleDataProvider.createRole(role);
  }

  Future<List<Role>> getRoles() async {
    return await roleDataProvider.getRoles();
  }

  Future<void> deleteRole(String id) async {
    await roleDataProvider.deleteRole(id);
  }
}
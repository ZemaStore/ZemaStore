

import 'dart:async';
import 'dart:convert';
import 'dart:core';
import 'dart:core';

import 'package:zema_store_mobile/models/models.dart';
import 'package:http/http.dart' as http;
class RoleDataProvider {

  final String token;
  final _baseUrl = 'http://10.0.2.2:8383/api';

  RoleDataProvider({required this.token});


  Future<Role> createRole(Role role) async{
    final response = await http.post('$_baseUrl/roles',
      headers: <String,String>{
      'authorization' :'$token',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String,dynamic>{
        'name' : role.name.toString(),
      })
    );
    if(response.statusCode == 200){
      return Role.fromJson(jsonDecode(response.body));
    }
    else {
      throw Exception('failed to create role');
    }

  }
  Future<List<Role>> getRoles() async{
    final response  =  await http.get('$_baseUrl/roles');

    if(response.statusCode == 200){
      final roles  = jsonDecode(response.body) as List;
      return roles.map((role) => Role.fromJson(role)).toList();
    }
    else {
      throw Exception('failed to get roles');
    }
  }
  Future<void> deleteRole(String id) async{
    final response  = await http.delete('$_baseUrl/roles/$id',headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8'
    },);
    if(response.statusCode != 201){
      throw Exception('Failed to delete role');
    }
  }
}
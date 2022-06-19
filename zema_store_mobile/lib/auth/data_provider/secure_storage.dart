import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:tt/auth/data_provider/auth_data.dart';
import 'package:tt/auth/entity/user.dart';


class SecureStorage {
  static SecureStorage? instance;

  factory SecureStorage() =>
      instance ??= SecureStorage._(const FlutterSecureStorage());

  SecureStorage._(this._storage);

  final FlutterSecureStorage _storage;
  static const _tokenKey = 'TOKEN';
  static const _rTokenKey = 'RTOKEN';
  static const _emailKey = 'EMAIL';
  static const _userIDKey = '_id';
  static const _phone = '_id';
  static const _profileID = '_idProfile';


  Future<void> persistUserData(LoginData data) async {
    print('here');
    await _storage.write(key: _emailKey, value: data.user.email);
    await _storage.write(key: _tokenKey, value: data.accessToken);
    await _storage.write(key: _rTokenKey, value: data.refreshToken);
    await _storage.write(key: _userIDKey, value: data.user.id);
    await _storage.write(key: _phone, value: data.user.phone);
    await _storage.write(key: _profileID, value: data.user.profileId);
print('and here');
  }

  Future<bool> hasToken() async {
    var value = await _storage.read(key: _tokenKey);
    return value != null;
  }

  Future<bool> hasEmail() async {
    var value = await _storage.read(key: _emailKey);
    return value != null;
  }

  Future<void> deleteToken() async {
    return _storage.delete(key: _tokenKey);
  }

  Future<void> deleteEmail() async {
    return _storage.delete(key: _emailKey);
  }


  Future<String?> getToken() async {
    return await _storage.read(key: _tokenKey);
  }

  Future<LoginData> getLoginData() async {
    String? email = await _storage.read(key: _emailKey);
    String? id = await _storage.read(key: _userIDKey);
    String? profile = await _storage.read(key: _profileID);
    String? phone = await _storage.read(key: _phone);
    String? access = await _storage.read(key: _tokenKey);
    String? refresh = await _storage.read(key: _rTokenKey);

    return LoginData(accessToken: access, refreshToken: refresh, user: User(id: id!, email: email!, isActive: false, phone: phone!, profileId: profile!));
  }


  Future<void> deleteAll() async {
    await _storage.deleteAll();
  }
}
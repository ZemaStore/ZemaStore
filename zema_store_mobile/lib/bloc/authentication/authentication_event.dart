import 'package:zema_store_mobile/models/models.dart';

abstract class AuthenticationEvent {
  const AuthenticationEvent();

  @override
  List<Object> get props => [];
}

class AppLoaded extends AuthenticationEvent {}

class UserLoggedIn extends AuthenticationEvent {
  final User user;

  UserLoggedIn({required this.user});
  @override
  List<Object> get props => [user];
}

class UserLoggedOut extends AuthenticationEvent {}

import 'package:equatable/equatable.dart';
import 'package:tt/auth/data_provider/auth_data.dart';

abstract class AuthState extends Equatable{

}

class AuthInitialState extends AuthState{
  @override

  List<Object?> get props => [];
}
class AuthLoadingState extends AuthState{
  @override

  List<Object?> get props => [];
}
class AuthSuccessState extends AuthState{
  final LoginData loginData;
  AuthSuccessState({required this.loginData});
  @override

  List<Object?> get props => [];
}
class AuthLoginSuccessState extends AuthState{
  final LoginData loginData;
  AuthLoginSuccessState({required this.loginData});
  @override

  List<Object?> get props => [];
}
class AuthErrorState extends AuthState{
  final String errorMessage;
  AuthErrorState({required this.errorMessage});
  @override

  List<Object?> get props => [];
}

class AuthLoginErrorState extends AuthState{
  final String errorMessage;
  AuthLoginErrorState({required this.errorMessage});
  @override

  List<Object?> get props => [];
}

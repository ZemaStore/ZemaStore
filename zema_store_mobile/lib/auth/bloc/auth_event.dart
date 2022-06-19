import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:tt/auth/entity/login.dart';
import 'package:tt/auth/entity/signup.dart';

abstract class AuthEvent extends Equatable{}

class RegisterEvent extends AuthEvent{
  final SignUpCrediential crediential;
  RegisterEvent({required this.crediential});

  @override
  List<Object?> get props => [];
}

class LoginEvent extends AuthEvent{
  final LoginCredientials crediential;
  LoginEvent({required this.crediential});

  @override
  List<Object?> get props => [];
}

class AppStarted extends AuthEvent{

  @override
  List<Object?> get props => [];
}

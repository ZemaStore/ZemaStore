
import 'dart:math';

import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:jwt_decode/jwt_decode.dart';
import 'package:tt/auth/bloc/auth_event.dart';
import 'package:tt/auth/bloc/auth_state.dart';
import 'package:tt/auth/data_provider/secure_storage.dart';
import 'package:tt/auth/repository/auth_repository.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState>{
  final AuthRepository authRepository;
  AuthBloc({required this.authRepository}) : super(AuthInitialState()) {
    on<RegisterEvent>((event, emit) async {
      emit(AuthLoadingState());
      try {
        print('user1 ${event.crediential.firstName} ${event.crediential.lastName} ${event.crediential.phoneNumber} ${event.crediential.password} ${event.crediential.email}');
        final playlists = await authRepository.signUp(event.crediential);
        SecureStorage secureStorage = SecureStorage();
        // await secureStorage.deleteAll();
        print('before');
        print(playlists);
        secureStorage.persistUserData(playlists);
        emit(AuthSuccessState(loginData:  playlists));
      } catch (e) {
        emit(AuthErrorState(errorMessage: e.toString()));
      }
    });

    on<LoginEvent>((event, emit) async {
      emit(AuthLoadingState());
      try {
        final playlists = await authRepository.login(event.crediential);
        // debugPrint('is it hear ${playlists.user.email}');
        SecureStorage secureStorage = SecureStorage();
        await secureStorage.deleteAll();
        secureStorage.persistUserData(playlists);
        // print('lets see ${await secureStorage.getToken()}');
        emit(AuthLoginSuccessState(loginData: playlists));
      } catch (e) {
        emit(AuthLoginErrorState(errorMessage: e.toString()));
      }
    });

    on<AppStarted>((event, emit) async {
      emit(AuthLoadingState());
      try {
        SecureStorage secureStorage = SecureStorage();
        final logInDate = await secureStorage.getLoginData(
        );
        // print('lets see ${await secureStorage.getToken()}');
        final expiredToken = Jwt.isExpired(logInDate.accessToken);
        if(expiredToken){
          print('ever hrere');
          final playlists = await authRepository.refresh(logInDate.refreshToken);
        }
        emit(AuthLoginSuccessState(loginData: logInDate));
      } catch (e) {
        emit(AuthLoginErrorState(errorMessage: e.toString()));
      }
    });
  }
}
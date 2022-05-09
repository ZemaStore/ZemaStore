import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:zema_store_mobile/data_provider/authentication_data.dart';
import 'package:zema_store_mobile/data_provider/sample_data.dart';
import 'package:zema_store_mobile/models/user.dart';
import 'package:zema_store_mobile/presentation/screens/common/home_page.dart';
import 'package:zema_store_mobile/presentation/screens/common/login_page.dart';
import 'package:zema_store_mobile/repository/repository.dart';

import 'bloc/authentication/authentication.dart';
import 'bloc/authentication/login/login.dart';
import 'bloc/authentication/register/register_bloc.dart';

import 'package:http/http.dart' as http;

import 'presentation/screens/common/login.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  late AuthenticationRepository authenticationRepository = AuthenticationRepository(authenticationDataProvider: AuthenticationDataProvider());

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
        providers:[
          BlocProvider<AuthenticationBloc>(
              create: (context) =>
              AuthenticationBloc(this.authenticationRepository)
                ..add(AppLoaded())),
          BlocProvider<LoginBloc>(
              create: (context) => LoginBloc(
                  authenticationBloc:
                  AuthenticationBloc(authenticationRepository),
                  authenticationRepository: this.authenticationRepository)),
          BlocProvider<RegisterBloc>(
              create: (context) => RegisterBloc(
                  authenticationBloc:
                  AuthenticationBloc(authenticationRepository),
                  authenticationRepository: this.authenticationRepository)),
        ],
        child:
        MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),

      home: LoginPage(),
      //HomePage(user: SampleData().user,),
    ));
  }
}




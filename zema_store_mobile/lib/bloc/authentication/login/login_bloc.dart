
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:zema_store_mobile/bloc/authentication/login/login.dart';
import 'package:zema_store_mobile/data_provider/authentication_data.dart';
import 'package:zema_store_mobile/repository/authentication_repository.dart';

import '../authentication.dart';

class LoginBloc extends Bloc<LoginEvent,LoginState>{
  final AuthenticationBloc authenticationBloc;
  final AuthenticationRepository authenticationRepository;

  LoginBloc({required this.authenticationBloc,required this.authenticationRepository})
      : super(LoginInitial());

  @override
  Stream<LoginState> mapEventToState(LoginEvent event) async* {
    if (event is LoginInWithEmailButtonPressed) {
      yield* _mapLoginWithEmailToState(event);
    }
  }

  Stream<LoginState> _mapLoginWithEmailToState(
      LoginInWithEmailButtonPressed event) async* {
    yield LoginLoading();

    try {
      final user = await authenticationRepository.login(
          email: event.email, password: event.password);
      if (user != null) {
        authenticationBloc.add(UserLoggedIn(user: user));
        yield LoginSuccess();
        yield LoginInitial();
      } else {
        yield LoginFailure(error: 'Something very weird just happened');
      }
    } on AuthenticationException catch (e) {
      yield LoginFailure(error: e.message);
    } catch (err) {
      yield LoginFailure(error:'An unknown error occured');
    }
  }
}
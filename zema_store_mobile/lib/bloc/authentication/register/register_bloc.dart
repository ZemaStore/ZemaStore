

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:zema_store_mobile/data_provider/authentication_data.dart';
import 'package:zema_store_mobile/repository/authentication_repository.dart';

import '../authentication.dart';
import 'register.dart';

class RegisterBloc extends Bloc<RegisterEvent, RegisterState> {
  final AuthenticationBloc authenticationBloc;
  final AuthenticationRepository authenticationRepository;

  RegisterBloc({required this.authenticationBloc, required this.authenticationRepository})
      : super(RegisterInitial());

  @override
  Stream<RegisterState> mapEventToState(RegisterEvent event) async* {
    if (event is RegisterUser) {
      yield* _mapSeekerRegisterWithEmailToState(event);
    }
  }

  Stream<RegisterState> _mapSeekerRegisterWithEmailToState(
      RegisterUser event) async* {
    yield RegisterLoading();
    try {
      final bool isCreated = await authenticationRepository.register(
          email: event.email,
          password: event.password,
          phone: event.phone,
          fullName: event.fullName,
      );

      print("logged in user $isCreated");

      if (isCreated) {
        yield RegisterSuccess();
        yield RegisterInitial();
      } else {
        yield RegisterFailure(error: 'Something very weird just happened');
      }
    } on AuthenticationException catch (e) {
      yield RegisterFailure(error: e.message);
    } catch (err) {
      yield RegisterFailure(error: 'An unknown error occured');
    }
  }
}
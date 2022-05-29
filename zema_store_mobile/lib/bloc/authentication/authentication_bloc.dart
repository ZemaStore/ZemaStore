
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:zema_store_mobile/bloc/authentication/authentication.dart';
import 'package:zema_store_mobile/repository/authentication_repository.dart';

class AuthenticationBloc extends Bloc<AuthenticationEvent,AuthenticationState>{
  final AuthenticationRepository _authenticationRepository;

  AuthenticationBloc(AuthenticationRepository authenticationRepository)
      : assert(authenticationRepository != null),
        _authenticationRepository = authenticationRepository,
        super(AuthenticationInitial());

  Stream<AuthenticationState> _mapAppLoadedToState(AppLoaded event) async* {
    yield AuthenticationLoading();
    try {
      await Future.delayed(Duration(milliseconds: 500)); // a simulated delay
      final currentUser = await _authenticationRepository.getCurrentUser();
      print('##########################################################################################################');
      if (currentUser != null) {
        yield AuthenticationAuthenticated(user: currentUser);
      } else {
        yield AuthenticationNotAuthenticated();
      }
    } catch (e) {
      yield AuthenticationFailure(
          message: 'An unknown error occurred');
    }
  }

  Stream<AuthenticationState> _mapUserLoggedInToState(
      UserLoggedIn event) async* {
    yield AuthenticationAuthenticated(user: event.user);
  }

  Stream<AuthenticationState> _mapUserLoggedOutToState(
      UserLoggedOut event) async* {
    _authenticationRepository.logOut();
    yield AuthenticationNotAuthenticated();
  }

  @override
  Stream<AuthenticationState> mapEventToState(
      AuthenticationEvent event) async* {
    if (event is AppLoaded) {
      yield* _mapAppLoadedToState(event);
    }
    if (event is UserLoggedIn) {
      yield* _mapUserLoggedInToState(event);
    }

    if (event is UserLoggedOut) {
      yield* _mapUserLoggedOutToState(event);
    }
  }
}
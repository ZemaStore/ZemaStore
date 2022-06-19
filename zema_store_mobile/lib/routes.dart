import 'package:flutter/material.dart';
import 'package:tt/auth/screens/login/login_page.dart';
import 'package:tt/auth/screens/register/register_page.dart';
import 'package:tt/main.dart';
import 'package:tt/playlist/screens/pick_artists.dart';
import 'package:tt/playlist/screens/pick_geners.dart';

class PageRouter {
  static Route? generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case "/":
        return MaterialPageRoute(builder: (context) {
          return const HomePage();
        });
      case LoginFormValidation.routeName:
        return MaterialPageRoute(builder: (context) {
          return LoginFormValidation();
        });

      case RegisterFormValidation.routeName:
        return MaterialPageRoute(builder: (context) {
          return RegisterFormValidation();
        });

      case PickSomeGeneres.routeName:
        return MaterialPageRoute(builder: (context) {
          return  PickSomeGeneres();
        });

      case PickSomeArtists.routeName:
        return MaterialPageRoute(builder: (context) {
          return  PickSomeArtists();
        });
    }
  }
}
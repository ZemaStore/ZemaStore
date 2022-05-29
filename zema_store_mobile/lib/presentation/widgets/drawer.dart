
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:zema_store_mobile/bloc/authentication/authentication.dart';
import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/presentation/screens/common/login_page.dart';

class MyDrawer extends StatelessWidget {
  final User? user;
  const MyDrawer({Key? key, this.user}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      elevation: 32.0,
      child: Container(
        decoration: BoxDecoration(
          color: Colors.black54,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            createDrawerHeader(),
            (user?.roleId == "customers")
                ? ListTile(
              leading: Icon(Icons.note_outlined),
              title: Text(
                'My Songs',
                style: TextStyle(fontSize: 18.0),
              ),
              onTap: () {

              },
            )
                : SizedBox(),
            ListTile(
              leading: Icon(Icons.edit_outlined),
              title: Text(
                'Edit Account',
                style: TextStyle(fontSize: 18.0),
              ),
              onTap: () {
              },
            ),
            ListTile(
              leading: Icon(Icons.logout),
              title: Text(
                'Logout',
                style: TextStyle(
                  fontSize: 18.0,
                ),
              ),
              onTap: () {
                BlocProvider.of<AuthenticationBloc>(context)
                    .add(UserLoggedOut());
                Navigator.pushNamedAndRemoveUntil(
                    context, LoginPage1.routeName, (route) => false);
              },
            ),
            Spacer(flex: 1),
            ListTile(
              leading: Icon(Icons.close_outlined),
              title: Text(
                'Close',
                style: TextStyle(fontSize: 18.0),
              ),
              onTap: () {
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget createDrawerHeader() {
    return BlocBuilder<AuthenticationBloc, AuthenticationState>(
        builder: (context, state) {
          if (state is AuthenticationAuthenticated) {
            return UserAccountsDrawerHeader(
              accountEmail: Text(state.user.email),
              accountName: Text('Hawltu Yenealem'),
              onDetailsPressed: () => {},
              currentAccountPicture: CircleAvatar(
                backgroundImage: AssetImage('assets/images/img_5.jpg'),
              ),
              margin: EdgeInsets.zero,
              // padding: EdgeInsets.zero,
              decoration: BoxDecoration(
                  image: DecorationImage(
                      fit: BoxFit.cover,
                      image: AssetImage('assets/images/img_5.jpg'))),
            );
          }
          return UserAccountsDrawerHeader(
            accountEmail: Text("nathaniel.awel@gmail.com"),
            accountName: Text("Nathaniel Hussein"),
            onDetailsPressed: () => {},
            currentAccountPicture: CircleAvatar(
              backgroundImage: AssetImage('assets/images/img_5.jpg'),
            ),
            margin: EdgeInsets.zero,
            // padding: EdgeInsets.zero,
            decoration: BoxDecoration(
                image: DecorationImage(
                    fit: BoxFit.cover,
                    image: AssetImage('assets/images/img_5.jpg'))),
          );
        });
  }
}

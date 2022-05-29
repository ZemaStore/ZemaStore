
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:zema_store_mobile/bloc/authentication/authentication.dart';
import 'package:zema_store_mobile/bloc/authentication/login/login.dart';
import 'package:zema_store_mobile/bloc/authentication/login/login_bloc.dart';
import 'package:zema_store_mobile/bloc/song/song.dart';
import 'package:zema_store_mobile/constants/color.dart';
import 'package:zema_store_mobile/models/models.dart';
import 'package:zema_store_mobile/presentation/screens/albums/albumPage.dart';
import 'package:zema_store_mobile/presentation/screens/artists/ArtistPage.dart';
import 'package:zema_store_mobile/presentation/screens/common/HomePage.dart';
import 'package:zema_store_mobile/presentation/screens/common/register.dart';
import 'package:zema_store_mobile/presentation/screens/songs/song_page.dart';




class LoginPage1 extends StatefulWidget {
  static const String routeName = "/login";

  @override
  _LoginPage createState() => _LoginPage();
}

class _LoginPage extends State<LoginPage1> {
  bool _showPassword = false;
  String _email = "";
  String _password = "";
 late bool _isLoading;
  final _passwordController = TextEditingController();
  final _emailController = TextEditingController();
  final _formKey = new GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    _isLoading = false;
  }

  @override
  Widget build(BuildContext context) {
    final height = MediaQuery.of(context).size.height;
    bool isKeyboardShowing = MediaQuery.of(context).viewInsets.vertical > 0;
    Size size = MediaQuery.of(context).size;

    void _showError(String error, context) {
      Scaffold.of(context).showSnackBar(SnackBar(
        content: Text(error),
        backgroundColor: Theme.of(context).errorColor,
      ));
    }

    return Scaffold(
        resizeToAvoidBottomInset: false,
        body: BlocConsumer<LoginBloc, LoginState>(
            listener: (context, state) {
              if (state is AuthenticationFailure) {
                _showError("something went wrong", context);
              }
              if (state is LoginSuccess) {
                //BlocProvider.of<SongBloc>(context)..add(SongLoad());
                Navigator.push(context, new MaterialPageRoute(builder: (context) => AlbumPage()));

              }

            }, builder: (context, state) {
          return Stack(children: [
            Container(
              height: height,
              decoration: BoxDecoration(),
              child: Column(children: [
                Align(
                  alignment: Alignment.topCenter,
                  child: logo(isKeyboardShowing),
                ),
                Align(
                  alignment: isKeyboardShowing
                      ? Alignment.center
                      : Alignment.bottomCenter,
                  child: Form(
                      key: _formKey,
                      child: SingleChildScrollView(
                        child: Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 20.0, vertical: 20.0),
                          height: height * 0.6,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              _buildEmailTextField(),
                              SizedBox(
                                height: 20,
                              ),
                              _buildPasswordTextField(),
                              _forgotPasswordLabel(),
                              (state is AuthenticationLoading)
                                  ? CircularProgressIndicator()
                                  : _submitButton(context),
                              _createAccountLabel(),
                            ],
                          ),
                        ),
                      )),
                ),
              ]),
            ),
          ]);
        }));
  }
  Widget logo(isKeyboardShowing) {
    return ClipPath(
      clipper: BezierClipper(),
      child: Container(
          decoration: BoxDecoration(
              color: Color(0xFF1f40b7),
              gradient: LinearGradient(
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                  colors: [kBrown100, kBrown900])),
          width: double.infinity,
          height: isKeyboardShowing
              ? MediaQuery.of(context).size.height * 0.3
              : MediaQuery.of(context).size.height * 0.4,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(
                height: isKeyboardShowing ? 90 : 100,
                width: 500,

              ),
              SizedBox(
                height: isKeyboardShowing ? 10 : 30.0,
              ),
              Text(
                'Login',
                style: TextStyle(
                    fontSize: 30.0,
                    fontWeight: FontWeight.bold,
                    color: Colors.white),
              ),
            ],
          )),
    );
  }

  Widget _createAccountLabel() {
    return InkWell(
      onTap: () {

        Navigator.push(
            context, MaterialPageRoute(builder: (context) => SignUpPage()));
      },
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 10),
        padding: EdgeInsets.all(5),
        alignment: Alignment.bottomCenter,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Don\'t have an account ?',
              style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
            ),
            SizedBox(
              width: 10,
            ),
            Text(
              'Register',
              style: TextStyle(
                  color: Color(0xff4064f3),
                  fontSize: 13,
                  fontWeight: FontWeight.w600),
            ),
          ],
        ),
      ),
    );
  }

  Widget _forgotPasswordLabel() {
    return InkWell(
      onTap: () {
        // Navigator.push(
        //     context, MaterialPageRoute(builder: (context) => SignUpPage()));
      },
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 10),
        padding: EdgeInsets.all(5),
        alignment: Alignment.bottomCenter,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: <Widget>[
            Text(
              'Forgot Password?',
              style: TextStyle(
                  color: Color(0xff4064f3),
                  fontSize: 16,
                  fontWeight: FontWeight.w800),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEmailTextField() {
    return TextFormField(
      controller: _emailController,
      onChanged: (value) => _email = value.trim(),
      validator: (value) => !isEmail(value!)
          ? "Sorry, we do not recognize this email address"
          : null,
      keyboardType: TextInputType.emailAddress,
      decoration: InputDecoration(
        labelText: 'Email or phone number',
        labelStyle: Theme.of(context).textTheme.bodyText1,
        floatingLabelBehavior: FloatingLabelBehavior.auto,
        // alignLabelWithHint: true,
        prefixIcon: Icon(
          Icons.alternate_email,
          color: Theme.of(context).iconTheme.color,
        ),
        // hintText: 'Enter your email',
        border: InputBorder.none,
        filled: true,
        fillColor: Theme.of(context).cardTheme.color,
      ),
    );
  }

  Widget _buildPasswordTextField() {
    return TextFormField(
      controller: _passwordController,
      validator: (value) => value!.length < 4
          ? "Password must be 4 or more characters in length"
          : null,
      onChanged: (value) => _password = value.trim(),
      obscureText: !this._showPassword,
      onSaved: (value) => _password = value!,
      keyboardType: TextInputType.text,
      decoration: InputDecoration(
        labelText: 'Password',
        focusColor: Color(0xff4064f3),
        labelStyle: TextStyle(
          color: Color(0xff4064f3),
        ),
        border: InputBorder.none,
        filled: true,
        fillColor: Theme.of(context).cardTheme.color,

        // fillColor: Color(0xfff3f3f4),
        prefixIcon: Icon(
          Icons.security,
          color: Theme.of(context).iconTheme.color,
        ),
        suffixIcon: IconButton(
          icon: this._showPassword
              ? FaIcon(FontAwesomeIcons.eye)
              : FaIcon(FontAwesomeIcons.eyeSlash),
          color: Theme.of(context).iconTheme.color,
          onPressed: () {
            setState(() => this._showPassword = !this._showPassword);
          },
        ),
      ),
    );
  }

  Widget _submitButton(context) {
    return InkWell(
      onTap: () {
        final form = _formKey.currentState;
        if (form!.validate()) {
          form.save();
          BlocProvider.of<LoginBloc>(context).add(LoginInWithEmailButtonPressed(
              email: _email, password: _password));
        }

      },
      child: Container(
        width: MediaQuery.of(context).size.width,
        padding: EdgeInsets.symmetric(vertical: 15),
        alignment: Alignment.center,
        decoration: BoxDecoration(
            borderRadius: BorderRadius.all(Radius.circular(5)),
            boxShadow: <BoxShadow>[
              BoxShadow(
                  color: Colors.grey.shade200,
                  offset: Offset(2, 4),
                  blurRadius: 5,
                  spreadRadius: 2)
            ],
            gradient: LinearGradient(
                begin: Alignment.centerLeft,
                end: Alignment.centerRight,
                colors: [kBrown200, kBrown900])),
        child: Text('Login',
            style: TextStyle(color: Colors.white, fontSize: 18.0)),
      ),
    );
  }

  bool isEmail(String value) {
    String regex =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

    RegExp regExp = new RegExp(regex);

    return value.isNotEmpty && regExp.hasMatch(value);
  }
}

class BezierClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    Path path = new Path();
    path.lineTo(0, size.height * 0.9); //vertical line
    path.cubicTo(size.width / 3, size.height, 2 * size.width / 3,
        size.height * 0.7, size.width, size.height * 0.9); //cubic curve
    path.lineTo(size.width, 0); //vertical line
    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) => true;
}



import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:zema_store_mobile/bloc/authentication/register/register.dart';
import 'package:zema_store_mobile/constants/color.dart';
import 'package:zema_store_mobile/presentation/widgets/dialogue.dart';

import 'login.dart';

class SignUpPage extends StatefulWidget {
  static const String routeName = "/register";

 // final VoidCallback onSignedIn;
 // const SignUpPage({ required Key key, required this.onSignedIn}) : super(key: key);

  @override
  _SignUpPage createState() => _SignUpPage();
}

class _SignUpPage extends State<SignUpPage> {
  bool _showPassword = false;
  String _email = "";
  String _username = "";
  String _password = "";
  String _role_id = "";
  bool _isLoading = false;
  final _usernameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = new GlobalKey<FormState>();

  bool _isArtist = false;
  late AccountType selectedAccount;
  List<AccountType> accountTypes = [
    const AccountType(
        accountIcon: Icon(Icons.person), accountName: 'Job Seeker'),
    const AccountType(accountIcon: Icon(Icons.home), accountName: 'Company'),
  ];

  @override
  Widget build(BuildContext context) {
    final height = MediaQuery.of(context).size.height;
    bool isKeyboardShowing = MediaQuery.of(context).viewInsets.vertical > 0;

    void _showError(String error) {
      Scaffold.of(context).showSnackBar(SnackBar(
        content: Text(error),
        backgroundColor: Theme.of(context).errorColor,
      ));
    }

    return BlocConsumer<RegisterBloc, RegisterState>(
        listener: (context, state) {
          if (state is RegisterFailure) {
            _showError("There is an error on registering");
          }
          if (state is RegisterSuccess) {
            Navigator.pushNamedAndRemoveUntil(context, "/", (route) => false);
          }
        }, builder: (context, state) {
      return Scaffold(
        resizeToAvoidBottomInset: false,
        body: SingleChildScrollView(
          child: Container(
            height: height,
            decoration: BoxDecoration(),
            child: Column(children: [
              //logo(isKeyboardShowing),
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
                            _buildUserNameTextField(),
                            SizedBox(
                              height: 20,
                            ),
                            _buildEmailTextField(),
                            SizedBox(
                              height: 20,
                            ),
                            _buildPasswordTextField(),
                            SizedBox(
                              height: 20,
                            ),
                            _buildChooseAccountType(),
                            SizedBox(
                              height: 20.0,
                            ),
                            _submitButton(),
                            _createAccountLabel(),
                          ],
                        ),
                      ),
                    )),
              ),
            ]),
          ),
        ),
      );
    });
  }
  Widget _buildUserNameTextField() {
    return TextFormField(
      controller: _usernameController,
      validator: (value) =>
      value!.length <= 4 ? "User Name must be at least 4 character" : null,
      onSaved: (value) => _username = value!,
      onChanged: (value) => _username = value,
      keyboardType: TextInputType.text,
      decoration: InputDecoration(
        labelText: 'Username',
        focusColor: Color(0xff4064f3),
        labelStyle: TextStyle(
          color: Color(0xff4064f3),
        ),
        border: InputBorder.none,
        filled: true,
        fillColor: Color(0xfff3f3f4),
        prefixIcon: Icon(Icons.person),
      ),
    );
  }

  Widget _createAccountLabel() {
    return InkWell(
      onTap: () {
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => LoginPage()));
      },
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 10),
        padding: EdgeInsets.all(5),
        alignment: Alignment.bottomCenter,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Already have an account ?',
              style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
            ),
            SizedBox(
              width: 10,
            ),
            Text(
              'Login',
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

  Widget _buildEmailTextField() {
    return TextFormField(
      controller: _emailController,
      onChanged: (value) => _email = value,
      validator: (value) => !isEmail(value!)
          ? "Sorry, we do not recognize this email address"
          : null,
      keyboardType: TextInputType.emailAddress,
      decoration: InputDecoration(
        labelText: 'Email',
        floatingLabelBehavior: FloatingLabelBehavior.auto,
        // alignLabelWithHint: true,
        prefixIcon: Icon(Icons.alternate_email),
        // hintText: 'Enter your email',
        border: InputBorder.none,
        filled: true,
        fillColor: Color(0xfff3f3f4),
      ),
    );
  }

  Widget _buildPasswordTextField() {
    return TextFormField(
      controller: _passwordController,
      validator: (value) => value!.length <= 6
          ? "Password must be 6 or more characters in length"
          : null,
      obscureText: !this._showPassword,
      onChanged: (value) => _password = value,
      keyboardType: TextInputType.text,
      decoration: InputDecoration(
        labelText: 'Password',
        focusColor: Color(0xff4064f3),
        labelStyle: TextStyle(
          color: Color(0xff4064f3),
        ),
        border: InputBorder.none,
        filled: true,
        fillColor: Color(0xfff3f3f4),
        prefixIcon: Icon(Icons.security),
        suffixIcon: IconButton(
          icon: this._showPassword
              ? FaIcon(FontAwesomeIcons.eye)
              : FaIcon(FontAwesomeIcons.eyeSlash),
          onPressed: () {
            setState(() => this._showPassword = !this._showPassword);
          },
        ),
      ),
    );
  }

  Widget _buildChooseAccountType() {
    return DropdownButton<AccountType>(
      hint: Text('Select Account Type'),
      value: selectedAccount,
      onChanged: (AccountType? value) {
        if (value!.accountName == 'Artist') {
          _isArtist = true;
          _role_id = "603ba9a11bd36aa35679ec4c";

        } else {
          _isArtist = false;
          _role_id = "603ba9cf1bd36aa35679ec4d";

          //603ba9cf1bd36aa35679ec4d
        }
        setState(() {
          selectedAccount = value;
        });
      },
      items: accountTypes.map((AccountType accountType) {
        return DropdownMenuItem(
          value: accountType,
          child: Row(
            children: <Widget>[
              accountType.accountIcon,
              SizedBox(
                width: 20.0,
              ),
              Text(accountType.accountName)
            ],
          ),
        );
      }).toList(),
    );
  }

  Widget _submitButton() {
    return InkWell(
      onTap: () {
        final form = _formKey.currentState;
        if (form!.validate()) {
          form.save();
          BlocProvider.of<RegisterBloc>(context).add(RegisterUser(
              email: _email,
              password: _password,
              role_id: _role_id,
            status: '',
            profile_id:'' ,
          ));
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
                colors: [
                  kBrown100,
                  kBrown900,
                ])),
        child: _isLoading == true
            ? DialogBox().loading(context)
            : Text('SignUp',
            // style: TextStyle(fontSize: 20, color: Colors.white),
            style: TextStyle(color: Colors.white, fontSize: 18.0)),
      ),
    );
  }

  void handleSubmit() async {
    final form = _formKey.currentState;
    if (form!.validate()) {
      print('validated');
      form.save();

      try {
        setState(() {
          _isLoading = true;
        });

        if (!_isArtist) {

          setState(() {
            _isLoading = false;
          });
        }

        // }
        DialogBox().information(
            context, 'SignUp Success', 'You have Successfuly Logged in');
      } catch (err) {
        print('error');
        print(err);
      }
    }
  }

  bool isEmail(String value) {
    String regex =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

    RegExp regExp = new RegExp(regex);

    return value.isNotEmpty && regExp.hasMatch(value);
  }
}

class AccountType {
  const AccountType({required this.accountIcon, required this.accountName});
  final Icon accountIcon;
  final String accountName;
}

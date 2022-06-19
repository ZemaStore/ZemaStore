import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/svg.dart';
import 'package:form_field_validator/form_field_validator.dart';
import 'package:tt/auth/bloc/auth_event.dart';
import 'package:tt/auth/entity/login.dart';
import 'package:tt/main.dart';

import '../../bloc/auth_bloc.dart';
import '../../bloc/auth_state.dart';

class LoginFormValidation extends StatefulWidget {
  static const String routeName = "/loginPage";

  @override
  _LoginFormValidationState createState() => _LoginFormValidationState();
}

class _LoginFormValidationState extends State<LoginFormValidation> {
  GlobalKey<FormState> formkey = GlobalKey<FormState>();
  String phone = '';
  String password = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: BlocListener<AuthBloc, AuthState>(
          bloc: BlocProvider.of<AuthBloc>(context),
          listener: (context, state) {
            // print(state.formState);
            if (state is AuthLoginSuccessState) {
              Navigator.pushNamed(context, '/');
            }
          },
          child: Form(
            autovalidateMode: AutovalidateMode
                .onUserInteraction, //check for validation while typing
            key: formkey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                const SizedBox(
                  height: 50,
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 60.0),
                  child: Center(
                    child: Container(
                      width: 200,
                      height: 150,
                      child: SvgPicture.asset("assets/loginimage.svg"),
                    ),
                  ),
                ),
                const SizedBox(
                  height: 50,
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 15),
                  child: TextFormField(
                    onChanged: (value){
                      phone = value;
                    },
                      decoration: const InputDecoration(
                          border: const OutlineInputBorder(),
                          labelText: 'Email',
                          hintText: 'Enter valid email id as abc@gmail.com'),
                      validator: MultiValidator([
                        RequiredValidator(errorText: "* Required"),
                        EmailValidator(errorText: "Enter valid email id"),
                      ])),
                ),
                Padding(
                  padding: const EdgeInsets.only(
                      left: 15.0, right: 15.0, top: 15, bottom: 0),
                  child: TextFormField(
                    onChanged: (value){
                      password = value;
                    },
                      obscureText: true,
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Password',
                          hintText: 'Enter secure password'),
                      validator: MultiValidator([
                        RequiredValidator(errorText: "* Required"),
// MatchValidator('', errorText: 'errorText'),
                        PatternValidator(
                            r'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{8,}$',
                            errorText:
                                'Password should have at least:\n1 Capital letter \n1 small letter \n1 number and \n1 special character'),
                        MinLengthValidator(8,
                            errorText:
                                "Password should be at least 8 characters"),
                        MaxLengthValidator(20,
                            errorText:
                                "Password should not be greater than 20 characters")
                      ])
                      //validatePassword,        //Function to check validation
                      ),
                ),
                // FlatButton(
                //   onPressed: () {
                //     //TODO FORGOT PASSWORD SCREEN GOES HERE
                //   },
                //   child: const Text(
                //     'Forgot Password',
                //     style: TextStyle(color: Colors.blue, fontSize: 15),
                //   ),
                // ),
                Container(
                  height: 50,
                  width: 250,
                  decoration: BoxDecoration(
                      color: Colors.blue,
                      borderRadius: BorderRadius.circular(10)),
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(primary: Colors.black),
                    onPressed: () {
                      if (formkey.currentState!.validate()) {
                        // Navigator.push(context,
                        // MaterialPageRoute(builder: (_) => HomePage()));
                        // print("Validated");
                        BlocProvider.of<AuthBloc>(context).add(LoginEvent(
                            crediential: LoginCredientials(
                                phoneNumber: phone, password: password)));
                      } else {
                        // print("Not Validated");
                      }
                    },
                    child: const Text(
                      'Login',
                      style: TextStyle(color: Colors.white, fontSize: 25),
                    ),
                  ),
                ),
                const SizedBox(
                  height: 20,
                ),
                const Text('New User? Create Account')
              ],
            ),
          ),
        ),
      ),
    );
  }
}

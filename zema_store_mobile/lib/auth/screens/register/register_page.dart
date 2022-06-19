import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/svg.dart';
import 'package:form_field_validator/form_field_validator.dart';
import 'package:tt/auth/bloc/auth_bloc.dart';
import 'package:tt/auth/bloc/auth_event.dart';
import 'package:tt/auth/entity/signup.dart';
import 'package:tt/auth/screens/login/login_page.dart';
import 'package:tt/playlist/screens/pick_geners.dart';

import '../../bloc/auth_state.dart';

class RegisterFormValidation extends StatefulWidget {
  static const String routeName = "/registerPage";
  @override
  _RegisterFormValidationState createState() => _RegisterFormValidationState();
}

class _RegisterFormValidationState extends State<RegisterFormValidation> {
  GlobalKey<FormState> formkey = GlobalKey<FormState>();

  String firstName = '';
  String lastName = '';
  String email = '';
  String phoneNumber = '';
  String password = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: BlocListener<AuthBloc, AuthState>(
          bloc: BlocProvider.of<AuthBloc>(context),
          listener: (BuildContext context, state) {
            // print(state.formState);
            if (state is AuthSuccessState) {
              debugPrint('from reg email = ${this.email}');

              Navigator.pushNamed(context, PickSomeGeneres.routeName);
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
                  padding: const EdgeInsets.only(
                      left: 15.0, right: 15.0, top: 15, bottom: 0),
                  child: TextFormField(
                      onChanged: (value) {
                        firstName = value;
                      },
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'First Name',
                          hintText: 'Enter valid Name'),
                      validator: MultiValidator([
                        RequiredValidator(errorText: "* Required"),
                        MinLengthValidator(4, errorText: "Enter valid Name"),
                      ])),
                ),
                Padding(
                  padding: const EdgeInsets.only(
                      left: 15.0, right: 15.0, top: 15, bottom: 0),
                  child: TextFormField(
                      onChanged: (value) {
                        lastName = value;
                      },
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Last Name',
                          hintText: 'Enter valid Name'),
                      validator: MultiValidator([
                        RequiredValidator(errorText: "* Required"),
                        MinLengthValidator(4, errorText: "Enter valid Name"),
                      ])),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 15.0, right: 15.0, top: 15, bottom: 0),
                  child: TextFormField(
                      onChanged: (value) {
                        email = value;
                      },
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
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
                      keyboardType: TextInputType.number,
                      keyboardAppearance: Brightness.dark,
                      onChanged: (value) {
                        phoneNumber = value;
                      },
                      inputFormatters: [
                        FilteringTextInputFormatter.digitsOnly
                      ], // Only numbers can be entered
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Phone Number',
                          hintText: '0987654321'),
                      validator: MultiValidator([
                        RequiredValidator(errorText: "* Required"),
                        MinLengthValidator(10,
                            errorText: "Enter valid Phone number"),
                        PatternValidator(r'(^(?:[+0]9)?[0-9]{10,12}$)',
                            errorText: 'Please enter valid phone number')
                      ])),
                ),
                Padding(
                  padding: const EdgeInsets.only(
                      left: 15.0, right: 15.0, top: 15, bottom: 0),
                  child: TextFormField(
                      obscureText: true,
                      onChanged: (value) {
                        password = value;
                      },
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
                BlocBuilder<AuthBloc, AuthState>(builder: (context, state){
                  if (state is AuthErrorState){
                    return Center(child: Text(state.errorMessage,textAlign: TextAlign.center, style: const TextStyle(color: Colors.red),));
                  }
                  return Container();
                }),
                FlatButton(
                  onPressed: () {
                    //TODO FORGOT PASSWORD SCREEN GOES HERE
                  },
                  child: const Text(
                    'Forgot Password',
                    style: TextStyle(color: Colors.blue, fontSize: 15),
                  ),
                ),
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
                        BlocProvider.of<AuthBloc>(context).add(RegisterEvent(
                            crediential: SignUpCrediential(
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                password: password,
                                phoneNumber: phoneNumber)));
                        print("Validated");
                      } else {
                        print("Not Validated");
                      }
                    },
                    child: const Text(
                      'Register',
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

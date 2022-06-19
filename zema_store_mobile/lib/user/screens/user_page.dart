import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tt/user/bloc/bloc.dart';

class UsersPage extends StatefulWidget {
  const UsersPage({Key? key}) : super(key: key);

  @override
  State<UsersPage> createState() => _UsersPageState();
}

class _UsersPageState extends State<UsersPage> {
  @override
  Widget build(BuildContext context) {
    String tile = "This text should change";
    return Scaffold(
      body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          // crossAxisAlignment: CrossAxisAlignment.center,
          children:  [
            GestureDetector(onTap: (){
              BlocProvider.of<UsersBloc>(context).add(LoadUsers());
            },child: const Icon(Icons.refresh)),
            BlocBuilder<UsersBloc, UsersState>(builder: (context, state){
              if (state is LoadingState){
                return const CircularProgressIndicator();
              } else if(state is LoadSuccessState){
                return Text(state.newsList[0].profile.id);
              } else if (state is LoadFailureState){
                return Text(state.errorMessage, style: TextStyle(color: Colors.red),);
              }
              return Container();
            })
          ],

      ),
    );
  }
}

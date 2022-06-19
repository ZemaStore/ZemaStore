import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:jiffy/jiffy.dart';
import 'package:shimmer/shimmer.dart';
import 'package:tt/events/bloc/bloc.dart';
import 'package:tt/events/entity/model.dart';
import 'package:tt/extentsions.dart';

class EventsPage extends StatefulWidget {
  const EventsPage({Key? key}) : super(key: key);

  @override
  State<EventsPage> createState() => _EventsPageState();
}

class _EventsPageState extends State<EventsPage> {
  @override
  Widget build(BuildContext context) {
    String tile = "This text should change";
    int timer = 800, offset = 0;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Events',
          style: GoogleFonts.poppins(
              color: Colors.black, fontSize: 25, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          BlocProvider.of<EventsBloc>(context).add(LoadEvents());
        },
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          // crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            BlocBuilder<EventsBloc, EventsState>(builder: (context, state) {
              if (state is LoadingState) {
                return const Center(
                  child: CircularProgressIndicator(
                    color: Colors.black,
                  ),
                );
              } else if (state is LoadSuccessState) {
                return state.newsList.isEmpty
                    ? Center(
                        child: Text(
                        'There are no Event, Stay tuned!',
                        style: GoogleFonts.poppins(
                            fontSize: 20, fontWeight: FontWeight.w400),
                      ))
                    : SizedBox(
                        height: MediaQuery.of(context).size.height * 0.8,
                        child: ListView(
                            children: state.newsList
                                .map(
                                  (event) => buildCard(event, context),
                                )
                                .toList()),
                      );
              } else if (state is LoadFailureState) {
                return Text(
                  state.errorMessage,
                  style: const TextStyle(color: Colors.red),
                );
              } else {
                BlocProvider.of<EventsBloc>(context).add(LoadEvents());
              }
              return Container();
            })
          ],
        ),
      ),
    );
  }

  Card buildCard(Events event, BuildContext context) {
    return Card(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            event.title.capitalize(),
            style: GoogleFonts.poppins(
              fontSize: 25,
            ),
          ),
          const SizedBox(
            height: 5,
          ),
          Image.network(
            event.urlToImage,
            height: 220,
            width: MediaQuery.of(context).size.width,
          ),

          Text(event.summery),
          // Text(event.venue.split(':')[3].split('}')[0]),
          Text(DateFormat('kk:mm:a').format(event.date)),
          Text(Jiffy(event.date).yMMMd)
        ],
      ),
    );
  }
}

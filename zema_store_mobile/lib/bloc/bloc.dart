// BloC for processing any request regarding doctors
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tt/bloc/event.dart';
import 'package:tt/bloc/state.dart';

import '../data_repository/music_repository.dart';

class DoctorsBloc extends Bloc<MusicEvents, MusicState> {
  final MusicRepository musicRepository;
  DoctorsBloc(this.musicRepository)
      : super(DoctorsInitialState()) {
    on<LoadAvailableDoctors>(
          (event, emit) async {
        emit(DoctorsLoadingState());
        try {
          final nearByDoctorsList =
          await musicRepository.getAvailableDoctors();
          emit(DoctorsSuccessState());
        } catch (e) {
          emit(DoctorsErrorState(statusCode: 500, errorMessage: 'loadingFailed'));
        }
      },
    );
    // on<LoadFilteredDoctorsBySpeciality>(
    //       (event, emit) async {
    //     emit(LoadingFilteredDoctorsBySpeciality());
    //     try {
    //       final filteredDoctors = await doctorsRepository
    //           .filterDoctorsBySpeciality(specialities: event.specialities);
    //       emit(LoadedFilteredDoctorsBySpeciality(
    //           filteredDoctors: filteredDoctors));
    //     } catch (e) {
    //       emit(DoctorsErrorState(statusCode: 500, errorMessage: loadingFailed));
    //     }
    //   },
    // );
  }
}

import 'package:equatable/equatable.dart';

abstract class MusicEvents extends Equatable {}

// Load currently available doctors event
class LoadAvailableDoctors extends MusicEvents {
  @override
  List<Object?> get props => [];
}

// Filter doctors by their speciality
class LoadFilteredDoctorsBySpeciality extends MusicEvents {
  final List<String> specialities;
  LoadFilteredDoctorsBySpeciality({required this.specialities});
  @override
  List<Object?> get props => [specialities];
}
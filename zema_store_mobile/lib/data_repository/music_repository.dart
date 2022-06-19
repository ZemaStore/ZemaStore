import 'package:tt/data_provider/music_data_provider.dart';

class MusicRepository {
  final DoctorsDataProvider doctorsDataProvider;
  MusicRepository({
    required this.doctorsDataProvider,
  });
  // Loads list of available available doctors from API
  Future<String> getAvailableDoctors() async {
    return await doctorsDataProvider.fetchAvailableDoctors();
  }

  //  Loads a single doctor profile From API with it's ID
  Future<String> getSpecificDoctorByID(String id) async {
    return await doctorsDataProvider.fetchSpecificDoctor(id);
  }

  // // Filter doctors using speciality provided
  // Future<List<DoctorEntity>> filterDoctorsBySpeciality(
  //     {required List<String> specialities}) async {
  //   return await doctorsDataProvider.filterDoctorsBySpeciality(
  //       specialities: specialities);
  // }
}

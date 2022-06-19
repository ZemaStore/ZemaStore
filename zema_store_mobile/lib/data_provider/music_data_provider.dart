// import 'package:hakim_hub_mobile/doctor/entity/doctor_entity.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

// Data provider class for doctors
class DoctorsDataProvider {
  final http.Client httpClient;
  final _baseFileServerURL = "https://zemastore-file-server.herokuapp.com/download/";
  final _baseBackendURL = "";
  DoctorsDataProvider({required this.httpClient});

  // Fetch currently available doctors from database
  Future<String> fetchAvailableDoctors() async {
    final response = await httpClient.post(
        Uri.parse('$_baseBackendURL/search?institutions=false'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        });
    if (response.statusCode == 200) {
      final availableDoctors = jsonDecode(response.body)['doctors'] as List;
      // final tests = availableDoctors
      //     .map((doctor) => DoctorEntity.fromJson(doctor))
      //     .toList();

      return availableDoctors.toString();
    }
    throw Exception('Failed to get available doctors');
  }

  // Filter doctors using speciality provided
  Future<String> filterDoctorsBySpeciality(
      {required List<String> specialities}) async {
    var data = jsonEncode({
      "filter": {"speciality": specialities}
    });
    final response = await httpClient
        .post(Uri.parse('$_baseBackendURL/search?doctors=false'), body: data);
    if (response.statusCode == 200) {
      final filteredDoctors =
      jsonDecode(response.body)['data']['doctors'] as List;
      // final doctors = filteredDoctors
      //     .map((doctor) => DoctorEntity.fromJson(doctor))
      //     .toList();
      // return doctors;
      return filteredDoctors.toString();
    }
    throw Exception('Failed to get available doctors');
    // }
    //
    // // Fetch Specific doctor by ID from database
    // Future<DoctorEntity> fetchSpecificDoctor(String doctorID) async {
    //   final response = await httpClient.get(
    //       Uri.parse('$_baseURL/users/doctorProfile/$doctorID'),
    //       headers: <String, String>{
    //         'Content-Type': 'application/json; charset=UTF-8',
    //       });
    //
    //   if (response.statusCode == 200) {
    //     final doctorProfile = jsonDecode(response.body);
    //     final profile = DoctorEntity.fromJson(doctorProfile);
    //     return profile;
    //   }
    //   throw Exception('Failed to get available doctors');
    // }
  }

  fetchSpecificDoctor(String id) {}
}
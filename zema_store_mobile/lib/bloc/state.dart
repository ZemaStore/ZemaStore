import 'package:equatable/equatable.dart';


abstract class MusicState extends Equatable {}

// Initial state for doctors page
class DoctorsInitialState extends MusicState {
  @override
  List<Object?> get props => [];
}

// Loading state for doctors page
class DoctorsLoadingState extends MusicState {
  @override
  List<Object?> get props => [];
}

// Success state for doctors page
class DoctorsSuccessState extends MusicState {
  @override
  List<Object?> get props => [];
}

// Error state for doctors page
class DoctorsErrorState extends MusicState {
  final int statusCode;
  final String errorMessage;
   DoctorsErrorState({required this.statusCode, required this.errorMessage});
  @override
  List<Object?> get props => [statusCode, errorMessage];
}
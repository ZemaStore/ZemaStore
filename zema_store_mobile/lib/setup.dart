
import 'package:audio_manager/audio_manager.dart';

var audioManagerInstance2 = AudioManager.instance;
bool showVol = false;
PlayMode playMode = audioManagerInstance2.playMode;
bool isPlaying = false;
double? slider;
import 'dart:ffi';

import 'package:audio_service/audio_service.dart';
import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';

class PlayerButtons extends StatefulWidget {
  const PlayerButtons(this._audioPlayer, {Key? key}) : super(key: key);

  final AudioPlayer _audioPlayer;

  @override
  State<PlayerButtons> createState() => _PlayerButtonsState();
}

class _PlayerButtonsState extends State<PlayerButtons> {
  double position = 0.0;
  Duration? length;
  @override
  Widget build(BuildContext context) {
     length = widget._audioPlayer.duration;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        StreamBuilder<Duration?>(
            stream: widget._audioPlayer.durationStream,
            builder: (context, snapshot) {
              // widget._audioPlayer.
              return _progressSlider(context, snapshot.data);
            }),
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            StreamBuilder<bool>(
              stream: widget._audioPlayer.shuffleModeEnabledStream,
              builder: (context, snapshot) {
                return _shuffleButton(context, snapshot.data ?? false);
              },
            ),
            StreamBuilder<SequenceState?>(
              stream: widget._audioPlayer.sequenceStateStream,
              builder: (_, __) {
                return _previousButton();
              },
            ),
            StreamBuilder<PlayerState>(
              stream: widget._audioPlayer.playerStateStream,
              builder: (_, snapshot) {
                final playerState = snapshot.data;
                return _playPauseButton(playerState!);
              },
            ),
            StreamBuilder<SequenceState?>(
              stream: widget._audioPlayer.sequenceStateStream,
              builder: (_, __) {
                return _nextButton();
              },
            ),
            StreamBuilder<LoopMode>(
              stream: widget._audioPlayer.loopModeStream,
              builder: (context, snapshot) {
                return _repeatButton(context, snapshot.data ?? LoopMode.off);
              },
            ),
          ],
        ),
      ],
    );
  }

  Widget _playPauseButton(PlayerState playerState) {
    final processingState = playerState.processingState;
    if (processingState == ProcessingState.loading ||
        processingState == ProcessingState.buffering) {
      return Container(
        margin: const EdgeInsets.all(8.0),
        width: 40.0,
        height: 40.0,
        child: const CircularProgressIndicator(color: Colors.black,),
      );
    } else if (widget._audioPlayer.playing != true) {
      return MaterialButton(
        // color: const Color(0xFFC747FF),
        shape: const CircleBorder(),
        onPressed: (){},
        child: IconButton(
          icon: const Icon(
            Icons.play_arrow,
            // color: Colors.white,
          ),
          iconSize: 64.0,
          onPressed: widget._audioPlayer.play,
        ),
      );
    } else if (processingState != ProcessingState.completed) {
      return IconButton(
        icon: const Icon(
          Icons.pause,
          // color: Colors.white,
        ),
        iconSize: 64.0,
        onPressed: widget._audioPlayer.pause,
      );
    } else {
      return IconButton(
        icon: const Icon(
          Icons.replay,
          // color: Colors.white,
        ),
        iconSize: 64.0,
        onPressed: () => widget._audioPlayer.seek(Duration.zero,
            index: widget._audioPlayer.effectiveIndices?.first),
      );
    }
  }

  Widget _shuffleButton(BuildContext context, bool isEnabled) {
    return IconButton(
      icon: isEnabled
          ? Icon(Icons.shuffle, color: Theme.of(context).accentColor)
          : const Icon(
              Icons.shuffle,
              // color: Colors.white,
            ),
      onPressed: () async {
        final enable = !isEnabled;
        if (enable) {
          await widget._audioPlayer.shuffle();
        }
        await widget._audioPlayer.setShuffleModeEnabled(enable);
      },
    );
  }

  Widget _previousButton() {
    return IconButton(
      icon: const Icon(
        Icons.skip_previous,
        // color: Colors.white,
      ),
      onPressed: widget._audioPlayer.hasPrevious
          ? widget._audioPlayer.seekToPrevious
          : null,
    );
  }

  Widget _nextButton() {
    return IconButton(
      icon: const Icon(
        Icons.skip_next,
        // color: Colors.white,
      ),
      onPressed:
          widget._audioPlayer.hasNext ? widget._audioPlayer.seekToNext : null,
    );
  }

  Widget _repeatButton(BuildContext context, LoopMode loopMode) {
    final icons = [
      const Icon(
        Icons.repeat,
        // color: Colors.white,
      ),
      Icon(Icons.repeat, color: Theme.of(context).accentColor),
      Icon(Icons.repeat_one, color: Theme.of(context).accentColor),
    ];
    const cycleModes = [
      LoopMode.off,
      LoopMode.all,
      LoopMode.one,
    ];
    final index = cycleModes.indexOf(loopMode);
    return IconButton(
      icon: icons[index],
      onPressed: () {
        widget._audioPlayer.setLoopMode(
            cycleModes[(cycleModes.indexOf(loopMode) + 1) % cycleModes.length]);
      },
    );
  }

  Widget _progressSlider(BuildContext context, Duration? seekHandler) {
    return Slider(
      activeColor: const Color(0xFFC747FF),
        thumbColor: const Color(0xff868BA4),
        value: position,
        onChanged: (value) {
        var l = length?.inSeconds;
        print('length $l');
        final test =  l! * value;
        // print(int.);
        widget._audioPlayer.seek(Duration(seconds:test.toInt()));
        print('tested');
        // seekHandler.processingState.processingState
          setState(() {
            // widget._audioPlayer.seek(Duration(seconds:(test) as int));
            final pos = widget._audioPlayer.position.inSeconds ;
            final len = length?.inSeconds;
            position = pos/len!;
          });
        });
  }
}

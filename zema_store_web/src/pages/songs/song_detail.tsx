import { useCallback, useEffect, useMemo, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useLocation } from "react-router-dom";
import SongsService from "../../app/services/songs.service";
import { Song } from "../../helpers/types";
import { Audio, BallTriangle } from 'react-loader-spinner'

type Props = {
  from: string;
};

function SongDetail(props: Props) {
  const location = useLocation();
  let pathnames = location.pathname.split("/").slice()
  const songId = pathnames.pop() || "";
  const albumId = pathnames.pop();
  const artistId = pathnames.pop();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [songData, setSongData] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const fetchSong = useCallback(
    async () => {
      setIsLoading(true)
      try {
        const { data } = await SongsService.getSong(songId)
        if (data) {
          console.log(data, " is the song data")
          setSongData(data)
        }
        setIsLoading(false)
      } catch (error) {


        setIsLoading(false)

      }
    },
    [location.pathname],
  )

  useEffect(() => {
    fetchSong()
  }, [fetchSong])

  const toggleAudioLoader = (status: boolean) => {

  }

  const PreviewSongData = useMemo(() => {
    return (
      <div className="">
        {
          songData ?
            <div className="h-20 !border-orange-500 w-full  relative my-2 flex flex-col items-center justify-center">
              <div className="flex items-end gap-x-5 w-full">
                <div className=" my-5 ">
                  {
                    isPlaying && (
                      <Audio
                        height="100"
                        width="100"
                        color={"orange"}
                        ariaLabel='loading'
                      />)
                  }
                </div>
                <ReactAudioPlayer
                  className=" w-full"
                  src={songData.song}
                  controls
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onListen={() => setIsPlaying(true)}
                />
              </div>

            </div>
            : <div className="flex" >
              <span className="relative">
                <svg className="w-full h-full top-0 left-0 absolute object-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                  <path d="M9 17H5a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm12-2h-4a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"></path><circle cx="9" cy="9" r="5"></circle></svg>
              </span>
              <h5>

              </h5>
            </div>
        }
      </div>
    )
  }, [songData])

  return (
    <main className="flex justify-center">
      <div className="min-h-[600px] w-2/3 2xl:1/2 my-10">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Song Detail
          </p>
        </div>
        <div className="w-full flex flex-col px-10">

          {
            isLoading ? (
              <div className="flex w-full h-full items-center justify-center">
                <BallTriangle
                  height="100"
                  width="100"
                  color={"gray"}
                  ariaLabel='loading'
                />
              </div>
            ) : (
              <>
                <div className="my-5">
                  <h1 className="text-xl">
                    <span className="font-bold">
                      Title:{" "}
                    </span>
                    {songData?.title}</h1>
                </div>
                <div className="my-5">
                  <h1 className="text-xl ">
                    <span className="font-bold">
                      Genre:{" "}
                    </span>{songData?.genre}</h1>
                </div>

                <div className="my-5">
                  <h1 className="text-xl font-bold">
                    <span className="font-bold">
                      Release: {" "}
                    </span>
                    {songData?.releaseDate}</h1>
                </div>

                <div className="my-5">
                  <h1 className="text-xl font-bold">
                    <span className="font-bold">
                      Length: {" "}
                    </span>
                    {songData?.length}</h1>
                </div>

                <div className="my-5">
                  <h1 className="text-xl font-bold">Listeners: {songData?.listenersCount}</h1>
                </div>

                <div className="my-5">
                  {PreviewSongData}
                </div>
              </>
            )
          }
        </div>

      </div>
    </main >
  );
}

export default SongDetail;

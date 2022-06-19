import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/redux_hooks";
import { songsSelector } from "../../app/store/features/songs/songsSlice";
import Loader from "../../common/Widgets/Loader";
import { Song } from "../../helpers/types";
import formatter from "../../utils/formatter";

type Props = {
  setSelectedSong: React.Dispatch<React.SetStateAction<Song | null>>;
  handleModalOpen: (modalType?: string) => void;
};
const SongsTable = (props: Props) => {
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);

  const { searchSongsList, isLoading } = useAppSelector(songsSelector);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickMore = (id: string) => (e: any) => {
    e.stopPropagation();
    if (selectedSongId === id) {
      setSelectedSongId(null);
    } else {
      setSelectedSongId(id);
    }
  };

  const handleEditSong = (selSong: Song) => {
    try {
      props.setSelectedSong(selSong);
      setSelectedSongId(null);
      props.handleModalOpen("edit");
    } catch (error) {}
  };

  const handleDeleteSong = (selSong: Song) => {
    try {
      props.setSelectedSong(selSong);
      setSelectedSongId(null);
      props.handleModalOpen("delete");
    } catch (error) {}
  };

  const handleSongsDetails = (id: string) => (e: any) => {
    navigate(`${id}`);
  };

  return (
    <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
      {isLoading ? (
        <div className="h-full w-full grid place-items-center">
          <Loader className="h-4 w-4" />
        </div>
      ) : (
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left pl-4">Title</th>
              {/* <th className="font-normal text-left pl-12">Song</th> */}
              <th className="font-normal text-left pl-12">Released Date</th>
              <th className="font-normal text-left pl-20">Genre</th>
              <th className="font-normal text-left pl-20">Listner Count</th>
              <th className="font-normal text-left pl-20">Length</th>
              <th className="font-normal text-left pl-20">Created Date</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {searchSongsList.length > 0 &&
              searchSongsList.map((song, index) => {
                return (
                  <tr
                    onClick={handleSongsDetails(song.id)}
                    key={song.id + index}
                    className="h-20 handleSongsDetails text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                  >
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-10 h-10">
                          <img
                            className="w-full h-full"
                            src="/images/user-avatars.svg"
                          />
                        </div>
                        <div className="pl-4">
                          <p className="font-medium">{song.title}</p>
                        </div>
                      </div>
                    </td>
                    {/* <td className="pl-20">
                      <p className="font-medium">
                        <a
                          href={song.song}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="text-blue-900"
                        >
                          link
                        </a>
                      </p>
                    </td> */}
                    <td className="pl-20">
                      <p className="font-medium">
                        {formatter.getYear(song.releaseDate)}
                      </p>
                    </td>
                    <td className="pl-20">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {song.genre}
                      </p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">{song.listenersCount}</p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">{song.length}</p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">
                        {formatter.getYear(song.createdAt)}
                      </p>
                    </td>

                    <td
                      className="px-7 2xl:px-0 cursor-pointer"
                      onClick={handleClickMore(song.id)}
                    >
                      <button
                        onClick={handleClickMore(song.id)}
                        className="focus:outline-none pl-7"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
                            stroke="#A1A1AA"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
                            stroke="#A1A1AA"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
                            stroke="#A1A1AA"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {selectedSongId === song.id && (
                        <div className="dropdown-content bg-white shadow-lg shadow-blue-100 w-24 absolute z-50 right-0 mr-16">
                          <div
                            onClick={() => handleEditSong(song)}
                            className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                          >
                            <p>Edit</p>
                          </div>
                          <div
                            onClick={() => handleDeleteSong(song)}
                            className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                          >
                            <p className="text-red-500">Delete</p>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SongsTable;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/redux_hooks";
import { artistsSelector } from "../../app/store/features/artists/artistsSlice";
import Loader from "../../common/Widgets/Loader";
import { Artist } from "../../helpers/types";

type Props = {
  setSelectedArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
  handleModalOpen: (modalType?: string) => void;
};

const ArtistsTable = (props: Props) => {
  const [show, setShow] = useState<number | null>(0);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);

  const { isLoading, searchArtistsList } = useAppSelector(artistsSelector);

  const navigate = useNavigate();

  const handleClickMore = (id: string) => (e: any) => {
    e.stopPropagation();
    if (selectedArtistId === id) {
      setSelectedArtistId(null);
    } else {
      setSelectedArtistId(id);
    }
  };

  const handleEditArtist = (selArtist: Artist) => {
    try {
      props.setSelectedArtist(selArtist);
      setSelectedArtistId(null);
      props.handleModalOpen("edit");
    } catch (error) {}
  };

  const handleDeleteArtist = (selArtist: Artist) => {
    try {
      props.setSelectedArtist(selArtist);
      setSelectedArtistId(null);
      props.handleModalOpen("delete");
    } catch (error) {}
  };

  const handleArtistsDetails = (id: string) => (e: any) => {
    console.log("hello world");
    navigate(`/artists/${id}`);
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
              <th className="font-normal text-left pl-4">Full Name</th>
              <th className="font-normal text-left pl-12">Email</th>
              <th className="font-normal text-left pl-12">Phone</th>
              <th className="font-normal text-left pl-12">Followers</th>
              <th className="font-normal text-left pl-12">Listened Hour</th>
              <th className="font-normal text-left pl-20">Albums Count</th>
              <th className="font-normal text-left pl-20">Songs Count</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {searchArtistsList.length > 0 &&
              searchArtistsList.map((artist, index) => {
                return (
                  <tr
                    onClick={handleArtistsDetails(artist.id)}
                    key={artist.id + index}
                    className="h-20 handleArtistsDetails text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
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
                          <p className="font-medium">{artist.fullName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{artist.email}</p>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{artist.phone}</p>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {artist.followers}
                      </p>
                      <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                        <div className="w-20 h-3 bg-green-progress rounded-full" />
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{artist.listenedHours}</p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">{artist.albumsCount}</p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">{artist.songsCount}</p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        Single: 10
                      </p>
                    </td>

                    <td
                      className="px-7 2xl:px-0 cursor-pointer"
                      onClick={handleClickMore(artist.id)}
                    >
                      <button
                        onClick={handleClickMore(artist.id)}
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
                      {selectedArtistId === artist.id && (
                        <div className="dropdown-content bg-white shadow-lg shadow-blue-100 w-24 absolute z-50 right-0 mr-16">
                          <div
                            onClick={() => handleEditArtist(artist)}
                            className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                          >
                            <p>Edit</p>
                          </div>
                          <div
                            onClick={() => handleDeleteArtist(artist)}
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

export default ArtistsTable;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/redux_hooks";
import { albumsSelector } from "../../app/store/features/albums/albumsSlice";
import Loader from "../../common/Widgets/Loader";
import { Album } from "../../helpers/types";
import formatter from "../../utils/formatter";

type Props = {
  setSelectedAlbum: React.Dispatch<React.SetStateAction<Album | null>>;
  handleModalOpen: (modalType?: string) => void;
};

const AlbumsTable = (props: Props) => {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { searchAlbumsList, isLoading } = useAppSelector(albumsSelector);

  const handleAlbumDetails = (id: string) => (e: any) => {
    // navigate(`/albums/${id}`, {
    //   state: {
    //     from: "albums",
    //     id,
    //   },
    // });
    navigate(id, {
      state: {
        from: "albums",
        id,
      },
    })
  };

  const handleClickMore = (id: string) => (e: any) => {
    e.stopPropagation();
    if (selectedAlbumId === id) {
      setSelectedAlbumId(null);
    } else {
      setSelectedAlbumId(id);
    }
  };

  const handleEditAlbum = (selAlbum: Album) => {
    try {
      props.setSelectedAlbum(selAlbum);
      setSelectedAlbumId(null);
      props.handleModalOpen("edit");
    } catch (error) { }
  };

  const handleDeleteAlbum = (selAlbum: Album) => {
    try {
      props.setSelectedAlbum(selAlbum);
      setSelectedAlbumId(null);
      props.handleModalOpen("delete");
    } catch (error) { }
  };

  return (
    <div className="w-full min-h-full">
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
                <th className="font-normal text-left pl-12">Artist</th>
                <th className="font-normal text-left pl-20">Songs</th>
                <th className="font-normal text-left pl-20">Released Date</th>
                <th className="font-normal text-left pl-20">Created Date</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {searchAlbumsList.length > 0 ? (
                searchAlbumsList.map((album: any, index) => {
                  return (
                    <tr
                      onClick={handleAlbumDetails(album.album.id)}
                      key={`${album.album.id}-${index}`}
                      className="h-20 handleAlbumsDetails text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                    >
                      <td className="pl-4 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-10 h-10">
                            <img
                              className="w-full h-full"
                              src={
                                album.album.imageUrl
                                  ? album.album.imageUrl
                                  : "/images/user-avatars.svg"
                              }
                            />
                          </div>
                          <div className="pl-4">
                            <p className="font-medium">{album.album.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">
                          {album.album.artistId && album.album.artistId.fullName}
                        </p>
                      </td>

                      <td className="pl-20">
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {album.songs}
                        </p>
                        <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                          <div className="w-20 h-3 bg-green-progress rounded-full" />
                        </div>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium">
                          {formatter.getYear(album.album.releaseDate)}
                        </p>
                      </td>

                      <td className="pl-20">
                        <p className="font-medium">{formatter.getYear(album.album.createdAt)}</p>
                      </td>

                      <td
                        className="px-7 2xl:px-0 cursor-pointer"
                        onClick={handleClickMore(album.album.id)}
                      >
                        <button
                          onClick={handleClickMore(album.album.id)}
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
                        {selectedAlbumId === album.album.id && (
                          <div className="dropdown-content bg-white shadow-lg shadow-blue-100 w-24 absolute z-50 right-0 mr-16">
                            <div
                              onClick={() => handleEditAlbum(album.album)}
                              className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                            >
                              <p>Edit</p>
                            </div>
                            <div
                              onClick={() => handleDeleteAlbum(album.album)}
                              className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                            >
                              <p className="text-red-500">Delete</p>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="text-center w-full p-10 grid place-items-center min-h-[200px]">
                  <td className="text-4xl font-bold">No Data</td>
                </tr>
              )}
            </tbody>
            {/* <tbody className="w-full">
              {searchAlbumsList.length ? (
                searchAlbumsList.map((album, index) => {
                  return (
                    <tr
                      key={album.id + index}
                      onClick={handleAlbumDetails(album.id)}
                      className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                    >
                      <td className="pl-4 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-10 h-10">
                            <img className="w-full h-full" src={album.cover} />
                          </div>
                          <div className="pl-4">
                            <p className="font-medium">{album.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="pl-12">
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {album.album}
                        </p>
                        <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                          <div className="w-20 h-3 bg-green-progress rounded-full" />
                        </div>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">{album.releaseDate}</p>
                        <p className="text-xs leading-3 text-gray-600 mt-2">
                          before 5 years
                        </p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium">{album.songs}</p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium">{album.createdAt}</p>
                      </td>
                      <td className="px-7 2xl:px-0">
                        {show == 0 ? (
                          <button
                            onClick={() => setShow(null)}
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
                        ) : (
                          <button
                            onClick={() => setShow(0)}
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
                        )}
                        {show == 0 && (
                          <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 ">
                            <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                              <p>Edit</p>
                            </div>
                            <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                              <p>Delete</p>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div className="text-center w-full p-10 grid place-items-center min-h-[200px]">
                  <h1 className="text-4xl font-bold">No Data</h1>
                </div>
              )}
            </tbody> */}
          </table>
        )}
      </div>
    </div>
  );
};

export default AlbumsTable;

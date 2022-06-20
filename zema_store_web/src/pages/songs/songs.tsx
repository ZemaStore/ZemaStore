import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux_hooks";
import { deleteSongsApi, getSongsApi } from "../../app/store/features/songs/songsSlice";
import Pagination from "../../common/Paginations";
import AddEditSongModal from "../../components/Modals/AddEditSong";
import AddSongModal from "../../components/Modals/AddEditSong";
import DeleteModal from "../../components/Modals/DeleteModal";
import SongsTable from "../../components/SongsTable";
import { Song } from "../../helpers/types";

type Props = {
  from: string;
};

function SongsPage(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [shouldReload, setShouldReload] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { meta } = useAppSelector((state) => state.artists);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const location = useLocation();
  console.log(location.pathname.split("/").slice().pop(), " is the state");

  const fetchSongs = useCallback(async () => {
    const pathId = location.pathname.split("/").slice().pop();
    let from: {
      name: string;
      id: string | number | null;
    } = {
      name: "all",
      id: null,
    };
    if (location.pathname.includes("albums")) {
      from = {
        name: "albums",
        id: pathId || null,
      };
    } else if (location.pathname.includes("artists")) {
      from = {
        name: "artists",
        id: pathId || null,
      };
    }
    await dispatch(getSongsApi({ ...from, currentPage, orderBy: "createdAt%3Aasc" }));
  }, [dispatch, location]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs, shouldReload, currentPage]);

  const onCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleModalOpen = (modalType = "add") => {
    if (modalType === "add") {
      setIsAddModalOpen(true);
    } else if (modalType === "edit") {
      setIsEditModalOpen(true);
    } else {
      setIsDeleteModalOpen(true);
    }
  };

  const onDeleteModal = async () => {
    setIsDeleting(true)
    await dispatch(deleteSongsApi(selectedSong?.id));
    onCloseModal()
    setIsDeleting(false)
  };

  return (
    <main>
      <div className="min-h-[600px] my-10">
        {isAddModalOpen && (
          <AddEditSongModal
            onClose={onCloseModal}
            onSubmit={() => { }}
            isEditing={false}
          />
        )}{" "}
        {isEditModalOpen && (
          <AddEditSongModal
            onClose={onCloseModal}
            songData={selectedSong}
            onSubmit={() => { }}
            isEditing={true}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            deleteMessage="Delete Song"
            deleteDescription="Are you sure you want to delete?"
            buttonText="Delete"
            onDelete={onDeleteModal}
            onClose={onCloseModal}
          />
        )}


        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Songs
            </p>
            <div>
              {location.pathname.includes("artists") && (
                <button
                  onClick={() => handleModalOpen()}
                  className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
                >
                  <p className="text-sm font-medium leading-none text-white">
                    Add Songs
                  </p>
                </button>
              )
              }
            </div>
          </div>
        </div>
        <SongsTable
          handleModalOpen={handleModalOpen}
          setSelectedSong={setSelectedSong}
        />
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={meta.limit}
          totalItems={meta.total}
          totalPages={meta.totalPage}
        />
      </div>
    </main>
  );
}

export default SongsPage;

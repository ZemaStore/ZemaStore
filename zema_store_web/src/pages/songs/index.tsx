import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks/redux_hooks";
import { getSongsApi } from "../../app/store/features/songs/songsSlice";
import Pagination from "../../common/Paginations";
import AddSongModal from "../../components/Modals/AddSong";
import SongsTable from "../../components/SongsTable";

type Props = {
  from: string;
};

function SongsPage(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const fetchSongs = useCallback(async () => {
    await dispatch(getSongsApi({}));
  }, [dispatch]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const onCloseModal = () => {
    console.log("closing modal");
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  return (
    <main>
      <div className="min-h-[600px] my-10">
        {isModalOpen && (
          <AddSongModal onClose={onCloseModal} onSubmit={() => {}} />
        )}
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Songs
            </p>
            <div>
              <button
                onClick={handleModalOpen}
                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
              >
                <p className="text-sm font-medium leading-none text-white">
                  Add Songs
                </p>
              </button>
            </div>
          </div>
        </div>
        <SongsTable />
      </div>
      <Pagination />
    </main>
  );
}

export default SongsPage;

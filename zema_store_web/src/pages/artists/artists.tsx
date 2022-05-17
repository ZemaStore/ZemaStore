import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks/redux_hooks";
import { getAlbumsApi } from "../../app/store/features/albums/albumsSlice";
import { getArtistsApi } from "../../app/store/features/artists/artistsSlice";
import Pagination from "../../common/Paginations";
import ArtistsTable from "../../components/ArtistsTable";
import AddArtistModal from "../../components/Modals/AddArtist";

function ArtistsPage() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onCloseModal = () => {
    console.log("closing modal");
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const fetchArtists = useCallback(async () => {
    await dispatch(getArtistsApi({}));
  }, [dispatch]);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  return (
    <main>
      <div className="my-10 min-h-[600px]">
        {isModalOpen && (
          <AddArtistModal onClose={onCloseModal} onSubmit={() => {}} />
        )}
        <div className="w-full">
          <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
            <div className="sm:flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Artists
              </p>
              <div>
                <button
                  onClick={handleModalOpen}
                  className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
                >
                  <p className="text-sm font-medium leading-none text-white">
                    Add Artist
                  </p>
                </button>
              </div>
            </div>
          </div>
          <ArtistsTable />
        </div>
      </div>
      <Pagination />
    </main>
  );
}

export default ArtistsPage;

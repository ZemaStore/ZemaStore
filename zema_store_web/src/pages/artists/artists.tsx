import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux_hooks";
import { getArtistsApi } from "../../app/store/features/artists/artistsSlice";
import Pagination from "../../common/Paginations";
import ArtistsTable from "../../components/ArtistsTable";
import AddEditArtistModal from "../../components/Modals/AddEditArtist";
import DeleteModal from "../../components/Modals/DeleteModal";
import { Artist } from "../../helpers/types";
 
function ArtistsPage() {
  const dispatch = useAppDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const { meta } = useAppSelector((state) => state.artists);

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

  const fetchArtists = useCallback(async () => {
    await dispatch(getArtistsApi({}));
  }, [dispatch]);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  return (
    <main>
      <div className="my-10 min-h-[600px]">
        {isAddModalOpen && (
          <AddEditArtistModal
            onClose={onCloseModal}
            onSubmit={() => {}}
            isEditing={false}
          />
        )}{" "}
        {isEditModalOpen && (
          <AddEditArtistModal
            onClose={onCloseModal}
            artistData={selectedArtist}
            onSubmit={() => {}}
            isEditing={true}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            deleteMessage="Delete Artist"
            deleteDescription="Are you sure you want to delete?"
            buttonText="Delete"
            onDelete={onCloseModal}
            onClose={onCloseModal}
          />
        )}
        <div className="w-full">
          <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
            <div className="sm:flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Artists
              </p>
              <div>
                <button
                  onClick={() => handleModalOpen()}
                  className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
                >
                  <p className="text-sm font-medium leading-none text-white">
                    Add Artist
                  </p>
                </button>
              </div>
            </div>
          </div>
          <ArtistsTable
            handleModalOpen={handleModalOpen}
            setSelectedArtist={setSelectedArtist}
          />
        </div>
      </div>
      <Pagination
        currentPage={meta.currentPage}
        pageSize={meta.limit}
        totalItems={meta.total}
      />
    </main>
  );
}

export default ArtistsPage;

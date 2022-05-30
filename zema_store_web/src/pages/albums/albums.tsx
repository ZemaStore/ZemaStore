import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux_hooks";
import { getAlbumsApi } from "../../app/store/features/albums/albumsSlice";
import Pagination from "../../common/Paginations";
import AlbumsTable from "../../components/AlbumsTable";
import AddEditAlbumModal from "../../components/Modals/AddEditAlbum";
import DeleteModal from "../../components/Modals/DeleteModal";
import { Album } from "../../helpers/types";

type Props = {
  from?: string;
  id?: string;
};

const AlbumsPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [setArtistDetail, setSetArtistDetail] = useState(null);
  const { meta } = useAppSelector((state) => state.albums);
  const location = useLocation();
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

  const fetchAlbums = useCallback(async () => {
    const pathId = location.pathname.split("/").slice().pop();
    let from: {
      name: string;
      id: string | number | null;
    } = {
      name: "all",
      id: null,
    };
    if (location.pathname.includes("artists")) {
      from = {
        name: "artists",
        id: pathId || null,
      };
    }
    await dispatch(getAlbumsApi(from));
  }, [dispatch]);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <main>
      <div className="min-h-[600px] my-10">
        {isAddModalOpen && (
          <AddEditAlbumModal
            onClose={onCloseModal}
            onSubmit={() => {}}
            isEditing={false}
          />
        )}{" "}
        {isEditModalOpen && (
          <AddEditAlbumModal
            onClose={onCloseModal}
            albumData={selectedAlbum}
            onSubmit={() => {}}
            isEditing={true}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            deleteMessage="Delete Album"
            deleteDescription="Are you sure you want to delete?"
            buttonText="Delete"
            onDelete={onCloseModal}
            onClose={onCloseModal}
          />
        )}
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Albums
            </p>
            <div>
              <button
                onClick={() => handleModalOpen()}
                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
              >
                <p className="text-sm font-medium leading-none text-white">
                  Add Album
                </p>
              </button>
            </div>
          </div>
        </div>
        <AlbumsTable
          handleModalOpen={handleModalOpen}
          setSelectedAlbum={setSelectedAlbum}
        />
      </div>
      <Pagination
        currentPage={meta.currentPage}
        pageSize={meta.limit}
        totalItems={meta.total}
      />
    </main>
  );
};

export default AlbumsPage;

import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux_hooks";
import { getSubscriptionsApi } from "../../app/store/features/subscriptions/subscriptionsSlice";
import BaseLayout from "../../common/Layout";
import Pagination from "../../common/Paginations";
import AddEditSubscriptionModal from "../../components/Modals/AddEditSubcription";
import SubscriptionsTable from "../../components/SubscriptionsTable";
import DeleteModal from "../../components/Modals/DeleteModal";
import { Subscription } from "../../helpers/types";

function SubscriptionsPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [shouldReload, setShouldReload] = useState(false);

  const { meta } = useAppSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const fetchSubscriptions = useCallback(async () => {
    await dispatch(getSubscriptionsApi({ currentPage }));
  }, [dispatch, shouldReload, currentPage]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions, shouldReload, currentPage]);

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

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedSubcription, setSelectedSubcription] = useState<Subscription | null>(null);

  return (
    <BaseLayout>
      <main>
        <div className="min-h-[600px] my-10">
          {isModalOpen && (
            <AddEditSubscriptionModal
              onClose={onCloseModal}
              isEditing={false}
            />
          )}

          {isAddModalOpen && (
            <AddEditSubscriptionModal
              onClose={onCloseModal}
              isEditing={false}
            />
          )}

          {isEditModalOpen && (
            <AddEditSubscriptionModal
              onClose={onCloseModal}
              subscriptionData={selectedSubcription}
              isEditing={true}
            />
          )}
          {isDeleteModalOpen && (
            <DeleteModal
              deleteMessage="Delete Event"
              deleteDescription="Are you sure you want to delete?"
              buttonText="Delete"
              onDelete={onCloseModal}
              onClose={onCloseModal}
            />
          )}
          <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
            <div className="sm:flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Subscriptions
              </p>
              <div>
                <button
                  onClick={() => handleModalOpen("add")}
                  className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
                >
                  <p className="text-sm font-medium leading-none text-white">
                    Add Subscription
                  </p>
                </button>
              </div>
            </div>
          </div>
          <SubscriptionsTable
            setSelectedSubcription={setSelectedSubcription}
            handleModalOpen={handleModalOpen}

          />
        </div>
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={meta.limit}
          totalItems={meta.totalPage}
          totalPages={meta.totalPage}
        />
      </main>
    </BaseLayout>
  );
}

export default SubscriptionsPage;

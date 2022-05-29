import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks/redux_hooks";
import { getSubscriptionsApi } from "../../app/store/features/subscriptions/subscriptionsSlice";
import BaseLayout from "../../common/Layout";
import Pagination from "../../common/Paginations";
import AddEditSubscriptionModal from "../../components/Modals/AddEditSubcription";
import AddSongModal from "../../components/Modals/AddEditSong";
import SubscriptionsTable from "../../components/SubscriptionsTable";

function SubscriptionsPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const fetchSubscriptions = useCallback(async () => {
    await dispatch(getSubscriptionsApi({}));
  }, [dispatch]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const onCloseModal = () => {
    console.log("closing modal");
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <BaseLayout>
      <main>
        <div className="min-h-[600px] my-10">
          {isModalOpen && (
            <AddEditSubscriptionModal
              onClose={onCloseModal}
              onSubmit={() => {}}
              isEditing={false}
            />
          )}
          <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
            <div className="sm:flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Subscriptions
              </p>
              <div>
                <button
                  onClick={handleModalOpen}
                  className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
                >
                  <p className="text-sm font-medium leading-none text-white">
                    Add Subscription
                  </p>
                </button>
              </div>
            </div>
          </div>
          <SubscriptionsTable />
        </div>
        <Pagination />
      </main>
    </BaseLayout>
  );
}

export default SubscriptionsPage;

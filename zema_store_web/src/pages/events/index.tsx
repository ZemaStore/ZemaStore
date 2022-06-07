import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux_hooks";
import {
  eventsSelector,
  getEventsApi,
} from "../../app/store/features/events/eventsSlice";
import BaseLayout from "../../common/Layout";
import Pagination from "../../common/Paginations";
import EventsTable from "../../components/EventsTable";
import AddEditEventModal from "../../components/Modals/AddEditEvent";
import DeleteModal from "../../components/Modals/DeleteModal";
import { Event } from "../../helpers/types";

function EventsPage() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { meta } = useAppSelector(eventsSelector);

  const [shouldReload, setShouldReload] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchEvents = useCallback(async () => {
    await dispatch(getEventsApi({ currentPage }));
  }, [dispatch]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const onCloseModal = () => {
    console.log("closing modal");
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <BaseLayout>
      {isAddModalOpen && (
        <AddEditEventModal
          onClose={onCloseModal}
          onSubmit={() => { }}
          isEditing={false}
        />
      )}
      {isEditModalOpen && (
        <AddEditEventModal
          onClose={onCloseModal}
          eventData={selectedEvent}
          onSubmit={() => { }}
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
      <div className="min-h-[600px] my-10">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Events
            </p>
            <button
              data-test-id="add-event-btn"
              onClick={() => handleModalOpen("add")}
              className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
            >
              <p className="text-sm font-medium leading-none text-white">
                Add Event
              </p>
            </button>
          </div>
        </div>
        <EventsTable
          setSelectedEvent={setSelectedEvent}
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
    </BaseLayout>
  );
}

export default EventsPage;

import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks/redux_hooks";
import { getEventsApi } from "../../app/store/features/events/events";
import BaseLayout from "../../common/Layout";
import Pagination from "../../common/Paginations";
import EventsTable from "../../components/EventsTable";
// import EventsTable from "src/components/EventsTable";

function EventsPage() {
  const dispatch = useAppDispatch();

  const fetchEvents = useCallback(async () => {
    await dispatch(getEventsApi({}));
  }, [dispatch]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <BaseLayout>
      <div className="min-h-[600px] my-10">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Events
            </p>
          </div>
        </div>
        <EventsTable />
      </div>
      <Pagination />
    </BaseLayout>
  );
}

export default EventsPage;

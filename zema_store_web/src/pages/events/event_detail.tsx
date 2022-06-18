
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import EventsService from "../../app/services/events.service";
import NotificationsService from "../../app/services/notification";
import { Event } from "../../helpers/types";
import notify from "../../utils/notify";
type Props = {
  from: string;
};

function EventDetail(props: Props) {
  const location = useLocation();
  let pathnames = location.pathname.split("/").slice()
  const eventId = pathnames.pop() || "";
  const [isLoading, setIsLoading] = useState<{ type: string, status: boolean }>({ type: "none", status: false })
  const [eventData, setEventData] = useState<Event | null>(null)


  const fetchEvent = useCallback(
    async () => {
      setIsLoading({ type: "none", status: true })
      try {
        const { data } = await EventsService.getEvent(eventId)
        if (data) {
          console.log(data, " is the event data")
          setEventData(data)
        }
        setIsLoading({ type: "none", status: false })
      } catch (error) {
        setIsLoading({ type: "none", status: false })
      }
    },
    [location.pathname],
  )

  useEffect(() => {
    fetchEvent()
  }, [fetchEvent])

  const handleNotify = (type: string) => async (e: any) => {
    try {
      if (type === "all") {
        setIsLoading({ type: "all", status: true })
        await NotificationsService.notifyAll(eventId)
      } else if (type === "followers") {
        setIsLoading({ type: "followers", status: true })
        await NotificationsService.notifyFollowers(eventId)
      }

      notify.success("Notification has been sent successfully!")
    } catch (error) {
      setIsLoading({ type: "none", status: false })
      notify.error("There is an error while sending notification!")
    }
    setIsLoading({ type: "none", status: false })
  }

  const PreviewEventData = useMemo(() => {
    return (
      <div className="">
        {
          eventData ?
            <div className=" !border-orange-500 w-full  relative my-2 flex flex-col items-center justify-center">
              <img
                className="h-full w-full"
                src={eventData.imageUrl}
              />,

            </div>
            : <div className="flex items-center justify-center" >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
        }
      </div>
    )
  }, [eventData])

  return (
    <main className="flex justify-center">
      <div className="min-h-[600px] w-full lg:w-2/3 2xl:1/2 my-10">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg flex justify-between">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Event Detail
          </p>
          <div className="flex gap-x-2">
            <button
              data-test-id="notify-all-btn"
              onClick={handleNotify("all")}
              disabled={isLoading.type === "all" && isLoading.status}
              className={clsx(
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 disabled:bg-indigo-400  disabled:cursor-not-allowed rounded text-white px-8 py-3 text-sm flex justify-center items-center"
              )}
            >
              {isLoading.type === "all" && isLoading.status ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>Notify All</>
              )}
            </button>
            <button
              data-test-id="notify-followers-btn"
              onClick={handleNotify("followers")}
              disabled={isLoading.type === "followers" && isLoading.status}
              className={clsx(
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 disabled:bg-indigo-400  disabled:cursor-not-allowed rounded text-white px-8 py-3 text-sm flex items-center justify-center"
              )}
            >

              {isLoading.type === "followers" && isLoading.status ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>Notify Followers</>
              )}
            </button>

          </div>
        </div>
        <div className="flex justify-center my-5 py-4 border md:gap-5 xl:gap-x-10">
          {

            isLoading.type === "none" && isLoading.status ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>

            ) : (
              <>
                <div className="my-5 relative w-1/3">
                  {PreviewEventData}
                </div>
                <div className="my-5 flex flex-col w-2/3">
                  <div className="my-5">
                    <h1 className="text-xl">
                      <span className="font-bold">
                        Title: &nbsp;
                      </span>
                      {eventData?.title}</h1>
                  </div>
                  <div className="my-5">
                    <h1 className="text-xl ">
                      <span className="font-bold">
                        Summary:{" "}
                      </span>{eventData?.summary}</h1>
                  </div>

                  <div className="my-5">
                    <h1 className="text-xl">
                      <span className="font-bold">
                        Venue: {" "}
                      </span>
                      {eventData?.venue.name}</h1>
                  </div>

                  <div className="my-5">
                    <h1 className="text-xl">
                      <span className="font-bold">
                        Date: {" "}
                      </span>
                      {eventData?.date}</h1>
                  </div>
                </div>
              </>

            )
          }
        </div>
      </div>
    </main >
  );
}

export default EventDetail;

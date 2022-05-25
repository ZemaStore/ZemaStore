import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/redux_hooks";
import { eventsSelector } from "../../app/store/features/events/eventsSlice";
import Loader from "../../common/Widgets/Loader";
import { Event } from "../../helpers/types";

type Props = {
  setSelectedEvent: React.Dispatch<React.SetStateAction<Event | null>>;
  handleModalOpen: (modalType?: string) => void;
};

const EventsTable = (props: Props) => {
  const [show, setShow] = useState<number | null>(0);
  const [selectedEventId, setSelectedEvent] = useState<string | null>(null);

  const { isLoading, searchEventsList } = useAppSelector(eventsSelector);

  const navigate = useNavigate();

  const handleClickMore = (id: string) => (e: any) => {
    e.stopPropagation();
    if (selectedEventId === id) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(id);
    }
  };

  const handleEditEvent = (selEvent: Event) => {
    try {
      props.setSelectedEvent(selEvent);
      setSelectedEvent(null);
      props.handleModalOpen("edit");
    } catch (error) {}
  };

  const handleDeleteEvent = (selEvent: Event) => {
    try {
      props.setSelectedEvent(selEvent);
      setSelectedEvent(null);
      props.handleModalOpen("delete");
    } catch (error) {}
  };

  const handleEventsDetails = (id: string) => (e: any) => {
    navigate(`/artists/${id}`);
  };

  return (
    <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
      {isLoading ? (
        <div className="h-full w-full grid place-items-center">
          <Loader className="h-4 w-4" />
        </div>
      ) : (
        <table className="w-full whitespace-nowrap">
          <thead>
            {/* /**
 id: string;
  title: string;
  summary: string;
  cover: string;
  venue: {
    country: string;
    city: string;
    street: string;
    zip: string;
  };
  startDate: string; 
  createdAt: string; */}

            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left pl-4">Title</th>
              <th className="font-normal text-left pl-12">Summary</th>
              <th className="font-normal text-left pl-12">Start Day</th>
              <th className="font-normal text-left pl-20">Address</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {searchEventsList.length > 0 &&
              searchEventsList.map((event: Event) => {
                return (
                  <tr
                    onClick={handleEventsDetails(event.id)}
                    key={event.id}
                    className="h-20 handleEventsDetails text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                  >
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-10 h-10">
                          <img
                            className="w-full h-full"
                            src={"/images/user-avatars.svg"}
                          />
                        </div>
                        <div className="pl-4">
                          <p className="font-medium">{event.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {event.summary}
                      </p>
                      <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                        <div className="w-20 h-3 bg-green-progress rounded-full" />
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{event.venue.city}</p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">{event.createdAt}</p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">{event.venue.zip}</p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        {event.venue.street} ,{event.venue.zip},{" "}
                        {event.venue.city}, {event.venue.country}{" "}
                      </p>
                    </td>

                    <td
                      className="px-7 2xl:px-0 cursor-pointer"
                      onClick={handleClickMore(event.id)}
                    >
                      <button
                        onClick={handleClickMore(event.id)}
                        className="focus:outline-none pl-7"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
                            stroke="#A1A1AA"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
                            stroke="#A1A1AA"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
                            stroke="#A1A1AA"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {selectedEventId === event.id && (
                        <div className="dropdown-content bg-white shadow-lg shadow-blue-100 w-24 absolute z-50 right-0 mr-16">
                          <div
                            onClick={() => handleEditEvent(event)}
                            className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                          >
                            <p>Edit</p>
                          </div>
                          <div
                            onClick={() => handleDeleteEvent(event)}
                            className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                          >
                            <p className="text-red-500">Delete</p>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventsTable;

// import React, { useState } from "react";

// type Props = {};

// const EventsTable = (props: Props) => {
//   const [show, setShow] = useState<number | null>(0);

//   const [events, setEvents] = useState([
//     {
//       id: "3234234234",
//       title: "John Doe",
//       summary: "some thing Doe",
//       cover: "https://cdn.tuk.dev/assets/templates/olympus/projects(3).png",
//       venue: {
//         country: "Ethiopia",
//         city: "Addis Ababa",
//         street: "Kenya",
//         zip: "12345",
//       },
//       startDate: "2020-02-01",
//       createdAt: "2020-01-01",
//     },
//     {
//       id: "1232322323234",
//       title: "John Doe",
//       summary: "some thing Doe",
//       cover: "https://cdn.tuk.dev/assets/templates/olympus/projects(3).png",
//       venue: {
//         country: "USA",
//         city: "New York",
//         street: "123 Main St",
//         zip: "12345",
//       },
//       startDate: "2020-02-01",
//       createdAt: "2020-01-01",
//     },
//     {
//       id: "1wef3232423423423",
//       title: "John Doe",
//       summary: "some thing Doe",
//       cover: "https://cdn.tuk.dev/assets/templates/olympus/projects(3).png",
//       venue: {
//         country: "UK",
//         city: "London",
//         street: "123 Main St",
//         zip: "12345",
//       },
//       startDate: "2020-02-01",
//       createdAt: "2020-01-01",
//     },
//   ]);

//   return (
//     <div className="w-full">
//       <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
//         <table className="w-full whitespace-nowrap">
//           <thead>
//             <tr className="h-16 w-full text-sm leading-none text-gray-800">
//               <th className="font-normal text-left pl-4">Title</th>
//               <th className="font-normal text-left pl-12">Summary</th>
//               <th className="font-normal text-left pl-12">Venue</th>
//               <th className="font-normal text-left pl-20">Date</th>
//               <th className="font-normal text-left pl-20">Created at</th>
//             </tr>
//           </thead>
//           <tbody className="w-full">
//             {events.length > 0 &&
//               events.map((event) => {
//                 return (
//                   <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
//                     <td className="pl-4 cursor-pointer">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10">
//                           <img className="w-full h-full" src={event.cover} />
//                         </div>
//                         <div className="pl-4">
//                           <p className="font-medium">{event.title}</p>
//                           {/* <p className="text-xs leading-3 text-gray-600 pt-2">
//                               Herman Group
//                             </p> */}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="pl-12">
//                       <p className="text-sm font-medium leading-none text-gray-800">
//                         {event.summary}
//                       </p>
//                       <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
//                         <div className="w-20 h-3 bg-green-progress rounded-full" />
//                       </div>
//                     </td>
//                     <td className="pl-12">
//                       <p className="font-medium">{event.venue.city}</p>
//                       <p className="text-xs leading-3 text-gray-600 mt-2">
//                         {event.venue.street},{event.venue.city},
//                         {event.venue.country}
//                       </p>
//                     </td>
//                     <td className="pl-20">
//                       <p className="font-medium">{event.startDate}</p>
//                       {/* <p className="text-xs leading-3 text-gray-600 mt-2">
//                           {event.startDate}
//                         </p> */}
//                     </td>
//                     <td className="pl-20">
//                       <p className="font-medium">22.12.21</p>
//                       <p className="text-xs leading-3 text-gray-600 mt-2">
//                         {event.createdAt}
//                       </p>
//                     </td>

//                     <td className="px-7 2xl:px-0">
//                       {show == 0 ? (
//                         <button
//                           onClick={() => setShow(null)}
//                           className="focus:outline-none pl-7"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width={20}
//                             height={20}
//                             viewBox="0 0 20 20"
//                             fill="none"
//                           >
//                             <path
//                               d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
//                               stroke="#A1A1AA"
//                               strokeWidth="1.25"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                             <path
//                               d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
//                               stroke="#A1A1AA"
//                               strokeWidth="1.25"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                             <path
//                               d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
//                               stroke="#A1A1AA"
//                               strokeWidth="1.25"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => setShow(0)}
//                           className="focus:outline-none pl-7"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width={20}
//                             height={20}
//                             viewBox="0 0 20 20"
//                             fill="none"
//                           >
//                             <path
//                               d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
//                               stroke="#A1A1AA"
//                               strokeWidth="1.25"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                             <path
//                               d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
//                               stroke="#A1A1AA"
//                               strokeWidth="1.25"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                             <path
//                               d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
//                               stroke="#A1A1AA"
//                               strokeWidth="1.25"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                         </button>
//                       )}
//                       {show == 0 && (
//                         <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 ">
//                           <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                             <p>Edit</p>
//                           </div>
//                           <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                             <p>Delete</p>
//                           </div>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EventsTable;

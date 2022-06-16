import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/redux_hooks";
import { subscriptionsSelector } from "../../app/store/features/subscriptions/subscriptionsSlice";
import Loader from "../../common/Widgets/Loader";
import { Subscription } from "../../helpers/types";

type Props = {
  setSelectedSubcription: React.Dispatch<React.SetStateAction<Subscription | null>>;
  handleModalOpen: (modalType?: string) => void;
};

const SubscriptionsTable = (props: Props) => {
  const [show, setShow] = useState<number | null>(0);
  const { searchSubscriptionsList, isLoading } = useAppSelector(
    subscriptionsSelector
  );
  const [selectedSubscriptionId, setSelectedSubscription] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleClickMore = (id: string) => (e: any) => {
    e.stopPropagation();
    if (selectedSubscriptionId === id) {
      setSelectedSubscription(null);
    } else {
      setSelectedSubscription(id);
    }
  };

  const handleEditSubcription = (selSub: Subscription) => {
    try {
      props.setSelectedSubcription(selSub);
      setSelectedSubscription(null);
      props.handleModalOpen("edit");
    } catch (error) { }
  };

  const handleDeleteSubscription = (selSubcription: Subscription) => {
    try {
      props.setSelectedSubcription(selSubcription);
      setSelectedSubscription(null);
      props.handleModalOpen("delete");
    } catch (error) { }
  };

  const handleEventsDetails = (id: string) => (e: any) => {
    navigate(`/events/${id}`);
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
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left pl-4">Title</th>
              <th className="font-normal text-left pl-12">Summary</th>
              <th className="font-normal text-left pl-12">Price</th>
              <th className="font-normal text-left pl-12">Sub Type</th>
              <th className="font-normal text-left pl-12">Created At</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {searchSubscriptionsList.map(
              (subscription: Subscription, index) => {
                return (
                  <tr
                    key={subscription.id}
                    // onClick={handleEventsDetails(subscription.id)}
                    className="h-20 text-sm leading-none text-gray-800 border-b border-t bg-white hover:bg-gray-100 border-gray-100"
                  >
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-10 h-10">
                          <img
                            className="w-full h-full"
                            src={subscription.cover}
                          />
                        </div>
                        <div className="pl-4">
                          <p className="font-medium">{subscription.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {subscription.summary}
                      </p>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {subscription.price}
                      </p>
                      <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                        <div className="w-20 h-3 bg-green-progress rounded-full" />
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{subscription.subType}</p>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{subscription.createdAt}</p>
                    </td>

                    <td
                      className="px-7 2xl:px-0 cursor-pointer"
                      onClick={handleClickMore(subscription.id)}
                    >
                      <button
                        data-test-id={`more-button-${index}`}
                        onClick={handleClickMore(subscription.id)}
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
                      {selectedSubscriptionId === subscription.id && (
                        <div
                          data-test-id="dropdown_btn"
                          className="flex flex-col dropdown-content bg-white shadow-lg shadow-blue-100 w-24 absolute z-50 right-0 mr-16"
                        >
                          <button
                            onClick={() => handleEditSubcription(subscription)}
                            data-test-id="edit_button"
                            className="overflow-visible text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                          >
                            <p>Edit</p>
                          </button>
                          <button
                            data-test-id="delete-button"
                            onClick={() => handleDeleteSubscription(subscription)}
                            className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                          >
                            <p className="text-red-500">Delete</p>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubscriptionsTable;

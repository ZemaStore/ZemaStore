import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks/redux_hooks";
import {
  searchusers,
  usersSelector,
} from "../../app/store/features/users/usersSlice";
import Loader from "../../common/Widgets/Loader";
import { User } from "../../helpers/types";

type Props = {
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  handleModalOpen: () => void;
};

const UsersTable = (props: Props) => {
  const [show, setShow] = useState<number | null>(0);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { searchUsersList, error, isLoading } = useAppSelector(usersSelector);

  const handleClickMore = (id: string) => (e: any) => {
    if (selectedUserId === id) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(id);
    }
  };

  const handleBlockUser = (selUser: User) => {
    try {
      props.setSelectedUser(selUser);
      setSelectedUserId(null);
      props.handleModalOpen();
    } catch (error) { }
  };

  return (
    <div className="h-full w-full bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto  grid place-items-center">
      {isLoading ? (
        <div className="h-full w-full grid place-items-center">
          <Loader className="h-4 w-4" />
        </div>
      ) : (
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left pl-4">Full Name</th>
              <th className="font-normal text-left pl-12">Email</th>
              <th className="font-normal text-left pl-12">Phone</th>
              <th className="font-normal text-left pl-20">Status</th>
              <th className="font-normal text-left pl-20">Sub Type</th>
              <th className="font-normal text-left pl-20">Address</th>
              <th className="font-normal text-left pl-6">More</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {searchUsersList.length > 0 ? (
              searchUsersList.map((user: User, index) => {
                return (
                  <tr
                    key={user.id}
                    className="h-20 text-sm leading-none text-gray-800 border-b border-t bg-white hover:bg-gray-100 border-gray-100"
                  >
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-10 h-10">
                          <img
                            className="w-full h-full"
                            src="/images/user-avatars.svg"
                          />
                        </div>
                        <div className="pl-4">
                          <p className="font-medium">{`${(user as any).profileId.firstName} ${(user as any).profileId.lastName}`}</p>
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {user.email}
                      </p>
                      <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                        <div className="w-6 h-3 bg-green-progress rounded-full" />
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{user.phone}</p>
                    </td>
                    <td className="pl-20">
                      <p
                        className={clsx(
                          "font-medium ",

                          user.isActive ? "text-green-700" : "text-red-700"
                        )}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        Member Since {user.createdAt}
                      </p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">
                        {user.subType.subscriptionType}
                      </p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        {user.subType.price}
                      </p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">{user.address.country}</p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        {user.address.zip},{user.address.street},
                        {user.address.city},{user.address.country}
                      </p>
                    </td>
                    <td
                      className="pl-20 px-7 2xl:px-0 overflow-visible cursor-pointer relative"
                      onClick={handleClickMore(user.id)}
                    >
                      <button
                        onClick={handleClickMore(user.id)}
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
                      {selectedUserId === user.id && (
                        <div className=" dropdown-content bg-white shadow-lg shadow-blue-100 w-24 absolute z-50">
                          <div
                            onClick={() => handleBlockUser(user)}
                            className="text-xs w-full hover:bg-indigo-300 py-4 px-4 cursor-pointer hover:text-white"
                          >
                            <p
                              className={clsx(
                                "font-bold",
                                user.isActive
                                  ? "text-red-700"
                                  : "text-green-700"
                              )}
                            >
                              {user.isActive ? "Block" : "Unblock"}
                            </p>
                          </div>
                          <div className="text-xs w-full hover:bg-indigo-300 py-4 px-4 cursor-pointer hover:text-white">
                            <p>Delete</p>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center w-full p-10 grid place-items-center min-w-[200px]">
                <td className="text-4xl font-bold">No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;

import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux_hooks";
import UsersService from "../../app/services/users.service";
import { getUsersApi } from "../../app/store/features/users/usersSlice";
import BaseLayout from "../../common/Layout";
import Pagination from "../../common/Paginations";
import DeleteModal from "../../components/Modals/DeleteModal";
import UsersTable from "../../components/UsersTable";
import { User } from "../../helpers/types";
import notify from "../../utils/notify";

type Props = {};

const UsersPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const { meta } = useAppSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [shouldReload, setShouldReload] = useState(false);

  const fetchUsers = useCallback(async () => {
    await dispatch(getUsersApi({ currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, shouldReload, currentPage]);

  const onCloseModal = () => {
    setIsBlockModalOpen(false);
  };

  const toggleUserStatus = useCallback(async () => {
    if (selectedUser) {
      try {
        await UsersService.toggleUserStatus(selectedUser?.id);
        setShouldReload((prev) => !prev);
        notify.success("User Account Status Updated");
      } catch (error) {
        notify.error("There is an error when updated User status");
      }
    }
  }, [selectedUser]);

  const onUserBlock = () => {
    console.log("hellow", selectedUser);
    setIsBlockModalOpen(false);
    toggleUserStatus();
  };

  const handleModalOpen = () => {
    setIsBlockModalOpen(true);
  };

  return (
    <BaseLayout>
      {isBlockModalOpen && (
        <DeleteModal
          deleteMessage={`${selectedUser?.isActive ? "Block" : "Unblock"} User`}
          deleteDescription={`Are you sure you want to ${
            selectedUser?.isActive ? "block" : "unblock"
          } user?`}
          buttonText={`${selectedUser?.isActive ? "Block" : "Unblock"}`}
          onDelete={onUserBlock}
          onClose={onCloseModal}
        />
      )}
      <div className="min-h-[600px] my-10">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Users
            </p>
          </div>
        </div>
        <UsersTable
          handleModalOpen={handleModalOpen}
          setSelectedUser={setSelectedUser}
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
};

export default UsersPage;

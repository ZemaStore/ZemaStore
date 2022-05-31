import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux_hooks";
import { getUsersApi } from "../../app/store/features/users/usersSlice";
import BaseLayout from "../../common/Layout";
import Pagination from "../../common/Paginations";
import DeleteModal from "../../components/Modals/DeleteModal";
import UsersTable from "../../components/UsersTable";
import { User } from "../../helpers/types";

type Props = {};

const UsersPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const { meta } = useAppSelector((state) => state.users);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const fetchUsers = useCallback(async () => {
    await dispatch(getUsersApi({}));
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onCloseModal = () => {
    
    setIsBlockModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsBlockModalOpen(true);
  };

  return (
    <BaseLayout>
      {isBlockModalOpen && (
        <DeleteModal
          deleteMessage="Block User"
          deleteDescription="Are you sure you want to block user?"
          buttonText="Block"
          onDelete={onCloseModal}
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
        currentPage={meta.currentPage}
        pageSize={meta.limit}
        totalItems={meta.total}
      />
    </BaseLayout>
  );
};

export default UsersPage;

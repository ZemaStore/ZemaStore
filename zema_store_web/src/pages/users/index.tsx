import React, { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks/redux_hooks";
import { getUsersApi } from "../../app/store/features/users/usersSlice";
import BaseLayout from "../../common/Layout";
import Pagination from "../../common/Paginations";
import UsersTable from "../../components/UsersTable";

type Props = {};

const UsersPage = (props: Props) => {
  const dispatch = useAppDispatch();

  const fetchUsers = useCallback(async () => {
    await dispatch(getUsersApi({}));
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <BaseLayout>
      <div className="min-h-[600px] my-10">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Users
            </p>
          </div>
        </div>
        <UsersTable />
      </div>
      <Pagination />
    </BaseLayout>
  );
};

export default UsersPage;

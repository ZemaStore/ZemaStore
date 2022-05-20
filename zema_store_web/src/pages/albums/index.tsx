import React from "react";
import { Outlet } from "react-router-dom";
import BaseLayout from "../../common/Layout";
import Pagination from "../../common/Paginations";
import AlbumsTable from "../../components/AlbumsTable";

type Props = {};

const AlbumsIndexPage = (props: Props) => {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default AlbumsIndexPage;

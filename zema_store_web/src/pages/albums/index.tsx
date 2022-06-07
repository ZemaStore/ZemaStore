import React from "react";
import { Outlet } from "react-router-dom";
import BaseLayout from "../../common/Layout";
import Pagination from "../../common/Paginations";
import AlbumsTable from "../../components/AlbumsTable";

type Props = {
  from: string;
};

const AlbumsIndexPage = (props: Props) => {
  return props.from === "artists" ? (<Outlet />) : (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default AlbumsIndexPage;

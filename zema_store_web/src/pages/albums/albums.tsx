import React from "react";
import BaseLayout from "../../common/Layout";
import Pagination from "../../common/Paginations";
import AlbumsTable from "../../components/AlbumsTable";

type Props = {};

const AlbumsPage = (props: Props) => {
  return (
    <main>
      <AlbumsTable />
      <Pagination />
    </main>
  );
};

export default AlbumsPage;

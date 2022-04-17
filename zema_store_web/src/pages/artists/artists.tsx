import Pagination from "../../common/Paginations";
import ArtistsTable from "../../components/ArtistsTable";

function ArtistsPage() {
  return (
    <main>
      <ArtistsTable />
      <Pagination />
    </main>
  );
}

export default ArtistsPage;

import { Link } from "react-router-dom";
import BaseLayout from "../../common/Layout";
import Pagination from "../../common/Paginations";
import SubscriptionsTable from "../../components/SubscriptionsTable";

function SubscriptionsPage() {
  return (
    <BaseLayout>
      <main>
        <SubscriptionsTable />
        <Pagination />
      </main>
    </BaseLayout>
  );
}

export default SubscriptionsPage;

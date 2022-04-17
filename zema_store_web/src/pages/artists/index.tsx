import { Link, Outlet } from "react-router-dom";
import BaseLayout from "../../common/Layout";

function ArtistsIndexPage() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
}

export default ArtistsIndexPage;

import { Outlet } from "react-router-dom";
import BaseLayout from "../../common/Layout";

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

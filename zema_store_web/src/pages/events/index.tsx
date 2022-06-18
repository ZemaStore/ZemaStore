import { Outlet } from "react-router-dom";
import BaseLayout from "../../common/Layout";

function EventsIndexPage() {
    return (<BaseLayout>
        <Outlet />
    </BaseLayout>);
}

export default EventsIndexPage;

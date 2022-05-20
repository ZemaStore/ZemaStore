import { WithChildren } from "../../helpers/types";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

interface LayoutProps extends WithChildren {
  siteId?: string;
}

export default function BaseLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col flex-no-wrap w-full">
      <Navbar />
      <div className="w-full  flex justify-between h-[calc(100vh-64px)] overflow-hidden ">
        <div className="hidden xl:flex min-h-full w-1/6 relative">
          <Sidebar />
        </div>
        <div className=" flex-1 w-5/6 overflow-auto min-h-[calc(100vh-64px)]">
          <div className=" container px-10 min-h-[800px]">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

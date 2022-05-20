import { format } from "date-fns";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="w-full min-h-[150px] flex justify-center items-center text-white bg-blue-900 bg-opacity-50">
      <div className="w-3/4 h-full flex items-center gap-x-10">
        <h2>Copyright {format(Date.now(), "yyyy")}</h2>
        <h2>Zema Store PLC</h2>
      </div>
    </div>
  );
};

export default Footer;

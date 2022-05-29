import { useLocation } from "react-router-dom";
type Props = {
  from: string;
};

function SongDetail(props: Props) {
  const location = useLocation();

  return (
    <main>
      <div className="min-h-[600px] my-10">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Song Detail
          </p>
        </div>
      </div>
    </main>
  );
}

export default SongDetail;

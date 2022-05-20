type Props = {
  className?: string;
};

const Loader = (props: Props) => {
  return (
    <div className="flex m-3 p-5 gap-x-1 h-10 w-full items-center justify-center">
      <span className="w-4 h-4 rounded-full  bg-black animate-loader "></span>
      <span className="w-4 h-4 rounded-full bg-black animate-loader animation-delay-200"></span>
      <span className="w-4 h-4 rounded-full bg-black animate-loader animation-delay-400"></span>
    </div>
  );
};

export default Loader;

import clsx from "clsx";
import { useState } from "react";

type Props = {
  deleteMessage: string;
  deleteDescription: string;
  buttonText: string;
  onDelete: () => void;
  onClose: () => void;
};
const DeleteModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    await props.onDelete()
    setIsLoading(false)
  }

  return (
    <div>
      <div
        className="py-24 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
        id="add_artist_modal"
      >
        <div role="alert" className="container mx-auto w-11/12">
          <div className="w-11/12 mx-auto mb-4 my-6 md:w-5/12 shadow sm:px-10 sm:py-6 py-4 px-4 bg-white dark:bg-gray-800 rounded-md">
            <div className="flex pb-3 items-center">
              <div className="-ml-1 text-gray-600 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-trash"
                  width={32}
                  height={32}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={4} y1={7} x2={20} y2={7} />
                  <line x1={10} y1={11} x2={10} y2={17} />
                  <line x1={14} y1={11} x2={14} y2={17} />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </div>
              <p className="text-lg text-gray-800 dark:text-gray-100 font-semibold pl-2">
                {props.deleteMessage}
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 pb-3 font-normal">
              {props.deleteDescription}
            </p>
            <button className=""></button>
            <button
              data-test-id="confrim_delete"
              onClick={handleDelete}
              disabled={isLoading}
              className={clsx(
                "focus:outline-none bg-red-400  focus:ring-2 focus:ring-offset-2 hover:bg-red-500 transition duration-150 ease-in-out  disabled:cursor-not-allowed rounded text-white px-8 py-2 text-sm flex"
              )}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <> {props.buttonText}</>
              )}

            </button>
            <button
              onClick={props.onClose}
              className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-10 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;

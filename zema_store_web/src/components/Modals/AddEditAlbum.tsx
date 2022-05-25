import { FormEvent, useRef } from "react";
import { useAppDispatch } from "../../app/hooks/redux_hooks";
import {
  addAlbum,
  updateAlbum,
} from "../../app/store/features/albums/albumsSlice";
import { Album } from "../../helpers/types";
import notify from "../../utils/notify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AutoCompleteSearch from "../../widgets/AutocompleteSearch";

type Props = {
  isEditing: boolean;
  albumData?: Album | null;
  onClose: () => void;
  onSubmit: () => void;
};

const AddEditAlbumModal = (props: Props) => {
  const { onClose, onSubmit } = props;
  let modal = document.getElementById("modal");
  const fileUploadFileRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const AddEditAlbumSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please Enter Title")
      .required("Required!"),
    artistId: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid Email").required("Required!"),

    password: Yup.string()
      .required("Please Enter the password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  function modalHandler(val = true) {
    // fadeOut(modal);
    props.onClose();
  }
  function fadeOut(el: any) {
    el.style.opacity = 1;
    (function fade() {
      if ((el.style.opacity -= 0.1) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }
  function fadeIn(el: any, display: string) {
    el.style.opacity = 0;
    el.style.display = display || "flex";
    (function fade() {
      let val = el.style.opacity;
      if (!((val += 0.2) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }

  const handleFileInput = (e: any) => {
    console.log(e.target.files[0], " is the file");
  };

  return (
    <div>
      <div
        className="py-24 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
        id="modal"
      >
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
        >
          <Formik
            initialValues={{
              title: props.isEditing ? props.albumData?.title : "",
              artistId: props.isEditing ? props.albumData?.artist : "",
            }}
            validationSchema={AddEditAlbumSchema}
            onSubmit={async (values) => {
              try {
                if (props.isEditing) {
                  const updatedData = {
                    ...props.albumData,
                    ...values,
                  };
                  console.log(values, updatedData, " is up");
                  await dispatch(updateAlbum(updatedData));
                  props.onClose();
                  notify.success("Artist Updated Successufully!");
                } else {
                  await dispatch(addAlbum(values));
                  props.onClose();
                  notify.success("Artist Added Successufully!");
                }
              } catch (error: any) {
                notify.error(error.toString());
              }
            }}
          >
            {({ errors, touched, isValidating }) => (
              <Form>
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                  <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                    Enter Albums Details
                  </h1>

                  <label
                    htmlFor="name"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Album Title
                  </label>
                  <input
                    id="name"
                    className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder="Album Title"
                  />

                  <AutoCompleteSearch
                    label="Artist"
                    inputProps={{
                      id: "artistId",
                      name: "artistId",
                      placeholder: "Search artist",
                      className:
                        "w-full py-2 bg-transparent border-none rounded-md outline-none text-ivory-800 font-cal focus:outline-none focus:ring-0 focus:border-transparent",
                    }}
                    url="/api/artists/search?&query="
                  />

                  <label
                    htmlFor="name"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Release Date
                  </label>
                  <input
                    id="name"
                    className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder="Year"
                  />
                  <div className="overflow-hidden relative mt-4 mb-4">
                    <label className="block">
                      <span className="sr-only">Choose profile photo</span>
                      <input
                        type="file"
                        name="cover"
                        accept="image/*"
                        onInput={(e) => {
                          handleFileInput(e);
                        }}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 hover:file:text-violet-800"
                      />
                    </label>
                  </div>
                  <div className="flex items-center justify-start w-full">
                    <button
                      onClick={() => {
                        props.onSubmit();
                      }}
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                    >
                      Submit
                    </button>
                    <button
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                      onClick={() => modalHandler(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  <button
                    className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                    onClick={() => modalHandler(false)}
                    aria-label="close modal"
                    role="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-x"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      stroke-width="2.5"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddEditAlbumModal;

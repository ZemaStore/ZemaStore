import { Field, Form, Formik } from "formik";
import { FormEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Song } from "../../helpers/types";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux_hooks";
import { clearMessage } from "../../app/store/features/artists/artistsSlice";
import { updateEvent, addEventsApi } from "../../app/store/features/events/eventsSlice";
import notify from "../../utils/notify";
import { updateAlbumsApi } from "../../app/store/features/albums/albumsSlice";
import { addSongsApi, songsSelector, updateSongsApi } from "../../app/store/features/songs/songsSlice";
import ReactAudioPlayer from "react-audio-player";
import clsx from "clsx";
import { useLocation } from "react-router-dom";


type Props = {
  isEditing: boolean;
  songData?: Song | null;
  onClose: () => void;
  onSubmit: () => void;
};

const SongsValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please Enter Song title"),
  genre: Yup.string().required("Required!"),
  length: Yup.number().required("Required!"),
  releaseDate: Yup.string().required("Required!"),
});


const AddEditSongModal = (props: Props) => {
  let modal = document.getElementById("modal");
  const fileUploadFileRef = useRef<HTMLInputElement>(null);
  const [songCover, setSongCover] = useState<File | null>(null);
  const [songFile, setSongFile] = useState<File | null>(null)
  const { isLoading } = useAppSelector(songsSelector);

  const location = useLocation()
  let pathnames = location.pathname.split("/").slice()
  const albumId = pathnames.pop();
  const artistId = pathnames.pop();



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


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  useLayoutEffect(() => {
    modal = document.getElementById("add_event_modal");
  }, []);

  function modalHandler(val = true) {
    props.onClose();
    // fadeOut(modal);
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


  const PreviewSongData = useMemo(() => {
    let songURL = "";
    if (props.isEditing && props.songData?.song) {
      songURL = props.songData.song;
    } else if (songFile !== null) {
      songURL = URL.createObjectURL(songFile);
    }

    return (
      <div className="my-2">
        {
          songURL ?
            <div className="h-20 !border-orange-500 w-full  relative my-2 flex flex-col items-center justify-center">
              <ReactAudioPlayer
                className=" w-full"
                src={songURL}
                controls
              />,

            </div>
            : <div className="flex" >
              <span className="relative">
                <svg className="w-full h-full top-0 left-0 absolute object-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                  <path d="M9 17H5a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm12-2h-4a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"></path><circle cx="9" cy="9" r="5"></circle></svg>
              </span>
              <h5>
                Not Selected
              </h5>
            </div>
        }
      </div>
    );
  }, [songFile])




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
              title: props.isEditing ? props.songData?.title : "",
              genre: props.isEditing ? props.songData?.genre : "reggae",
              length: props.isEditing ? props.songData?.length : 0,
              releaseDate: props.isEditing ? props.songData?.releaseDate ? new Date(props.songData?.releaseDate).toISOString().split("T")[0] : "" : new Date().toISOString().split("T")[0],
            }}
            validationSchema={SongsValidationSchema}
            onSubmit={async (values) => {
              const formData = new FormData();
              try {
                if (props.isEditing) {
                  const updatedData: any = {
                    ...props.songData,
                    ...values,
                  };
                  formData.append("title", values.title || "");
                  formData.append("id", props.songData?.id || "")
                  formData.append("releaseDate", values.releaseDate || new Date().toISOString());

                  if (songFile) {
                    formData.append('song', songFile);
                  }

                  await dispatch(updateSongsApi(formData));
                  props.onClose();
                  notify.success("Album Updated Successufully!");
                } else {
                  formData.append("albumId", albumId || "")
                  formData.append("artistId", artistId || "")
                  formData.append("title", values.title || "");
                  formData.append("genre", values.genre || "reggae");
                  formData.append("length", values.length?.toString() || "0");
                  formData.append("releaseDate", values.releaseDate || new Date().toISOString());

                  if (songFile) {
                    formData.append('song', songFile);
                  }
                  console.log(
                    formData.has("title"),
                    formData.has("releaseDate"),
                    formData.has("length"),
                    formData.has("song"),
                    formData.has("genre")
                  )
                  await dispatch(
                    addSongsApi(
                      formData
                    )
                  );
                  props.onClose();
                  notify.success("Album Added Successufully!");
                }
              } catch (error: any) {
                notify.error(error.toString());
              }
            }}
          >
            {({ errors, touched, isValidating, values }) => (
              <Form>
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                  <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                    Enter Song Details
                    {JSON.stringify(values)}
                  </h1>
                  <div className="my-2">

                    <label
                      htmlFor="title"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Song Title
                    </label>
                    <Field
                      id="title"
                      name="title"
                      className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      placeholder="Song Title"
                    />
                    {touched.title && errors.title && (
                      <div className="text-red-600">{errors.title}</div>
                    )}
                  </div>
                  <div className="my-2">

                    <label
                      htmlFor="length"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Length (sec)
                    </label>
                    <Field
                      id="length"
                      name="length"
                      type="number"
                      min={0}
                      className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      placeholder="Song Length in Second"
                    />
                    {touched.length && errors.length && (
                      <div className="text-red-600">{errors.length}</div>
                    )}
                  </div>
                  <div className="my-2">

                    <label
                      htmlFor="releaseDate"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Release Date
                    </label>
                    <Field
                      id="releaseDate"
                      type="date"
                      name="releaseDate"
                      className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      placeholder="YYYY-MM-DD"
                    />
                    {touched.releaseDate && errors.releaseDate && (
                      <div className="text-red-600">{errors.releaseDate}</div>
                    )}
                  </div>
                  <div className="my-2">

                    <label
                      htmlFor="genre"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Genre
                    </label>
                    <Field
                      as="select"
                      name="genre"
                      id="genre"
                      className="mb-5 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Genre"
                    >
                      <option value="reggae">Reggea</option>
                      <option value="pop">Pop</option>
                      <option value="classical">Classical</option>
                    </Field>
                    {touched.releaseDate && errors.releaseDate && (
                      <div className="text-red-600">{errors.releaseDate}</div>
                    )}
                  </div>

                  <div className="overflow-hidden relative mt-4 mb-4">
                    <label className="block">
                      <span className="sr-only">Choose song</span>
                      <input
                        type="file"
                        name="song"
                        accept="audio/mp3"
                        onChange={(event: any) => {
                          console.log(event.target.files[0], " is the file");
                          setSongFile(event.target.files[0]);
                        }}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 hover:file:text-violet-800"
                      />
                    </label>
                    <div className="my-2">
                      {PreviewSongData}
                    </div>


                  </div>


                  <div className="flex items-center justify-start w-full">

                    <button
                      type="submit"
                      data-test-id="add_event_button"
                      disabled={isLoading}
                      className={clsx(
                        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 disabled:bg-indigo-400  disabled:cursor-not-allowed rounded text-white px-8 py-2 text-sm flex"
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
                        <>{props.isEditing ? "Update" : "Submit"}</>
                      )}
                    </button>

                    <button
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                      onClick={() => modalHandler(false)}
                    >
                      Cancel
                    </button>
                  </div>

                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddEditSongModal;

import { useEffect, useLayoutEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Artist, Event, PlaceType } from "../../helpers/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux_hooks";

import {
  addEventsApi,
  clearMessage,
  eventsSelector,
  updateEvent,
  updateEventsApi,
} from "../../app/store/features/events/eventsSlice";
import notify from "../../utils/notify";
import PlacesAutocompleteSearch from "../../widgets/PlaceAutocomplete";
import AutoCompleteSearch from "../../widgets/AutocompleteSearch";
import { values } from "cypress/types/lodash";

Yup.addMethod(
  Yup.string,
  "phone",
  function (messageError = "Phone number is not valid") {
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    return this.test("phone", messageError, (value) => {
      if (value && value.length > 0) {
        return phoneRegExp.test(value);
      }
      return true;
    });
  }
);

const EventsValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please Enter fullname")
    .required("Required!"),
  summary: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please Enter fullname")
    .required("Required!"),
  date: Yup.string().required("Required!")
});

type Props = {
  isEditing: boolean;
  eventData?: Event | null;
  onClose: () => void;
  onSubmit: () => void;
};

const AddEditEventModal = (props: Props) => {
  let modal = document.getElementById("add_event_modal");
  const { isLoading, searchEventsList } = useAppSelector(eventsSelector);
  const [eventCover, setEventCover] = useState<File | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>()
  const [selectedPlace, setSelectedPlace] = useState<PlaceType>(
    props.eventData?.venue ? props.eventData?.venue : ({
      name: "Addis Ababa, Addis Ababa",
      latitude: 8.9806034,
      longitude: 38.7577605,
    })
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  useLayoutEffect(() => {
    modal = document.getElementById("add_event_modal");
  }, []);

  function modalHandler(val = true) {
    console.log(val, " is the value");
    fadeOut(modal);
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

  const PreviewEventCover = () => {
    let imgURL = "";
    if (props.isEditing && props.eventData?.imageUrl) {
      imgURL = props.eventData.imageUrl;
    } else if (eventCover !== null) {
      imgURL = URL.createObjectURL(eventCover);
    }

    return (
      <div className="my-2">
        {
          imgURL ?
            <div className="w-20 h-20 rounded-full relative my-2">
              <img
                className="w-full h-full rounded-full absolute object-cover border-2 border-orange-500"
                src={imgURL}
                alt="album cover" />
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
  }

  return (
    <div>
      <div
        className=" py-24 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
        id="add_event_modal"
        data-test-id="add_event_modal"
      >
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
          >
          {JSON.stringify(props.eventData?.id)}
          <Formik
            initialValues={{
              title: props.isEditing ? props.eventData?.title : "",
              summary: props.isEditing ? props.eventData?.summary : "",
              artistId: props.isEditing ? props.eventData?.artistId : "",
              date: props.isEditing ? props.eventData?.date ? new Date(props.eventData?.date).toISOString().split("T")[0] : "" : new Date().toISOString().split("T")[0],
              cover: props.isEditing ? props.eventData?.imageUrl : null,
            }}
            validationSchema={EventsValidationSchema}
            onSubmit={async (values) => {
              console.log("values are ", props.eventData, values)
              const formData = new FormData();
              try {
                if (props.isEditing) {

                  formData.append("title", values.title || "");
                  formData.append("artistId", values.artistId || "");
                  formData.append("id", props.eventData?.id || "")
                  formData.append("summary", values.summary || "");
                  formData.append("date", values.date || new Date().toISOString());
                  formData.append("venue", JSON.stringify(selectedPlace) || new Date().toISOString());

                  if (eventCover) {
                    formData.append('cover', eventCover);
                  }
                  await dispatch(updateEventsApi(formData));

                  props.onClose();
                  notify.success("Event Updated Successufully!");
                } else {
                  formData.append("title", values.title || "");
                  formData.append("artistId", values.artistId || "");
                  formData.append("summary", values.summary || "");
                  formData.append("date", values.date || new Date().toISOString());
                  formData.append("venue", JSON.stringify(selectedPlace) || new Date().toISOString());

                  if (eventCover) {
                    formData.append('cover', eventCover);
                  }
                  await dispatch(
                    addEventsApi(
                      formData
                    )
                  );
                  props.onClose();
                  notify.success("Event Added Successufully!");
                }
              } catch (error: any) {
                notify.error(error.toString());
              }
            }
            }
          >
            {({ errors, touched, isValidating, setFieldValue, values }) => (
              <Form>
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                  <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                    Enter Events Details
                  </h1>

                  <div className="my-5">
                    <label
                      htmlFor="fullName"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Event Name
                    </label>
                    <Field
                      id="title"
                      name="title"
                      data-test-id="title"
                      className={clsx(
                        "mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
                        touched.title && errors.title ? "border-red-500" : ""
                      )}
                      placeholder="Event Name"
                    />
                    {touched.title && errors.title && (
                      <div className="text-red-600">{errors.title}</div>
                    )}
                  </div>

                  <div className="my-5">
                    <label
                      htmlFor="email"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Summary
                    </label>
                    <Field
                      component="textarea"
                      rows={3}
                      id="summary"
                      name="summary"
                      data-test-id="summary"
                      className={clsx(
                        "mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full min-h-10 flex items-center pl-3 pt-3 text-sm border-gray-300 rounded border",
                        touched.summary && errors.summary
                          ? "border-red-500"
                          : ""
                      )}
                      placeholder="Event summary"
                    />
                    {touched.summary && errors.summary && (
                      <div className="text-red-600">{errors.summary}</div>
                    )}
                  </div>
                  <div className="my-5">
                    <label
                      htmlFor="places"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Event Places
                    </label>
                    <PlacesAutocompleteSearch
                      selectedPlace={selectedPlace}
                      setSelectedPlace={setSelectedPlace}
                      inputProps={{
                        className:
                          "mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
                        placeholder: "Enter Location",
                      }}
                      name="places"
                      id="places"
                    />

                  </div>
                  <AutoCompleteSearch
                    label="Artist"
                    selectedItem={selectedArtist}
                    setSelectedItem={(artist: any) => {
                      setSelectedArtist(artist);
                      setFieldValue("artistId", artist.id);
                    }}
                    inputProps={{
                      id: "artistId",
                      name: "artistId",
                      placeholder: "Search artist",
                      className: `${clsx(
                        "w-full py-2 bg-transparent border-none rounded-md outline-none text-ivory-800 font-cal focus:outline-none focus:ring-0 focus:border-transparent",
                        touched.artistId && errors.artistId
                          ? "border-red-500"
                          : ""
                      )}`,
                    }}
                    url={`${process.env.REACT_APP_BACKEND_URL}/artists?search=`}
                  />
                  {touched.artistId && errors.artistId && (
                    <div className="text-red-600">{errors.artistId}</div>
                  )}
                  <div className="my-5">
                    <label
                      htmlFor="event_date"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Event Date
                    </label>
                    <Field
                      id="event_date"
                      name="date"
                      data-test-id="event_date"
                      type="date"
                      className={clsx(
                        "mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
                        touched.date && errors.date
                          ? "border-red-500"
                          : ""
                      )}
                      placeholder="Event start date"
                    />
                    {touched.date && errors.date && (
                      <div className="text-red-600">{errors.date}</div>
                    )}
                  </div>
                  <div className="overflow-hidden relative mt-4 mb-4">
                    <label className="block">
                      <span className="sr-only">Choose profile photo</span>
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(event: any) => {
                          setEventCover(event.target.files[0]);
                        }}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 hover:file:text-violet-800"
                      />
                    </label>
                    <div className="my-2">
                      <PreviewEventCover />
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
                      data-test-id="cancel_event_button"
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-10 py-2 text-sm"
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
                      strokeWidth="2.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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

export default AddEditEventModal;

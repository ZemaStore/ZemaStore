import React, { useEffect, useLayoutEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux_hooks";
import {
  addArtist,
  addArtistsApi,
  artistsSelector,
  clearMessage,
  updateArtistsApi,
} from "../../app/store/features/artists/artistsSlice";
import notify from "../../utils/notify";
import { Artist } from "../../helpers/types";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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

const rePhoneNumber =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

type Props = {
  isEditing: boolean;
  artistData?: Artist | null;
  onClose: () => void;
  onSubmit: () => void;
};

const AddEditArtistModal = (props: Props) => {
  const { onClose, onSubmit } = props;
  let modal = document.getElementById("add_artist_modal");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading } = useAppSelector(artistsSelector);
  const dispatch = useAppDispatch();

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please Enter firstname"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please Enter lastname"),
    email: Yup.string().email("Invalid Email").required("Required!"),

    phone: Yup.string()
      .required("required")
      .matches(rePhoneNumber, "Phone number is not valid")
      .min(10, "to short")
      .max(14, "to long"),
    password: props.isEditing
      ? Yup.string()
      : Yup.string()
        .required("Required!")
        .min(6, "Too Short!")
        .required("Please Enter the password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
  });

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  useLayoutEffect(() => {
    modal = document.getElementById("add_artist_modal");
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

  return (
    <div>
      <div
        className="py-24 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
        id="add_artist_modal"
        data-test-id="artists_page_add_edit_form"
      >
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
        >
          <Formik
            initialValues={{
              firstName: props.isEditing ? props.artistData?.firstName : "",
              lastName: props.isEditing ? props.artistData?.lastName : "",
              email: props.isEditing ? props.artistData?.email : "",
              phone: props.isEditing ? props.artistData?.phone : "",
              password: "",
            }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={async (values) => {
              try {
                if (props.isEditing) {
                  console.log(props.artistData, "arthis data");
                  let updatedData: any = {};
                  // updatedData.id = props.artistData?.id;
                  updatedData.phone = values.phone;
                  updatedData.email = values.email;
                  updatedData.firstName = values.firstName;
                  updatedData.lastName = values.lastName;
                  if (values.password !== "") {
                    updatedData.password = values.password;
                  }
                  await dispatch(updateArtistsApi({ 
                    id: props.artistData?.id, 
                    formData: updatedData 
                  }));
                  props.onClose();
                  notify.success("Artist Updated Successufully!");
                } else {
                  await dispatch(addArtistsApi(values));
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
                <div
                  className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400"
                  data-test-id="artitst_add_edit_title"
                >
                  <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                    Enter Artists Details
                  </h1>
                  <div className="my-5">
                    <label
                      htmlFor="firstName"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      First Name
                    </label>
                    <Field
                      id="firstName"
                      data-test-id="firstName"
                      name="firstName"
                      className={clsx(
                        "mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
                        touched.firstName && errors.firstName
                          ? "border-red-500"
                          : ""
                      )}
                      placeholder="Artist Name"
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="text-red-600">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="my-5">
                    <label
                      htmlFor="lastName"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Last Name
                    </label>
                    <Field
                      id="lastName"
                      data-test-id="lastName"
                      name="lastName"
                      className={clsx(
                        "mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
                        touched.lastName && errors.lastName
                          ? "border-red-500"
                          : ""
                      )}
                      placeholder="Artist Name"
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="text-red-600">{errors.lastName}</div>
                    )}
                  </div>

                  <div className="my-5">
                    <label
                      htmlFor="email"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Email
                    </label>
                    <Field
                      id="email"
                      data-test-id="artist_email"
                      name="email"
                      className={clsx(
                        "mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
                        touched.email && errors.email ? "border-red-500" : ""
                      )}
                      placeholder="Artist Email"
                    />
                    {touched.email && errors.email && (
                      <div className="text-red-600">{errors.email}</div>
                    )}
                  </div>

                  <div className="my-5">
                    <label
                      htmlFor="phone"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Phone
                    </label>
                    <Field
                      data-test-id="artist_phone"
                      id="phone"
                      name="phone"
                      type="tel"
                      className={clsx(
                        "mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
                        touched.phone && errors.phone ? "border-red-500" : ""
                      )}
                      placeholder="Artist Phone"
                    />
                    {touched.phone && errors.phone && (
                      <div className="text-red-600">{errors.phone}</div>
                    )}
                  </div>

                  <div className="my-5">
                    <label
                      htmlFor="password"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Password
                    </label>
                    <div className="flex flex-col relative items-center py-2">
                      <Field
                        data-test-id="artist_password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={clsx(
                          " text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
                          touched.password && errors.password
                            ? "border-red-500"
                            : ""
                        )}
                        placeholder="Artist Password"
                      />
                      <div className="absolute right-5 flex items-center h-full top-0 ">
                        {showPassword ? (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setShowPassword(false);
                            }}
                            className="h-5 w-5 appearance-none border-none outline-none"
                          >
                            <AiFillEyeInvisible className="h-full w-full text-gray-500" />
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setShowPassword(true);
                            }}
                            className="h-5 w-5  appearance-none border-none outline-none"
                          >
                            <AiFillEye className="h-full w-full text-gray-500" />
                          </button>
                        )}
                      </div>
                    </div>
                    {touched.password && errors.password && (
                      <div className="text-red-600">{errors.password}</div>
                    )}
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
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-10 py-2 text-sm"
                      onClick={() => modalHandler(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  <button
                    data-test-id="artist_submit_button"
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

export default AddEditArtistModal;

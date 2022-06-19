import React, { useEffect, useLayoutEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import notify from "../../utils/notify";
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux_hooks";
import { authSelector, clearMessage, updateUserProfileApi } from "../../app/store/features/auth/authSlice";

type Props = {};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required"),
  old_password: Yup.string()
    .required("Please Enter your old password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const ChangeProfile = (props: Props) => {
  // const [errorMessage, setErrorMessage] = useState(null);

  const { currentUser, isLoading, errorMessage, error } = useAppSelector(authSelector)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div className="flex items-center my-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                Change Profile
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                change account information
              </p>
            </div>
            <div className="m-7">
              <Formik
                initialValues={{
                  email: currentUser ? currentUser.email : "",
                  old_password: "",
                  password: "",
                  confirm: "",
                }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={async (values) => {
                  try {
                    await dispatch(
                      updateUserProfileApi(
                        {
                          userId: currentUser._id,
                          formData: { password: values.password, old_password: values.old_password, email: values.email }
                        }
                      )
                    );
                    if (!error && !errorMessage) {
                      notify.success("User profile updated successfully");
                    } else {
                      // notify.error(errorMessage);
                    }
                    setTimeout(async () => {
                      await dispatch(clearMessage())
                    }, 5000);

                  } catch (error: any) {
                    // notify.error(errorMessage);
                    setTimeout(async () => {
                      await dispatch(clearMessage())
                    }, 2000);
                  }
                }}
              >
                {({ errors, touched, isValidating, values }) => (
                  <Form>
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        Email Address
                      </label>
                      <Field
                        type="email"
                        name="email"
                        autoComplete="on"
                        id="email"
                        placeholder="you@company.com"
                        className={clsx(
                          "w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500",
                          touched.email && errors.email
                            ? "border border-red-500"
                            : ""
                        )}
                      />
                      <ErrorMessage
                        className="text-red-500"
                        name="email"
                        component="div"
                      />
                    </div>
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <label
                          htmlFor="old_password"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          Old Password
                        </label>
                      </div>
                      <Field
                        type="password"
                        name="old_password"
                        id="old_password"
                        placeholder="Your old_password"
                        className={clsx(
                          " w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500",
                          touched.old_password && errors.old_password
                            ? "border border-red-500"
                            : ""
                        )}
                      />
                      <ErrorMessage
                        className="text-red-500"
                        name="old_password"
                        component="div"
                      />
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <label
                          htmlFor="password"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          Password
                        </label>
                      </div>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Your Password"
                        className={clsx(
                          " w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500",
                          touched.password && errors.password
                            ? "border border-red-500"
                            : ""
                        )}
                      />
                      <ErrorMessage
                        className="text-red-500"
                        name="password"
                        component="div"
                      />
                    </div>
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <label
                          htmlFor="confirm"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          Confirm
                        </label>
                      </div>
                      <Field
                        type="password"
                        name="confirm"
                        id="confirm"
                        placeholder="Your Password"
                        className={clsx(
                          " w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500",
                          touched.confirm && errors.confirm
                            ? "border border-red-500"
                            : ""
                        )}
                      />
                      <ErrorMessage
                        className="text-red-500"
                        name="confirm"
                        component="div"
                      />
                    </div>
                    <div className="mb-6">
                      <button
                        disabled={isLoading}
                        type="submit"
                        className="flex cursor-not-allowed justify-center items-center w-full px-3 py-4 text-white bg-indigo-500 disabled:bg-indigo-300 rounded-md focus:bg-indigo-600 focus:outline-none"
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
                          <>Update</>
                        )}
                      </button>
                    </div>
                    {errorMessage && (
                      <div className="form-group">
                        <div
                          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                          role="alert"
                        >
                          <span className="font-medium">{error && errorMessage}</span>
                          <p>
                            Change a few things up and try submitting again.
                          </p>
                        </div>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfile;

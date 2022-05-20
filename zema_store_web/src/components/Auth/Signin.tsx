import React, { useEffect, useLayoutEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "../../helpers/types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import notify from "../../utils/notify";
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux_hooks";
import {
  authSelector,
  clearMessage,
  loginApi,
} from "../../app/store/features/auth/authSlice";

type Props = {};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string().required("Required"),
});

const SigninComponent = (props: Props) => {
  const navigate = useNavigate();
  let location: any = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { isAuthenticated, error, errorMessage } = useAppSelector(authSelector);

  const from = ((location.state as any)?.from.pathname as string) || "/";

  useLayoutEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (email: string, password: string) => {
    setLoading(true);
    dispatch(loginApi({ email, password }))
      .unwrap()
      .then(async () => {
        navigate(from);
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                Sign in
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Sign in to access your account
              </p>
            </div>
            <div className="m-7">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={async (values) => {
                  try {
                    handleLogin(values.email, values.password);
                  } catch (error: any) {
                    notify.error(error.toString());
                  }
                }}
              >
                {({ errors, touched, isValidating }) => (
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
                          htmlFor="password"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          Password
                        </label>
                        <a
                          href="#!"
                          className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
                        >
                          Forgot password?
                        </a>
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
                      <button
                        disabled={loading}
                        type="submit"
                        className="flex cursor-not-allowed justify-center items-center w-full px-3 py-4 text-white bg-indigo-500 disabled:bg-indigo-300 rounded-md focus:bg-indigo-600 focus:outline-none"
                      >
                        {loading ? (
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
                          <>Sign in</>
                        )}
                      </button>
                    </div>
                    {error && (
                      <div className="form-group">
                        <div
                          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                          role="alert"
                        >
                          <span className="font-medium">{errorMessage}</span>
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

export default SigninComponent;

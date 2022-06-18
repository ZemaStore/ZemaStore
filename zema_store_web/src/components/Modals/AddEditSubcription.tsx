import { FormEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux_hooks";
import {
  addSubscription,
  subscriptionsSelector,
  updateSubscription,
} from "../../app/store/features/subscriptions/subscriptionsSlice";
import { Subscription } from "../../helpers/types";
import notify from "../../utils/notify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AutoCompleteSearch from "../../widgets/AutocompleteSearch";
import clsx from "clsx";

type Props = {
  isEditing: boolean;
  subscriptionData?: Subscription | null;
  onClose: () => void;
};

const AddEditSubscriptionModal = (props: Props) => {
  const { onClose } = props;
  let modal = document.getElementById("modal");
  const fileUploadFileRef = useRef<HTMLInputElement>(null);
  const { isLoading, searchSubscriptionsList } = useAppSelector(subscriptionsSelector);

  const dispatch = useAppDispatch();

  const AddEditSubscriptionSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please Enter Title")
      .required("Required!"),
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
              title: props.isEditing ? props.subscriptionData?.title : "",
              summary: props.isEditing ? props.subscriptionData?.summary : "",
              amount: props.isEditing ? props.subscriptionData?.amount : "",
              subscriptionType: props.isEditing ? props.subscriptionData?.subscriptionType : "",
            }}
            validationSchema={AddEditSubscriptionSchema}
            onSubmit={async (values) => {
              try {
                if (props.isEditing) {
                  const updatedData = {
                    ...props.subscriptionData,
                    ...values,
                  };
                  console.log(values, updatedData, " is up");
                  await dispatch(updateSubscription(updatedData));
                  props.onClose();
                  notify.success("Artist Updated Successufully!");
                } else {
                  await dispatch(addSubscription(values));
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
                    Enter Subscriptions Details
                  </h1>

                  <label
                    htmlFor="title"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Subscription Title
                  </label>
                  <Field
                    id="title"
                    name="title"
                    className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder="Subscription Title"
                  />
                  <label
                    htmlFor="price"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Subscription Price
                  </label>
                  <Field
                    id="price"
                    name="price"
                    min={0}
                    step={0}
                    type="number"
                    className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder="Subscription price"
                  />
                  <label
                    htmlFor="price"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Subscription type
                  </label>

                  <Field
                    className="mb-5 bg-none mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    name="color"
                    component="select"
                  >
                    <option className="p-5" value="weekly">
                      Weekly
                    </option>
                    <option className="p-5" value="monthly">
                      Monthly
                    </option>
                    <option className="p-5" value="annually">
                      Annually
                    </option>
                  </Field>

                  <label
                    htmlFor="summary"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Summary
                  </label>
                  <Field name="summary">
                    {({ field, form, meta }: any) => (
                      <div>
                        <textarea
                          className="form-control block  w-full px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition  ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="summary"
                          name="summary"
                          rows={4}
                          placeholder="Summary"
                          {...field}
                        />
                        {meta.touched && meta.error && (
                          <div className="error">{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>

                  <div className="overflow-hidden relative mt-4 mb-4">
                    <label className="block">
                      <span className="sr-only">Choose profile photo</span>
                      <Field
                        type="file"
                        name="cover"
                        accept="image/*"
                        onInput={(e: any) => {
                          handleFileInput(e);
                        }}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 hover:file:text-violet-800"
                      />
                    </label>
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

export default AddEditSubscriptionModal;

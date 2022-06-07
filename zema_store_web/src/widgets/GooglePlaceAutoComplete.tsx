import { useLoadScript } from "@react-google-maps/api";
import { Fragment, SetStateAction, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import configs from "../helpers/configs";

type Props = {
  id?: string;
  label: string;
  name?: string;
  inputProps: {};
  setSelected: (value: any) => void;
};

const PlacesAutocomplete = (props: Props) => {
  const [selected, setSelected] = useState<{
    lat?: number;
    lng?: number;
  } | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: configs.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="places-container">
      <PlaceInput setSelected={setSelected} props={props} />
    </div>
  );
};

const PlaceInput = (props: {
  props: Props;
  setSelected: React.Dispatch<
    SetStateAction<{
      lat?: number;
      lng?: number;
    } | null>
  >;
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const handleSelect = async (address: any) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    props.setSelected({ lat, lng });
  };
  return (
    <div
      className="
          "
    >
      <label
        htmlFor={props.props.id}
        className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
      >
        Event Location
      </label>
      <Combobox value={value} onChange={handleSelect}>
        <div
          className={`transition-all ease-in-out duration-300 w-full border border-ivory-600 flex flex-col flex-wrap rounded-md sm:text-sm text-ivory-800 
          `}
        >
          <div className={clsx("flex flex-wrap py-1 px-3 gap-1 rounded-md")}>
            <div className="flex items-center justify-between w-full input">
              <Combobox.Input
                value={value}
                disabled={!ready}
                {...props.props.inputProps}
                onChange={(e: any) => setValue(e.target.value)}
                className="w-full p-2 outline-none"
              />
              <span className="px-2">
                <XIcon className="w-5 h-5 text-ivory-600" aria-hidden="true" />
              </span>
            </div>
          </div>

          <Transition
            as={Fragment}
            show={status === "OK"}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in-out duration-500"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <div className={clsx("border-t overflow-auto py-5 h-[250px]")}>
              <Combobox.Options className="flex flex-col h-full p-1 overflow-auto gap-y-2">
                {data.map(({ place_id, description }) => (
                  <Combobox.Option
                    key={place_id}
                    value={place_id}
                    className="px-5 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-900"
                  >
                    <div className="flex items-center justify-between">
                      <p>{description}</p>
                    </div>
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default PlacesAutocomplete;

import React, { useState, useEffect, Fragment, useCallback } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import clsx from "clsx";

type Props = {
  id?: string;
  label: string;
  name?: string;
  inputProps: {};
  url: string;
};

function AutoCompleteSearch(props: Props) {
  const [filteredData, setFilteredData] = useState<[]>([]);
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${props.url}${query.trim()}`);
      const { artists: data } = await response.json();
      if (data) {
        //   const result = data.filter(
        //     (place: Place) =>
        //       selectedItem.find(
        //         (selPlace: Place) => selPlace.name === place.name
        //       ) === undefined
        //   );
        // setFilteredArtist(result);
      }
    } catch (error) {
      console.error(error);
    }
  }, [query]);

  useEffect(() => {
    if (query.trim() !== "") {
      fetchData();
    } else {
      setFilteredData([]);
      setQuery("");
    }
  }, [fetchData]);

  const handleSelect = (value: any) => {
    setQuery("");
  };

  const handleSearch = (event: any) => {
    const text = event.target.value;
    if (text.trim() === "") {
      setFilteredData([]);
    }
    setQuery(event.target.value.trim());
  };

  return (
    <div className="">
      <label
        htmlFor={props.id}
        className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
      >
        {props.label}
      </label>
      <div className="z-50 flex justify-center py-2 text-blue-900 transition-all duration-500 ease-in">
        <div
          className={`block w-full col-span-1 mt-1 rounded-md ${
            query.trim() !== "" && filteredData.length > 1
              ? " bg-white"
              : "text-ivory-800"
          } `}
        >
          <Combobox value={selectedItem} onChange={handleSelect}>
            <div
              className={`transition-all ease-in-out duration-300 w-full border border-ivory-600 flex flex-col flex-wrap rounded-md sm:text-sm text-ivory-800 
              `}
            >
              <div
                className={clsx("flex flex-wrap py-1 px-3 gap-1 rounded-md")}
              >
                <div className="flex items-center justify-between w-full input">
                  <Combobox.Input
                    {...props.inputProps}
                    onChange={handleSearch}
                  />
                  <span className="px-2">
                    <XIcon
                      className="w-5 h-5 text-ivory-600"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>

              <Transition
                as={Fragment}
                show={query.trim() !== "" && filteredData.length > 0}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-500"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <div className={clsx("border-t overflow-auto py-5 h-[250px]")}>
                  <Combobox.Options className="flex flex-col h-full p-1 overflow-auto gap-y-2">
                    {filteredData.map((place, index) => (
                      <Combobox.Option
                        key={index}
                        value={place}
                        className="px-5 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-900"
                      >
                        <div className="flex items-center justify-between">
                          <p>{place}</p>
                        </div>
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Transition>
            </div>
          </Combobox>
        </div>
      </div>
    </div>
  );
}

export default AutoCompleteSearch;

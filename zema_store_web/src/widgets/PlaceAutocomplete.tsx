import React, { useCallback, useEffect, useState } from "react";
import { PlaceType } from "../helpers/types";
import placesJsonfile from "../data/ethiopian_places_data_v1.json";
type Props = {
  selectedPlace: PlaceType;
  setSelectedPlace: React.Dispatch<React.SetStateAction<PlaceType>>;
  name: string;
  placeholder?: string;
  inputProps: {};
  id: string;
};

const PlacesAutocompleteSearch = (props: Props) => {
  const suggestions = placesJsonfile;

  const [filteredSuggestions, setFilteredSuggestions] = useState<
    Array<PlaceType>
  >([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(
    props.selectedPlace
  );
  const [input, setInput] = useState("");
  const [searchText, setSearchText] = useState("");

  const filterLocation = useCallback(() => {
    setFilteredSuggestions(
      suggestions.filter((suggestion: PlaceType) =>
        suggestion.name.toLowerCase().includes(searchText.trim().toLowerCase())
      )
    );
  }, [searchText]);

  useEffect(() => {
    filterLocation();
  }, [searchText, filterLocation]);

  const onChange = (e: any) => {
    const userInput = e.target.value;
    setSearchText(userInput);
    setSelectedPlace(null);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const handleClick = (selPlace: PlaceType) => {
    setFilteredSuggestions([]);
    props.setSelectedPlace(selPlace);
    setSelectedPlace(selPlace);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="w-full max-h-[200px] absolute z-40 suggestions bg-white shadow-2xl border border-gray-300 rounded-b-lg  overflow-auto">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li
              className={`p-2 hover:bg-blue-500 hover:text-white cursor-pointer ${className}`}
              key={`${suggestion.name}-${index}`}
              onClick={() => handleClick(suggestion)}
            >
              {suggestion.name}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions!</em>
      </div>
    );
  };

  return (
    <div className="relative">
      <input
        type="text"
        onChange={onChange}
        value={selectedPlace?.name}
        autoComplete="address-level2"
        {...props}
        {...props.inputProps}
      />
      {showSuggestions && searchText && <SuggestionsListComponent />}
    </div>
  );
};
export default PlacesAutocompleteSearch;

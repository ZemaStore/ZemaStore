import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { memo, useCallback, useState } from "react";
import configs from "../../helpers/configs";

function CustomGoogleMap() {
  let directionsService;
  const [state, setState] = useState({
    directions: null,
    bounds: null,
  });
  const containerStyle = {
    width: "100%",
    outline: "none",
    height: "100%",
  };

  const center = {
    lat: 9.0526281,
    lng: 38.7577503,
  };

  const pathCoordinates = [
    { lat: 36.05298765935, lng: -112.083756616339 },
    { lat: 36.2169884797185, lng: -112.056727493181 },
  ];
  const options = {
    strokeColor: "#20cccc",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#20cccc",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [
      { lat: 9.0926281, lng: 38.7077503 },
      { lat: 9.1526281, lng: 38.8577503 },
    ],
    zIndex: 1,
  };
  const paths = [
    { lat: 9.0926281, lng: 38.7077503 },
    { lat: 9.1526281, lng: 38.8577503 },
  ];
  const position = {
    lat: 9.0926281,
    lng: 38.7077503,
  };
  let destination = { lat: 9.9926281, lng: 38.9077503 };
  let origin = { lat: 9.1526281, lng: 38.8577503 };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: configs.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map);
    directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          //   setState((prev) => ({ ...prev, directions: result }));
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          id="eeab4ea89e3e0085"
          onUnmount={onUnmount}
        >
          {state.directions !== null && (
            <DirectionsRenderer directions={state.directions} />
          )}
          <Marker
            onLoad={onLoad}
            position={position}
            icon={{
              url: "/images/pin_icon.svg",
              scaledSize: new window.google.maps.Size(50, 50),
              // anchor: new google.maps.Point(5, 58),
            }}
          />
          <Polyline onLoad={onLoad} path={paths} options={options} />
        </GoogleMap>
      ) : (
        <>
          <div>
            <h1>Is Not Loaded</h1>
          </div>
        </>
      )}
    </div>
  );
}

export default memo(CustomGoogleMap);

import React, {useState, useRef} from "react";
import {MapContainer as Map, TileLayer, Marker, Popup } from "react-leaflet";
import osm from "./osm-providers"
import "./css-files/map.css";
import "leaflet/dist/leaflet.css"
import L from "leaflet";
import cities from "./cities.json";
import useGeoLocation from "../hooks/useGeoLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button } from "react-bootstrap";

const markerIcon = new L.Icon({
  iconUrl: require("./marker.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const markerIcon2 = new L.Icon({
  iconUrl: require("./marker2.png"),
  iconSize: [20, 20],
  iconAnchor: [0, 0], //[left/right, top/bottom]
  popupAnchor: [0, 0], //[left/right, top/bottom]
});

function MapDisplay(props) {
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  let ZOOM_LEVEL = 4;
  const mapRef = useRef();

  const location = useGeoLocation();

  const [show, setShow] = useState(true);

  // const showMyLocation = () => {
  //   if (location.loaded && !location.error) {
  //     mapRef.current.leafletElement.flyTo(
  //       [location.coordinates.lat, location.coordinates.lng],
  //       ZOOM_LEVEL,
  //       { animate: true }
  //     );
  //   } else {
  //     alert(location.error.message);
  //   }
  // };

  return (
    <>
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>Map View</Alert.Heading>
        <p>
          You are currently on the map screen. Please allow this website to view 
          your location so that you can see all restaurants near you. Your location 
          is displayed with a blue dot while the locations of all available 
          restaurants are shown with red markers. Just click on any of those red 
          markers to get the address to the restaurant selected.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close Instructions
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Instructions</Button>}
    </>
    <div className="col">
      <Map 
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
      >
        <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
        {cities.map((city, idx) =>  (
          <Marker 
              position={[city.lat, city.lng]}
              icon={markerIcon}
              key={idx}
          >
            <Popup>
              <b>{city.city}, {city.country}</b>
            </Popup>
          </Marker>
        ))}
        {location.loaded && !location.error && (
          <Marker icon={markerIcon2} position={[location.coordinates.lat, location.coordinates.lng]}></Marker>
        )}
      </Map>
      <div className="row my-4">
        <div className="col d-flex justify-content-center">
          {/* <button className="btn btn-primary" onClick={showMyLocation}>
            Locate Me!
          </button> */}
        </div>
      </div>
    </div>
    </>
  );
}

export default MapDisplay;
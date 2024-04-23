import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "./CustomMap.css";
import { UilSearch, UilTimes, UilMapPinAlt } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { getAllAddresses } from "../../redux/features/map/mapSlice";

const fixedMarkers = [
  {
    id: 1,
    position: [23.993580965501383, 90.40545376832598],
    content: "Marker 1",
  },
  {
    id: 2,
    position: [23.980563559198046, 90.37918957765216],
    content: "Marker 2",
  },
  {
    id: 3,
    position: [23.947151424886602, 90.3841677575838],
    content: "Marker 3",
  },
];

//change marker icon
const markerIcon = L.icon({
  // iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3477/3477419.png",
  iconSize: [38, 40],
  iconAnchor: [22, 41],
  popupAnchor: [-3, -50],
});

const CustomMap = ({ setLocation }) => {
  const [mapCenter, setMapCenter] = useState([23.777176, 90.399452]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const markerRef = useRef(null);

  // console.log(markerPosition);
  // console.log(markerAddress);
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.map);
  // console.log(markerPosition);
  // console.log(markerAddress);

  useEffect(() => {
    dispatch(getAllAddresses());
  }, []);

  // search location and auto movementmap on this location
  function AutoMovementMap({ position }) {
    const map = useMap();

    useEffect(() => {
      if (position) {
        map.flyTo(position);
        // const marker = L.marker(position, {
        //   icon,
        //   position: position,
        //   draggable: true,
        //   icon: markerIcon,
        //   eventHandlers: {
        //     dragend: handleMarkerDragEnd,
        //   },
        //   ref: markerRef,
        // });
        // marker.bindPopup(
        //   `This marker location is ${JSON.stringify(position)}!`
        // );
        setLocation(position);
      }
    }, [position]);

    return null;
  }

  //map created here
  const onMapCreated = (map) => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      autoComplete: true,
      autoCompleteDelay: 250,
    });
    const searchContainer = L.DomUtil.create("div", "leaflet-control-search");
    searchContainer.appendChild(searchControl.onAdd(map));
    L.DomEvent.disableClickPropagation(searchContainer);
    map
      ?.getContainer()
      .querySelector(".leaflet-top.leaflet-left")
      .appendChild(searchContainer);
  };

  //user current location first render
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter([latitude, longitude]);
        setMarkerPosition([latitude, longitude]);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );
  }, []);

  //user current location
  const GetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // setSearchLocation([latitude, longitude]);
        setMarkerPosition([latitude, longitude]);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );
  };

  //marker dragable to get position
  const handleMarkerDragEnd = (e) => {
    const marker = e.target;
    setMarkerPosition([marker.getLatLng().lat, marker.getLatLng().lng]);
  };

  // marker position will change when change marker position
  const AddMarkerOnDoubleClick = () => {
    const map = useMapEvents({
      dblclick: (e) => {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return null;
  };

  const handleMarkerClick = (markerId) => {
    console.log(`Marker ${markerId} clicked`);
  };
  return (
    <div className="map">
      <MapContainer
        center={mapCenter}
        zoom={11}
        tap={false}
        touchZoom={false}
        whenCreated={onMapCreated}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <Search /> */}
        <SearchInput setSearchLocation={setMarkerPosition} />
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable={true}
            icon={markerIcon}
            eventHandlers={{
              dragend: handleMarkerDragEnd,
            }}
            ref={markerRef}
          >
            <Popup>{` Lat: ${markerPosition[0]}, Lng: ${markerPosition[1]}`}</Popup>
          </Marker>
        )}

        {/* Map auto movement */}
        {markerPosition && <AutoMovementMap position={markerPosition} />}

        {/* here shows all fixed marker */}
        {addresses?.map(({ id, lat, lon, address_display_name, house }) => (
          <Marker
            key={id}
            position={[lat, lon]}
            icon={markerIcon}
            eventHandlers={{ click: () => handleMarkerClick(house) }}
          >
            <Popup>{address_display_name}</Popup>
          </Marker>
        ))}

        <AddMarkerOnDoubleClick />
      </MapContainer>
      <button className="current__location" onClick={GetCurrentLocation}>
        <UilMapPinAlt />
      </button>
    </div>
  );
};

export default CustomMap;

// search component
function SearchInput({ setSearchLocation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchTerm) {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        searchTerm
      )}&format=jsonv2`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.length !== 0) {
            setSearchResults(data);
            setMessage(false);
          } else {
            setMessage(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSearchResults([]);
    }
  };

  function handleSearchInputChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchResultClick(result) {
    setSearchLocation([Number(result.lat), Number(result.lon)]);
    setSearchResults([]);
    setSearchTerm(result.display_name);
  }

  return (
    <div className="search-box">
      <form onSubmit={handleSearch}>
        <div className="search__input">
          <input
            type="text"
            placeholder="Search location"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          {searchTerm && (
            <span
              onClick={() => {
                setSearchTerm("");
                setMessage(false);
                setSearchResults([]);
              }}
            >
              <UilTimes />
            </span>
          )}
        </div>

        <button type="submit">
          <UilSearch />
        </button>
      </form>
      <div className="search__results">
        {searchResults.length > 0 && (
          <ul className="search__list">
            {searchResults.map((result) => (
              <li
                key={result.place_id}
                onClick={() => handleSearchResultClick(result)}
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        )}
        {message && <h4>location not found</h4>}
      </div>
    </div>
  );
}

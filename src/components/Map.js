import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import styled from "styled-components";

const containerStyle = {
  width: "100%",
  height: "100vh",
  position:'fixed'
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Map = ({ markers,mapPosition }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCRy-d5qrHLHUyIxfjNZFrPbWzz0wIaAUs",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const threatLevel = (level) => {

    switch (level) {
      case "low":
        return "gold";

      case "middle":
        return "orange";

      case "high":
        return "red";

      default:
        return "gold";
    }
  };

  console.log(markers);

  if (!markers || !mapPosition) return;

  return isLoaded ? (
    <GoogleMap
      options={{
        mapId: "ce18c4f52025857a",
      }}
      style={{position:'fixed'}}
      mapContainerStyle={containerStyle}
      center={{
        lat: mapPosition.lat,
        lng: mapPosition.lng,
      }}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
    
      {markers.map((marker) => (
         <Marker
          icon={{
            path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
            fillColor: threatLevel(marker.threatLevel),
            fillOpacity: 0.9,
            scale: 1,
            strokeColor: threatLevel(marker.threatLevel),
            strokeWeight: 2,
          }}
          key={marker._id}    
          position={{ lat: marker.lat , lng: marker.lon }}
        />
      ))}
     
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Map);

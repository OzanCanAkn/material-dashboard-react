import React, { useEffect, useState } from "react";
import {
  YMaps,
  Map,
  Clusterer,
  Placemark,
  SearchControl,
  GeolocationControl,
  ListBox,
  ListBoxItem,
} from "@pbe/react-yandex-maps";
import PropTypes from "prop-types";

function StationsMap({ isSelectorVisible, setNewStationPos, newStationPos }) {
  const clusterPoints = [
    [39.925533, 32.801233],
    [39.981234, 32.82],
    [39.976512, 32.811111],
    [39.939567, 32.866311],
    [39.923512, 32.87665],
    [39.903289, 32.882332],
    [39.935533, 32.898689],
    [39.915633, 32.806666],
    [39.995733, 32.826487],
    [39.952679, 32.813325],
    [39.975933, 32.84789],
    [39.986033, 32.826324],
  ];
  const [pos, setPos] = useState(newStationPos);
  console.log(newStationPos);
  const [listRef, setListRef] = useState(undefined);
  const [mapRef, setMapRef] = useState(undefined);
  const [selectorRef, setSelectorRef] = useState(undefined);
  const [centerOfMap, setCenterOfMap] = useState(newStationPos);
  useEffect(() => {
    if (!isSelectorVisible) {
      setPos(centerOfMap);
      setNewStationPos(centerOfMap);
    }
  }, [isSelectorVisible, centerOfMap]);

  useEffect(() => {
    if (listRef && mapRef) {
      listRef.events.add("click", (e) => {
        /**
         * Getting a reference to the clicked object.
         * List item events propagate and can be
         * listened to on the parent element.
         */
        const item = e.get("target");
        // A click on the drop-down list title does not need to be processed.
        if (item !== listRef) {
          mapRef.setCenter(item.data.get("center"), item.data.get("zoom"));
        }
      });
      // eslint-disable-next-line no-unused-vars
      mapRef.events.add("boundschange", (e) => {
        /**
         * Getting a reference to the clicked object.
         * List item events propagate and can be
         * listened to on the parent element.
         */
        // A click on the drop-down list title does not need to be processed.
        setCenterOfMap(mapRef.getCenter());
      });
    }
  }, [listRef, mapRef]);

  useEffect(() => {
    if (selectorRef) {
      selectorRef.options.set("preset", "islands#greenIcon");
      selectorRef.events.add("dragend", (e) => {
        /**
         * Getting a reference to the clicked object.
         * List item events propagate and can be
         * listened to on the parent element.
         */
        // eslint-disable-next-line no-underscore-dangle
        setNewStationPos(e.get("target").geometry._coordinates);
      });
    }
  }, [selectorRef]);

  return (
    <YMaps query={{ lang: "en_RU", apikey: "27784d78-5fe2-4b72-ad6c-d58edb8c6463" }}>
      <Map
        instanceRef={(ref) => {
          setMapRef(ref);
        }}
        defaultState={{
          center: [39.976512, 32.811111],
          zoom: 5,
        }}
        height="60vh"
        width="70vw"
      >
        <GeolocationControl options={{ float: "left" }} />
        <SearchControl
          options={{
            float: "right",
          }}
        />
        <ListBox
          data={{ content: "My Stations" }}
          instanceRef={(ref) => {
            setListRef(ref);
          }}
        >
          {clusterPoints.map((station, index) => (
            <ListBoxItem data={{ content: `Station ${index}`, center: station, zoom: 14 }} />
          ))}
        </ListBox>
        <Clusterer
          options={{
            preset: "islands#invertedVioletClusterIcons",
            groupByCoordinates: false,
          }}
        >
          {clusterPoints.map((coordinates, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Placemark key={index} geometry={coordinates} />
          ))}
        </Clusterer>
        {isSelectorVisible && (
          <Placemark
            instanceRef={(ref) => setSelectorRef(ref)}
            geometry={pos}
            defaultOptions={{ draggable: true }}
          />
        )}
      </Map>
    </YMaps>
  );
}
StationsMap.propTypes = {
  isSelectorVisible: PropTypes.bool.isRequired,
  setNewStationPos: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  newStationPos: PropTypes.array.isRequired,
};
export default StationsMap;

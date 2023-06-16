/* eslint-disable react/prop-types */
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

function StationsMap({ isSelectorVisible, setNewStationPos, newStationPos, stations }) {
  const [pos, setPos] = useState(newStationPos);
  const [listRef, setListRef] = useState(undefined);
  const [mapRef, setMapRef] = useState(undefined);
  const [selectorRef, setSelectorRef] = useState(undefined);
  const [centerOfMap, setCenterOfMap] = useState(newStationPos);
  useEffect(() => {
    if (!isSelectorVisible) {
      setPos(centerOfMap);
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
          {stations?.map((station) => (
            <ListBoxItem
              data={{
                content: `Station ${station.id}`,
                center: [station.latitude, station.longitude],
                zoom: 14,
              }}
            />
          ))}
        </ListBox>
        <Clusterer
          options={{
            preset: "islands#invertedVioletClusterIcons",
            groupByCoordinates: false,
          }}
        >
          {stations?.map((station) => (
            // eslint-disable-next-line react/no-array-index-key
            <Placemark
              key={`Station-${station.id}`}
              geometry={[station.latitude, station.longitude]}
              options={{ preset: "islands#blueRepairShopCircleIcon", iconCaptionMaxWidth: 120 }}
              properties={{
                balloonContentHeader: `Station-${station.id} `,
                balloonContentBody: `Price:${station.price}TL - Charge Speed:${station.charge_speed}KW/h`,
                iconCaption:
                  station.is_blocked || station.is_being_used
                    ? "Busy"
                    : `${station.charge_speed > 200 ? "Fast" : ""} ${
                        station.price < 10 ? "Cheap" : ""
                      }`,
              }}
            />
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

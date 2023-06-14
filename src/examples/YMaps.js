/* eslint-disable react/button-has-type */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { YMaps, useYMaps } from "@pbe/react-yandex-maps";
import tasksList from "./tasks.json";

function MapWithObjectManager() {
  const mapRef = useRef(null);
  const ymaps = useYMaps(["Map", "ObjectManager", "control"]);
  const [mapInstance, setMapInstance] = useState(undefined);
  const [objectManager, setObjectManager] = useState(undefined);

  const [mapItemsOriginal, setMapItemsOriginal] = useState([]);
  const [mapItems, setMapItems] = useState([]);
  const [searchControl, setSearchControl] = useState(undefined);
  useEffect(() => {
    const nextMapItems = tasksList.reduce((acc, item) => {
      if (!item.geoLat || !item.geoLon) {
        return;
      }

      const coordinates = [item.geoLat, item.geoLon];
      const duplicatedItemIndex = acc.findIndex(
        (i) => i.geoLat === coordinates[0] && i.geoLon === coordinates[1]
      );

      if (duplicatedItemIndex > -1) {
        acc[duplicatedItemIndex]?.listId?.push(item.id);
      } else {
        acc.push({
          id: item.id,
          name: item.name,
          geoLat: item.geoLat,
          geoLon: item.geoLon,
          listId: [item.id],
        });
      }

      // eslint-disable-next-line consistent-return
      return acc;
    }, []);

    setMapItems(nextMapItems);
    setMapItemsOriginal(nextMapItems);
  }, [tasksList]);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }
    console.log(ymaps);

    const map = new ymaps.Map(mapRef.current, {
      center: [53.3027634, 34.2950038],
      zoom: 15,
    });

    const nextObjectManager = new ymaps.ObjectManager({
      clusterize: true,
      gridSize: 32,
    });

    const nextSearchControl = new ymaps.control.SearchControl({
      options: {
        // Search will be performed across toponyms and businesses.
        provider: "yandex#search",
      },
    });
    setSearchControl(nextSearchControl);
    setMapInstance(map);
    setObjectManager(nextObjectManager);
  }, [ymaps]);

  useEffect(() => {
    if (!mapInstance || !objectManager || !searchControl) {
      return;
    }

    mapInstance.geoObjects.add(objectManager);
    mapInstance.controls.add(searchControl);
  }, [mapInstance, objectManager]);

  const objectManagerFeatures = useMemo(() => {
    let currentId = 0;

    const nextFeatures = mapItems.reduce((acc, item) => {
      const coordinates = [item.geoLat, item.geoLon];
      currentId += 1;
      acc.push({
        type: "Feature",
        id: currentId,
        geometry: {
          type: "Point",
          coordinates,
        },
        properties: {
          openBalloonOnClick: false,
          hintContent: item.name,
        },
      });

      return acc;
    }, []);

    return {
      type: "FeatureCollection",
      features: nextFeatures,
    };
  }, [mapItems]);

  const toggleMapFeatures = useCallback(() => {
    const mapItemIndex = Math.floor(Math.random() * 15);
    const nextMapItems = mapItemsOriginal.filter((item, index) => index === mapItemIndex);

    setMapItems(nextMapItems);

    if (mapInstance) {
      const selectedItem = mapItemsOriginal[mapItemIndex];
      const nextCenterCoords = [selectedItem.geoLat, selectedItem.geoLon];

      mapInstance.setZoom(16);
      mapInstance.panTo(nextCenterCoords, {
        flying: true,
        delay: 100,
        duration: 300,
        checkZoomRange: false,
      });
    }
  }, [mapInstance]);

  useEffect(() => {
    if (!objectManager || !objectManagerFeatures || !ymaps || !mapRef.current) {
      return;
    }

    objectManager.removeAll();
    objectManager.add(objectManagerFeatures);
  }, [objectManager, objectManagerFeatures, ymaps, mapRef]);

  return (
    <>
      <div>
        <button onClick={toggleMapFeatures}>Toggle</button>
      </div>

      <div ref={mapRef} style={{ width: "80vw", height: "60vh" }} />
    </>
  );
}

function MapComponent() {
  return (
    <YMaps>
      <MapWithObjectManager />
    </YMaps>
  );
}

export default MapComponent;

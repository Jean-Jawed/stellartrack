import React, { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import { useStore } from '../../store';

Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN || '';

export const CesiumGlobe = ({ satellites = [], asteroids = [] }) => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const { viewMode, setSelectedObject } = useStore();

  useEffect(() => {
    if (!containerRef.current || viewerRef.current) return;

    // Créer le viewer Cesium
    const viewer = new Cesium.Viewer(containerRef.current, {
      animation: false,
      timeline: false,
      homeButton: false,
      geocoder: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      vrButton: false,
      infoBox: false,
      selectionIndicator: true,
    });

    viewer.scene.globe.enableLighting = false;
    viewerRef.current = viewer;

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!viewerRef.current) return;

    const viewer = viewerRef.current;
    viewer.entities.removeAll();

    const objects = viewMode === 'satellites' ? satellites : asteroids;

    objects.forEach((obj) => {
      const position = Cesium.Cartesian3.fromDegrees(
        obj.longitude || obj.satlongitude || 0,
        obj.latitude || obj.satlatitude || 0,
        (obj.altitude || obj.sataltitude || 400) * 1000
      );

      const color = obj.isHazardous
        ? Cesium.Color.RED
        : obj.color
        ? Cesium.Color.fromCssColorString(obj.color)
        : Cesium.Color.CYAN;

      const entity = viewer.entities.add({
        position: position,
        point: {
          pixelSize: 8,
          color: color,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 1,
        },
        properties: obj,
      });
    });

    // Click handler
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((click) => {
      const pickedObject = viewer.scene.pick(click.position);
      if (Cesium.defined(pickedObject) && pickedObject.id) {
        // ✅ CORRECTION : Convertir l'objet Cesium complexe en objet simple
        const properties = {};
        if (pickedObject.id.properties && pickedObject.id.properties.propertyNames) {
          const propertyNames = pickedObject.id.properties.propertyNames;
          for (let i = 0; i < propertyNames.length; i++) {
            const name = propertyNames[i];
            const value = pickedObject.id.properties[name];
            // Extrait la valeur réelle des propriétés Cesium
            properties[name] = value?._value !== undefined ? value._value : value;
          }
        } else {
          // Fallback si pas de propertyNames
          properties.satname = pickedObject.id.properties?.satname?._value || pickedObject.id.properties?.satname;
          properties.sataltitude = pickedObject.id.properties?.sataltitude?._value || pickedObject.id.properties?.sataltitude;
          properties.name = pickedObject.id.properties?.name?._value || pickedObject.id.properties?.name;
        }
        
        setSelectedObject(properties);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      handler.destroy();
    };
  }, [satellites, asteroids, viewMode, setSelectedObject]);

  return <div ref={containerRef} className="w-full h-full" />;
};
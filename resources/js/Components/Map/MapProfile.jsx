import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export const MapProfile = (props) => {
    mapboxgl.accessToken =
        "pk.eyJ1IjoiZWZ6ZWRlbDE2IiwiYSI6ImNscnhiN2NzYjBiNnQycW51Zmx3ajVjeG8ifQ.EM_vVs0ALH-nDkRQb-WSiA";

    const mapContainer = useRef(null);
    const map = useRef(null);
    // const [lng, setLng] = useState(-70.9);
    // const [lat, setLat] = useState(42.35);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        if (!mapboxgl.supported()) {
            alert("Your browser does not support Mapbox GL");
            return;
        } else {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v12",
                // pitch: 75,
                center: [
                    props.currentPosition.longitude,
                    props.currentPosition.latitude,
                ],
                zoom: 16,
            })
                .addControl(
                    new MapboxGeocoder({
                        accessToken: mapboxgl.accessToken,
                        marker: false,
                        mapboxgl: mapboxgl,
                    }).on("result", function (e) {
                        props.setCurrentPosition({
                            longitude: e.result.center[0],
                            latitude: e.result.center[1],
                        });

                        marker.setLngLat([
                            e.result.center[0],
                            e.result.center[1],
                        ]);
                    })
                )
                .addControl(new mapboxgl.FullscreenControl(), "bottom-right")
                .addControl(
                    new mapboxgl.GeolocateControl({
                        positionOptions: {
                            enableHighAccuracy: true,
                        },
                        trackUserLocation: true,
                        showUserHeading: true,
                    })
                )
                .addControl(new mapboxgl.NavigationControl(), "top-left")
                .addControl(new mapboxgl.ScaleControl());

            const marker = new mapboxgl.Marker({
                draggable: true,
            })
                .setLngLat([
                    props.currentPosition.longitude,
                    props.currentPosition.latitude,
                ])
                .on("dragend", function (e) {
                    props.setCurrentPosition({
                        longitude: e.target.getLngLat().lng,
                        latitude: e.target.getLngLat().lat,
                    });
                })
                .addTo(map.current);

            navigator.geolocation.getCurrentPosition((position) => {
                props.setCurrentPosition({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                });

                if (
                    props.currentPosition.longitude === 0 ||
                    props.currentPosition.latitude === 0
                ) {
                    map.current.flyTo({
                        center: [
                            position.coords.longitude,
                            position.coords.latitude,
                        ],
                    });

                    marker.setLngLat([
                        position.coords.longitude,
                        position.coords.latitude,
                    ]);
                }
            });
        }
    });

    return (
        <div>
            <div
                ref={mapContainer}
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                }}
            />
        </div>
    );
};

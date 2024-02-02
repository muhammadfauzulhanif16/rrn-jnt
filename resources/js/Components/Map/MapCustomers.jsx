import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export const MapCustomers = (props) => {
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
            navigator.geolocation.getCurrentPosition((position) => {
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: "mapbox://styles/mapbox/streets-v12",
                    // pitch: 75,
                    center: [
                        position.coords.longitude,
                        position.coords.latitude,
                        // props.currentPosition.longitude,
                        // props.currentPosition.latitude,
                    ],
                    zoom: 16,
                })

                    .addControl(
                        new MapboxGeocoder({
                            accessToken: mapboxgl.accessToken,
                            marker: false,
                            mapboxgl: mapboxgl,
                        }).on("result", function (e) {
                            // props.setCurrentPosition({
                            //     longitude: e.result.center[0],
                            //     latitude: e.result.center[1],
                            // });

                            marker.setLngLat([
                                e.result.center[0],
                                e.result.center[1],
                            ]);
                        })
                    )
                    .addControl(
                        new mapboxgl.FullscreenControl(),
                        "bottom-right"
                    )
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

                new mapboxgl.Marker()
                    .setLngLat([
                        position.coords.longitude,
                        position.coords.latitude,
                    ])
                    .addTo(map.current);

                map.current.on("load", () => {
                    map.current.addSource("places", {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: props.customers.map((customer) => ({
                                type: "Feature",
                                properties: {
                                    description: `<strong>${customer.full_name}</strong>`,
                                },
                                geometry: {
                                    type: "Point",
                                    coordinates: [
                                        customer.longitude,
                                        customer.latitude,
                                    ],
                                },
                            })),
                        },
                    });

                    map.current.addLayer({
                        id: "places",
                        type: "circle",
                        source: "places",
                        paint: {
                            "circle-color": "#4264fb",
                            "circle-radius": 6,
                            "circle-stroke-width": 2,
                            "circle-stroke-color": "#ffffff",
                        },
                    });

                    const popup = new mapboxgl.Popup({
                        closeButton: false,
                        closeOnClick: false,
                    });

                    map.current.on("click", "places", (e) => {
                        const coordinates =
                            e.features[0].geometry.coordinates.slice();
                        const description =
                            e.features[0].properties.description;

                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] +=
                                e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        popup
                            .setLngLat(coordinates)
                            .setHTML(description)
                            .addTo(map.current);
                    });

                    map.current.on("mousemove", "places", (e) => {
                        const coordinates =
                            e.features[0].geometry.coordinates.slice();
                        const description =
                            e.features[0].properties.description;

                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] +=
                                e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        popup
                            .setLngLat(coordinates)
                            .setHTML(description)
                            .addTo(map.current);
                    });

                    map.current.on("mouseleave", "places", () => {
                        popup.remove();
                    });
                });
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

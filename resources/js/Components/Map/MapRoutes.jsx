import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken =
    "pk.eyJ1IjoiZWZ6ZWRlbDE2IiwiYSI6ImNscnhiN2NzYjBiNnQycW51Zmx3ajVjeG8ifQ.EM_vVs0ALH-nDkRQb-WSiA";

export const MapRoutes = (props) => {
    console.log(props, "props")
    // console.log(props.customers, "customers");
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markers = useRef([]);

    useEffect(() => {
        if (map.current) return;

        if (!props.customers || props.customers.length === 0) {

            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v12",
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 16,
            })

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

            map.current.on("load", () => {
                const coordinates = [
                    [position.coords.longitude, position.coords.latitude],
                    ...props.customers.map((customer) => [
                        customer.longitude,
                        customer.latitude,
                    ]),
                ];

                coordinates.forEach((coordinate, index) => {
                    const el = document.createElement("div");
                    el.className =
                        index === 0 ? "marker start-marker" : "marker";
                    el.style.backgroundColor = index === 0 ? "#FF6B6B" : "#339AF0";
                    el.style.width = "30px";
                    el.style.height = "30px";
                    el.style.borderRadius = "50%";
                    el.style.display = "flex";
                    el.style.justifyContent = "center";
                    el.style.alignItems = "center";
                    el.style.color = "white";
                    el.innerText = index;

                    const marker = new mapboxgl.Marker(el)
                        .setLngLat(coordinate)

                        .addTo(map.current);

                    markers.current.push(marker);
                });

                updateRoute();
            });
        });
    }, [props.customers]);

    useEffect(() => {
        if (map.current && props.customers && props.customers.length > 0) {
            // Remove existing markers from the map
            markers.current.forEach((marker) => marker.remove());
            markers.current = [];

            // Add new markers to the map
            const coordinates = [
                [map.current.getCenter().lng, map.current.getCenter().lat],
                ...props.customers.map((customer) => [
                    customer.longitude,
                    customer.latitude,
                ]),
            ];

            coordinates.forEach((coordinate, index) => {
                const el = document.createElement('div');
                el.className = index === 0 ? 'marker start-marker' : 'marker';
                el.style.backgroundColor = index === 0 ? '#FF6B6B' : '#339AF0';
                el.style.width = '30px';
                el.style.height = '30px';
                el.style.borderRadius = '50%';
                el.style.display = 'flex';
                el.style.justifyContent = 'center';
                el.style.alignItems = 'center';
                el.style.color = 'white';
                el.innerText = index;

                const marker = new mapboxgl.Marker(el)
                    .setLngLat(coordinate)
                    .addTo(map.current);

                markers.current.push(marker);
            });

            // Update the route
            updateRoute();
        }
    }, [props.customers]);

    const updateRoute = () => {
        const coordinates = markers.current.map((marker) =>
            marker.getLngLat().toArray().join(",")
        );

        axios
            .get(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates.join(
                    ";"
                )}?access_token=${
                    mapboxgl.accessToken
                }&overview=full&geometries=geojson`
            )
            .then((response) => {
                const data = response.data;

                if (data.routes && data.routes[0]) {
                    const route = data.routes[0].geometry;

                    if (map.current.getSource("route")) {
                        map.current.getSource("route").setData({
                            type: "Feature",
                            properties: {},
                            geometry: route,
                        });
                    } else {
                        map.current.addSource("route", {
                            type: "geojson",
                            data: {
                                type: "Feature",
                                properties: {},
                                geometry: route,
                            },
                        });

                        map.current.addLayer({
                            id: "route",
                            type: "line",
                            source: "route",
                            layout: {
                                "line-join": "round",
                                "line-cap": "round",
                            },
                            paint: {
                                "line-color": "#22B8CF",
                                "line-width": 4,
                                "line-dasharray": [2, 2],
                            },
                        });
                    }


                } else {
                    console.error(
                        "No routes returned from the Mapbox Directions API"
                    );
                }
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
            }}
        >
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

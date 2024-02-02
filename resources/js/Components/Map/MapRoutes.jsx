// import mapboxgl from "mapbox-gl";
// import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
// import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

// export const MapRoutes = (props) => {
//     // console.log(props.currentPosition, "currentPosition");
//     // console.log(props.customers, "customers");
//     mapboxgl.accessToken =
//         "pk.eyJ1IjoiZWZ6ZWRlbDE2IiwiYSI6ImNscnhiN2NzYjBiNnQycW51Zmx3ajVjeG8ifQ.EM_vVs0ALH-nDkRQb-WSiA";

//     const mapContainer = useRef(null);
//     const map = useRef(null);

//     useEffect(() => {
//         if (map.current) return; // initialize map only once

//         navigator.geolocation.getCurrentPosition((position) => {
//             map.current = new mapboxgl.Map({
//                 container: mapContainer.current,
//                 style: "mapbox://styles/mapbox/streets-v12",
//                 center: [position.coords.longitude, position.coords.latitude],
//                 zoom: 16,
//             });

//             new mapboxgl.Marker()
//                 .setLngLat([
//                     position.coords.longitude,
//                     position.coords.latitude,
//                 ])
//                 .addTo(map.current);

//             const directions = new MapboxDirections({
//                 accessToken: mapboxgl.accessToken,
//                 unit: "metric",
//                 profile: "mapbox/driving",
//             });

//             // Set origin to the current position
//             directions.setOrigin([
//                 position.coords.longitude,
//                 position.coords.latitude,
//             ]);

//             // Add waypoints
//             if (props.customers && props.customers.length > 0) {
//                 props.customers.forEach((customer, index) => {
//                     new mapboxgl.Marker({ color: "red" })
//                         .setLngLat([customer.longitude, customer.latitude])
//                         .setPopup(
//                             new mapboxgl.Popup().setHTML(
//                                 `<h1>${index + 1}</h1>`
//                             )
//                         )
//                         .addTo(map.current);

//                     // Add customer location as waypoint
//                     directions.addWaypoint(index, [
//                         customer.longitude,
//                         customer.latitude,
//                     ]);
//                 });
//             }

//             // Set destination to the last customer
//             if (props.customers && props.customers.length > 0) {
//                 const lastCustomer =
//                     props.customers[props.customers.length - 1];
//                 directions.setDestination([
//                     lastCustomer.longitude,
//                     lastCustomer.latitude,
//                 ]);
//             }

//             map.current.addControl(directions, "top-left");
//         });
//     }, []);

//     return (
//         <div>
//             <div
//                 ref={mapContainer}
//                 style={{
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: "20px",
//                 }}
//             />
//         </div>
//     );
// };

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken =
    "pk.eyJ1IjoiZWZ6ZWRlbDE2IiwiYSI6ImNscnhiN2NzYjBiNnQycW51Zmx3ajVjeG8ifQ.EM_vVs0ALH-nDkRQb-WSiA";

export const MapRoutes = (props) => {
    console.log(props.customers, "customers");
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markers = useRef([]);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        if (!props.customers || props.customers.length === 0) {
            // props.customers is not available, exit the effect
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
                console.log(props.customers, "map loaded");
                const coordinates = [
                    [position.coords.longitude, position.coords.latitude], // Browser's position
                    ...props.customers.map((customer) => [
                        customer.longitude,
                        customer.latitude,
                    ]), // Customers' positions
                ];
                console.log(coordinates, "coordinates");
                coordinates.forEach((coordinate, index) => {
                    // Create a new HTML element for each marker
                    const el = document.createElement("div");
                    el.className =
                        index === 0 ? "marker start-marker" : "marker";
                    el.style.backgroundColor = index === 0 ? "blue" : "red";
                    el.style.width = "30px";
                    el.style.height = "30px";
                    el.style.borderRadius = "50%";
                    el.style.display = "flex";
                    el.style.justifyContent = "center";
                    el.style.alignItems = "center";
                    el.style.color = "white";
                    el.innerText = index;

                    // Use the custom HTML element as the marker
                    const marker = new mapboxgl.Marker(el)
                        .setLngLat(coordinate)
                        .addTo(map.current);

                    markers.current.push(marker);
                });

                updateRoute();
            });
        });
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
                                "line-color": "#339AF0",
                                "line-width": 4,
                                "line-dasharray": [2, 2],
                            },
                        });
                    }

                    // Start the ant path animation
                    // let counter = 0;
                    // setInterval(() => {
                    //     counter = (counter + 1) % 100;
                    //     map.current.setPaintProperty(
                    //         "route",
                    //         "line-dashoffset",
                    //         counter
                    //     );
                    // }, 100);
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

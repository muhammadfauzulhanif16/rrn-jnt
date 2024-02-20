import { MapRoutes } from "@/Components/Map/MapRoutes";
import { PageHeader } from "@/Components/PageHeader";
import { AppLayout } from "@/Layouts/AppLayout";
import { ActionIcon, AspectRatio, Button, Paper, Select } from "@mantine/core";
import { useState, useEffect } from "react";
import { IconRoute, IconSwitch3, IconUser } from "@tabler/icons-react";
import { router } from "@inertiajs/react";

const Index = (props) => {
    // console.log(
    //     props.couriers.find(({ courier }) => courier.id === props.auth.user.id)
    // );
    console.log(props);
    const [currentPosition, setCurrentPosition] = useState({
        longitude: 0,
        latitude: 0,
    });

    const [courier, setCourier] = useState(props.couriers || {});
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentPosition({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                });
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        const fetchCustomerDistances = async (customers) => {
            const customersWithDistance = [];

            if (
                currentPosition.longitude !== 0 &&
                currentPosition.latitude !== 0
            ) {
                for (const customer of customers) {
                    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentPosition.longitude},${currentPosition.latitude};${customer.longitude},${customer.latitude}?access_token=pk.eyJ1IjoiZWZ6ZWRlbDE2IiwiYSI6ImNscnhiN2NzYjBiNnQycW51Zmx3ajVjeG8ifQ.EM_vVs0ALH-nDkRQb-WSiA`;
                    try {
                        const response = await fetch(url);
                        const data = await response.json();
                        const distance = data.routes[0].distance;

                        customersWithDistance.push({
                            ...customer,
                            distance,
                        });
                    } catch (error) {
                        console.error("Error:", error);
                    }
                }
            }

            customersWithDistance.sort((a, b) => a.distance - b.distance);
            setCustomers(customersWithDistance);
        };

        fetchCustomerDistances(courier.customers);
    }, [courier, currentPosition]);

    return (
        <AppLayout title={props.title} auth={props.auth.user} meta={props.meta}>
            <PageHeader
                title={props.title}
                actions={
                    props.auth.user.role === "admin" && (
                        <Select
                            placeholder="Pilih kurir"
                            variant="filled"
                            radius="xl"
                            data={props.couriers.map(({ courier }) => {
                                return {
                                    value: courier.id,
                                    label: courier.full_name,
                                };
                            })}
                            leftSection={<IconUser size={16} />}
                            styles={{
                                label: {
                                    marginBottom: 8,
                                },
                                input: {
                                    height: 40,
                                },
                            }}
                            onChange={(value) => {
                                setCourier(
                                    props.couriers.find(
                                        ({ courier }) => courier.id === value
                                    )
                                );
                            }}
                        />
                    )
                }
            />

            <Paper radius={20} withBorder p={32}>
                <AspectRatio ratio={16 / 9}>
                    <MapRoutes
                        customers={customers}
                        isAdmin={props.auth.user.role === "admin"}
                    />
                </AspectRatio>
            </Paper>
        </AppLayout>
    );
};

export default Index;

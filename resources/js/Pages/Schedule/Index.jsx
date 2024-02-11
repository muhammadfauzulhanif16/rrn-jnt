import { DataTable } from "@/Components/DataTable";
import { PageHeader } from "@/Components/PageHeader";
import { AppLayout } from "@/Layouts/AppLayout";
import { router } from "@inertiajs/react";
import {
    Button,
    Group,
    ActionIcon,
    Box,
    Table,
    Tabs,
    ThemeIcon,
    Text,
    Pill,
    Menu,
    Badge,
    List,
    Grid,
} from "@mantine/core";
import {
    IconCalendarCheck,
    IconCalendarX,
    IconDots,
    IconEdit,
    IconPlus,
    IconRoute,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

const Index = (props) => {
    const [orders, setOrders] = useState(props.orders);
    useEffect(() => {
        const fetchCustomerDistances = async () => {
            const customersWithDistance = [];

            navigator.geolocation.getCurrentPosition(async (position) => {
                for (const order of orders) {
                    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${position.coords.longitude},${position.coords.latitude};${order.customer.longitude},${order.customer.latitude}?access_token=pk.eyJ1IjoiZWZ6ZWRlbDE2IiwiYSI6ImNscnhiN2NzYjBiNnQycW51Zmx3ajVjeG8ifQ.EM_vVs0ALH-nDkRQb-WSiA`;
                    try {
                        const response = await fetch(url);
                        const data = await response.json();
                        const distance = data.routes[0].distance;

                        customersWithDistance.push({
                            ...order,
                            distance,
                        });
                    } catch (error) {
                        console.error("Error:", error);
                    }
                }

                customersWithDistance.sort((a, b) => a.distance - b.distance);
                setOrders(customersWithDistance);
            });
        };

        fetchCustomerDistances();
    }, []);

    const role = props.auth.user.role;
    const createColumn = (id, header, accessor) => ({
        id,
        header,
        accessorFn: (row) => (
            <Text style={{ whiteSpace: "nowrap" }}>{accessor(row)}</Text>
        ),
    });

    const baseColumns = [];

    if (role === "admin") {
        baseColumns.unshift(
            createColumn(
                "customer_name",
                "Pelanggan",
                (row) => row.customer_name
            ),
            createColumn(
                "items_count",
                "Jumlah Barang",
                (row) => row.items_count
            ),
            createColumn("status", "Status", (row) => (
                <Pill
                    bg={row.status.includes("Belum") ? "red" : "green"}
                    c="white"
                >
                    {row.status}
                </Pill>
            )),
            createColumn("courier_name", "Kurir", (row) => row.courier_name),
            createColumn("taken_on", "Harus Diambil Pada", (row) => row.taken_on)
        );
    }

    if (role === "kurir") {
        baseColumns.unshift(
            createColumn(
                "customer_name",
                "Pelanggan",
                (row) => row.customer_name
            ),
            createColumn(
                "items_count",
                "Jumlah Barang",
                (row) => row.items_count
            ),
            createColumn("status", "Status", (row) => (
                <Pill
                    bg={row.status.includes("Belum") ? "red" : "green"}
                    c="white"
                >
                    {row.status}
                </Pill>
            )),
            createColumn("taken_on", "Harus Diambil Pada", (row) => row.taken_on)
        );
    }

    if (role === "pelanggan") {
        baseColumns.unshift(
            createColumn(
                "items_count",
                "Jumlah Barang",
                (row) => row.items_count
            ),
            createColumn("status", "Status", (row) => (
                <Pill
                    bg={row.status.includes("Belum") ? "red" : "green"}
                    c="white"
                >
                    {row.status}
                </Pill>
            )),
            createColumn("courier_name", "Kurir", (row) => row.courier_name),
            createColumn("taken_on", "Harus Diambil Pada", (row) => row.taken_on)
        );
    }

    const notTakenColumns = useMemo(() => baseColumns, [role]);

    const takenColumns = useMemo(() => {
        let columns = [...baseColumns];
        columns.push(
            createColumn("updated_at", "Diambil Pada", (row) => row.updated_at)
        );
        return columns;
    }, [role]);

    return (
        <AppLayout title={props.title} auth={props.auth.user} meta={props.meta}>
            <PageHeader
                title={props.title}
                actions={
                    props.auth.user.role !== "pelanggan" && (
                        <>
                            <Button
                                disabled={
                                    !props.orders.filter(
                                        ({ status }) =>
                                            status === "Belum Diambil"
                                    ).length
                                }
                                radius="xl"
                                color="red.5"
                                h={40}
                                leftSection={<IconRoute />}
                                display={{
                                    base: "none",
                                    xs: "block",
                                }}
                                onClick={() =>
                                    router.get(route("schedule.routes"))
                                }
                            >
                                Rute Pengiriman
                            </Button>
                            <ActionIcon
                                disabled={
                                    !props.orders.filter(
                                        ({ status }) =>
                                            status === "Belum Diambil"
                                    ).length
                                }
                                size={40}
                                color="red.5"
                                radius="xl"
                                display={{
                                    base: "block",
                                    xs: "none",
                                }}
                                onClick={() =>
                                    router.get(route("schedule.routes"))
                                }
                            >
                                <IconRoute />
                            </ActionIcon>
                        </>
                    )
                }
            />

            <Tabs
                defaultValue="Belum Diambil"
                color="red.5"
                radius="xs"
                styles={{
                    tab: {
                        padding: 16,
                    },
                    panel: {
                        marginTop: 32,
                    },
                }}
            >
                <Tabs.List grow>
                    <Tabs.Tab
                        value="Belum Diambil"
                        leftSection={
                            <ThemeIcon
                                size={40}
                                variant="light"
                                radius="xl"
                                color="red"
                            >
                                <IconCalendarX />
                            </ThemeIcon>
                        }
                        rightSection={
                            <Badge color="red">
                                {
                                    props.orders.filter(
                                        ({ status }) =>
                                            status === "Belum Diambil"
                                    ).length
                                }
                            </Badge>
                        }
                    >
                        <Text fw={500} size="sm">
                            Belum Diambil
                        </Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="Sudah Diambil"
                        leftSection={
                            <ThemeIcon
                                size={40}
                                variant="light"
                                radius="xl"
                                color="green"
                            >
                                <IconCalendarCheck />
                            </ThemeIcon>
                        }
                        rightSection={
                            <Badge color="green">
                                {
                                    props.orders.filter(
                                        ({ status }) =>
                                            status === "Sudah Diambil"
                                    ).length
                                }
                            </Badge>
                        }
                    >
                        <Text fw={500} size="sm">
                            Sudah Diambil
                        </Text>
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="Belum Diambil">
                    <DataTable
                        columns={notTakenColumns}
                        data={orders.filter(
                            ({ status }) => status === "Belum Diambil"
                        )}
                        renderDetailPanel={({ row }) => (
                            <List type="ordered">
                                <Text mb={16} fw={500}>
                                    Nomor Resi
                                </Text>

                                {row.original.items.map((item) => (
                                    <List.Item key={item.receipt_number}>
                                        {item.receipt_number}
                                    </List.Item>
                                ))}
                            </List>
                        )}
                        renderRowActions={
                            props.auth.user.role === "kurir" &&
                            (({ row }) => (
                                <Menu
                                    position="bottom-start"
                                    styles={{
                                        dropdown: {
                                            borderRadius: 20,
                                        },
                                        item: {
                                            borderRadius: 20,
                                        },
                                    }}
                                >
                                    <Menu.Target>
                                        <ActionIcon
                                            size={40}
                                            radius="xl"
                                            variant="subtle"
                                            color="gray.9"
                                            c="gray.9"
                                        >
                                            <IconDots />
                                        </ActionIcon>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        <Menu.Item
                                            leftSection={<IconEdit />}
                                            onClick={() =>
                                                router.put(
                                                    route(
                                                        "schedule.update",
                                                        row.original.id
                                                    )
                                                )
                                            }
                                        >
                                            Diambil
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            ))
                        }
                    />
                </Tabs.Panel>

                <Tabs.Panel value="Sudah Diambil">
                    <DataTable
                        columns={takenColumns}
                        data={props.orders.filter(
                            ({ status }) => status === "Sudah Diambil"
                        )}
                        renderDetailPanel={({ row }) => (
                            <List type="ordered">
                                <Text mb={16} fw={500}>
                                    Nomor Resi
                                </Text>
                                {row.original.items.map((item) => (
                                    <List.Item key={item.receipt_number}>
                                        {item.receipt_number}
                                    </List.Item>
                                ))}
                            </List>
                        )}
                    />
                </Tabs.Panel>
            </Tabs>
        </AppLayout>
    );
};

export default Index;

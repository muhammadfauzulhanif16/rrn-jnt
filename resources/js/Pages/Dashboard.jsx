import { MapCustomers } from "@/Components/Map/MapCustomers";
import { PageHeader } from "@/Components/PageHeader";
import { Stats } from "@/Components/Stats";
import { AppLayout } from "@/Layouts/AppLayout";
import { router } from "@inertiajs/react";
import { AreaChart } from "@mantine/charts";
import {
    Alert,
    AspectRatio,
    Button,
    Grid,
    Group,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    Timeline,
    Title,
} from "@mantine/core";
import {
    IconAlertSmall,
    IconCalendar,
    IconCalendarCheck,
    IconCalendarX,
    IconPackage,
    IconUsers,
} from "@tabler/icons-react";

const Dashboard = (props) => {
    const data =
        {
            admin: [
                {
                    color: "violet",
                    icon: <IconCalendar />,
                    label: "Penjadwalan",
                    value: props.orders.filter(({ status }) =>
                        ["Sudah Diambil", "Belum Diambil"].includes(status)
                    ).length,
                    route: "schedule.index",
                },
                {
                    color: "cyan",
                    icon: <IconPackage />,
                    label: "Pesanan",
                    value: props.orders.filter(
                        ({ status }) => status === "Siap Dikirim"
                    ).length,
                    route: "orders.index",
                },
                {
                    color: "teal",
                    icon: <IconUsers />,
                    label: "Pelanggan",
                    value: props.customers.length,
                    route: "customers.index",
                },
                {
                    color: "orange",
                    icon: <IconUsers />,
                    label: "Kurir",
                    value: props.couriers.length,
                    route: "couriers.index",
                },
            ],
            kurir: [
                {
                    color: "red",
                    icon: <IconCalendarX />,
                    label: "Barang Belum Diambil",
                    value: props.orders.filter(
                        ({ status, courier_id }) =>
                            courier_id === props.auth.user.id &&
                            status === "Belum Diambil"
                    ).length,
                    route: "schedule.index",
                },
                {
                    color: "green",
                    icon: <IconCalendarCheck />,
                    label: "Barang Sudah Diambil",
                    value: props.orders.filter(
                        ({ status, courier_id }) =>
                            courier_id === props.auth.user.id &&
                            status === "Sudah Diambil"
                    ).length,
                    route: "schedule.index",
                },
            ],
            pelanggan: [
                {
                    color: "violet",
                    icon: <IconCalendar />,
                    label: "Penjadwalan",
                    value: props.orders.filter(
                        ({ status, customer_id }) =>
                            customer_id === props.auth.user.id &&
                            ["Sudah Diambil", "Belum Diambil"].includes(status)
                    ).length,
                    route: "schedule.index",
                },
                {
                    color: "cyan",
                    icon: <IconPackage />,
                    label: "Pesanan",
                    value: props.orders.filter(
                        ({ status, customer_id }) =>
                            customer_id === props.auth.user.id &&
                            ["Belum Siap Dikirim", "Siap Dikirim"].includes(
                                status
                            )
                    ).length,
                    route: "orders.index",
                },
            ],
        }[props.auth.user.role] || [];

    const orders = props.orders.filter(
        (order) =>
            (props.auth.user.role === "pelanggan" &&
                order.customer_id === props.auth.user.id) ||
            (props.auth.user.role === "kurir" &&
                order.courier_id === props.auth.user.id) ||
            props.auth.user.role === "admin"
    );

    function getWeekOfYear(date) {
        const firstDayOfYear = new Date(date.getUTCFullYear(), 0, 1);
        return Math.ceil(
            ((date - firstDayOfYear + 86400000) / 86400000 +
                (firstDayOfYear.getUTCDay() || 7)) /
                7
        );
    }

    function populateChartData(orders) {
        const chartData = [];
        const dayNames = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
        ];

        orders
            .filter((item) => item.status === "Sudah Diambil")
            .forEach((item) => {
                const date = new Date(item.updated_at);
                const dayIndex = date.getUTCDay();
                const week = getWeekOfYear(date);
                const year = date.getUTCFullYear();

                let yearData =
                    chartData.find((y) => y.year === year) ||
                    chartData[chartData.push({ year, weeks: [] }) - 1];
                let weekData =
                    yearData.weeks.find((w) => w.week === week) ||
                    yearData.weeks[
                        yearData.weeks.push({
                            week,
                            days: dayNames.map((dayName) => ({
                                dayName,
                                "Jumlah Pesanan": 0,
                            })),
                        }) - 1
                    ];

                weekData.days[dayIndex]["Jumlah Pesanan"] += 1;
            });

        chartData.forEach((yearData) =>
            yearData.weeks.sort((a, b) => a.week - b.week)
        );

        return chartData;
    }

    const currentDate = new Date();
    const chartData = populateChartData(orders);
    const currentYear = currentDate.getUTCFullYear();
    const currentWeek = getWeekOfYear(currentDate);
    const currentWeekData = chartData
        .find((yearData) => yearData.year === currentYear)
        ?.weeks.find((weekData) => weekData.week === currentWeek);

    const colors = [
        "red",
        "pink",
        "grape",
        "violet",
        "indigo",
        "blue",
        "cyan",
        "teal",
        "green",
        "lime",
        "yellow",
        "orange",
    ];

    const getRandomColor = () =>
        colors[Math.floor(Math.random() * colors.length)];

    return (
        <AppLayout title={props.title} auth={props.auth.user} meta={props.meta}>
            {props.auth.user.role === "pelanggan" &&
                (!props.auth.user.phone_number || !props.auth.user.address) && (
                    <Alert
                        styles={{
                            root: {
                                borderRadius: 20,
                            },
                            wrapper: {
                                // backgroundColor: "red",
                            },
                            icon: {
                                width: 40,
                                height: 40,
                                marginTop: 0,
                            },
                        }}
                        p={32}
                        variant="filled"
                        color="yellow"
                        title="Peringatan"
                        mb={32}
                        icon={
                            <ThemeIcon
                                variant="light"
                                radius="xl"
                                color="white"
                                size={40}
                            >
                                <IconAlertSmall />
                            </ThemeIcon>
                        }
                    >
                        <Group justify="space-between">
                            Silahkan lengkapi data profil Anda terlebih dahulu
                            sebelum membuat pesanan.
                            <Button
                                radius="xl"
                                color="gray.9"
                                variant="filled"
                                autoContrast
                                onClick={() =>
                                    router.get(route("profile.edit"))
                                }
                            >
                                Lengkapi Profil Sekarang
                            </Button>
                        </Group>
                    </Alert>
                )}

            <PageHeader title={props.title} />

            <Stack gap={32}>
                <Paper radius={20} withBorder>
                    <Stats data={data} />
                </Paper>

                <Grid gutter={32}>
                    <Grid.Col
                        span={{
                            base: 12,
                            md: 7,
                        }}
                    >
                        <Stack gap={32}>
                            <Paper radius={20} withBorder p={40}>
                                <Group mb={20} justify="space-between">
                                    <Title
                                        order={3}
                                        c="gray.8"
                                        fw={500}
                                        style={{
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Pesanan Sudah Diambil
                                    </Title>
                                </Group>
                                <AreaChart
                                    h={300}
                                    data={
                                        currentWeekData
                                            ? currentWeekData.days
                                            : []
                                    }
                                    dataKey="dayName"
                                    series={[
                                        {
                                            name: "Jumlah Pesanan",
                                            color: getRandomColor(),
                                        },
                                    ]}
                                    curveType="linear"
                                />
                            </Paper>

                            {props.auth.user.role === "admin" && (
                                <Paper radius={20} withBorder p={40}>
                                    <Title
                                        order={3}
                                        c="gray.8"
                                        fw={500}
                                        mb={20}
                                        style={{
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Lokasi Pelanggan
                                    </Title>
                                    <AspectRatio ratio={16 / 9}>
                                        <MapCustomers
                                            customers={props.customers}
                                        />
                                    </AspectRatio>
                                </Paper>
                            )}
                        </Stack>
                    </Grid.Col>

                    <Grid.Col
                        span={{
                            base: 12,
                            md: 5,
                        }}
                    >
                        <Paper radius={20} withBorder p={40} h="100%">
                            {" "}
                            <Group mb={20} justify="space-between">
                                <Title
                                    order={3}
                                    c="gray.8"
                                    fw={500}
                                    style={{
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    Pesanan Sudah Diambil
                                </Title>
                            </Group>
                            <Timeline
                                color="red"
                                active={props.histories.length}
                                bulletSize={40}
                                styles={{
                                    itemTitle: {
                                        color: "#343A40",
                                    },
                                }}
                            >
                                {props.histories.map((history) => (
                                    <Timeline.Item
                                        key={history.id}
                                        title={`${history.full_name} ${history.action}`}
                                    >
                                        <Text size="xs" mt={4} c="gray.7">
                                            {history.created_at}
                                        </Text>
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Stack>
        </AppLayout>
    );
};

export default Dashboard;

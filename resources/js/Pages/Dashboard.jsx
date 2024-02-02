import { MapCustomers } from "@/Components/Map/MapCustomers";
import { PageHeader } from "@/Components/PageHeader";
import { Stats } from "@/Components/Stats";
import { AppLayout } from "@/Layouts/AppLayout";
import { router } from "@inertiajs/react";
import { AreaChart } from "@mantine/charts";
import {
    Alert,
    AspectRatio,
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    Group,
    NumberFormatter,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from "@mantine/core";
import {
    Icon123,
    IconAlertSmall,
    IconCalendar,
    IconCalendarCheck,
    IconCalendarX,
    IconInfoCircle,
    IconPackage,
    IconUsers,
} from "@tabler/icons-react";

const Dashboard = (props) => {
    console.log(props);

    let data;

    switch (props.auth.user.role) {
        case "admin":
            data = [
                {
                    color: "violet",
                    icon: <IconCalendar />,
                    label: "Penjadwalan",
                    value: props.schedule.length,
                },
                {
                    color: "cyan",
                    icon: <IconPackage />,
                    label: "Pesanan",
                    value: props.orders.length,
                },
                {
                    color: "teal",
                    icon: <IconUsers />,
                    label: "Pelanggan",
                    value: props.customers.length,
                },
                {
                    color: "orange",
                    icon: <IconUsers />,
                    label: "Kurir",
                    value: props.couriers.length,
                },
            ];
            break;
        case "kurir":
            data = [
                {
                    color: "red",
                    icon: <IconCalendarX />,
                    label: "Barang Belum Diambil",
                    value: props.schedule.filter(
                        ({ status }) => status === "Belum Diambil"
                    ).length,
                },
                {
                    color: "green",
                    icon: <IconCalendarCheck />,
                    label: "Barang Sudah Diambil",
                    value: props.schedule.filter(
                        ({ status }) => status === "Sudah Diambil"
                    ).length,
                },
            ];
            break;
        case "pelanggan":
            data = [
                {
                    color: "violet",
                    icon: <IconCalendar />,
                    label: "Penjadwalan",
                    value: props.schedule.length,
                },
                {
                    color: "cyan",
                    icon: <IconPackage />,
                    label: "Pesanan",
                    value: props.orders.length,
                },
            ];
            break;
        default:
            data = [];
    }

    const chartData = [
        {
            date: "Minggu",
            "Jumlah Pesanan": 0,
        },
        {
            date: "Senin",
            "Jumlah Pesanan": 0,
        },
        {
            date: "Selasa",
            "Jumlah Pesanan": 0,
        },
        {
            date: "Rabu",
            "Jumlah Pesanan": 0,
        },
        {
            date: "Kamis",
            "Jumlah Pesanan": 0,
        },
        {
            date: "Jumat",
            "Jumlah Pesanan": 0,
        },
        {
            date: "Sabtu",
            "Jumlah Pesanan": 0,
        },
    ];

    props.schedule.forEach((item) => {
        const date = new Date(item.updated_at);
        const day = chartData[date.getUTCDay()];

        day["Jumlah Pesanan"] += 1;
    });

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
    function getRandomColor() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return randomColor;
    }

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
                                // c="gray.0"
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
                            <Paper radius={20} withBorder p={32}>
                                <AreaChart
                                    h={300}
                                    data={chartData}
                                    dataKey="date"
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
                                <Paper radius={20} withBorder p={32}>
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
                        <Paper radius={20} withBorder p={32} h="100%">
                            sdfsfdsdf
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Stack>
        </AppLayout>
    );
};

export default Dashboard;

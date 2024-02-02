import {
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Center,
    Drawer,
    Image,
    NavLink,
    SimpleGrid,
    Stack,
    Menu,
    Text,
    Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconCalendar,
    IconHome,
    IconMenu,
    IconPackage,
    IconX,
    IconUsers,
    IconSettings,
    IconLogout,
    IconChevronDown,
} from "@tabler/icons-react";
import Logo from "../Images/J&T_Express_logo.svg";
import { router } from "@inertiajs/react";
import { GetInitialName } from "../Utilities/GetInitialName";

export const Header = (props) => {
    const [opened, { open, close }] = useDisclosure(false);
    let navigationList = [
        {
            label: "Beranda",
            icon: <IconHome />,
            route: "dashboard",
            totalData: 3,
        },
        {
            label: "Penjadwalan",
            icon: <IconCalendar />,
            route: "schedule.index",
            totalData: 3,
        },
        {
            label: "Pesanan",
            icon: <IconPackage />,
            route: "orders.index",
        },
        {
            label: "Pelanggan",
            icon: <IconUsers />,
            route: "customers.index",
        },
        {
            label: "Kurir",
            icon: <IconUsers />,
            route: "couriers.index",
        },
    ];

    const roleNavigationMap = {
        kurir: ["Beranda", "Penjadwalan"],
        pelanggan: ["Beranda", "Penjadwalan", "Pesanan"],
    };

    navigationList = navigationList.filter((navigation) => {
        const allowedNavigation = roleNavigationMap[props.auth.role];
        return allowedNavigation
            ? allowedNavigation.includes(navigation.label)
            : true;
    });

    return (
        <SimpleGrid
            px={32}
            py={16}
            bg="white"
            cols={3}
            spacing={0}
            pos="sticky"
            top={0}
            style={{
                zIndex: 4,
                borderBottom: "1px solid #DEE2E6",
            }}
        >
            <Box
                style={{
                    alignSelf: "center",
                }}
            >
                <Drawer.Root size="xs" opened={opened} onClose={close}>
                    <Drawer.Overlay />
                    <Drawer.Content>
                        <Drawer.Header px={32} py={16}>
                            <ActionIcon
                                onClick={close}
                                size={40}
                                radius="xl"
                                variant="subtle"
                                color="red.5"
                                c="gray.8"
                            >
                                <IconX />
                            </ActionIcon>
                        </Drawer.Header>

                        <Drawer.Body px={32}>
                            <Stack gap={8}>
                                {navigationList.map((navigation, id) => (
                                    <Button
                                        key={id}
                                        h={40}
                                        px={16}
                                        variant={
                                            props.title.includes(
                                                navigation.label
                                            )
                                                ? "light"
                                                : "subtle"
                                        }
                                        color="red.5"
                                        c={
                                            props.title.includes(
                                                navigation.label
                                            )
                                                ? "red.5"
                                                : "gray.8"
                                        }
                                        leftSection={navigation.icon}
                                        radius="xl"
                                        // rightSection={
                                        //     <Badge color="red.5" circle>
                                        //         {navigation.totalData}
                                        //     </Badge>
                                        // }
                                        styles={{
                                            label: {
                                                display: "flex",
                                                gap: 8,
                                            },
                                            inner: {
                                                // margin: "16px 0",
                                                justifyContent: "start",
                                            },
                                        }}
                                        onClick={() =>
                                            router.get(route(navigation.route))
                                        }
                                    >
                                        {navigation.label}
                                    </Button>
                                ))}
                            </Stack>
                        </Drawer.Body>
                    </Drawer.Content>
                </Drawer.Root>

                <ActionIcon
                    onClick={open}
                    size={40}
                    c="gray.8"
                    radius="xl"
                    variant="subtle"
                    color="red.5"
                >
                    <IconMenu />
                </ActionIcon>
            </Box>

            <Center>
                <Image src={Logo} w={160} />
            </Center>

            <Box
                style={{
                    justifySelf: "end",
                }}
            >
                <Menu withArrow shadow="md" width={240} position="bottom-end">
                    <Menu.Target
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        <Button
                            variant="subtle"
                            p={4}
                            h="auto"
                            radius="xl"
                            color="red.5"
                            c="gray.8"
                        >
                            <Avatar color="red.9" radius="xl" size={40} mr={4}>
                                {GetInitialName(props.auth.full_name)}
                            </Avatar>

                            <IconChevronDown />
                        </Button>
                    </Menu.Target>

                    <Menu.Dropdown
                        style={{
                            borderRadius: 20,
                        }}
                    >
                        <Menu.Item
                            disabled
                            style={{
                                borderRadius: 20,
                            }}
                        >
                            <Text fw={500} size="sm">
                                {props.auth.full_name}
                            </Text>
                            sebagai {props.auth.role}
                        </Menu.Item>
                        <Menu.Item
                            c="gray.8"
                            style={{
                                borderRadius: 20,
                            }}
                            leftSection={<IconSettings />}
                            onClick={() => router.get(route("profile.edit"))}
                        >
                            Pengaturan
                        </Menu.Item>
                        <Menu.Item
                            c="red"
                            style={{
                                borderRadius: 20,
                            }}
                            leftSection={<IconLogout />}
                            onClick={() => router.post(route("logout"))}
                        >
                            Keluar
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Box>
        </SimpleGrid>
    );
};

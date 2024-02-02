import { DataTable } from "@/Components/DataTable";
import { PageHeader } from "@/Components/PageHeader";
import { AppLayout } from "@/Layouts/AppLayout";
import { DateTimeFormatter } from "@/Utilities/DateTimeFormatter";
import { router } from "@inertiajs/react";
import {
    Button,
    Group,
    ActionIcon,
    Box,
    Table,
    Menu,
    Stack,
    ThemeIcon,
    Title,
    Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconDots, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useMemo } from "react";

const Index = (props) => {
    const columns = useMemo(
        () => [
            {
                accessorKey: "full_name", //access nested data with dot notation
                header: "Nama Lengkap",
            },
            {
                accessorFn: (row) => (
                    <Text
                        style={{
                            whiteSpace: "nowrap",
                        }}
                    >
                        {row.created_at}
                    </Text>
                ),
                id: "created_at",
                header: "Bergabung Pada",
            },
            {
                accessorKey: "updated_at", //normal accessorKey
                header: "Diperbarui Pada",
            },
        ],
        []
    );

    return (
        <AppLayout title={props.title} auth={props.auth.user} meta={props.meta}>
            <PageHeader
                title={props.title}
                actions={
                    <>
                        <Button
                            radius="xl"
                            color="red.5"
                            h={40}
                            leftSection={<IconPlus />}
                            display={{
                                base: "none",
                                xs: "block",
                            }}
                            onClick={() => router.get(route("couriers.create"))}
                        >
                            Tambah
                        </Button>

                        <ActionIcon
                            size={40}
                            color="red.5"
                            radius="xl"
                            display={{
                                base: "block",
                                xs: "none",
                            }}
                            onClick={() => router.get(route("couriers.create"))}
                        >
                            <IconPlus />
                        </ActionIcon>
                    </>
                }
            />

            <DataTable
                columns={columns}
                data={props.couriers}
                renderRowActions={({ row }) => (
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
                                    router.get(
                                        route("couriers.edit", row.original.id)
                                    )
                                }
                            >
                                Ubah
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconTrash />}
                                onClick={() =>
                                    modals.openConfirmModal({
                                        styles: {
                                            content: {
                                                padding: 32,
                                                borderRadius: 20,
                                            },
                                            header: {
                                                padding: 0,
                                                backgroundColor: "transparent",
                                            },
                                            body: {
                                                padding: 0,
                                            },
                                        },
                                        children:
                                            "Apakah anda yakin ingin menghapus kurir ini?",
                                        title: (
                                            <Text fw={500}>Hapus Kurir</Text>
                                        ),
                                        centered: true,
                                        withCloseButton: false,

                                        labels: {
                                            confirm: "Hapus",
                                            cancel: "Batal",
                                        },
                                        confirmProps: { color: "red" },
                                        onConfirm: () =>
                                            router.delete(
                                                route(
                                                    "couriers.destroy",
                                                    row.original.id
                                                )
                                            ),
                                    })
                                }
                            >
                                Hapus
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                )}
            />
        </AppLayout>
    );
};

export default Index;

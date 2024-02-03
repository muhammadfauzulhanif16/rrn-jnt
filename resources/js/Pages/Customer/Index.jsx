import { DataTable } from "@/Components/DataTable";
import { PageHeader } from "@/Components/PageHeader";
import { AppLayout } from "@/Layouts/AppLayout";
import { DateTimeFormatter } from "@/Utilities/DateTimeFormatter";
import { router } from "@inertiajs/react";
import { Button, Group, ActionIcon, Box, Table, Text, Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconDots, IconPlus, IconTrash } from "@tabler/icons-react";
import { useMemo } from "react";

const Index = (props) => {
    // console.log(props);
    const columns = useMemo(
        () => [
            {
                accessorFn: (row) => (
                    <Text
                        style={{
                            whiteSpace: "nowrap",
                        }}
                    >
                        {row.full_name}
                    </Text>
                ),
                id: "full_name",
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
                accessorFn: (row) => (
                    <Text
                        style={{
                            whiteSpace: "nowrap",
                        }}
                    >
                        {row.updated_at}
                    </Text>
                ),
                id: "updated_at",
                header: "Diperbarui Pada",
            },
        ],
        []
    );

    return (
        <AppLayout title={props.title} auth={props.auth.user} meta={props.meta}>
            <PageHeader title={props.title} />

            <DataTable
                columns={columns}
                data={props.customers}
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
                                            "Apakah anda yakin ingin menghapus pelanggan ini?",
                                        title: (
                                            <Text fw={500}>Hapus Pelanggan</Text>
                                        ),
                                        centered: true,
                                        withCloseButton: false,

                                        labels: {
                                            confirm: "Hapus",
                                            cancel: "Batal",
                                        },
                                        confirmProps: {
                                            color: "red",
                                        },
                                        onConfirm: () =>
                                            router.delete(
                                                route(
                                                    "customers.destroy",
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

import { DataTable } from "@/Components/DataTable";
import { PageHeader } from "@/Components/PageHeader";
import { AppLayout } from "@/Layouts/AppLayout";
import { DateTimeFormatter } from "@/Utilities/DateTimeFormatter";
import { router } from "@inertiajs/react";
import { Button, Group, ActionIcon, Box, Table, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
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
                actions={{
                    edit: {
                        route: "customers.edit",
                    },
                    destroy: {
                        route: "customers.destroy",
                        title: "Pelanggan",
                    },
                }}
                enableRowActions
            />
        </AppLayout>
    );
};

export default Index;

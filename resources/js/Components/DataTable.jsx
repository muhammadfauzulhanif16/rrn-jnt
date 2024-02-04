import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { ActionIcon, Box, Button, Menu, Text, Title } from "@mantine/core";
import {
    IconDots,
    IconEdit,
    IconFileTypeCsv,
    IconFileTypePdf,
    IconSend,
    IconTrash,
    IconUserCircle,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { router } from "@inertiajs/react";

export const DataTable = (props) => {
    const csvConfig = mkConfig({
        // headers: props.columns.map((c) => c.header),
        fieldSeparator: ",",
        decimalSeparator: ".",
        // filename: "mrt-csv-example",
        useKeysAsHeaders: true,
        // showColumnHeaders: true,
        // data: props.data,
        // columnHeaders: props.columns.map((c) => c.header),
    });

    const handleExportRowsCSV = (rows) => {
        const rowData = rows.map((row) => {
            const { id, ...rest } = row.original;
            return rest;
        });
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const handleExportRowsPDF = (rows) => {
        const doc = new jsPDF();
        const tableData = rows.map((row) => {
            const { id, ...rest } = row.original;
            return Object.values(rest);
        });
        const tableHeaders = props.columns.map((c) => c.header);

        autoTable(doc, {
            head: [tableHeaders],
            body: tableData,
        });

        doc.save("mrt-pdf-example.pdf");
    };

    const table = useMantineReactTable({
        ...props,
        positionActionsColumn: "last",
        displayColumnDefOptions: {
            "mrt-row-actions": {
                header: "Aksi", //change header text
            },
        },positionExpandColumn:"last",
        // columns: props.columns,
        // data: props.data,
        // layoutMode: 'grid',
        enableRowNumbers: true,
        // enableColumnFilterModes: false,
        enableGlobalFilter: false,
        // enableColumnResizing: true,
        // enableColumnPinning: true,
        // enableGrouping: true,
        // enableColumnOrdering: true,
        // enableFacetedValues: true,
        // enableEditing: true,
        enableRowActions: props.renderRowActions,
        // positionToolbarAlertBanner: 'bottom',
        // enableRowSelection: true,
        enableStickyHeader: true,
        enableStickyFooter: true,
        mantinePaperProps: {
            style: {
                // minHeight: "100vh",
                flexGrow: 1,
                flexDirection: "column",
                display: "flex",
                // backgroundColor: "red",
                borderRadius: 20,
                boxShadow: "none",
            },
        },
        mantineTableContainerProps: {
            style: {
                // backgroundColor: "red",
                flexGrow: 1,
                // maxHeight: "500px",
                overflow: "scroll",
            },
        },
        mantineTopToolbarProps: {
            style: {
                backgroundColor: "transparent",
            },
        },
        mantineBottomToolbarProps: {
            style: {
                backgroundColor: "transparent",
            },
        },
        mantineTableProps: {
            // highlightOnHover: false,
            withColumnBorders: true,
            // backgroundColor: "red",
            // withTableBorder: colorScheme === "light",
            // withRowBorders: colorScheme === "light",
            // className: clsx(classes.table),
        },
        renderDetailPanel: props.renderDetailPanel,
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                style={{
                    display: "flex",
                    gap: "16px",
                    padding: "8px",
                    flexWrap: "wrap",
                }}
            >
                {/* <Button
                    radius="xl"
                    color="green"
                    variant="outline"
                    disabled={
                        table.getPrePaginationRowModel().rows.length === 0
                    }
                    onClick={() =>
                        handleExportRowsCSV(
                            table.getPrePaginationRowModel().rows
                        )
                    }
                    leftSection={<IconFileTypeCsv />}
                >
                    Ekspor Excel/CSV
                </Button> */}

                <Button
                    radius="xl"
                    color="red"
                    variant="outline"
                    disabled={
                        table.getPrePaginationRowModel().rows.length === 0
                    }
                    onClick={() =>
                        handleExportRowsPDF(
                            table.getPrePaginationRowModel().rows
                        )
                    }
                    leftSection={<IconFileTypePdf />}
                >
                    Ekspor PDF
                </Button>
            </Box>
        ),
        // renderRowActionMenuItems: () => (
        //     <>
        //         <Menu.Item icon={<IconUserCircle />}>View Profile</Menu.Item>
        //         <Menu.Item icon={<IconSend />}>Send Email</Menu.Item>
        //     </>
        // ),
    });

    return <MantineReactTable table={table} />;
};

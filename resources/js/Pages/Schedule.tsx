import { ArrowUpDown, MoreHorizontal, Plus } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { Table } from "@/Components/Table";
import { DashboardLayout } from "@/Layouts/DashboardLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Badge } from "@/Components/ui/badge";

const Schedule = ({ title, description, data, auth }: any) => {
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "name",
            header: "Pelanggan",
            cell: ({ row }) => <div>{row.getValue('name')}</div>,
        },
        {
            accessorKey: "schedule_total",
            header: "Jumlah Pesanan",
            cell: ({ row }) => <div>{row.getValue("schedule_total")}</div>,
        },
        {
            accessorKey: "schedule_status",
            header: "Status",
            cell: ({ row }) => <Badge className={row.getValue("schedule_status") === "Sudah Di Pick Up" ? "hover:bg-green-500 bg-green-500" : "hover:bg-red-500 bg-red-500"}>{row.getValue("schedule_status")}</Badge>,
        },
        {
            accessorKey: "address",
            header: "Alamat",
            cell: ({ row }) => <div>{row.getValue("address")}</div>,
        },

        // {
        //     accessorKey: "delivery_schedule",
        //     header: "Jadwal Pengiriman",
        //     cell: ({ row }) => (
        //         <div>
        //             {new Date(
        //                 row.getValue("delivery_schedule")
        //             ).toLocaleDateString()}
        //         </div>
        //     ),
        // },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const data = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <Link href={route("customers.show", data.id)}>
                                <DropdownMenuItem className="cursor-pointer">
                                    Lihat Pesanan
                                </DropdownMenuItem>
                            </Link>

                            {/* <Link
                                href={route(
                                    row.getValue("order_status") === "Siap Dikirim"
                                        ? "schedules.store"
                                        : ""
                                    , { id: data.id })}
                            > */}
                                <DropdownMenuItem
                                    disabled={
                                        row.getValue("order_status") ===
                                        "Belum Siap Dikirim"
                                    }
                                    className="cursor-pointer"
                                    onClick={() => {
                                        router.post(route('schedules.store', { seller_id: data.id }));
                                    }}
                                >
                                    Jadwalkan
                                </DropdownMenuItem>
                            {/* </Link> */}

                            {/* <Link
                                method="delete"
                                href={route("orders.destroy", data.id)}
                            >
                                <DropdownMenuItem className="cursor-pointer">
                                    Delete
                                </DropdownMenuItem>
                            </Link> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <DashboardLayout title={title} auth={auth}>
        <Card className="grow flex flex-col border-0 gap-8 shadow-none">
            <CardHeader className="p-0 flex-row justify-between space-y-0 flex-none">
                <div>
                    <CardTitle className="mb-1.5">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
            </CardHeader>

            <CardContent className="flex grow p-0">
                <Table columns={columns} data={data} />
            </CardContent>
        </Card>
    </DashboardLayout>
    );
};

export default Schedule;

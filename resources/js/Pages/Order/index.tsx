import { ArrowUpDown, MoreHorizontal, Plus } from "lucide-react";
import { Link } from "@inertiajs/react";
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

const Orders = ({ title, description, data, auth }: any) => {
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "seller",
            header: "Penjual",
            cell: ({ row }) => <div>{row.getValue("seller")}</div>,
        },
        {
            accessorKey: "customer_address",
            header: "Alamat Pembeli",
            cell: ({ row }) => <div>{row.getValue("customer_address")}</div>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <div>{row.getValue("status")}</div>,
        },
        {
            accessorKey: "delivery_schedule",
            header: "Jadwal Pengiriman",
            cell: ({ row }) => (
                <div>
                    {new Date(
                        row.getValue("delivery_schedule")
                    ).toLocaleDateString()}
                </div>
            ),
        },
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
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <Link href={route("orders.edit", data.id)}>
                                <DropdownMenuItem className="cursor-pointer">
                                    Edit
                                </DropdownMenuItem>
                            </Link>

                            <Link
                                method="delete"
                                href={route("orders.destroy", data.id)}
                            >
                                <DropdownMenuItem className="cursor-pointer">
                                    Delete
                                </DropdownMenuItem>
                            </Link>
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

                    <Link href={route("orders.create")}>
                        <div className="hidden sm:block">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Pesanan
                            </Button>
                        </div>

                        <div className="sm:hidden">
                            <Button size="icon">
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                    </Link>
                </CardHeader>

                <CardContent className="flex grow p-0">
                    <Table columns={columns} data={data} />
                </CardContent>
            </Card>
        </DashboardLayout>
    );
};

export default Orders;

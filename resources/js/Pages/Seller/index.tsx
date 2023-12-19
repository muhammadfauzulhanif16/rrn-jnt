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

const Sellers = ({ title, description, sellers, auth }: any) => {
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Nama
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "phone_number",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Nomor Telepon
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div>{row.getValue("phone_number")}</div>,
        },
        {
            accessorKey: "address",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Alamat
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div>{row.getValue("address")}</div>,
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Bergabung Pada
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div>
                    {new Date(row.getValue("created_at")).toLocaleString()}
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
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>

                            <Link href={route("sellers.edit", data.id)}>
                                <DropdownMenuItem className="cursor-pointer">
                                    Ubah
                                </DropdownMenuItem>
                            </Link>

                            <Link
                                method={data.order_count > 0 ? "get" : "delete"}
                                as="div"
                                href={
                                    data.order_count > 0
                                        ? "#"
                                        : route("sellers.destroy", data.id)
                                }
                            >
                                <DropdownMenuItem
                                    disabled={data.order_count > 0}
                                    className="cursor-pointer"
                                >
                                    Hapus
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

                    <Link href={route("sellers.create")}>
                        <div className="hidden sm:block">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Penjual
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
                    <Table
                        columns={columns}
                        data={sellers}
                        search={{
                            placeholder: "Cari penjual berdasarkan nama...",
                            column: "name",
                        }}
                    />
                </CardContent>
            </Card>
        </DashboardLayout>
    );
};

export default Sellers;

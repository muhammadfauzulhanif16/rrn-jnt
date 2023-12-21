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
import { Badge } from "@/Components/ui/badge";
import { useState } from "react";

const OrdersBySeller = ({ title, description, auth, orders }: any) => {
    console.log(orders)
    const columns: ColumnDef<any>[] = [
        // {
        //     id: "selection",
        //     header: "",
        //     cell: ({ row }: any) => (
        //         <input
        //             type="checkbox"
        //             checked={selectedOrders.includes(row.original.id)}
        //             onChange={() => toggleOrder(row.original.id)}
        //         />
        //     ),
        // },
        {
            accessorKey: "receipt_number",
            header: ({ column }) => (
                <div className="whitespace-nowrap">Nomor Resi</div>
            ),
            cell: ({ row }) => (
                <div className="whitespace-nowrap">
                    {row.getValue("receipt_number")}
                </div>
            ),
        },
        // {
        //     accessorKey: "status",
        //     header: "Status",
        //     cell: ({ row }) => (
        //         <Badge
        //             className={`whitespace-nowrap ${
        //                 row.getValue("status") === "Siap Dikirim"
        //                     ? "hover:bg-green-500 bg-green-500"
        //                     : "hover:bg-red-500 bg-red-500"
        //             }
        //             `}
        //         >
        //             {row.getValue("status")}
        //         </Badge>
        //     ),
        // },
        // {
        //     id: "actions",
        //     enableHiding: false,
        //     cell: ({ row }) => {
        //         const data = row.original;

        //         return (
        //             <DropdownMenu>
        //                 <DropdownMenuTrigger asChild>
        //                     <Button variant="ghost" className="h-8 w-8 p-0">
        //                         <span className="sr-only">Open menu</span>
        //                         <MoreHorizontal className="h-4 w-4" />
        //                     </Button>
        //                 </DropdownMenuTrigger>
        //                 <DropdownMenuContent align="end">
        //                     <DropdownMenuLabel>Aksi</DropdownMenuLabel>
        //                     <Link href={route("orders.edit", data.id)}>
        //                         <DropdownMenuItem className="cursor-pointer">
        //                             Ubah
        //                         </DropdownMenuItem>
        //                     </Link>

        //                     <Link
        //                         as="div"
        //                         method="delete"
        //                         href={route("orders.destroy", data.id)}
        //                     >
        //                         <DropdownMenuItem className="cursor-pointer">
        //                             Hapus
        //                         </DropdownMenuItem>
        //                     </Link>
        //                 </DropdownMenuContent>
        //             </DropdownMenu>
        //         );
        //     },
        // },
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
                    <Table columns={columns} data={orders} />
                </CardContent>
            </Card>
        </DashboardLayout>
    );
};

export default OrdersBySeller;

import { CornerRightDown } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Select } from "@/Components/Select";
import { DatePicker } from "@/Components/DatePicker";

const EditOrder = ({ title, description, order, auth }: any) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        receipt_number: order.receipt_number || "",
        customer_address: order.customer_address || "",
        status: order.status || "",
        delivery_schedule: order.delivery_schedule || "",
    });

    return (
        <DashboardLayout title={title} auth={auth}>
            <form
                className="grow flex"
                onSubmit={(e) => {
                    e.preventDefault();
                    put(route("orders.update", order.id));
                }}
            >
                <Card className="grow flex flex-col border-0 gap-8 shadow-none">
                    <CardHeader className="p-0 flex-row justify-between space-y-0 flex-none">
                        <div>
                            <CardTitle className="mb-1.5">{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </div>

                        <div className="hidden sm:block">
                            <Button
                                type="submit"
                                // disabled={
                                //     !data.invoice_number ||
                                //     !data.seller ||
                                //     !data.customer_name ||
                                //     !data.customer_address ||
                                //     !data.delivery_distance ||
                                //     !data.delivery_schedule
                                // }
                            >
                                <CornerRightDown className="rotate-90 w-4 h-4 mr-2" />
                                Ubah Pesanan
                            </Button>
                        </div>

                        <div className="sm:hidden">
                            <Button
                                size="icon"
                                type="submit"
                                // disabled={
                                //     !data.invoice_number ||
                                //     !data.seller ||
                                //     !data.customer_name ||
                                //     !data.customer_address ||
                                //     !data.delivery_distance ||
                                //     !data.delivery_schedule
                                // }
                            >
                                <CornerRightDown className="rotate-90 w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0 grow flex h-2">
                        <ScrollArea className="grow">
                            <Card className="shadow-none">
                                <CardContent className="grid grid-cols-1 md:grid-row-2 md:grid-cols-2 gap-4 p-6">
                                    <div className="w-full">
                                        <Label htmlFor="receipt_number">
                                            Nomor Resi
                                        </Label>
                                        <Input
                                            required
                                            value={data.receipt_number}
                                            onChange={(e) =>
                                                setData(
                                                    "receipt_number",
                                                    e.target.value
                                                )
                                            }
                                            name="receipt_number"
                                            className="mt-2 h-10"
                                            id="receipt_number"
                                            placeholder="Masukkan nomor resi"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="customer_address">
                                            Alamat Pembeli
                                        </Label>
                                        <Input
                                            required
                                            value={data.customer_address}
                                            onChange={(e) =>
                                                setData(
                                                    "customer_address",
                                                    e.target.value
                                                )
                                            }
                                            name="customer_address"
                                            className="mt-2 h-10"
                                            id="customer_address"
                                            placeholder="Masukkan alamat pembeli"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={data.status}
                                            // name="status"
                                            placeholder="Pilih status"
                                            label="Status"
                                            data={[
                                                {
                                                    value: "Siap Dikirim",
                                                    label: "Siap Dikirim",
                                                },
                                                {
                                                    value: "Belum Siap Dikirim",
                                                    label: "Belum Siap Dikirim",
                                                },
                                            ]}
                                            onChange={(value: any) =>
                                                setData("status", value)
                                            }
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="delivery_schedule">
                                            Jadwal Pengiriman
                                        </Label>
                                        <DatePicker
                                            onChange={(value: any) =>
                                                setData(
                                                    "delivery_schedule",
                                                    value
                                                )
                                            }
                                            value={data.delivery_schedule}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </form>
        </DashboardLayout>
    );
};

export default EditOrder;

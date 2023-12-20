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
                                <CardContent className="p-6">
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

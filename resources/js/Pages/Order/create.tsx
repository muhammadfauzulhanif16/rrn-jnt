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
import { Textarea } from "@/Components/ui/textarea";

const CreateOrder = ({ title, description, sellers, auth }: any) => {
    sellers = sellers.map((seller: any) => ({
        value: seller.name,
        label: seller.name,
    }));

    const { data, setData, post, processing, errors, reset } = useForm({
        seller: "",
        customer_address: "",
        status: "",
        delivery_schedule: "",
    });

    // console.log(data.delivery_schedule, "data.delivery_schedule");

    return (
        <DashboardLayout title={title} auth={auth}>
            <form
                className="grow flex"
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route("orders.store"));
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
                                disabled={
                                    !data.seller ||
                                    !data.customer_address ||
                                    !data.status ||
                                    !data.delivery_schedule
                                }
                            >
                                <CornerRightDown className="rotate-90 w-4 h-4 mr-2" />
                                Tambah Pesanan
                            </Button>
                        </div>

                        <div className="sm:hidden">
                            <Button
                                size="icon"
                                type="submit"
                                disabled={
                                    !data.seller ||
                                    !data.customer_address ||
                                    !data.status ||
                                    !data.delivery_schedule
                                }
                            >
                                <CornerRightDown className="rotate-90 w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0 grow flex h-2">
                        <ScrollArea className="grow">
                            <Card className="shadow-none mb-4">
                                <CardHeader>
                                    <CardTitle>Informasi</CardTitle>
                                </CardHeader>

                                <CardContent className="grid sm:grid-row-2 sm:grid-cols-2 gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="seller">Penjual</Label>
                                        <Select
                                            value={data.seller}
                                            name="seller"
                                            placeholder="Pilih Penjual"
                                            label="Penjual"
                                            data={sellers}
                                            setData={setData}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="customer_address">
                                            Alamat Pembeli
                                        </Label>
                                        <Textarea
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
                                            placeholder=""
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={data.status}
                                            name="status"
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
                                            setData={setData}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="delivery_schedule">
                                            Jadwal Pengiriman
                                        </Label>
                                        <DatePicker
                                            setData={setData}
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

export default CreateOrder;

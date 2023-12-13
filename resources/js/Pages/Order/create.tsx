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
    // console.log(sellers);
    sellers = sellers.map((seller: any) => ({
        value: seller.id,
        label: seller.name,
    }));

    // const { data, setData, post, processing, errors, reset } = useForm({
    //     seller_id: "",
    //     items: [],
    // });

    const { data, setData, post, processing, errors, reset } = useForm<{
        seller_id: string;
        items: {
            customer_address: string,
            // status: string,
            // delivery_schedule: string,
        }[];
    }>({
        seller_id: "",
        items: [],
    });

    const addOrder = () => {
        setData('items', [...data.items, {
            customer_address: '',
            // status: '',
            // delivery_schedule: '',
        }])
    }

    const updateOrder = (index: any, field: any, value: any) => {
        const newItems: any = [...data.items];
        newItems[index][field] = value;
        setData('items', newItems);
    };

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
                            // disabled={
                            //     !data.seller_id ||
                            //     !data.customer_address ||
                            //     !data.status ||
                            //     !data.delivery_schedule
                            // }
                            >
                                <CornerRightDown className="rotate-90 w-4 h-4 mr-2" />
                                Tambah Pesanan
                            </Button>
                        </div>

                        <div className="sm:hidden">
                            <Button
                                size="icon"
                                type="submit"
                            // disabled={
                            //     !data.seller_id ||
                            //     !data.customer_address ||
                            //     !data.status ||
                            //     !data.delivery_schedule
                            // }
                            >
                                <CornerRightDown className="rotate-90 w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0 grow flex h-2">
                        <ScrollArea className="grow">
                            <Card className="shadow-none mb-4">
                                <CardHeader>
                                    <CardTitle>Informasi Penjual</CardTitle>
                                </CardHeader>

                                <CardContent className="gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="seller">Penjual</Label>
                                        <Select
                                            value={data.seller_id}
                                            name="seller_id"
                                            placeholder="Pilih Penjual"
                                            label="Penjual"
                                            data={sellers}
                                            setData={setData}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-none mb-4">
                                <CardHeader>
                                    <CardTitle>Informasi Pesanan</CardTitle>
                                </CardHeader>

                                <CardContent className="flex flex-col gap-4">
                                    {data.items.map((item, index) => (
                                        <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div className="w-full">
                                                <Label htmlFor={`customer_address_${index}`}>
                                                    Alamat Pembeli
                                                </Label>
                                                <Textarea
                                                    required
                                                    value={item.customer_address}
                                                    onChange={(e) =>
                                                        updateOrder(index, 'customer_address', e.target.value)
                                                    }
                                                    name={`customer_address_${index}`}
                                                    className="mt-2 h-10"
                                                    id={`customer_address_${index}`}
                                                    placeholder=""
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label htmlFor={`customer_address_${index}`}>
                                                    Alamat Pembeli
                                                </Label>
                                                <Textarea
                                                    required
                                                    value={item.customer_address}
                                                    onChange={(e) =>
                                                        updateOrder(index, 'customer_address', e.target.value)
                                                    }
                                                    name={`customer_address_${index}`}
                                                    className="mt-2 h-10"
                                                    id={`customer_address_${index}`}
                                                    placeholder=""
                                                />
                                            </div>

                                            {/* <div className="w-full">
                                                <Label htmlFor={`status_${index}`}>Status</Label>
                                                <Select
                                                    value={item.status}
                                                    name={`status_${index}`}
                                                    placeholder="Pilih status"
                                                    label="Status"
                                                    data={[
                                                        {
                                                            value: 'Siap Dikirim',
                                                            label: "Siap Dikirim",
                                                        },
                                                        {
                                                            value: 'Belum Siap Dikirim',
                                                            label: "Belum Siap Dikirim",
                                                        },
                                                    ]}
                                                    //   setData={setData}
                                                    setData={(e: any) =>
                                                        updateOrder(index, 'status', e.target.value)
                                                    }
                                                />
                                            </div> */}

                                            {/* <div className="w-full">
                                                <Label htmlFor={`delivery_schedule_${index}`}>
                                                    Jadwal Pengiriman
                                                </Label>
                                                <DatePicker
                                                    setData={(e: any) =>
                                                        updateOrder(index, 'delivery_schedule', e.target.value)
                                                    }
                                                    value={item.delivery_schedule}
                                                />
                                            </div> */}
                                        </div>
                                    ))}

                                    <Button onClick={addOrder}>Tambah Pesanan Lainnya</Button>
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

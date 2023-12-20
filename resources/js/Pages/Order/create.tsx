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
import { Separator } from "@/Components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";

const CreateOrder = ({ title, description, sellers, auth }: any) => {
    sellers = sellers.map((seller: any) => ({
        value: seller.id,
        label: seller.name,
    }));

    const { data, setData, post, processing, errors, reset } = useForm<{
        seller_id: string;
        status: string;
        items: {
            receipt_number: string;
        }[];
    }>({
        seller_id: "",
        status: "",
        items: [],
    });

    const addOrder = (e: any) => {
        e.preventDefault();

        setData("items", [
            ...data.items,
            {
                receipt_number: "",
            },
        ]);
    };

    const cancelLastOrder = (e:any) => {
        e.preventDefault();

        setData(prevData => {
            const newItems = [...prevData.items];
            newItems.pop();
            return { ...prevData, items: newItems };
        });
    };

    const updateOrder = (index: any, field: any, value: any) => {
        const newItems: any = [...data.items];
        newItems[index][field] = value;
        setData("items", newItems);
    };

    const isFormEmpty = () => {
        if (!data.seller_id || !data.status || data.items.length === 0) return true;

        for (let item of data.items) {
            if (
                !item.receipt_number
            ) {
                return true;
            }
        }

        return false;
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
                            <Button type="submit" disabled={isFormEmpty()}>
                                <CornerRightDown className="rotate-90 w-4 h-4 mr-2" />
                                Tambah Pesanan
                            </Button>
                        </div>

                        <div className="sm:hidden">
                            <Button
                                size="icon"
                                type="submit"
                                disabled={isFormEmpty()}
                            >
                                <CornerRightDown className="rotate-90 w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0 grow flex h-2">
                        <ScrollArea className="grow">
                            <Card className="shadow-none mb-4">
                                <CardContent className="flex flex-col gap-4 p-6">
                                    <div className="w-full">
                                        <Label htmlFor="seller">Penjual</Label>
                                        <Select
                                            value={data.seller_id}
                                            placeholder="Pilih Penjual"
                                            label="Penjual"
                                            data={sellers}
                                            onChange={(value: any) =>
                                                setData({
                                                    ...data,
                                                    seller_id: value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label
                                            htmlFor="status_"
                                        >
                                            Status
                                        </Label>
                                        <Select
                                            value={data.status}
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
                                            onChange={(
                                                value: any
                                            ) =>
                                                setData(
                                                    "status",
                                                    value
                                                )
                                            }
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-none mb-4">
                                <CardHeader>
                                    <CardTitle>Informasi Pesanan</CardTitle>
                                </CardHeader>

                                <CardContent className="flex flex-col gap-8">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full"
                                    >
                                        {data.items.map((item, index) => (
                                            <AccordionItem
                                                value={`order_${index}`}
                                                key={index}
                                            >
                                                <AccordionTrigger>
                                                    Pesanan {index + 1}
                                                </AccordionTrigger>

                                                <AccordionContent>
                                                    <div className="w-full" key={index}>
                                                        <Label
                                                            htmlFor={`receipt_number_${index}`}
                                                        >
                                                            Nomor Resi
                                                        </Label>
                                                        <Input
                                                            required
                                                            value={
                                                                item.receipt_number
                                                            }
                                                            onChange={(e) =>
                                                                updateOrder(
                                                                    index,
                                                                    "receipt_number",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            name={`receipt_number_${index}`}
                                                            className="mt-2 h-10"
                                                            id={`receipt_number_${index}`}
                                                            placeholder="Masukkan nomor resi"
                                                        />
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>

                                    <div className="flex w-full gap-4">
                                        <Button onClick={addOrder} className="w-full">
                                            Tambah Pesanan
                                        </Button>

                                        {data.items.length > 1 && (
                                            <Button className="w-full" variant="outline" onClick={cancelLastOrder}>Hapus Pesanan</Button>
                                        )}</div>
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

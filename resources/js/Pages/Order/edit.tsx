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

const EditOrder = ({ title, description, sellers, auth }: any) => {
    sellers = sellers.map((seller: any) => ({
        value: seller.shop_name,
        label: seller.shop_name,
    }));

    const { data, setData, post, processing, errors, reset } = useForm({
        invoice_number: "",
        seller: "",
        customer_name: "",
        customer_address: "",
        delivery_distance: "",
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
                                    !data.invoice_number ||
                                    !data.seller ||
                                    !data.customer_name ||
                                    !data.customer_address ||
                                    !data.delivery_distance ||
                                    !data.delivery_schedule
                                }
                            >
                                <CornerRightDown className="rotate-90 w-4 h-4 mr-2" />
                                Create Order
                            </Button>
                        </div>

                        <div className="sm:hidden">
                            <Button
                                size="icon"
                                type="submit"
                                disabled={
                                    !data.invoice_number ||
                                    !data.seller ||
                                    !data.customer_name ||
                                    !data.customer_address ||
                                    !data.delivery_distance ||
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
                                    <CardTitle>Order</CardTitle>
                                </CardHeader>

                                <CardContent className="flex flex-col sm:flex-row gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="invoice_number">
                                            Invoice Number
                                        </Label>
                                        <Input
                                            required
                                            value={data.invoice_number}
                                            onChange={(e) =>
                                                setData(
                                                    "invoice_number",
                                                    e.target.value
                                                )
                                            }
                                            name="invoice_number"
                                            className="mt-2"
                                            id="invoice_number"
                                            placeholder="Enter invoice number"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="password" className="">
                                            Seller
                                        </Label>
                                        <Select
                                            placeholder="seller"
                                            label="Sellers"
                                            data={sellers}
                                            setData={setData}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-none mb-4">
                                <CardHeader>
                                    <CardTitle>Customer</CardTitle>
                                </CardHeader>

                                <CardContent className="flex flex-col sm:flex-row gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="customer_name">
                                            Name
                                        </Label>
                                        <Input
                                            required
                                            value={data.customer_name}
                                            onChange={(e) =>
                                                setData(
                                                    "customer_name",
                                                    e.target.value
                                                )
                                            }
                                            name="customer_name"
                                            className="mt-2"
                                            id="customer_name"
                                            placeholder="Enter name"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="customer_address">
                                            Address
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
                                            className="mt-2"
                                            id="customer_address"
                                            placeholder="Enter address"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-none">
                                <CardHeader>
                                    <CardTitle>Delivery</CardTitle>
                                </CardHeader>

                                <CardContent className="flex flex-col sm:flex-row gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="delivery_distance">
                                            Distance
                                        </Label>
                                        <Input
                                            required
                                            value={data.delivery_distance}
                                            onChange={(e) =>
                                                setData(
                                                    "delivery_distance",
                                                    e.target.value
                                                )
                                            }
                                            name="delivery_distance"
                                            className="mt-2"
                                            type="number"
                                            id="delivery_distance"
                                            placeholder="Enter distance"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="delivery_schedule">
                                            Schedule
                                        </Label>

                                        <DatePicker
                                            setData={setData}
                                            value={data.delivery_schedule}
                                        />
                                        {/* <Input
                                            required
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            type="password"
                                            className="mt-2"
                                            id="password"
                                            placeholder="Enter password"
                                        /> */}
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

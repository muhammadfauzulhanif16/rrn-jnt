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
import { Textarea } from "@/Components/ui/textarea";

const EditSeller = ({ title, description, currentData }: any) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        shop_name: currentData.shop_name || "",
        address: currentData.address || "",
    });

    return (
        <DashboardLayout title={title}>
            <form
                className="grow flex"
                onSubmit={(e) => {
                    e.preventDefault();
                    put(route("sellers.update", currentData));
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
                                disabled={!data.shop_name || !data.address}
                            >
                                <CornerRightDown className="rotate-90 w-4 h-4 mr-2" />
                                Create Seller
                            </Button>
                        </div>

                        <div className="sm:hidden">
                            <Button
                                size="icon"
                                type="submit"
                                disabled={!data.shop_name || !data.address}
                            >
                                <CornerRightDown className="rotate-90 w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0 grow flex h-2">
                        <ScrollArea className="grow">
                            <Card className="shadow-none">
                                <CardHeader>
                                    <CardTitle>Identity</CardTitle>
                                </CardHeader>

                                <CardContent className="flex flex-col sm:flex-row gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="username">
                                            Shop Name
                                        </Label>
                                        <Input
                                            required
                                            value={data.shop_name}
                                            onChange={(e) =>
                                                setData(
                                                    "shop_name",
                                                    e.target.value
                                                )
                                            }
                                            name="shop_name"
                                            className="mt-2"
                                            id="shop_name"
                                            placeholder="Enter shop name"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="address">Address</Label>
                                        <Textarea
                                            required
                                            className="mt-2"
                                            value={data.address}
                                            placeholder="Enter address"
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            id="address"
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

export default EditSeller;

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
import { Select } from "@/Components/Select";

const CreateSeller = ({ title, description, auth }: any) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        phone_number: "",
        address: "",
        distance: "",
        item_name: "",
        item_type: "",
    });

    return (
        <DashboardLayout title={title} auth={auth}>
            <form
                className="grow flex"
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route("customers.store"));
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
                                    !data.name ||
                                    !data.phone_number ||
                                    !data.address ||
                                    !data.item_name ||
                                    !data.item_type
                                }
                            >
                                <CornerRightDown className="rotate-90 w-4 h-4 mr-2" />
                                Tambah Penjual
                            </Button>
                        </div>

                        <div className="sm:hidden">
                            <Button
                                size="icon"
                                type="submit"
                                disabled={
                                    !data.name ||
                                    !data.phone_number ||
                                    !data.address ||
                                    !data.item_name ||
                                    !data.item_type
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
                                    <CardTitle>Identitas</CardTitle>
                                </CardHeader>

                                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="name">Nama</Label>
                                        <Input
                                            required
                                            value={data.name}
                                            onChange={(e) =>
                                                setData(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            name="name"
                                            className="mt-2"
                                            id="name"
                                            placeholder="Masukkan nama"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="phone_number">
                                            Nomor Telepon
                                        </Label>
                                        <Input
                                            type="number"
                                            required
                                            value={data.phone_number}
                                            onChange={(e) =>
                                                setData(
                                                    "phone_number",
                                                    e.target.value.toString()
                                                )
                                            }
                                            name="phone_number"
                                            className="mt-2"
                                            id="phone_number"
                                            placeholder="Masukkan nomor telepon"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="address">Alamat</Label>
                                        <Textarea
                                            required
                                            className="mt-2 h-10"
                                            value={data.address}
                                            placeholder="Masukkan alamat"
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            id="address"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="distance">
                                            Jarak Alamat (Meter)
                                        </Label>
                                        <Input
                                            type="number"
                                            required
                                            value={data.distance}
                                            onChange={(e) =>
                                                setData(
                                                    "distance",
                                                    e.target.value.toString()
                                                )
                                            }
                                            name="distance"
                                            className="mt-2"
                                            id="distance"
                                            placeholder="Masukkan jarak alamat"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-none">
                                <CardHeader>
                                    <CardTitle>Barang</CardTitle>
                                </CardHeader>

                                <CardContent className="flex flex-col sm:flex-row gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="item_name">Nama</Label>
                                        <Input
                                            required
                                            value={data.item_name}
                                            onChange={(e) =>
                                                setData(
                                                    "item_name",
                                                    e.target.value
                                                )
                                            }
                                            name="item_name"
                                            className="mt-2"
                                            id="item_name"
                                            placeholder="Masukkan nama barang"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="phone_number">
                                            Jenis
                                        </Label>
                                        <Select
                                            value={data.item_type}
                                            placeholder="Pilih jenis barang"
                                            label="Jenis Barang"
                                            data={[
                                                {
                                                    value: "Barang",
                                                    label: "Barang",
                                                },
                                                {
                                                    value: "Dokumen",
                                                    label: "Dokumen",
                                                },
                                            ]}
                                            onChange={(value: any) =>
                                                setData("item_type", value)
                                            }
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

export default CreateSeller;

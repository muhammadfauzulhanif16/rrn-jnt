import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { CornerRightDown } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
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

const ShowOrder = ({ title, description, auth,data }: any) => {
    return (
        <DashboardLayout title={title} auth={auth}>
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

                            <CardContent className="flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="name">Nama</Label>
                                        <Input
                                            required
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
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
                                            required
                                            value={data.phone_number}
                                            onChange={(e) =>
                                                setData(
                                                    "phone_number",
                                                    e.target.value
                                                )
                                            }
                                            name="phone_number"
                                            className="mt-2"
                                            id="phone_number"
                                            placeholder="Masukkan nomor telepon"
                                        />
                                    </div>
                                </div>

                                <div className="w-full col-span-2">
                                    <Label htmlFor="address">Alamat</Label>
                                    <Textarea
                                        required
                                        className="mt-2"
                                        value={data.address}
                                        placeholder="Masukkan alamat"
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        id="address"
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
                                            setData("item_name", e.target.value)
                                        }
                                        name="item_name"
                                        className="mt-2"
                                        id="item_name"
                                        placeholder="Masukkan nama barang"
                                    />
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="phone_number">Jenis</Label>
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
        </DashboardLayout>
    );
};

export default ShowOrder;

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

const CreateCourier = ({ title, description, auth }: any) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: "",
        username: "",
        password: "",
    });

    return (
        <DashboardLayout title={title} auth={auth}>
            <form
                className="grow flex"
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route("couriers.store"));
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
                                    data.full_name.length <= 3 ||
                                    data.username.length <= 8 ||
                                    data.password.length <= 8
                                }
                            >
                                <CornerRightDown className="rotate-90 w-4 h-4 mr-2" />
                                Tambah Kurir
                            </Button>
                        </div>

                        <div className="sm:hidden">
                            <Button
                                size="icon"
                                type="submit"
                                disabled={
                                    data.full_name.length <= 3 ||
                                    data.username.length <= 8 ||
                                    data.password.length <= 8
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
                                    <CardTitle>Identitas Pribadi</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Label htmlFor="full_name">
                                        Nama Lengkap
                                    </Label>
                                    <Input
                                        required
                                        value={data.full_name}
                                        onChange={(e) =>
                                            setData("full_name", e.target.value)
                                        }
                                        name="full_name"
                                        className="my-2"
                                        id="full_name"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    <span className="text-sm">Nama lengkap minimal 3 karakter.</span>
                                </CardContent>
                            </Card>

                            <Card className="shadow-none">
                                <CardHeader>
                                    <CardTitle>Akun</CardTitle>
                                </CardHeader>

                                <CardContent className="flex flex-col sm:flex-row gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="username">
                                            Nama Pengguna
                                        </Label>
                                        <Input
                                            required
                                            value={data.username}
                                            onChange={(e) =>
                                                setData(
                                                    "username",
                                                    e.target.value
                                                )
                                            }
                                            name="username"
                                            className="my-2"
                                            id="username"
                                            placeholder="Masukkan nama pengguna"
                                        />
                                        <span className="text-sm">Nama pengguna minimal 8 karakter.</span>
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="password">
                                            Kata Sandi
                                        </Label>
                                        <Input
                                            required
                                            value={data.password.toLowerCase()}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value.toLowerCase()
                                                )
                                            }
                                            type="password"
                                            className="my-2"
                                            id="password"
                                            placeholder="Masukkan kata sandi"
                                        />
                                        <span className="text-sm">Kata sandi minimal 8 karakter.</span>
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

export default CreateCourier;

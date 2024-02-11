import { MapProfile } from "@/Components/Map/MapProfile";
import { AppLayout } from "@/Layouts/AppLayout";
import { useForm } from "@inertiajs/react";
import {
    AspectRatio,
    Button,
    Divider,
    Flex,
    Grid,
    Kbd,
    NumberInput,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
    Textarea,
    Title, Select,
} from "@mantine/core";
import {
    IconAt,
    IconCornerDownLeft,
    IconHome,
    IconId,
    IconPassword,
    IconPhone, IconStatusChange, IconSwitch, IconSwitch3, IconWeight,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const Edit = (props) => {
    const [currentPosition, setCurrentPosition] = useState({
        longitude: props.auth.user.longitude || 0,
        latitude: props.auth.user.latitude || 0,
    });

    const form = useForm({
        full_name: props.auth.user.full_name || "",
        phone_number: props.auth.user.phone_number || "",
        address: props.auth.user.address || "",
        longitude: currentPosition.longitude,
        latitude: currentPosition.latitude,
        transportation_type:  props.auth.user.transportation_type || "",
        transportation_capacity: props.auth.user.transportation_capacity || 0,
        username: props.auth.user.username || "",
        password: props.auth.user.password || "",
    });

    useEffect(() => {
        form.setData((prevForm) => ({
            ...prevForm,
            longitude: currentPosition.longitude,
            latitude: currentPosition.latitude,
        }));
    }, [currentPosition]);

    console.log(form.data);

    return (
        <AppLayout title="Pengaturan" auth={props.auth.user} meta={props.meta}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    !form.hasErrors && form.patch(route("profile.update"));
                }}
            >
                <Stack>
                    <Grid>
                        <Grid.Col
                            span={{
                                base: 12,
                                sm: 4,
                            }}
                        >
                            <Title order={3} c="gray.9">
                                Profil
                            </Title>
                        </Grid.Col>

                        <Grid.Col
                            span={{
                                base: 12,
                                sm: 8,
                            }}
                        >
                            <Paper p={32} radius={20} withBorder>
                                <Stack gap={24}>
                                    <TextInput
                                        label="Nama Lengkap"
                                        placeholder="Masukkan nama lengkap"
                                        variant="filled"
                                        radius="xl"
                                        leftSection={<IconId size={16} />}
                                        value={form.data.full_name}
                                        disabled={
                                            props.auth.user.role === "kurir"
                                        }
                                        styles={{
                                            label: {
                                                marginBottom: 8,
                                                color: "#212529",
                                            },
                                            input: {
                                                height: 40,
                                            },
                                        }}
                                        onChange={(e) => {
                                            form.setData(
                                                "full_name",
                                                e.target.value
                                            );

                                            if (!e.target.value) {
                                                form.setError({
                                                    full_name:
                                                        "Nama lengkap tidak boleh kosong.",
                                                });
                                            } else {
                                                form.clearErrors("full_name");
                                            }
                                        }}
                                        error={form.errors.full_name}
                                    />

                                    {props.auth.user.role === "pelanggan" && (
                                        <>
                                            <NumberInput
                                                label="Nomor Telepon"
                                                placeholder="Masukkan nomor telepon"
                                                leftSection={
                                                    <IconPhone size={16} />
                                                }
                                                hideControls
                                                prefix="+62 "
                                                allowNegative={false}
                                                allowDecimal={false}
                                                variant="filled"
                                                radius="xl"
                                                styles={{
                                                    label: {
                                                        marginBottom: 8,
                                                        color: "#212529",
                                                    },
                                                    input: {
                                                        height: 40,
                                                    },
                                                }}
                                                value={form.data.phone_number}
                                                onChange={(value) => {
                                                    form.setData(
                                                        "phone_number",
                                                        value
                                                    );

                                                    if (!value) {
                                                        form.setError({
                                                            phone_number:
                                                                "Nomor telepon boleh kosong.",
                                                        });
                                                    } else {
                                                        form.clearErrors(
                                                            "phone_number"
                                                        );
                                                    }
                                                }}
                                                error={form.errors.phone_number}
                                            />

                                            <Textarea
                                                label="Alamat"
                                                placeholder="Masukkan alamat"
                                                variant="filled"
                                                radius="xl"
                                                leftSection={
                                                    <IconHome size={16} />
                                                }
                                                value={form.data.address}
                                                onChange={(e) => {
                                                    form.setData(
                                                        "address",
                                                        e.target.value
                                                    );

                                                    if (!e.target.value) {
                                                        form.setError({
                                                            address:
                                                                "Alamat telepon boleh kosong.",
                                                        });
                                                    } else {
                                                        form.clearErrors(
                                                            "address"
                                                        );
                                                    }
                                                }}
                                                autosize
                                                styles={{
                                                    label: {
                                                        marginBottom: 8,
                                                        color: "#212529",
                                                    },
                                                    input: {
                                                        height: 40,
                                                    },
                                                }}
                                                error={form.errors.address}
                                            />

                                            <AspectRatio ratio={16 / 9}>
                                                <MapProfile
                                                    currentPosition={
                                                        currentPosition
                                                    }
                                                    setCurrentPosition={
                                                        setCurrentPosition
                                                    }
                                                />
                                            </AspectRatio>
                                        </>
                                    )}

                                    {props.auth.user.role === "kurir" && (
                                        <>
                                            <Select
                                                label="Jenis Transportasi"
                                                placeholder="Pilih jenis transportasi"
                                                variant="filled"
                                                radius="xl"
                                                data={['Motor', 'Mobil']}
                                                leftSection={
                                                    <IconSwitch3 size={16} />
                                                }
                                                styles={{
                                                    label: {
                                                        marginBottom: 8,
                                                    },
                                                    input: {
                                                        height: 40,
                                                    },
                                                }}
                                                value={form.data.transportation_type}
                                                onChange={(value) => {
                                                    form.setData(
                                                        "transportation_type",
                                                        value
                                                    );

                                                    if (!value) {
                                                        form.setError({
                                                            transportation_type:
                                                                "Jenis transportasi tidak boleh kosong.",
                                                        });
                                                    } else {
                                                        form.clearErrors(
                                                            "transportation_type"
                                                        );
                                                    }
                                                }}
                                                error={form.errors.transportation_type}
                                            />

                                            <NumberInput
                                                label="Kapasitas Kendaraan"
                                                placeholder="Masukkan kapasitas kendaraan"
                                                leftSection={
                                                    <IconWeight size={16} />
                                                }
                                                hideControls
                                                allowNegative={false}
                                                allowDecimal={false}
                                                variant="filled"
                                                radius="xl"
                                                styles={{
                                                    label: {
                                                        marginBottom: 8,
                                                        color: "#212529",
                                                    },
                                                    input: {
                                                        height: 40,
                                                    },
                                                }}
                                                value={form.data.transportation_capacity}
                                                onChange={(value) => {
                                                    form.setData(
                                                        "transportation_capacity",
                                                        value
                                                    );

                                                    if (!value) {
                                                        form.setError({
                                                            transportation_capacity:
                                                                "Kapasitas kendaraan tidak boleh kosong.",
                                                        });
                                                    } else {
                                                        form.clearErrors(
                                                            "transportation_capacity"
                                                        );
                                                    }
                                                }}
                                                error={form.errors.transportation_capacity}
                                            />
                                        </>
                                    )}
                                </Stack>
                            </Paper>
                        </Grid.Col>
                    </Grid>

                    <Divider my={32} />

                    <Grid>
                        <Grid.Col
                            span={{
                                base: 12,
                                sm: 4,
                            }}
                        >
                            <Title order={3} c="gray.9">
                                Akun
                            </Title>
                        </Grid.Col>

                        <Grid.Col
                            span={{
                                base: 12,
                                sm: 8,
                            }}
                        >
                            <Paper p={32} radius={20} withBorder>
                                <Stack gap={24}>
                                    <TextInput
                                        label="Nama Pengguna"
                                        placeholder="Masukkan nama pengguna"
                                        variant="filled"
                                        radius="xl"
                                        leftSection={<IconAt size={16} />}
                                        onChange={(e) => {
                                            form.setData(
                                                "username",
                                                e.target.value.toLowerCase()
                                            );

                                            if (!e.target.value) {
                                                form.setError({
                                                    username:
                                                        "Nama pengguna tidak boleh kosong.",
                                                });
                                            } else {
                                                form.clearErrors("username");
                                            }

                                            if (
                                                props.users.some(
                                                    ({ username }) =>
                                                        username ===
                                                        e.target.value.toLowerCase()
                                                )
                                            ) {
                                                form.setError({
                                                    username:
                                                        "Nama pengguna sudah digunakan.",
                                                });
                                            }
                                        }}
                                        styles={{
                                            label: {
                                                marginBottom: 8,
                                                color: "#212529",
                                            },
                                            input: {
                                                height: 40,
                                            },
                                        }}
                                        value={form.data.username}
                                        error={form.errors.username}
                                    />

                                    <PasswordInput
                                        label="Kata Sandi"
                                        description="Isi jika ingin mengubah kata sandi"
                                        placeholder="Masukkan kata sandi"
                                        variant="filled"
                                        radius="xl"
                                        leftSection={<IconPassword size={16} />}
                                        onChange={(e) =>
                                            form.setData(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        styles={{
                                            description: {
                                                marginBottom: 16,
                                            },
                                            label: {
                                                color: "#212529",
                                            },
                                            input: {
                                                height: 40,
                                            },
                                        }}
                                        error={form.errors.password}
                                    />
                                </Stack>
                            </Paper>
                        </Grid.Col>
                    </Grid>

                    <Divider my={32} />

                    <Flex justify="flex-end">
                        <Button
                            h={40}
                            leftSection={<IconCornerDownLeft />}
                            rightSection={<Kbd>Enter</Kbd>}
                            disabled={form.hasErrors}
                            loading={form.processing}
                            radius="xl"
                            color="red.5"
                            type="submit"
                        >
                            Simpan
                        </Button>
                    </Flex>
                </Stack>
            </form>
        </AppLayout>
    );
};

export default Edit;

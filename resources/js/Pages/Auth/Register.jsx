import { AppLayout } from "@/Layouts/AppLayout";
import {
    Anchor,
    Box,
    Button,
    Center,
    Flex,
    Image,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import Logo from "../../Images/J&T_Express_logo.svg";
import { router, useForm } from "@inertiajs/react";

const Login = (props) => {
    const form = useForm({
        full_name: "",
        username: "",
        password: "",
    });

    return (
        <AppLayout title="Buat Akun" auth={!!props.auth.user} meta={props.meta}>
            <Flex
                flex={1}
                direction="column"
                justify="center"
                align="center"
                gap={32}
            >
                <Paper
                    withBorder
                    p={32}
                    radius={20}
                    w={{
                        base: "100%",
                        sm: "75%",
                        md: "50%",
                        lg: "25%",
                    }}
                >
                    <Center mb={32}>
                        <Image src={Logo} w={160} />
                    </Center>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            !form.hasErrors && form.post(route("register"));
                        }}
                    >
                        <Stack spacing={16}>
                            <TextInput
                                label="Nama Lengkap"
                                placeholder="Masukkan nama lengkap"
                                variant="filled"
                                radius="xl"
                                onChange={(e) => {
                                    form.setData("full_name", e.target.value);

                                    if (!e.target.value) {
                                        form.setError({
                                            full_name:
                                                "Nama lengkap tidak boleh kosong.",
                                        });
                                    } else {
                                        form.clearErrors("full_name");
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
                                error={form.errors.full_name}
                            />

                            <TextInput
                                label="Nama Pengguna"
                                placeholder="Masukkan nama pengguna"
                                variant="filled"
                                radius="xl"
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
                                error={form.errors.username}
                            />

                            <PasswordInput
                                label="Kata Sandi"
                                placeholder="Masukkan kata sandi"
                                variant="filled"
                                radius="xl"
                                onChange={(e) => {
                                    form.setData("password", e.target.value);

                                    if (!e.target.value) {
                                        form.setError({
                                            password:
                                                "Kata sandi tidak boleh kosong.",
                                        });
                                    } else {
                                        form.clearErrors("password");
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
                                error={form.errors.password}
                            />
                        </Stack>

                        <Button
                            loading={form.processing}
                            disabled={
                                form.hasErrors ||
                                form.data.username === "" ||
                                form.data.password === ""
                            }
                            type="submit"
                            w="100%"
                            mt={24}
                            radius="xl"
                            color="red.5"
                            h={40}
                        >
                            Daftar Akun
                        </Button>
                    </form>
                </Paper>

                <Text fw={500} size="sm" c="gray.8">
                    Sudah punya akun?{" "}
                    <Anchor
                        c="red.5"
                        fw={500}
                        onClick={() => router.get(route("login"))}
                    >
                        Masuk akun
                    </Anchor>
                </Text>
            </Flex>
        </AppLayout>
    );
};

export default Login;

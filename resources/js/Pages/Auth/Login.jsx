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
        username: "",
        password: "",
    });

    return (
        <AppLayout
            title="Masuk Akun"
            auth={!!props.auth.user}
            meta={props.meta}
        >
            {/* <Center
                style={{
                    flexGrow: 1,
                }}
            > */}
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
                            !form.hasErrors && form.post(route("login"));
                        }}
                    >
                        <Stack spacing={16}>
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
                                }}
                                styles={{
                                    label: {
                                        marginBottom: 8,
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
                        >
                            Masuk Akun
                        </Button>
                    </form>
                </Paper>

                <Text fw={500} size="sm">
                    Belum punya akun?{" "}
                    <Anchor
                        c="red.5"
                        fw={500}
                        onClick={() => router.get(route("register"))}
                    >
                        Daftar sebagai pelanggan
                    </Anchor>
                </Text>
            </Flex>
        </AppLayout>
    );
};

export default Login;

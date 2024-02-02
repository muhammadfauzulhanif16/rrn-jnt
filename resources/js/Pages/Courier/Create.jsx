import { PageHeader } from "@/Components/PageHeader";
import { AppLayout } from "@/Layouts/AppLayout";
import { router, useForm } from "@inertiajs/react";
import {
    Button,
    Group,
    ActionIcon,
    Paper,
    Divider,
    Box,
    Kbd,
    Flex,
    Stack,
    Grid,
    Title,
    TextInput,
    PasswordInput,
    NumberInput,
    Textarea,
    AspectRatio,
    Text,
    Accordion,
    Center,
} from "@mantine/core";
import {
    IconCornerDownLeft,
    IconAt,
    IconHome,
    IconId,
    IconPassword,
    IconPhone,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";

const Create = (props) => {
    const form = useForm({
        couriers: [
            {
                full_name: "",
                username: "",
                password: "",
            },
        ],
    });

    const addCourier = () => {
        form.setData("couriers", [
            ...form.data.couriers,
            {
                full_name: "",
                username: "",
                password: "",
            },
        ]);
    };

    const removeCourier = (index) => {
        const newCouriers = [...form.data.couriers];
        newCouriers.splice(index, 1);
        form.setData("couriers", newCouriers);
    };

    return (
        <AppLayout title={props.title} auth={props.auth.user} meta={props.meta}>
            <PageHeader
                title={props.title}
                breadcrumbs={[
                    {
                        label: "Kurir",
                        route: "couriers.index",
                    },
                    {
                        label: "Tambah",
                        route: "couriers.create",
                    },
                ]}
            />

            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    !form.hasErrors && form.post(route("couriers.store"));
                }}
            >
                <Accordion
                    mb={32}
                    styles={{
                        content: {
                            padding: 32,
                        },
                    }}
                >
                    {form.data.couriers.map((courier, id) => (
                        <Accordion.Item key={id} value={`courier-${id}`}>
                            <Center>
                                <Accordion.Control mr={16}>
                                    <Text fw={500}>
                                        {courier.full_name} (Kurir {id + 1})
                                    </Text>
                                </Accordion.Control>

                                <ActionIcon
                                    size={40}
                                    radius="xl"
                                    variant="subtle"
                                    color="red"
                                    onClick={() => removeCourier(id)}
                                    disabled={form.data.couriers.length === 1}
                                >
                                    <IconTrash />
                                </ActionIcon>
                            </Center>

                            <Accordion.Panel>
                                <Stack>
                                    <Grid>
                                        <Grid.Col
                                            span={{
                                                base: 12,
                                                sm: 4,
                                            }}
                                        >
                                            <Title order={3}>Profil</Title>
                                        </Grid.Col>

                                        <Grid.Col
                                            span={{
                                                base: 12,
                                                sm: 8,
                                            }}
                                        >
                                            <Paper
                                                p={32}
                                                radius={20}
                                                withBorder
                                            >
                                                <Stack gap={24}>
                                                    <TextInput
                                                        label="Nama Lengkap"
                                                        placeholder="Masukkan nama"
                                                        variant="filled"
                                                        radius="xl"
                                                        leftSection={
                                                            <IconId size={16} />
                                                        }
                                                        value={
                                                            courier.full_name
                                                        }
                                                        styles={{
                                                            label: {
                                                                marginBottom: 8,
                                                            },
                                                        }}
                                                        onChange={(e) => {
                                                            const newCouriers =
                                                                [
                                                                    ...form.data
                                                                        .couriers,
                                                                ];
                                                            newCouriers[
                                                                id
                                                            ].full_name =
                                                                e.target.value;
                                                            form.setData(
                                                                "couriers",
                                                                newCouriers
                                                            );

                                                            if (
                                                                !e.target.value
                                                            ) {
                                                                form.setError(
                                                                    `couriers.${id}.full_name`,
                                                                    "Nama lengkap tidak boleh kosong."
                                                                );
                                                            } else {
                                                                form.clearErrors(
                                                                    `couriers.${id}.full_name`
                                                                );
                                                            }
                                                        }}
                                                        error={
                                                            form.errors[
                                                                `couriers.${id}.full_name`
                                                            ]
                                                        }
                                                    />
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
                                            <Title order={3}>Akun</Title>
                                        </Grid.Col>

                                        <Grid.Col
                                            span={{
                                                base: 12,
                                                sm: 8,
                                            }}
                                        >
                                            <Paper
                                                p={32}
                                                radius={20}
                                                withBorder
                                            >
                                                <Stack gap={24}>
                                                    <TextInput
                                                        label="Username"
                                                        placeholder="Masukkan nama pengguna"
                                                        variant="filled"
                                                        radius="xl"
                                                        leftSection={
                                                            <IconAt size={16} />
                                                        }
                                                        onChange={(e) => {
                                                            const newUsername =
                                                                e.target.value.toLowerCase();
                                                            const newCouriers =
                                                                [
                                                                    ...form.data
                                                                        .couriers,
                                                                ];
                                                            newCouriers[
                                                                id
                                                            ].username =
                                                                newUsername;
                                                            form.setData(
                                                                "couriers",
                                                                newCouriers
                                                            );

                                                            const errorMessage =
                                                                !newUsername
                                                                    ? "Nama pengguna tidak boleh kosong."
                                                                    : props.users.some(
                                                                          (
                                                                              user
                                                                          ) =>
                                                                              user.username ===
                                                                              newUsername
                                                                      ) ||
                                                                      newCouriers.some(
                                                                          (
                                                                              courier,
                                                                              index
                                                                          ) =>
                                                                              courier.username ===
                                                                                  newUsername &&
                                                                              index !==
                                                                                  id
                                                                      )
                                                                    ? "Nama pengguna sudah digunakan."
                                                                    : "";

                                                            errorMessage
                                                                ? form.setError(
                                                                      `couriers.${id}.username`,
                                                                      errorMessage
                                                                  )
                                                                : form.clearErrors(
                                                                      `couriers.${id}.username`
                                                                  );
                                                        }}
                                                        styles={{
                                                            label: {
                                                                marginBottom: 8,
                                                            },
                                                        }}
                                                        value={courier.username}
                                                        error={
                                                            form.errors[
                                                                `couriers.${id}.username`
                                                            ]
                                                        }
                                                    />

                                                    <PasswordInput
                                                        label="Password"
                                                        placeholder="Masukkan kata sandi"
                                                        variant="filled"
                                                        radius="xl"
                                                        leftSection={
                                                            <IconPassword
                                                                size={16}
                                                            />
                                                        }
                                                        onChange={(e) => {
                                                            const newCouriers =
                                                                [
                                                                    ...form.data
                                                                        .couriers,
                                                                ];
                                                            newCouriers[
                                                                id
                                                            ].password =
                                                                e.target.value;
                                                            form.setData(
                                                                "couriers",
                                                                newCouriers
                                                            );

                                                            if (
                                                                !e.target.value
                                                            ) {
                                                                form.setError(
                                                                    `couriers.${id}.password`,
                                                                    "Kata sandi tidak boleh kosong."
                                                                );
                                                            } else {
                                                                form.clearErrors(
                                                                    `couriers.${id}.password`
                                                                );
                                                            }
                                                        }}
                                                        styles={{
                                                            description: {
                                                                marginBottom: 16,
                                                            },
                                                        }}
                                                        value={courier.password}
                                                        error={
                                                            form.errors[
                                                                `couriers.${id}.password`
                                                            ]
                                                        }
                                                    />
                                                </Stack>
                                            </Paper>
                                        </Grid.Col>
                                    </Grid>
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>

                <Box
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 16,
                    }}
                >
                    <Flex
                        direction={{
                            base: "column",
                            xs: "row",
                        }}
                        gap={16}
                        w={{
                            base: "100%",
                            xs: "auto",
                        }}
                    >
                        <Button
                            variant="outline"
                            leftSection={<IconPlus />}
                            radius="xl"
                            color="red.5"
                            onClick={addCourier}
                            disabled={form.processing}
                        >
                            Tambah Kurir Lainnya
                        </Button>
                        <Button
                            leftSection={<IconCornerDownLeft />}
                            rightSection={<Kbd>Enter</Kbd>}
                            loading={form.processing}
                            disabled={
                                form.hasErrors ||
                                form.data.couriers.some((courier) => {
                                    return (
                                        !courier.full_name ||
                                        !courier.username ||
                                        !courier.password
                                    );
                                })
                            }
                            radius="xl"
                            color="red.5"
                            type="submit"
                        >
                            Simpan
                        </Button>
                    </Flex>
                </Box>
            </form>
        </AppLayout>
    );
};

export default Create;

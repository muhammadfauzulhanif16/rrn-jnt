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

const Edit = (props) => {
    const form = useForm({
        full_name: props.courier.full_name || "",
    });

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
                        label: "Ubah",
                        route: "couriers.edit",
                    },
                ]}
            />

            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    !form.hasErrors &&
                        form.put(route("couriers.update", props.courier.id));
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
                            <Title order={3}>Profil</Title>
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
                                        placeholder="Masukkan nama"
                                        variant="filled"
                                        radius="xl"
                                        leftSection={<IconId size={16} />}
                                        value={form.data.full_name}
                                        styles={{
                                            label: {
                                                marginBottom: 8,
                                            },
                                        }}
                                        onChange={(e) => {
                                            form.setData(
                                                "full_name",
                                                e.target.value
                                            );

                                            if (!e.target.value) {
                                                form.setError(
                                                    "full_name",
                                                    "Nama lengkap tidak boleh kosong."
                                                );
                                            } else {
                                                form.clearErrors("full_name");
                                            }
                                        }}
                                        error={form.errors.full_name}
                                    />
                                </Stack>
                            </Paper>
                        </Grid.Col>
                    </Grid>
                </Stack>

                <Divider my={32} />

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
                            leftSection={<IconCornerDownLeft />}
                            rightSection={<Kbd>Enter</Kbd>}
                            loading={form.processing}
                            disabled={
                                form.hasErrors ||
                                props.courier.full_name === form.data.full_name
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

export default Edit;

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
    Select,
    FileButton,
    Tabs,
} from "@mantine/core";
import { DateTimePicker, DatesProvider } from "@mantine/dates";
import {
    IconCornerDownLeft,
    IconAt,
    IconHome,
    IconId,
    IconPassword,
    IconPhone,
    IconPlus,
    IconTrash,
    IconStatusChange,
    IconReceipt,
    IconFileSpreadsheet,
    IconPackage,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";

const Create = (props) => {
    console.log(props);

    const form = useForm({
        order: {
            status: props.order.status,
            items_count: props.order.items.length,
        },
        schedule: {
            taken_on: new Date(),
        },
    });

    console.log(form.data);

    return (
        <AppLayout title={props.title} auth={props.auth.user} meta={props.meta}>
            <PageHeader
                title={props.title}
                breadcrumbs={[
                    {
                        label: "Jadwal",
                        route: "schedule.index",
                    },
                    {
                        label: "Tambah",
                        route: "schedule.create",
                    },
                ]}
            />

            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    !form.hasErrors &&
                        form.post(route("schedule.store", props.order.id));
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
                            <Title order={3}>Pesanan</Title>
                        </Grid.Col>

                        <Grid.Col
                            span={{
                                base: 12,
                                sm: 8,
                            }}
                        >
                            <Paper p={32} radius={20} withBorder>
                                <Stack gap={24}>
                                    <Select
                                        disabled
                                        label="Status"
                                        placeholder="Pilih status"
                                        variant="filled"
                                        radius="xl"
                                        data={[form.data.order.status]}
                                        leftSection={
                                            <IconStatusChange size={16} />
                                        }
                                        styles={{
                                            label: {
                                                marginBottom: 8,
                                            },
                                        }}
                                    />

                                    <NumberInput
                                        disabled
                                        label="Jumlah Barang"
                                        leftSection={<IconPackage size={16} />}
                                        allowNegative={false}
                                        allowDecimal={false}
                                        variant="filled"
                                        radius="xl"
                                        styles={{
                                            label: {
                                                marginBottom: 8,
                                            },
                                        }}
                                        value={form.data.order.items_count}
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
                            <Title order={3}>Penjadwalan</Title>
                        </Grid.Col>

                        <Grid.Col
                            span={{
                                base: 12,
                                sm: 8,
                            }}
                        >
                            <Paper p={32} radius={20} withBorder>
                                <Stack gap={24}>
                                    <DateTimePicker
                                        styles={{
                                            label: {
                                                marginBottom: 8,
                                            },
                                            input: {
                                                borderRadius: 20,
                                                height: 40,
                                            }
                                        }}
                                        defaultValue={new Date()}
                                        label="Waktu Pengambilan"
                                        placeholder="Masukkan waktu pengambilan"
                                        onChange={(value) => {
                                            form.setData((prevForm) => {
                                                return {
                                                    ...prevForm,
                                                    schedule: {
                                                        ...prevForm.schedule,
                                                        taken_on: value,
                                                    },
                                                };
                                            });

                                            if (!value) {
                                                form.setError(
                                                    "schedule.taken_on",
                                                    "Waktu pengambilan tidak boleh kosong"
                                                );
                                            }
                                        }}
                                        error={form.errors.schedule?.taken_on}
                                    />

                                    {/*<Select*/}
                                    {/*    label="Kurir"*/}
                                    {/*    placeholder="Pilih kurir"*/}
                                    {/*    variant="filled"*/}
                                    {/*    radius="xl"*/}
                                    {/*    checkIconPosition="right"*/}
                                    {/*    withScrollArea={false}*/}
                                    {/*    value={form.data.schedule.courier_id}*/}
                                    {/*    data={props.couriers.map(*/}
                                    {/*        ({ id, full_name }) => ({*/}
                                    {/*            label: full_name,*/}
                                    {/*            value: id,*/}
                                    {/*        })*/}
                                    {/*    )}*/}
                                    {/*    leftSection={*/}
                                    {/*        <IconStatusChange size={16} />*/}
                                    {/*    }*/}
                                    {/*    styles={{*/}
                                    {/*        label: {*/}
                                    {/*            marginBottom: 8,*/}
                                    {/*        },*/}
                                    {/*        dropdown: {*/}
                                    {/*            padding: 4,*/}
                                    {/*            borderRadius: 20,*/}
                                    {/*        },*/}

                                    {/*        option: {*/}
                                    {/*            borderRadius: 20,*/}
                                    {/*        },*/}
                                    {/*    }}*/}
                                    {/*    onChange={(value) => {*/}
                                    {/*        form.setData((prevForm) => {*/}
                                    {/*            return {*/}
                                    {/*                ...prevForm,*/}
                                    {/*                schedule: {*/}
                                    {/*                    ...prevForm.schedule,*/}
                                    {/*                    courier_id: value,*/}
                                    {/*                },*/}
                                    {/*            };*/}
                                    {/*        });*/}

                                    {/*        if (!value) {*/}
                                    {/*            form.setError(*/}
                                    {/*                "schedule.courier_id",*/}
                                    {/*                "Kurir tidak boleh kosong"*/}
                                    {/*            );*/}
                                    {/*        }*/}
                                    {/*    }}*/}
                                    {/*    error={form.errors.schedule?.courier_id}*/}
                                    {/*/>*/}
                                </Stack>
                            </Paper>
                        </Grid.Col>
                    </Grid>
                </Stack>

                <Divider my={32} />

                <Flex justify="flex-end">
                    <Button
                        leftSection={<IconCornerDownLeft />}
                        rightSection={<Kbd>Enter</Kbd>}
                        loading={form.processing}
                        disabled={form.hasErrors}
                        radius="xl"
                        color="red.5"
                        type="submit"
                    >
                        Simpan
                    </Button>
                </Flex>
            </form>
        </AppLayout>
    );
};

export default Create;

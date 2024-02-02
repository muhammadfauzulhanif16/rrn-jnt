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
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

const Edit = (props) => {
    console.log(props);
    const [file, setFile] = useState(null);
    const resetRef = useRef(null);

    const form = useForm({
        status: props.order.status || "Belum Siap Dikirim",
        items: props.order.items || [
            {
                receipt_number: "",
            },
        ],
        file: file,
    });

    useEffect(() => {
        if (file) {
            form.setData("file", file);
        }
    }, [file]);
  
  console.log(form.data);

    const addReceiptNumber = () => {
        form.setData("items", [...form.data.items, { receipt_number: "" }]);
    };

    const removeReceiptNumber = (index) => {
        const newItems = [...form.data.items];
        newItems.splice(index, 1);
        form.setData("items", newItems);
    };

    return (
        <AppLayout title={props.title} auth={props.auth.user} meta={props.meta}>
            <PageHeader
                title={props.title}
                breadcrumbs={[
                    {
                        label: "Pesanan",
                        route: "orders.index",
                    },
                    {
                        label: "Ubah",
                        route: "orders.edit",
                    },
                ]}
            />

            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    !form.hasErrors &&
                        form.put(route("orders.update", props.order.id));
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
                                        label="Status"
                                        placeholder="Pilih status"
                                        variant="filled"
                                        radius="xl"
                                        data={[
                                            "Belum Siap Dikirim",
                                            "Siap Dikirim",
                                        ]}
                                        checkIconPosition="right"
                                        allowDeselect={false}
                                        leftSection={
                                            <IconStatusChange size={16} />
                                        }
                                        withScrollArea={false}
                                        value={form.data.status}
                                        styles={{
                                            label: {
                                                marginBottom: 8,
                                            },
                                            dropdown: {
                                                padding: 4,
                                                borderRadius: 20,
                                            },

                                            option: {
                                                borderRadius: 20,
                                            },
                                        }}
                                        onChange={(value) => {
                                            form.setData("status", value);
                                        }}
                                        error={form.errors.status}
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
                            <Title order={3}>Barang</Title>
                        </Grid.Col>

                        <Grid.Col
                            span={{
                                base: 12,
                                sm: 8,
                            }}
                        >
                            <Paper p={32} radius={20} withBorder>
                                <Tabs
                                    color="red.5"
                                    radius="xs"
                                    defaultValue="manual"
                                    styles={{
                                        tab: {
                                            padding: 16,
                                        },
                                        panel: {
                                            marginTop: 32,
                                        },
                                    }}
                                >
                                    <Tabs.List grow>
                                        <Tabs.Tab
                                            disabled={file}
                                            value="manual"
                                        >
                                            Manual
                                        </Tabs.Tab>
                                        <Tabs.Tab
                                            disabled={form.data.items.some(
                                                (item) => {
                                                    return item.receipt_number;
                                                }
                                            )}
                                            value="automatic"
                                        >
                                            Otomatis
                                        </Tabs.Tab>
                                    </Tabs.List>

                                    <Tabs.Panel value="manual">
                                        <Text fw={500} mb={8} size="sm">
                                            Nomor Resi
                                        </Text>

                                        <Stack gap={24}>
                                            {form.data.items.map((item, id) => (
                                                <Center key={id}>
                                                    <TextInput
                                                        w="100%"
                                                        mr={16}
                                                        placeholder={`Masukkan nomor resi ${
                                                            id + 1
                                                        }`}
                                                        variant="filled"
                                                        radius="xl"
                                                        leftSection={
                                                            <IconReceipt
                                                                size={16}
                                                            />
                                                        }
                                                        value={
                                                            item.receipt_number
                                                        }
                                                        onChange={(e) => {
                                                            const newReceiptNumber =
                                                                e.target.value;
                                                            const newItems = [
                                                                ...form.data
                                                                    .items,
                                                            ];
                                                            newItems[
                                                                id
                                                            ].receipt_number =
                                                                newReceiptNumber;
                                                            form.setData(
                                                                "items",
                                                                newItems
                                                            );

                                                            const errorMessage =
                                                                !newReceiptNumber
                                                                    ? "Nomor resi tidak boleh kosong"
                                                                    : "";

                                                            errorMessage
                                                                ? form.setError(
                                                                      `items.${id}.receipt_number`,
                                                                      errorMessage
                                                                  )
                                                                : form.clearErrors(
                                                                      `items.${id}.receipt_number`
                                                                  );
                                                        }}
                                                        styles={{
                                                            label: {
                                                                marginBottom: 8,
                                                            },
                                                        }}
                                                    />

                                                    <ActionIcon
                                                        size={40}
                                                        radius="xl"
                                                        variant="subtle"
                                                        color="red"
                                                        onClick={() =>
                                                            removeReceiptNumber(
                                                                id
                                                            )
                                                        }
                                                        disabled={
                                                            form.data.items
                                                                .length === 1
                                                        }
                                                    >
                                                        <IconTrash />
                                                    </ActionIcon>
                                                </Center>
                                            ))}
                                        </Stack>

                                        <Divider my={32} />

                                        <Flex justify="flex-end">
                                            <Button
                                                variant="outline"
                                                leftSection={<IconPlus />}
                                                radius="xl"
                                                color="red.5"
                                                onClick={addReceiptNumber}
                                                disabled={form.processing}
                                            >
                                                Tambah Nomor Resi Lainnya
                                            </Button>
                                        </Flex>
                                    </Tabs.Panel>

                                    <Tabs.Panel value="automatic">
                                        <Group justify="center">
                                            <FileButton
                                                leftSection={
                                                    <IconFileSpreadsheet />
                                                }
                                                color="green"
                                                variant="outline"
                                                resetRef={resetRef}
                                                radius="xl"
                                                onChange={setFile}
                                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                            >
                                                {(props) => (
                                                    <Button {...props}>
                                                        Impor Excel/CSV
                                                    </Button>
                                                )}
                                            </FileButton>

                                            <ActionIcon
                                                size={40}
                                                radius="xl"
                                                variant="subtle"
                                                color="red"
                                                onClick={() => {
                                                    setFile(null);
                                                    resetRef.current?.();
                                                }}
                                                disabled={!file}
                                            >
                                                <IconTrash />
                                            </ActionIcon>
                                        </Group>

                                        {file && (
                                            <Text size="sm" ta="center" mt="sm">
                                                Picked file: {file.name}
                                            </Text>
                                        )}
                                    </Tabs.Panel>
                                </Tabs>
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
                        // disabled={form.hasErrors}
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

export default Edit;

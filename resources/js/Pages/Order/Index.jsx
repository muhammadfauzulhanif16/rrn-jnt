import { DataTable } from "@/Components/DataTable";
import { PageHeader } from "@/Components/PageHeader";
import { AppLayout } from "@/Layouts/AppLayout";
import { DateTimeFormatter } from "@/Utilities/DateTimeFormatter";
import { router } from "@inertiajs/react";
import {
    Button,
    Group,
    ActionIcon,
    Box,
    Table,
    Text,
    Pill,
    Menu,
    List,
    Grid,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
    IconCalendar,
    IconDots,
    IconEdit,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import { useMemo } from "react";

const Index = (props) => {
    console.log(props);
    const role = props.auth.user.role;
    const columns = useMemo(() => {
        const createColumn = (id, header, accessor) => ({
            id,
            header,
            accessorFn: (row) => (
                <Text style={{ whiteSpace: "nowrap" }}>{accessor(row)}</Text>
            ),
        });

        let baseColumns = [
            createColumn(
                "items_count",
                "Jumlah Barang",
                (row) => row.items_count
            ),
            createColumn("status", "Status", (row) => (
                <Pill
                    bg={row.status.includes("Belum") ? "red" : "green"}
                    c="white"
                >
                    {row.status}
                </Pill>
            )),
            createColumn("created_at", "Dibuat Pada", (row) => row.created_at),
            createColumn(
                "updated_at",
                "Diperbarui Pada",
                (row) => row.updated_at
            ),
        ];

        if (role === "admin") {
            baseColumns.unshift(
                createColumn("customer", "Nama Lengkap", (row) => row.customer)
            );
        }

        return baseColumns;
    }, [role]);

    return (
        <AppLayout title={props.title} auth={props.auth.user} meta={props.meta}>
            <PageHeader
                title={props.title}
                actions={
                    props.auth.user.role === "pelanggan" && (
                        <>
                            <Button
                                disabled={
                                    !props.auth.user.phone_number ||
                                    !props.auth.user.address
                                }
                                radius="xl"
                                color="red.5"
                                h={40}
                                leftSection={<IconPlus />}
                                display={{
                                    base: "none",
                                    xs: "block",
                                }}
                                onClick={() =>
                                    router.get(route("orders.create"))
                                }
                            >
                                Tambah
                            </Button>
                            <ActionIcon
                                disabled={
                                    !props.auth.user.phone_number ||
                                    !props.auth.user.address
                                }
                                size={40}
                                color="red.5"
                                radius="xl"
                                display={{
                                    base: "block",
                                    xs: "none",
                                }}
                                onClick={() =>
                                    router.get(route("orders.create"))
                                }
                            >
                                <IconPlus />
                            </ActionIcon>
                        </>
                    )
                }
            />

            <DataTable
                columns={columns}
                data={props.orders}
                renderDetailPanel={({ row }) => (
                    <List type="ordered">
                        <Text mb={16} fw={500}>
                            Nomor Resi
                        </Text>
                        {row.original.items.map((item) => (
                            <List.Item key={item.receipt_number}>
                                {item.receipt_number}
                            </List.Item>
                        ))}
                    </List>
                )}
                renderRowActions={
                    props.auth.user.role === "admin"
                        ? ({ row }) => (
                              <Menu
                                  position="bottom-start"
                                  styles={{
                                      dropdown: {
                                          borderRadius: 20,
                                      },
                                      item: {
                                          borderRadius: 20,
                                      },
                                  }}
                              >
                                  <Menu.Target>
                                      <ActionIcon
                                          size={40}
                                          radius="xl"
                                          variant="subtle"
                                          color="gray.9"
                                          c="gray.9"
                                      >
                                          <IconDots />
                                      </ActionIcon>
                                  </Menu.Target>

                                  <Menu.Dropdown>
                                      <Menu.Item
                                          leftSection={<IconCalendar />}
                                          onClick={() =>
                                              router.get(
                                                  route(
                                                      "schedule.create",
                                                      row.original.id
                                                  )
                                              )
                                          }
                                      >
                                          Jadwalkan
                                      </Menu.Item>
                                  </Menu.Dropdown>
                              </Menu>
                          )
                        : ({ row }) => (
                              <Menu
                                  position="bottom-start"
                                  styles={{
                                      dropdown: {
                                          borderRadius: 20,
                                      },
                                      item: {
                                          borderRadius: 20,
                                      },
                                  }}
                              >
                                  <Menu.Target>
                                      <ActionIcon
                                          size={40}
                                          radius="xl"
                                          variant="subtle"
                                          color="gray.9"
                                          c="gray.9"
                                      >
                                          <IconDots />
                                      </ActionIcon>
                                  </Menu.Target>

                                  <Menu.Dropdown>
                                      <Menu.Item
                                          leftSection={<IconEdit />}
                                          onClick={() =>
                                              router.get(
                                                  route(
                                                      "orders.edit",
                                                      row.original.id
                                                  )
                                              )
                                          }
                                      >
                                          Ubah
                                      </Menu.Item>
                                      <Menu.Item
                                          leftSection={<IconTrash />}
                                          onClick={() =>
                                              modals.openConfirmModal({
                                                  styles: {
                                                      content: {
                                                          padding: 32,
                                                          borderRadius: 20,
                                                      },
                                                      header: {
                                                          padding: 0,
                                                          backgroundColor:
                                                              "transparent",
                                                      },
                                                      body: {
                                                          padding: 0,
                                                      },
                                                  },
                                                  children:
                                                      "Apakah anda yakin ingin menghapus pesanan ini?",
                                                  title: (
                                                      <Text fw={500}>
                                                          Hapus Pesanan
                                                      </Text>
                                                  ),
                                                  centered: true,
                                                  withCloseButton: false,

                                                  labels: {
                                                      confirm: "Hapus",
                                                      cancel: "Batal",
                                                  },
                                                  confirmProps: {
                                                      color: "red",
                                                  },
                                                  onConfirm: () =>
                                                      router.delete(
                                                          route(
                                                              "orders.destroy",
                                                              row.original.id
                                                          )
                                                      ),
                                              })
                                          }
                                      >
                                          Hapus
                                      </Menu.Item>
                                  </Menu.Dropdown>
                              </Menu>
                          )
                }
            />
        </AppLayout>
    );
};

export default Index;

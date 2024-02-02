import { router } from "@inertiajs/react";
import {
    Button,
    Group,
    NumberFormatter,
    SimpleGrid,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from "@mantine/core";

export const Stats = ({ data }) => {
    return (
        <SimpleGrid
            cols={{
                base: 1,
                sm: 2,
                lg: data.length,
            }}
        >
            {data.map(({ color, icon, label, value, route :r}, id) => (
                <Button
                    h={120}
                    color="gray"
                    radius={20}
                    variant="subtle"
                    key={id}
                    onClick={() => router.get(route(r))}
                    display="flex"
                    px={40}
                >
                    <Group gap={20}>
                        <ThemeIcon
                            size={40}
                            variant="light"
                            radius="xl"
                            color={color}
                        >
                            {icon}
                        </ThemeIcon>

                        <Stack gap={8} align="flex-start">
                            <Text
                                c="gray.7"
                                fw={500}
                                style={{
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Total {label}
                            </Text>
                            <Title order={2} c="gray.8">
                                <NumberFormatter
                                    value={value}
                                    thousandSeparator
                                />
                            </Title>
                        </Stack>
                    </Group>
                </Button>
            ))}
        </SimpleGrid>
    );
};

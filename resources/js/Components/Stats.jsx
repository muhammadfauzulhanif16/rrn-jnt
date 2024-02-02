import {
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
            {data.map(({ color, icon, label, value }, id) => (
                <Group
                    key={id}
                    p={32}
                    style={{
                        flexGrow: 1,
                    }}
                >
                    <ThemeIcon
                        size={40}
                        variant="light"
                        radius="xl"
                        color={color}
                    >
                        {icon}
                    </ThemeIcon>

                    <Stack gap={4}>
                        <Text
                            c="gray.7"
                            fw={500}
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            Total {label}
                        </Text>
                        <Title order={1}>
                            <NumberFormatter value={value} thousandSeparator />
                        </Title>
                    </Stack>
                </Group>
            ))}
        </SimpleGrid>
    );
};

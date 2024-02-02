import { Divider, Group, Title } from "@mantine/core";
import { Breadcrumbs } from "./Breadcrumbs";

export const PageHeader = (props) => {
    return (
        <>
            {props.breadcrumbs && <Breadcrumbs items={props.breadcrumbs} />}

            <Group justify="space-between">
                <Title order={1} c="gray.8">
                    {props.title}
                </Title>

                {props.actions}
            </Group>

            <Divider my={32} />
        </>
    );
};

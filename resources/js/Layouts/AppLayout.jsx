import { Header } from "@/Components/Header";
import { Head } from "@inertiajs/react";
import { Alert, Box, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

export const AppLayout = (props) => {
    useEffect(() => {
        if (props.meta) {
            notifications.show({
                title: props.meta.title,
                color: props.meta.status ? "green" : "red",
                radius: 16,
            });
        }
    }, [props.meta]);

    return (
        <Box
            bg="gray.2"
            mih="100vh"
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Head>
                <title>{props.title}</title>
                <link
                    rel="ico"
                    href="https://upload.wikimedia.org/wikipedia/commons/0/01/J%26T_Express_logo.svg"
                />
            </Head>

            {props.auth && <Header auth={props.auth} title={props.title} />}

            {/* <Alert
                variant="light"
                color="red"
                withCloseButton
                title="Alert title"
                // icon={icon}
                onClick={() => d.toggle()}
            >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
                officiis, quae tempore necessitatibus placeat saepe.
            </Alert> */}

            <Box
                px={32}
                py={64}
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {props.children}
            </Box>
        </Box>
    );
};

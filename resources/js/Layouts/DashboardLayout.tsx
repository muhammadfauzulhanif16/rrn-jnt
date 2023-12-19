import { Header } from "@/Components/Header";
import { NavBar } from "@/Components/NavBar";
import { PageHeadings } from "@/Components/PageHeadings";
import { Table } from "@/Components/Table";
import { Head } from "@inertiajs/react";
import { FC, ReactNode } from "react";
import Logo from "../images/J&T_Express_logo.svg";

interface DashboardLayoutProps {
    title: string;
    children?: any;
    auth: any;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({
    title,
    children,
    auth,
}: DashboardLayoutProps) => {
    return (
        <div className="h-screen flex flex-col">
            <Head>
                <title>{title}</title>
                <link rel="icon" href={Logo} />
            </Head>

            <Header auth={auth} />

            <div className="grow flex-col-reverse flex md:flex-row">
                <NavBar title={title} auth={auth} />

                <div className="flex grow flex-col p-8 gap-8 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

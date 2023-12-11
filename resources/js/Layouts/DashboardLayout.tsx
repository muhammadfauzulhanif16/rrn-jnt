import { Header } from "@/Components/Header";
import { NavBar } from "@/Components/NavBar";
import { PageHeadings } from "@/Components/PageHeadings";
import { Table } from "@/Components/Table";
import { Head } from "@inertiajs/react";
import { FC, ReactNode } from "react";

interface DashboardLayoutProps {
    title: string;
    children?: any;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({
    title,
    children,
}: DashboardLayoutProps) => {
    return (
        <div className="h-screen flex flex-col">
            <Head title={title} />

            <Header />

            <div className="grow flex-col-reverse flex md:flex-row">
                <NavBar title={title} />

                <div className="flex grow flex-col p-8 gap-8 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

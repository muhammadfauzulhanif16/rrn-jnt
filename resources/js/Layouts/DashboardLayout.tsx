import { Header } from "@/Components/Header";
import { NavBar } from "@/Components/NavBar";
import { PageHeadings } from "@/Components/PageHeadings";
import { Table } from "@/Components/Table";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Head } from "@inertiajs/react";
import { FC } from "react";

interface DashboardLayoutProps {
    title: string;
    description: string;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({
    title,
    description,
}: DashboardLayoutProps) => {
    return (
        <div className="h-screen flex flex-col">
            <Head title={title} />

            <Header />

            <div className="grow flex-col-reverse flex md:flex-row">
                <NavBar title={title} />

                <div className="flex grow flex-col p-8 gap-4">
                    <PageHeadings title={title} description={description} />

                    {/* <ScrollArea className="grow rounded-md h-2"> */}
                    <Table />
                    {/* </ScrollArea> */}
                </div>
            </div>
        </div>
    );
};

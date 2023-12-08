import { Button } from "./ui/button";
import { Calendar, Package, Store, Users } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import { Link } from "@inertiajs/react";
import { FC } from "react";

interface NavBarProps {
    title: string;
}

export const NavBar: FC<NavBarProps> = ({ title }: NavBarProps) => {
    interface navigationState {
        label: string;
        icon: any;
        link: string;
    }

    const navigations: Array<navigationState> = [
        {
            label: "Penjadwalan",
            icon: <Calendar className="h-4 w-4" />,
            link: "schedule",
        },
        {
            label: "Pesanan",
            icon: <Package className="h-4 w-4" />,
            link: "orders",
        },
        {
            label: "Penjual",
            icon: <Store className="h-4 w-4" />,
            link: "sellers",
        },
        {
            label: "Kurir",
            icon: <Users className="h-4 w-4" />,
            link: "couriers",
        },
    ];

    return (
        <div className="md:h-full flex-none flex md:flex-col justify-center p-4 gap-4 md:border-r border-t md:border-t-0">
            {navigations.map(
                ({ label, icon, link }: navigationState, id: number) => (
                    <TooltipProvider key={id}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={route(link)}>
                                    <Button
                                        variant={
                                            label === title
                                                ? "default"
                                                : "outline"
                                        }
                                        size="icon"
                                    >
                                        {icon}
                                    </Button>
                                </Link>
                            </TooltipTrigger>

                            <TooltipContent side="right">
                                <p>{label}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            )}
        </div>
    );
};

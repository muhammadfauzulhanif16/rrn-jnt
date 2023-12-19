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
import { cn } from "@/lib/utils";

interface NavBarProps {
    title: string;
    auth: any;
}

export const NavBar: FC<NavBarProps> = ({ title, auth }: NavBarProps) => {
    interface navigationState {
        label: string;
        icon: any;
        link: string;
    }

    let navigations: Array<navigationState> = [
        {
            label: "Penjadwalan",
            icon: <Calendar className="h-4 w-4" />,
            link: "schedule",
        },
        {
            label: "Pesanan",
            icon: <Package className="h-4 w-4" />,
            link: "orders.index",
        },
        {
            label: "Penjual",
            icon: <Store className="h-4 w-4" />,
            link: "sellers.index",
        },
        {
            label: "Kurir",
            icon: <Users className="h-4 w-4" />,
            link: "couriers.index",
        },
    ];

    if (auth.user.role === "courier") {
        navigations = navigations.filter(item => item.label === "Penjadwalan" || item.label === "Pesanan");
    }

    return (
        <div className={cn("md:h-full flex-none grid md:flex-col p-4 gap-4 md:border-r border-t md:border-t-0", auth.user.role === "admin" ? "grid-cols-4 md:grid-row-4 md:grid-cols-1" : "grid-cols-2 md:grid-row-2 md:grid-cols-1")}>
            {navigations.map(
                ({ label, icon, link }: navigationState, id: number) => (
                    <TooltipProvider key={id}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={route(link)}>
                                    <Button
                                        variant={
                                            title.includes(label.slice(0, -1))
                                                ? "default"
                                                : "outline"
                                        }
                                        className="w-full h-full"
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

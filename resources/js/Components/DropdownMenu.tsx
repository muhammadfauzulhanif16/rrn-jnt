import { FC } from "react";
import {
    DropdownMenu as ShadcnDropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link } from "@inertiajs/react";

interface DropdownMenuProps {
    auth: any;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
    auth,
}: DropdownMenuProps) => {
    return (
        <ShadcnDropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
                {auth.user.full_name} <ChevronDown className="h-4 w-4 ml-2" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {/* <Link
                    href={route("profile.edit", auth.user)}
                    className="w-full cursor-pointer"
                >
                    <DropdownMenuItem>Profil</DropdownMenuItem>
                </Link> */}

                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="w-full"
                >
                    <DropdownMenuItem className="cursor-pointer">Keluar</DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </ShadcnDropdownMenu>
    );
};

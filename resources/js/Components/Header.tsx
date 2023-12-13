import { DropdownMenu } from "./DropdownMenu";
import Logo from "../images/J&T_Express_logo.svg";
import { FC } from "react";

interface HeaderProps {
    auth: any;
}

export const Header: FC<HeaderProps> = ({ auth }: HeaderProps) => {
    return (
        <div className="flex items-center justify-between py-4 border-b container flex-none">
            <img src={Logo} alt="" width={120} />

            <DropdownMenu auth={auth} />
        </div>
    );
};

import { FC, useState } from "react";
import {
    Select as ShadcnSelect,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

interface SelectProps {
    placeholder: string;
    label: string;
    data: any;
    setData: any;
}

export const Select: FC<SelectProps> = ({
    placeholder,
    label,
    data,
    setData,
}: SelectProps) => {
    return (
        <ShadcnSelect onValueChange={(value) => setData(placeholder, value)}>
            <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder={`Select a ${placeholder}`} />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {data.map((item: any) => {
                        return (
                            <SelectItem value={item.value} key={item.value}>
                                {item.label}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </ShadcnSelect>
    );
};

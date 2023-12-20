import { FC } from "react";
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
    onChange: any;
    value: string;
    disabled?: boolean;
}

export const Select: FC<SelectProps> = ({
    placeholder,
    label,
    data,
    onChange,
    value,
    disabled
}: SelectProps) => {
    return (
        <ShadcnSelect
            disabled={disabled}
            value={value}
            // open={true}
            onValueChange={onChange}
            required={!value}
        >
            <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {data.map((item: any, id: number) => {
                        return (
                            <SelectItem
                                value={item.value}
                                key={id}
                            >
                                {item.label}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </ShadcnSelect>
    );
};

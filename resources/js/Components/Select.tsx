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
import { Check } from "lucide-react";

interface SelectProps {
    placeholder: string;
    label: string;
    data: any;
    setData: any;
    name: string;
    value: string;
}

export const Select: FC<SelectProps> = ({
    placeholder,
    label,
    data,
    setData,
    name,
    value,
}: SelectProps) => {
    return (
        <ShadcnSelect
            // open={true}
            onValueChange={(value) => setData(name, value)}
            // required={!value}
        >
            <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder={value ? value : placeholder} />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {data.map((item: any, id: number) => {
                        return (
                            <SelectItem
                                value={item.value}
                                key={id}
                                data-state={
                                    item.value === value
                                        ? "checked"
                                        : "unchecked"
                                }
                                itemProp="item"
                            >
                                {/* <Check /> */}
                                {item.label}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </ShadcnSelect>
    );
};

import { FC } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface PageHeadingsProps {
    title: string;
    description: string;
}

export const PageHeadings: FC<PageHeadingsProps> = ({
    title,
    description,
}: PageHeadingsProps) => {
    return (
        <div className="flex flex-none justify-between">
            <div className="w-full">
                <div className="flex mb-4 justify-between">
                    <h1 className="text-3xl font-semibold">{title}</h1>

                    <div className="hidden sm:block">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah {title}
                        </Button>
                    </div>

                    <div className="sm:hidden">
                        <Button size="icon">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <p className="text-gray-400">{description}</p>
            </div>
        </div>
    );
};

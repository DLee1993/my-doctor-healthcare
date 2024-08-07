import Image from "next/image";
import { Button } from "./ui/button";

type ButtonProps = {
    isLoading: boolean;
    className?: string;
    children: React.ReactNode;
};
const CustomSubmitButton = ({ isLoading, className, children }: ButtonProps) => {
    return (
        <Button
            type="submit"
            disabled={isLoading}
            className={className ?? "shad-primary-btn w-full"}
        >
            {isLoading ? (
                <div className="flex items-center gap-4">
                    <Image
                        src="/assets/icons/loader.svg"
                        alt="loader"
                        width={24}
                        height={24}
                        className="w-6 h-6 animate-spin"
                    />
                </div>
            ) : (
                children
            )}
        </Button>
    );
};
export default CustomSubmitButton;

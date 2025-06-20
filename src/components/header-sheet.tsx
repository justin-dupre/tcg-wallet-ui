import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

// react component
export default function HeaderSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full md:hidden"
                >
                    <MenuIcon
                        className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
                <div className="grid gap-4 p-4">
                    <a
                        href="#"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        About
                    </a>
                    <a
                        href="#"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        Services
                    </a>
                    <a
                        href="#"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        Contact
                    </a>
                </div>
            </SheetContent>
        </Sheet>
    )
}
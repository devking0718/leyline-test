import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

function Header() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 540 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex gap-2 lg:mb-0 lg:mt-0 flex-row lg:items-center lg:gap-6">
            <NavLink to="/a" className="flex items-center">
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    Part A
                </Typography>
            </NavLink>
            <NavLink to="/b" className="flex items-center">
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    Part B
                </Typography>
            </NavLink>
        </ul>
    );

    return (
        <Navbar className="sticky z-10 h-max max-w-full px-4 py-2 lg:px-8 lg:py-4 rounded-none">
            <div className="flex items-center justify-between text-blue-gray-900">
                <NavLink to="/" className="flex flex-row items-center">
                    <img
                        alt="nature"
                        className="h-8"
                        src="https://dev.leylinepro.com/_next/image?url=%2Fimg%2FL-logo-3.png&w=32&q=75"
                    />
                    <Typography
                        className="ml-3 cursor-pointer py-1.5 font-medium text-2xl"
                    >
                        LeyLine
                    </Typography>
                </NavLink>
                <div className="flex items-center gap-4">
                    <div className="mr-4 flex flex-row">{navList}</div>
                </div>
            </div>
        </Navbar>
    )
}

export default Header

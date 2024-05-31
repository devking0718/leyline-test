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
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
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
                    <div className="mr-4 hidden lg:block">{navList}</div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>
            <MobileNav open={openNav}>
                {navList}
            </MobileNav>
        </Navbar>
    )
}

export default Header

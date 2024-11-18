

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className="flex items-center justify-between p-4">
            <Link href="/">
                <Image
                    src="/assets/images/tab-illo.png"
                    alt="Logo"
                    width={40}
                    height={40}
                />
            </Link>
            <nav>
                <ul className="flex gap-4">
                    <li>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
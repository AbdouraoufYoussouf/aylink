"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export function HeaderLink() {
    const pathname = usePathname()

    const links = [
        { href: "/dashboard/link", label: "Profile" },
        { href: "/dashboard/link/block", label: "Blocs" }
    ]

    return (
        <header className=" z-30 w-full border-b ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <nav className="flex items-center space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                                    pathname === link.href
                                        ? "text-yellow-400"
                                        : "text-yellow-400/70 hover:text-yellow-400"
                                }`}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-0.5 w-full bg-white"
                                        layoutId="underline"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}


'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition duration-200 ${
        isActive
          ? "text-blue-600 border-b-2 border-blue-600"
          : "hover:text-blue-500"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;

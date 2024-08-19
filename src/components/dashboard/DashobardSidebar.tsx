"use client";
import { usePathname } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdArticle, MdDashboard } from "react-icons/md";
import SidebarItem from "./SidebarItem";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type DashboardSidebarProps = {
  links: {
    label: string;
    href: string;
  }[];
};

const icons = [MdDashboard, FaUserAlt, MdArticle, IoMdSettings];

export default function DashboardSidebar({ links }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  return (
    <aside className="bg-primary-foreground flex-1 max-w-[200px] py-4 md:py-10 border-r relative">
      <nav>
        <Button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="absolute z-30 left-4 md:hidden"
        >
          Menu
        </Button>
        <ul
          className={`max-md:absolute top-0 left-0 max-md:h-full max-md:w-screen max-md:pt-16 bg-primary-foreground z-20 transition-transform  ${
            !showMobileMenu && "max-md:-translate-x-full"
          }`}
        >
          {links.map((link, index) => (
            <SidebarItem
              key={link.href}
              {...link}
              Icon={icons[index]}
              isActive={pathname.includes(link.href)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

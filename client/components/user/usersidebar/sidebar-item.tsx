import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "../layout/layout-context";
import clsx from "clsx";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink
      href={href}
      className="text-default-400 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          isActive
            ? "bg-warning [&_svg_path]:fill-white text-white"
            : "hover:bg-default-100",
          "flex gap-2 w-full min-h-[35px] h-full  items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
        onClick={handleClick}
      >
        {icon}
        <span className="text-default-90 text-xs">{title}</span>
      </div>
    </NextLink>
  );
};

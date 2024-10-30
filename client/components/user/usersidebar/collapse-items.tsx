import React, { useState } from "react";
import { ChevronUpIcon } from "../icons/sidebar/chevron-up-icon";
import { Accordion, AccordionItem } from "@nextui-org/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  title: string;
  items: { title: string; href: string }[];
  activePage: string;
}

export const CollapseItems = ({ icon, items, title, activePage }: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="flex gap-4 h-full items-center cursor-pointer">
      <Accordion className="px-0 ">
      <AccordionItem
        classNames={{
          base: clsx(
            activePage.includes("/admin/request") && "bg-warning text-white [&_svg_path]:fill-white border rounded-lg "
          ),
          indicator: "data-[open=true]:-rotate-180",
          trigger: "py-0 min-h-[44px] rounded-xl active:scale-[0.98] transition-transform px-3.5",
          title: "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
        }}
          aria-label="Accordion 1"
          title={
          <div className={clsx("flex flex-row gap-2", activePage.includes("/admin/request") && "text-white")}>
              <span >{icon}</span>
              <span>{title}</span>
          </div>
          }
        >
          <div className="pl-12">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={clsx(
                  "w-full flex text-default-500 hover:text-dark transition-colors cursor-pointer",
                  pathname === item.href && "font-bold text-white",
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
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
      <div className="flex gap-4 h-full items-center cursor-pointer ">
        <Accordion className="px-0 ">
        <AccordionItem
          classNames={{
            base: clsx(
              activePage.includes("/admin/request") && "bg-warning text-white [&_svg_path]:fill-white border rounded-lg "
            ),
            indicator: "data-[open=true]:-rotate-90",
            trigger: "py-0 min-h-[35px] rounded-xl active:scale-[0.98] transition-transform px-3.5",
            title: "px-0 flex text-default-90 gap-2 h-full items-center cursor-pointer",
          }}
            aria-label="Accordion 1"
            title={
            <div className={clsx("flex flex-row gap-2", activePage.includes("/admin/request") && "text-white")}>
                <span >{icon}</span>
                <span className={clsx("text-default-400 text-xs", activePage.includes("/admin/request") && "text-white")}>{title}</span>
      
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
                 <span className="text-default-90 my-1 text-xs">{item.title}</span>
                </Link>
              ))}
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };
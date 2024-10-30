import React from "react";
import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { RequestIcon } from "../icons/sidebar/request-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { LocationIcon } from "../icons/sidebar/location-icon";
import { CategoryIcon } from "../icons/sidebar/category-icon";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
      <div className={Sidebar.Header()}>
        <CompaniesDropdown />
        
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className={Sidebar.Body()}>
          <SidebarItem
            title="Dashboard"
            icon={<HomeIcon />}
            isActive={pathname === "/storekeeper"}
            href="/storekeeper"
          />

          <SidebarItem
            isActive={pathname === "/storekeeper/items"}
            title="Items"
            icon={<AccountsIcon />}
            href="/storekeeper/items"
          />

          <SidebarItem
            isActive={pathname === "/storekeeper/category"}
            title="Category"
            icon={<CategoryIcon />}
            href="/storekeeper/category"
          />

          <SidebarItem
            isActive={pathname === "/storekeeper/vendor"}
            title="Vendor"
            icon={<ProductsIcon />}
            href="/storekeeper/vendor"
          />

          <SidebarItem
            isActive={pathname === "/storekeeper/location"}
            title="Location"
            icon={<LocationIcon />}
            href="/storekeeper/location"
          />

          <CollapseItems
            icon={<RequestIcon />}
            items={[
              { title: "User Request", href: "/storekeeper/request/user-request" },
              { title: "Loan Request", href: "/storekeeper/request/loan-request" },
            ]}
            title="Request"
            activePage={pathname}
          />

        </div>
        <div className={Sidebar.Footer()}>
        </div>
        </div>
      </div>
    </aside>
  );
}; 
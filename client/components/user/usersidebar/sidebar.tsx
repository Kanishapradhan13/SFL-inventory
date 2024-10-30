import React from "react";
import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { RequestIcon } from "../icons/sidebar/balance-icon"
import { SidebarItem } from "./sidebar-item";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { FavouritesIcon } from "../icons/sidebar/favourites";

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
              title="Items"
              icon={<HomeIcon />}
              isActive={pathname === "/user"}
              href="/user"
            />

              <SidebarItem
                isActive={pathname === "/user/favourites"}
                title="Favourites"
                icon={<FavouritesIcon />}
                href="/user/favourites"
              />

              <SidebarItem
                isActive={pathname === "/user/request"}
                title="Request"
                icon={<RequestIcon />}
                href="/user/request"
              />

          </div>
          <div className={Sidebar.Footer()}>
          </div>
        </div>
      </div>
    </aside>
  );
};

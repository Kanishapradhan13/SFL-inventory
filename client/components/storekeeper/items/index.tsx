"use client";

import React from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { TableWrapper } from "@/components/storekeeper/items/Items table/table";
import { AddItem } from "./add-item";

export const Items = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" size="sm">
          <Tab key="all" title="All">
            <Card>
              <CardBody>
                <TableWrapper value={"All"} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="low stock" title="Low Stock">
            <Card>
              <CardBody>
                <TableWrapper value={"Low Stock"} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="expired" title="Expired">
            <Card>
              <CardBody>
                <TableWrapper value={"Expired"} />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
        
    </div>
  );
};

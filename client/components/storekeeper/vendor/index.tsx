"use client";

import React from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { TableWrapper } from "@/components/storekeeper/vendor/Items table/table";
import { AddVendor } from "./add-vendor";

export const Vendor = () => {
  return (
    <div className="my-6 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold pl-3">Vendor</h3>

      <Card>
        <CardBody>
          <TableWrapper />
        </CardBody>
      </Card>
    </div>
  );
};

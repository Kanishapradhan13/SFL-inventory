"use client";

import React from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { TableWrapper } from "@/components/admin/accounts/Items table/table";

export const Accounts = () => {
  return (
    <div className="my-6 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-bold pl-3">Account</h3>

      <Tabs aria-label="Options" size="sm">
        <Tab key="all" title="All">
          <Card>
            <CardBody>
              <TableWrapper value={"All"} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="admin" title="Admin">
          <Card>
            <CardBody>
              <TableWrapper value={"Admin"} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="users" title="Users">
          <Card>
            <CardBody>
              <TableWrapper value={"User"} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="storekeepers" title="Storekeepers">
          <Card>
            <CardBody>
              <TableWrapper value={"StoreKeeper"} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

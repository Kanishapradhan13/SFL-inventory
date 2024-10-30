"use client";

import React from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { TableWrapper } from "@/components/admin/request/user-request/user-request tables/table-on-hold";
import { TableWrapperRejected } from "@/components/admin/request/user-request/user-request tables/table-rejected";
import { TableWrapperIssued } from "@/components/admin/request/user-request/user-request tables/table-issued";
import { TableWrapperPending } from "./user-request tables/table-pending";
export const UserRequest = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
       <div className="flex w-full flex-col">
            <Tabs aria-label="Options" size="sm">
                <Tab key="pending" title="Pending">
                <Card>
                    <CardBody>
                        <TableWrapperPending />
                    
                    </CardBody>
                </Card>  
                </Tab>
                <Tab key="on hold" title="On Hold">
                <Card>
                    <CardBody>
                        <TableWrapper/>
                    </CardBody>
                </Card>  
                </Tab>
                <Tab key="rejected" title="Rejected">
                <Card>
                    <CardBody>
                        <TableWrapperRejected />
                    </CardBody>
                </Card>  
                </Tab>
                <Tab key="issued" title="Issued">
                <Card>
                    <CardBody>
                        <TableWrapperIssued />
                    </CardBody>
                </Card>  
                </Tab>
            </Tabs>
        </div>  
      
    </div>
  );
};

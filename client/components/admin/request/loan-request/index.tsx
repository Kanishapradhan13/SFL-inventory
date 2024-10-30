"use client";

import React from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { TableWrapper } from "@/components/admin/request/loan-request/loan-request tables/table-pending";
import { TableWrapperRejected } from "./loan-request tables/table-rejected";
import { TableWrapperReturn } from "./loan-request tables/table-return";
import { TableWrapperBorrow } from "./loan-request tables/table-borrow";
import { TableWrapperOnHold } from "./loan-request tables/table-on-hold";

export const LoanRequest = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4  ">
       <div className="flex w-full flex-col">
            <Tabs aria-label="Options" size="sm">
                <Tab key="pending" title="Pending">
                <Card>
                    <CardBody>
                    
                        <TableWrapper />
                    
                    </CardBody>
                </Card>  
                </Tab>
                <Tab key="on hold" title="On Hold">
                <Card>
                    <CardBody>
                        <TableWrapperOnHold />
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
                <Tab key="borrowed" title="Borrowed">
                <Card>
                    <CardBody>
                    <TableWrapperBorrow />

                    </CardBody>
                </Card>  
                </Tab>
                <Tab key="returned" title="Returned">
                <Card>
                    <CardBody>
                    <TableWrapperReturn />
                    </CardBody>
                </Card>  
                </Tab>
            </Tabs>
        </div>  
      
    </div>
  );
};

"use client";

import React from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { TableWrapper } from "@/components/storekeeper/location/Items table/table";
import { AddLocation } from "./add-location";

export const Location = () => {
  return (
    <div className="my-6 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
     

    <h3 className="text-xl font-bold pl-3">Location</h3>

                            <Card>
                    <CardBody>
                    
                        <TableWrapper />
                    
                    </CardBody>
                </Card>  
              
        </div>  
      
   
  );
};

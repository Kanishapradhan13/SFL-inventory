"use client";
import React from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { TableWrapper } from "@/components/admin/category/category table/table";

export const Category = () => {

  return (
    <div className="my-6 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">


     <h3 className="text-xl font-bold pl-3">Category</h3>


                            <Card>
                    <CardBody>
                    
                        <TableWrapper />
                    
                    </CardBody>
                </Card>  
              
        </div>  
      
   
  );
};


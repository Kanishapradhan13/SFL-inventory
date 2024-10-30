"use client";
import React from "react";

import { Card, CardBody } from "@nextui-org/react";
import { TableWrapper } from "./Items table/table";

export const Request = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full">
      <Card>
        <CardBody>
          <TableWrapper />
        </CardBody>
      </Card>
    </div>
  );
};

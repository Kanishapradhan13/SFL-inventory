"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Card, CardBody } from "@nextui-org/react";

import axios from "axios";
import { IssueLoanItemTable } from "@/components/storekeeper/request/loan-request/issue-loan-item table/issue-loan-item";

export default function Page({ params }: { params: { id: string } }) {
  const [requestedQuantity, setRequestedQuantity] = React.useState(100);
  const [itemId, setItemId] = useState(params.id);
  const [requestData, setRequestData] = useState();
  const getRequestData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/request/info/${params.id}`
      );
      if (response) {
        setRequestData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRequestData();
  }, []);
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex w-full flex-col">
        <div className="">
          <h5 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white">
            Issue Item
          </h5>
          <br />
          <br />
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row">
            <div className="mb-8 sm:w-full md:w-1/2 lg:w-1/3 px-4">
              <h5 className="mb-4 text-md font-bold leading-none tracking-tight text-gray-900 dark:text-white">
                {requestData && requestData.item_id.item_name}
              </h5>
              <h5 className="mb-4 text-sm leading-none tracking-tight text-gray-900 dark:text-white">
                Name
              </h5>
            </div>
            <div className="mb-8 sm:w-full md:w-1/2 lg:w-1/3 px-4">
              <h5 className="mb-4 text-md font-bold leading-none tracking-tight text-gray-900 dark:text-white">
              {requestData && requestData.count}
              </h5>
              <h5 className="mb-4 text-sm leading-none tracking-tight text-gray-900 dark:text-white">
                Requested Quantity
              </h5>
            </div>
            <div
              className="mb-8 sm:w-full md:w-1/2 lg:w-1/3 px-4"
              style={{ marginTop: "-100px" }}
            >
              <img
                src={requestData && requestData.item_id.image}
                alt=""
                style={{ maxWidth: "230px", maxHeight: "230px" }}
              />
            </div>
          </div>
        </div>
        <Card>
          <CardBody>
            <IssueLoanItemTable requestedQuantity={requestData && requestData.count} data={requestData && requestData} selectedItemId={requestData && (requestData.item_id && requestData.item_id._id)} />
          </CardBody>
        </Card>
      </div>
        
    </div>
  );
}

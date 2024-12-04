"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Tabs,
  Tab,
  Card,
  Button,
  CardBody,
  Input,
} from "@nextui-org/react";
import {BorrowHistoryTableWrapper} from "@/components/admin/items/borrow history table/table";
import {StockListTableWrapper} from "@/components/admin/items/stock list table/table";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

// Correct TypeScript interface for `params`
interface PageProps {
  params: { id: string };
}

interface ItemDetails {
  image?: string;
  item_name?: string;
  item_unit?: string;
  model_no?: string;
  low_stock_threshold?: number;
}

export default function Page({ params }: PageProps) {
  const { id: itemId } = params; // Extract `id` from params
  const [itemDetails, setItemDetails] = useState<ItemDetails>({});
  const [itemName, setItemName] = useState("");
  const [itemUnit, setItemUnit] = useState("");
  const [modelNo, setModelNo] = useState("");
  const [count, setCount] = useState(0);
  const minValue = 0;
  const maxValue = 5000;

  // Fetch item details
  const getItemDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/item/${itemId}`);
      if (response?.status === 200) {
        const data = response.data;
        setItemDetails(data);
        setItemName(data.item_name || "");
        setItemUnit(data.item_unit || "");
        setModelNo(data.model_no || "");
        setCount(data.low_stock_threshold || 0);
      }
    } catch (err) {
      console.error("Error fetching item details:", err);
    }
  }, [itemId]);

  // Update item details
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const itemData = {
      item_name: itemName,
      item_unit: itemUnit,
      model_no: modelNo,
      low_stock_threshold: count,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/item/update/${itemId}`,
        itemData
      );
      if (response?.status === 200) {
        toast.success("Item updated successfully", {
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        toast.error("Failed to update item details");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Increment count
  const handleIncrement = useCallback(() => {
    if (count < maxValue) {
      setCount((prevCount) => prevCount + 1);
    }
  }, [count]);

  // Decrement count
  const handleDecrement = useCallback(() => {
    if (count > minValue) {
      setCount((prevCount) => prevCount - 1);
    }
  }, [count]);

  useEffect(() => {
    getItemDetails();
  }, [getItemDetails]);

  return (
    <div className="h-full p-7">
      <h5 className="mb-2 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white">
        Item Details
      </h5>
      <div className="flex w-full flex-col py-6">
        <Tabs aria-label="Options" size="sm">
          <Tab key="details" title="Details">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-4">
                    <div className="p-4 flex items-center justify-center">
                      <Image
                        width={305}
                        height={305}
                        src={itemDetails.image || "/placeholder.jpg"}
                        alt="Item Image"
                        className="rounded-md"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex flex-col">
                        <div className="flex flex-col justify-center content-center">
                          <h1 className="text-md font-semibold">
                            Set Threshold
                          </h1>
                          <p className="text-sm">
                            Select a threshold for the item.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start justify-start mt-6">
                        <button
                          type="button"
                          className="w-10 h-10 bg-gray-50 border border-gray-300 rounded-md ml-3 text-2xl"
                          onClick={handleDecrement}
                        >
                          -
                        </button>
                        <p className="font-bold text-5xl mx-4">{count}</p>
                        <button
                          type="button"
                          className="w-10 h-10 bg-gray-50 border border-gray-300 rounded-md mr-3 text-2xl"
                          onClick={handleIncrement}
                        >
                          +
                        </button>
                      </div>

                      <Input
                        size="sm"
                        className="pb-3 pt-6"
                        type="text"
                        label="Item Name"
                        placeholder={itemDetails.item_name || ""}
                        labelPlacement="outside"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                      />
                      <Input
                        size="sm"
                        className="pb-3"
                        type="text"
                        label="Item Unit"
                        placeholder={itemDetails.item_unit || ""}
                        labelPlacement="outside"
                        value={itemUnit}
                        onChange={(e) => setItemUnit(e.target.value)}
                      />
                      <Input
                        size="sm"
                        className="pb-5"
                        type="text"
                        label="Model No"
                        placeholder={itemDetails.model_no || ""}
                        labelPlacement="outside"
                        value={modelNo}
                        onChange={(e) => setModelNo(e.target.value)}
                      />

                      <Button
                        size="sm"
                        color="warning"
                        className="w-full text-white"
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </form>
            </Card>
          </Tab>
          <Tab key="borrowhistory" title="Borrow History">
            <Card>
              <CardBody>
                <BorrowHistoryTableWrapper itemId={itemId} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="stocklist" title="Stock List">
            <Card>
              <CardBody>
                <StockListTableWrapper itemId={itemId} />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

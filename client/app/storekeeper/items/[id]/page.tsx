"use client";
import { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  Button,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { BorrowHistoryTableWrapper } from "@/components/storekeeper/items/borrow history table/table";
import { Image } from "@nextui-org/react";
import { StockListTableWrapper } from "@/components/storekeeper/items/stock list table/table";
import axios from "axios";
import { toast } from "react-toastify";
export default function Page({ params }: { params: { id: string } }) {
  const [itemId, setItemId] = useState(params.id);
 
  const [itemDetails, setItemDetails] = useState();
  const  [data, setData] = useState();
  const [itemName, setItemName] = useState();
  const [itemUnit, setItemUnit] = useState();
  const [modalNo, setModalNo] = useState();
  const [count, setCount] = useState(0);
  const minValue = 0;
  const maxValue = 5000;

  const handleIncrement = (e) => {
    e.preventDefault()
    if (count < maxValue) {
      setCount((prevCount) => prevCount + 1);
    }
  };


  const getItemDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/item/${itemId}`);

      if (response && response.status == 200) {
        setItemDetails(response.data);
        setItemUnit(response.data.item_unit)
        setItemName(response.data.item_name)
        setModalNo(response.data.model_no)
        setCount(response.data.low_stock_threshold)
   
      }
    } catch (err) {
      console.log("could not fetch");
    }
  };
  const handleSubmit = async () => {


    const itemData = {
      item_name: itemName,
      item_unit: itemUnit,
      model_no: modalNo,
      low_stock_threshold: count,
    };
    // console.log(itemData)
    try {
      const response = await axios.put(`http://localhost:5000/item/update/${itemId}`, itemData);
      if(response && response.status == 200){
        toast.success("Item Updated", {onClose: ()=> {window.location.reload}})
      }else{
        toast.error("Error posting data")
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  useEffect(() => {
    getItemDetails();
  }, []);
  const handleDecrement = (e) => {
    e.preventDefault()
    if (count > minValue) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  return (
    <div className="h-full p-7">
      <h5 className="mb-2 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white">
       
      </h5>
      <div className="flex w-full flex-col py-6">
        <Tabs aria-label="Options" size="sm">
          <Tab key="details" title="Details">
            <Card>
              <form onSubmit={handleSubmit}>

           
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-4 ">
                  <div className=" p-4 flex items-center justify-center">
                    <Image
                      width={305}
                      height={305}
                      src={itemDetails && itemDetails.image}
                      alt="Item Image"
                      className=""
                    />
                  </div>

                  <div className=" p-4">
                    <div className="flex flex-col">
                      <div className="flex flex-col justify-center content-center">
                        <h1 className="text-md font-semibold">Set Threshold</h1>
                        <p className="text-sm">
                          Select a threshold for the item.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-start mt-6">
                      <button
                        className="w-10 h-10 bg-gray-50 border border-gray-300 rounded-md ml-3 text-2xl"
                        onClick={handleDecrement}
                      >
                        -
                      </button>
                      <p className="font-bold text-5xl mx-4">{count}</p>
                      <button
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
                      placeholder={itemDetails && itemDetails.item_name}
                      labelPlacement="outside"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                    <Input
                      size="sm"
                      className="pb-3"
                      type="text"
                      label="Item Unit"
                      placeholder={itemDetails && itemDetails.item_unit}
                      labelPlacement="outside"
                      value={itemUnit}
                      onChange={(e) => setItemUnit(e.target.value)}
                    />
                    <Input
                      size="sm"
                      className="pb-5"
                      type="text"
                      label="Modal No"
                      placeholder={itemDetails && itemDetails.model_no}
                      labelPlacement="outside"
                      value={modalNo}
                      onChange={(e) => setModalNo(e.target.value)}
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
                <BorrowHistoryTableWrapper itemId={itemId}></BorrowHistoryTableWrapper>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="stocklist" title="Stock List">
            <Card>
              <CardBody>
                <StockListTableWrapper itemId={itemId} ></StockListTableWrapper>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { DateValue, parseDate } from "@internationalized/date";
import axios from "axios";
import { toast } from "react-toastify";
import {  useGlobalContext } from "@/contex";

export const AddModel = ({ item }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [count, setCount] = useState(0);
  const [from, setFrom] = useState<DateValue>();
  const [to, setTo] = useState<DateValue>();
  const [selectedItem, setSelectedItem] = useState(item);
  const [reason, setReason] = useState("");
  const {activeUserId } = useGlobalContext()
  const handleIncrement = () => {
    if (count < 5000) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const createRequest = async () => {
    const today = new Date();

    if (!count || count === 0 || !reason) {
      toast.error('All fields are required!');
      return;
    } 
    
    if (item.category_id.type === "Non-Consumable") {
      if (!from) {
        toast.error("Start date is required");
        return;
      } 
      if (from.toDate('UTC') < today) {
        toast.error("Start date must be today or later");
        return;
      }
      if (!to) {
        toast.error("End date is required");
        return;
      }
      if (to.toDate('UTC') <= from.toDate('UTC')) {
        toast.error("End date must be the same or later start date");
        return;
      }
    }
  
    try {
      const requestData = {
        request_type:
          selectedItem.category_id.type === "Non-Consumable" ? "Loan" : "User",
        reason,
        count,
        user_id: activeUserId, 
        item_id: selectedItem._id,
      };
      if (requestData.request_type === "Loan") {
        requestData.start_date = new Date(from); 
        requestData.end_date = new Date(to); 
      }
      
      const response = await axios.post(
        "http://localhost:5000/request/add",
        requestData
      );

      toast.success("Your request have been sent!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <>
        <Button
          onPress={onOpen}
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          className={`${
            selectedItem.true_count < selectedItem.low_stock_threshold
              ? "text-tiny text-white font-medium bg-black/20 cursor-not-allowed"
              : "text-tiny text-white font-medium bg-warning/80"
          }`}
          isDisabled={
            selectedItem.true_count < selectedItem.low_stock_threshold
          }
        >
          Request
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          backdrop="blur"
          size="sm"
          scrollBehavior="outside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <div className="flex flex-col gap-3">
                  <div>
                    <ModalHeader className="text-md font-bold">
                      {selectedItem.item_name}
                    </ModalHeader>
                    <p
                      className="text-xs text-default-500 ml-6"
                      style={{ marginTop: "-20px" }}
                    >
                      {selectedItem.category_id.category_name}
                    </p>
                  </div>

                  <div className="ml-9">
                    <img
                      src={selectedItem.image}
                      alt="Item Image"
                      height={300}
                      width={300}
                    />
                  </div>
                </div>
                <div className="flex flex-row ml-6 mt-3">
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <h1 className="text-sm font-semibold mr-3">Model No</h1>
                      <p className="front-semi-bold font-poppins text-xs text-default-500">
                        {selectedItem.model_no}
                      </p>
                    </div>
                    <div className="flex flex-col mt-3">
                      <h1 className="text-sm font-semibold mr-3">Type</h1>
                      <p className="front-semi-bold font-poppins text-xs text-default-500">
                        {selectedItem.category_id.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col ml-14">
                    <div className="flex flex-col">
                      <h1 className="text-sm font-semibold mr-3">Location</h1>
                      <p className="front-semi-bold font-poppins text-xs text-default-500">
                        {selectedItem.location_id.location_name}
                      </p>
                    </div>
                    <div className="flex flex-col mt-3">
                      <h1 className="text-sm font-semibold mr-3">
                        Sub Location
                      </h1>
                      <p className="front-semi-bold font-poppins text-xs text-default-500">
                        {selectedItem.sublocation_id.sublocation_name
                          ? selectedItem.sublocation_id.sublocation_name
                          : "No SubLocation "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col ml-6 mt-3">
                  <div className="flex flex-col">
                    <h1 className="text-sm font-semibold">Select Count</h1>
                    <p className="front-semi-bold font-poppins text-xs text-default-500">
                      Select how many count you need.
                    </p>
                  </div>
                </div>
                <div className="flex items-center ml-6 justify-center mt-3">
                  <button
                    className="w-10 h-10 bg-gray-50 border border-gray-300 rounded-md ml-3 text-2xl text-red-500"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <p className="font-bold text-5xl mx-4">{count}</p>
                  <button
                    className="w-10 h-10 bg-gray-50 border border-gray-300 rounded-md mr-3 text-2xl text-red-500"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
                <div className=" ml-6 w-[87%]">
                  <Textarea
                    size="sm"
                    variant={"bordered"}
                    label="Reason"
                    labelPlacement="outside"
                    placeholder="Enter your reason"
                    className="col-span-12 md:col-span-6 mb-6 md:mb-0 pb-3.5"
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
                {selectedItem.category_id.type === "Non-Consumable" && (
                  <div
                    className="flex flex-row gap-2 mt-3 w-[87%] ml-6"
                    style={{ marginTop: "-2px" }}
                  >
                    <DatePicker
                      size="sm"
                      className="max-w-[284px]"
                      label="From"
                      value={from}
                      onChange={setFrom}
                    />
                    <p className="text-default-500 text-sm"></p>
                    <DatePicker
                      size="sm"
                      className="max-w-[284px]"
                      value={to}
                      onChange={setTo}
                      label="To"
                    />
                  </div>
                )}

                <ModalFooter className="">
                  <Button
                    size="sm"
                    variant="flat"
                    onClick={onClose}
                    className="w-1/2 bg-white text-black font-semibold font-poppins border border-black"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onPress={() => {
                      createRequest();
                      onClose();
                    }}
                    className="w-1/2 bg-colorBlue text-white font-semibold font-poppins"
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Checkbox,
  Textarea,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";
export const ReturnButton = ({request}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedStockId, setSelectedStockId] = useState();
  const [description, setDescription] = useState()
  const [selectedStockCont, setSelectedStockCount] = useState()
  
  const handleSubmit = async () => {
    let formData = {}
    if(description){
        formData = {
        returned_status: selectedOption,
        damaged_lost_stock_id: selectedStockId,
        damaged_lost_count: selectedStockCont,
        damaged_lost_description: description,
    
      };
    }else if(description) {
      formData = {
        returned_status: selectedOption,
        damaged_lost_stock_id: selectedStockId,
        damaged_lost_count: selectedStockCont,
      };
    } else if(selectedOption == "Good"){
      formData = {
        returned_status: selectedOption
      }
    }else if(selectedOption == "Lost"){
      formData = {
          returned_status: selectedOption,
        damaged_lost_stock_id: selectedStockId,
        damaged_lost_count: selectedStockCont,
      }
      
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/request/loan/return/${request._id}`,
        formData);

      if (response && response.status === 200) {
        toast.success("Item return success", {
          onClose: () => {
            location.reload();
          },
        });
      } else {
        toast.error(response);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleStockIdChange = (e) => {
    setSelectedStockId(e.target.value);
  };

  useEffect(()=> {
    setSelectedStockCount(undefined)
    setDescription(undefined)
    setSelectedStockId(undefined)
  }, [selectedOption == "Good"])
  return (
    <div>
      <>
        <Button
          className="w-10 h-8 bg-colorBlue text-white font-semibold font-poppins "
          size="sm"
          onPress={onOpen}
        >
          Return
        </Button>
        <Modal
          isOpen={isOpen}
          size="lg"
          onOpenChange={onOpenChange}
          placement="top-center"
          backdrop="blur"
        >
          <ModalContent className="w-96">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="48"
                      height="48"
                      rx="24"
                      fill="#D1FADF"
                    />
                    <rect
                      x="4"
                      y="4"
                      width="48"
                      height="48"
                      rx="24"
                      stroke="#ECFDF3"
                      strokeWidth="8"
                    />
                    <path
                      d="M23.5 28L26.5 31L32.5 25M38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28Z"
                      stroke="#039855"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col">
                    <div className="font-bold font-poppins">Return Item</div>
                    <div className="font-poppins">
                      Describe the condition of the item returned.
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Checkbox
                      className="text-md font-normal"
                      isSelected={selectedOption === "Good"}
                      onChange={() => setSelectedOption("Good")}
                    >
                      Good
                    </Checkbox>
                    <Checkbox
                      className="text-md font-normal"
                      isSelected={selectedOption === "Damaged"}
                      onChange={() => setSelectedOption("Damaged")}
                    >
                      Damaged
                    </Checkbox>
                    <Checkbox
                      className="text-md font-normal"
                      isSelected={selectedOption === "Lost"}
                      onChange={() => setSelectedOption("Lost")}
                    >
                      Lost
                    </Checkbox>
                  </div>
                  {selectedOption === "Damaged" && (
                    <div className="mt-1">
                      <Input
                      isRequired
                        className="mb-3"
                        label="Count & Item Code"
                        labelPlacement="outside"
                        placeholder="Count"
                        value={selectedStockCont}
                        onValueChange={setSelectedStockCount}
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small"></span>
                          </div>
                        }
                        endContent={
                          <div className="flex items-center">
                            <label className="sr-only" htmlFor="item_code">
                              item_code
                            </label>
                            <select
                              className="outline-none border-0 bg-transparent text-default-400 text-small"
                              id="item_code"
                              name="item_code"
                              value={selectedStockId}
                              onChange={handleStockIdChange}
                            >
                             <option value="">Select a stock</option>
                                {request.selected_stock_with_count.map((selectedStock) => (
                                  <option key={selectedStock.stock_id._id} value={selectedStock.stock_id._id}>
                                    {selectedStock.stock_id.item_code}
                                  </option>
                                ))}
                            </select>
                          </div>
                        }
                        type="number"
                      />
                      <Textarea
                        isRequired
                        label="Description"
                        labelPlacement="outside"
                        placeholder="Enter your description"
                        className="max-w-xs"
                        value={description}
                        onValueChange={setDescription}
                      />
                    </div>
                  )}
                     {selectedOption === "Lost" && (
                    <div className="mt-1">
                              <Input
                      isRequired
                        className="mb-3"
                        label="Count & Item Code"
                        labelPlacement="outside"
                        placeholder="Count"
                        value={selectedStockCont}
                        onValueChange={setSelectedStockCount}
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small"></span>
                          </div>
                        }
                        endContent={
                          <div className="flex items-center">
                            <label className="sr-only" htmlFor="item_code">
                              item_code
                            </label>
                            <select
                              className="outline-none border-0 bg-transparent text-default-400 text-small"
                              id="item_code"
                              name="item_code"
                              value={selectedStockId}
                              onChange={handleStockIdChange}
                            >
                             <option value="">Select a stock</option>
                                {request.selected_stock_with_count.map((selectedStock) => (
                                  <option key={selectedStock.stock_id._id} value={selectedStock.stock_id._id}>
                                    {selectedStock.stock_id.item_code}
                                  </option>
                                ))}
                            </select>
                          </div>
                        }
                        type="number"
                      />
                  
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="w-96 rounded-md font-poppins text-md border border-black"
                    onPress={onClose}
                    style={{ fontFamily: "Poppins" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-96 rounded-md bg-colorBlue text-white font-poppins text-md"
                    onPress={handleSubmit}
                    style={{ fontFamily: "Poppins" }}
                  >
                    Return
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

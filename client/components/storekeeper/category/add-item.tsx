import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

import { PlusIcon } from "../items/Items table/PlusIcon";

export const AddItem = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <>
        <Button
          onPress={onOpen}
          className="bg-red-500 text-background"
          endContent={<PlusIcon />}
          size="sm"
        >
          Add Category
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          backdrop="blur"
          size="4xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add Category
                </ModalHeader>
                <ModalBody className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="left-container ">
                    <Input
                      className="pb-3.5"
                      type="text"
                      label="Item Name"
                      // placeholder="Enter your email"
                      labelPlacement="outside"
                    />
                    <Input
                      className="pb-3.5"
                      type="text"
                      label="Modal No"
                      // placeholder="Enter Item Modal No"
                      labelPlacement="outside"
                    />
                    <Input
                      className="pb-3.5"
                      type="text"
                      label="Set threshold"
                      // placeholder="Enter Item Modal No"
                      labelPlacement="outside"
                    />
                    <Select
                      labelPlacement="outside"
                      label="Select Location"
                      className="pb-3.5"
                    >
                      <SelectItem key="1" value="10">
                        Location 1
                      </SelectItem>
                      <SelectItem key="1" value="10">
                        Location 2
                      </SelectItem>
                      <SelectItem key="1" value="10">
                        Location 3
                      </SelectItem>
                    </Select>
                    <Select
                      labelPlacement="outside"
                      label="Select Sub Location"
                      className="pb-3.5"
                    >
                      <SelectItem key="1" value="10">
                        Sub Location 1
                      </SelectItem>
                      <SelectItem key="1" value="10">
                        Sub Location 2
                      </SelectItem>
                      <SelectItem key="1" value="10">
                        Sub Location 3
                      </SelectItem>
                    </Select>

                    <Select labelPlacement="outside" label="Select Category">
                      <SelectItem key="1" value="10">
                        Category 1
                      </SelectItem>
                      <SelectItem key="1" value="10">
                        Category 2
                      </SelectItem>
                      <SelectItem key="1" value="10">
                        Category 3
                      </SelectItem>
                    </Select>
                  </div>

                  <div className=" border-dashed border-2 border-blue-300">
                    <label
                      htmlFor="files"
                      className="btn flex justify-center content-center h-full"
                    >
                      <Image
                        src={addimage}
                        alt="Add Image"
                        width={100}
                        height={100}
                      />
                    </label>
                    <input
                      id="files"
                      style={{ visibility: "hidden" }}
                      type="file"
                      className="bg-black"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Add Item
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

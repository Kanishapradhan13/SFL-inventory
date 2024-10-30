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
import addimage from "../../../public/addimage.svg";

import { PlusIcon } from "../Items table/PlusIcon";

export const AddVendor = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <>
        <Button
          onPress={onOpen}
          className="bg-orange-500 text-background"
          endContent={<PlusIcon width={undefined} height={undefined} />}
          size="sm"
        >
          Add Vendor
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          backdrop="blur"
          size="sm"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader style={{ marginBottom: "0" }}>
                  Add Vendor
                </ModalHeader>
                <ModalBody className="my-2 ">
                  <div>
                    <Input
                      className="pb-3.5"
                      type="text"
                      label="Vendor Name"
                      labelPlacement="outside"
                    />

                    <Input
                      className="pb-3.5"
                      type="text"
                      label="Enter Phone Number"
                      labelPlacement="outside"
                    />
                    <Input
                      className="pb-3.5"
                      type="email"
                      label="Enter email address"
                      labelPlacement="outside"
                    />
                  </div>
                </ModalBody>
                <ModalFooter
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    color="danger"
                    variant="flat"
                    onClick={onClose}
                    style={{ flex: 1, marginRight: "8px" }}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" onPress={onClose} style={{ flex: 1 }}>
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

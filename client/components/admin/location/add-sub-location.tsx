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
import React, { useState } from "react";
import { PlusIcon } from "../location/Items table/PlusIcon.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddSubLocation = ({ locationId }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [subLocationName, setSubLocationName] = useState("");
  const handleSubmit = async () => {
    if (!subLocationName) {
      toast.error("Sublocation Name is Requried");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/sublocation/add/${locationId}`,
        {
          sublocation_name: subLocationName,
        }
      );

      if (response && response.status === 201) {
        onClose();
        toast.success("Sub Location added successfully", {
          onClose: () => {
            location.reload();
          },
        });
        // Force refresh the page
      } else {
        toast.error("Failed to create Sub location");
      }
    } catch (error) {
      toast.error("Could not post");
    }
  };
  return (
    <div>
      <>
        <Button
          size="sm"
          onPress={onOpen}
          className=" text-background bg-warning"
          endContent={<PlusIcon />}
        >
          Add Sub Location
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          backdrop="blur"
          size="xs"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="-4 0 32 32"
                    version="1.1"
                  >
                    <title>location</title>
                    <desc>Created with Sketch Beta.</desc>
                    <defs></defs>
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="Icon-Set-Filled"
                        transform="translate(-106.000000, -413.000000)"
                        fill="#969696"
                      >
                        <path
                          d="M118,422 C116.343,422 115,423.343 115,425 C115,426.657 116.343,428 118,428 C119.657,428 121,426.657 121,425 C121,423.343 119.657,422 118,422 L118,422 Z M118,430 C115.239,430 113,427.762 113,425 C113,422.238 115.239,420 118,420 C120.761,420 123,422.238 123,425 C123,427.762 120.761,430 118,430 L118,430 Z M118,413 C111.373,413 106,418.373 106,425 C106,430.018 116.005,445.011 118,445 C119.964,445.011 130,429.95 130,425 C130,418.373 124.627,413 118,413 L118,413 Z"
                          id="location"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </ModalHeader>
                <li className="flex flex-row">
                  <div className="flex flex-col">
                    <div className=" font-bold font-poppins pl-7 text-md">
                      Add SubLocation
                    </div>
                    <span className="pl-7 font-semi-bold font-poppins text-xs text-default-500">
                      Please enter a name for SubLocation
                    </span>
                  </div>
                </li>
                <ModalBody>
                  <li className="flex"></li>
                  <Input
                    size="sm"
                    className="mb-1 pl-1"
                    type="text"
                    label="SubLocation Name"
                    labelPlacement="outside"
                    placeholder="Enter SubLocation Name"
                    value={subLocationName}
                    onChange={(e) => setSubLocationName(e.target.value)}
                  />
                </ModalBody>

                <ModalFooter>
                  <Button
                    size="sm"
                    className="w-1/2 font-semibold font-poppins"
                    variant="bordered"
                    style={{ borderColor: "#D0D5DD" }}
                    onPress={onClose}
                  >
                    Cancel
                  </Button>

                  <Button
                    size="sm"
                    className="w-1/2 bg-colorBlue text-white font-semibold font-poppins"
                    onClick={handleSubmit}
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

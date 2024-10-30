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
  import React from "react";
//   import { PlusIcon } from "../table/PlusIcon";
//   import { TrashIcon } from "./Items table/TrashIcon";
  import { TrashIcon } from "./TrashIcon";
  
  export const DeleteRecord = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
    return (
      <div>
        <>
          <Button className="rounded-full h-5 bg-white w-15" onPress={onOpen}>
            <TrashIcon />
          </Button>{" "}
          <Modal
            isOpen={isOpen}
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
                        fill="#FEF0C7"
                      />
                      <rect
                        x="4"
                        y="4"
                        width="48"
                        height="48"
                        rx="24"
                        stroke="#FFFAEB"
                        stroke-width="8"
                      />
                      <path
                        d="M23 19V22.4C23 22.9601 23 23.2401 23.109 23.454C23.2049 23.6422 23.3578 23.7951 23.546 23.891C23.7599 24 24.0399 24 24.6 24H31.4C31.9601 24 32.2401 24 32.454 23.891C32.6422 23.7951 32.7951 23.6422 32.891 23.454C33 23.2401 33 22.9601 33 22.4V20M33 37V30.6C33 30.0399 33 29.7599 32.891 29.546C32.7951 29.3578 32.6422 29.2049 32.454 29.109C32.2401 29 31.9601 29 31.4 29H24.6C24.0399 29 23.7599 29 23.546 29.109C23.3578 29.2049 23.2049 29.3578 23.109 29.546C23 29.7599 23 30.0399 23 30.6V37M37 25.3255V32.2C37 33.8802 37 34.7202 36.673 35.362C36.3854 35.9265 35.9265 36.3854 35.362 36.673C34.7202 37 33.8802 37 32.2 37H23.8C22.1198 37 21.2798 37 20.638 36.673C20.0735 36.3854 19.6146 35.9265 19.327 35.362C19 34.7202 19 33.8802 19 32.2V23.8C19 22.1198 19 21.2798 19.327 20.638C19.6146 20.0735 20.0735 19.6146 20.638 19.327C21.2798 19 22.1198 19 23.8 19H30.6745C31.1637 19 31.4083 19 31.6385 19.0553C31.8425 19.1043 32.0376 19.1851 32.2166 19.2947C32.4184 19.4184 32.5914 19.5914 32.9373 19.9373L36.0627 23.0627C36.4086 23.4086 36.5816 23.5816 36.7053 23.7834C36.8149 23.9624 36.8957 24.1575 36.9447 24.3615C37 24.5917 37 24.8363 37 25.3255Z"
                        stroke="#DC6803"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col">
                      <div className="font-bold font-poppins">Delete Record</div>
                      <div className="font-poppins">
                        Do you want to delete the record?
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className="w-96 rounded-md font-poppins"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="w-96 rounded-md bg-red-700 text-white font-poppins"
                      onPress={onClose}
                    >
                      Delete
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
  
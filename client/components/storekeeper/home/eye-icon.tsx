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
import { PlusIcon } from "../table/PlusIcon";
import { TrashIcon } from "../items/stock list table/TrashIcon";

export const DeleteModel = ({description, name}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isDamagedChecked, setIsDamagedChecked] = useState(false);

  const handleSVGClick = () => {
    onOpen();
  };

  return (
    <div>
      <>
        <div onClick={handleSVGClick}>
          <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
     
          >
            <path
              d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
            <path
              d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          </svg>
        </div>
        <Modal
          size="xs"
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
                    width="40"
                    height="41"
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
                      fill="#FEE4E2"
                    />
                    <rect
                      x="4"
                      y="4"
                      width="48"
                      height="48"
                      rx="24"
                      stroke="#FEF3F2"
                      strokeWidth="8"
                    />
                    <path
                      d="M23.5 28L26.5 31L32.5 25M38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28Z"
                      stroke="red"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col">
                    <div className="font-bold font-poppins text-md mb-1">
                      {name}
                    </div>
                    <div className="font-semi-bold font-poppins text-xs text-default-500">
                   {description}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    size="sm"
                    className="w-full bg-colorBlue text-white font-semibold font-poppins"
                    onPress={onClose}
                    style={{ fontFamily: "Poppins" }}
                  >
                    Done
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

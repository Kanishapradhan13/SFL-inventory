import React, { useState } from "react";
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
import addimage from "../../../public/addimage.svg";
import axios from "axios";
import { PlusIcon } from "../category/category table/PlusIcon.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const DeleteCategory = ({ categoryId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cateId, setCateId] = useState(categoryId);

  const handleSVGClick = () => {
    onOpen();
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/category/${cateId}`
      );

      if (response.status === 200) {
        toast.success("Category deleted", {
          onClose: () => {
            location.reload();
          },
        });
        onClose(); // Close the modal after successful submission
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };
  return (
    <div>
      <>
        <div onClick={handleSVGClick}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7.5H20"
              stroke="#8B909A"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 11.5V17.5"
              stroke="#8B909A"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 11.5V17.5"
              stroke="#8B909A"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 7.5L6 19.5C6 20.6046 6.89543 21.5 8 21.5H16C17.1046 21.5 18 20.6046 18 19.5L19 7.5"
              stroke="#8B909A"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 7.5V4.5C9 3.94772 9.44772 3.5 10 3.5H14C14.5523 3.5 15 3.94772 15 4.5V7.5"
              stroke="#8B909A"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={onClose}
          placement="center"
          backdrop="blur"
          size="xs"
        >
          <ModalContent className="w-96">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 mb-(1))">
                  <svg
                    width="30"
                    height="30"
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
                      stroke-width="8"
                    />
                    <path
                      d="M32 22V21.2C32 20.0799 32 19.5198 31.782 19.092C31.5903 18.7157 31.2843 18.4097 30.908 18.218C30.4802 18 29.9201 18 28.8 18H27.2C26.0799 18 25.5198 18 25.092 18.218C24.7157 18.4097 24.4097 18.7157 24.218 19.092C24 19.5198 24 20.0799 24 21.2V22M26 27.5V32.5M30 27.5V32.5M19 22H37M35 22V33.2C35 34.8802 35 35.7202 34.673 36.362C34.3854 36.9265 33.9265 37.3854 33.362 37.673C32.7202 38 31.8802 38 30.2 38H25.8C24.1198 38 23.2798 38 22.638 37.673C22.0735 37.3854 21.6146 36.9265 21.327 36.362C21 35.7202 21 34.8802 21 33.2V22"
                      stroke="#D92D20"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </ModalHeader>
                <ModalBody>
                  <li className="flex flex-row">
                    <div className="flex flex-col">
                      <div className="font-bold font-poppins text-md mb-1">
                        Delete Category
                      </div>
                      <div className="font-semi-bold font-poppins text-xs text-default-500">
                        Are you sure you want to delete this Category? This
                        action cannot be undone.
                      </div>
                    </div>
                  </li>
                </ModalBody>
                <ModalFooter>
                  <Button
                    size="sm"
                    className="w-1/2 font-semibold font-poppins"
                    color="black"
                    variant="bordered"
                    style={{ borderColor: "#D0D5DD" }}
                  >
                    Cancel
                  </Button>

                  <Button
                    size="sm"
                    className="w-1/2 bg-red-700 text-white font-semibold font-poppinss"
                    color="black"
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

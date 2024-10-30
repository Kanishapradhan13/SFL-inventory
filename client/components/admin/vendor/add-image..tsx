import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalFooter,
  useDisclosure,
  Button,
  Image,
} from "@nextui-org/react";

import addimage from "../../../public/addimage.svg";

import { PlusIcon } from "./Items table/PlusIcon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const BillImage = ({ billId, src, vendorId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [iD, setId] = useState(billId)
  const removeBill = async () => {
    console.log(iD);
    try {
      const response = await axios.delete(
        `http://localhost:5000/bill/delete/${iD}`
      );
      if (response) {
        toast.success(response.data.message);
      } else {
        console.error("Failed to delete bill");
      }
    } catch (error) {
      toast.error("Error deleting bill");
    }
  };

  return (
    <div className="h-full">
      
      <label
        htmlFor="files"
        onClick={onOpen}
        className="btn flex justify-center content-center h-full"
      >
        <Image
          // src={`http://localhost:5000/${src}`}
          src={src}
          alt="Bill Image"
          width={250}
          height={250}
        />
      </label>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        size="xs"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className=" border-dashed border-2 ">
                <label
                  htmlFor="files"
                  className="btn flex justify-center content-center h-full"
                  style={{ marginTop: "2rem" }}
                >
                  <Image
                    // src={`http://localhost:5000/${src}`}
                    src={src}
                    alt="Add Image"
                    width={500}
                    height={500}
                  />
                </label>
              </div>

              <ModalFooter
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  size="sm"
                  className=" w-full bg-red-700 text-white font-semibold font-poppins"
                  onPress={onClose}
                  onClick={removeBill}
                >
                  Remove
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

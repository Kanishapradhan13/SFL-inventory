import React from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import addimage from "../../../public/addimage.svg";
import { PlusIcon } from "./Items table/PlusIcon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddBill = ({ vendorId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [billImage, setBillImage] = React.useState(null);
  const [billImageUrl, setBillImageUrl] = React.useState(null);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBillImageUrl(URL.createObjectURL(e.target.files[0]));
      setBillImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      if (!billImage) {
        console.error("No image selected");
        return;
      }

      const formData = new FormData();
      formData.append("image", billImage);

      const response = await axios.post(
        `http://localhost:5000/bill/add/${vendorId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response && response.status === 201) {
        toast.success("Bill added successfully", {
          onClose: () => {
            location.reload();
            setBillImage(null);
            setBillImageUrl(null);
            onClose();
          },
        });
      } else {
        toast.error("Failed to create Bill");
      }
    } catch (error) {
      toast.error("Something is wrong");
    }
  };

  return (
    <div>
      <>
        <Button
          size="sm"
          onClick={onOpen}
          className="text-background bg-warning mr-6"
          endContent={<PlusIcon />}
        >
          Create Bill
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          placement="center"
          backdrop="blur"
          size="xs"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 text-md font-bold">
              Add Bill
            </ModalHeader>
            <ModalBody>
              <div className="border-dashed border-3 rounded-lg border-warning w-full">
                <label
                  htmlFor="files"
                  className="btn flex justify-center content-center "
                >
                  <Image
                    src={billImageUrl ? billImageUrl : addimage}
                    alt="Add Image"
                    className={billImageUrl ? "object-fill" : ""}
                    width={billImageUrl ? 500 : 100}
                    height={billImageUrl ? 500 : 100}
                  />
                </label>
                <input
                  id="files"
                  style={{ visibility: "hidden" }}
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="bg-black w-20"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-sm font-bold">Click to upload a file</h1>
                <p className="text-sm font-normal text-default-500">
                  PDF (max. 800x400px)
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                className="w-full bg-white text-black font-bold font-poppins border border-black"
                variant="bordered"
                style={{ borderColor: "#D0D5DD" }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="w-full bg-colorBlue text-white font-bold font-poppins"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

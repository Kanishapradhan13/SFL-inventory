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
import { PlusIcon } from "../vendor/Items table/PlusIcon.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const AddVendor = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [vendorName, setVendorName] = React.useState("");
  const [vendorPhoneNumber, setVendorPhoneNumber] = React.useState("");
  const [vendorEmail, setVendorEmail] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!vendorName || !vendorPhoneNumber || !vendorEmail) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      // Send a POST request to add a new vendor
      const response = await axios.post("http://localhost:5000/vendor/add", {
        vendor_name: vendorName,
        phone_no: vendorPhoneNumber,
        email: vendorEmail,
      });

      if (response && response.status === 201) {
        onClose();
        toast.success("Vendor added successfully", {
          onClose: () => {
            location.reload();
          },
        });
        // Force refresh the page
      } else if (response.status == 400) {
        toast.error("Bad request");
      } else {
        toast.error("Failed to create vendor");
      }
    } catch (error) {
      toast.error(error);
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
          Add Vendor
        </Button>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          backdrop="blur"
          size="sm"
        >
          <form onSubmit={handleSubmit}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#969696"
                      version="1.1"
                      id="Capa_1"
                      width="18px"
                      height="18px"
                      viewBox="0 0 562.021 562.021"
                    >
                      <g>
                        <g>
                          <path d="M62.292,562.021h437.443c17.91,0,32.432-14.52,32.432-32.434l-24.479-133.355c0-17.91-14.52-32.432-32.434-32.432    l-78.961-16.086c-9.369-11.688-18.143-24.27-25.697-35.883c-14.633,9.541-30.398,16.623-46.877,21.096    c-13.828,3.758-28.145,5.707-42.71,5.707c-14.804,0-29.358-2.01-43.397-5.891c-16.227-4.486-31.757-11.506-46.188-20.912    c-7.509,11.545-16.221,24.049-25.53,35.678l-79.125,16.291c-17.91,0-32.433,14.52-32.433,32.432l-24.48,133.355    C29.859,547.502,44.378,562.021,62.292,562.021z" />
                          <path d="M144.523,215.1c11.796,31.705,32.972,58.317,59.848,75.955c22.311,14.639,48.544,23.104,76.641,23.104    c28.096,0,54.331-8.465,76.641-23.104c26.875-17.638,48.051-44.248,59.848-75.955c19.74-1.224,35.383-17.574,35.383-37.62    c0-16.628-10.77-30.713-25.699-35.744C419.973,62.186,357.287,0,281.011,0C204.734,0,142.05,62.186,134.838,141.736    c-14.93,5.03-25.698,19.116-25.698,35.744C109.14,197.526,124.783,213.879,144.523,215.1z" />
                        </g>
                      </g>
                    </svg>
                  </ModalHeader>
                  <li className="flex flex-row">
                    <div className="flex flex-col">
                      <div className=" font-bold font-poppins pl-6 text-md ">
                        Add Vendor
                      </div>
                    </div>
                  </li>
                  <ModalBody>
                    <div className="flex flex-col ">
                      <Input
                        className="mb-2"
                        type="text"
                        label="Vendor Name"
                        labelPlacement="outside"
                        size="sm"
                        placeholder="Type Vendor Name"
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                      />
                      <Input
                        className="mb-2"
                        type="text"
                        label="Phone Number"
                        labelPlacement="outside"
                        size="sm"
                        placeholder="Enter Phone Number"
                        value={vendorPhoneNumber}
                        onChange={(e) => setVendorPhoneNumber(e.target.value)}
                      />
                      <Input
                        className="mb-0.5"
                        type="email"
                        label="Email Address"
                        labelPlacement="outside"
                        size="sm"
                        placeholder="Enter Email"
                        value={vendorEmail}
                        onChange={(e) => setVendorEmail(e.target.value)}
                      />
                    </div>
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
                      className="w-1/2 bg-colorBlue text-white font-semibold font-poppins"
                      type="submit"
                      size="sm"
                    >
                      Confirm
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </form>
        </Modal>
      </>
    </div>
  );
};

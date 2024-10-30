import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Selection,
} from "@nextui-org/react";
import Image from "next/image";
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import addimage from "../../../public/addimage.svg";
import { DatePicker } from "@nextui-org/react";
import {
  DateValue,
  parseDate,
  getLocalTimeZone,
} from "@internationalized/date";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDateFormatter } from "@react-aria/i18n";
import { PlusIcon } from "../items/Items table/PlusIcon";
import axios from "axios";
export const AddStock = ({ itemId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [itemCode, setItemCode] = React.useState("");
  const [stockQuantity, setStockQuantity] = React.useState("");
  const [purchaseDate, setPurchaseDate] = React.useState(
  );
  const [receiveDate, setReceiveDate] = React.useState();
  const [expireDate, setExpireDate] = React.useState();
  const [selectedVendor, setSelectedVendor] = React.useState<Selection>(
    new Set([])
  );
  // console.log(parseDate())
  // new Date(recievedDate)
  const [inspectedBy, setInspectedBy] = React.useState("");
  const [vendors, setVendors] = React.useState([
    {
      _id: "66424d1676217bdf815e9de5",
      vendor_name: "Stardose Enterprise",
      phone_no: 17328248,
      email: "stardose@gmail.com",
      status: true,
      __v: 0,
    },
    {
      _id: "66424dd576217bdf815e9df8",
      vendor_name: "State Trading Corporation",
      phone_no: 17328238,
      email: "statetrading@gmail.com",
      status: true,
      __v: 0,
    },
  ]);

  const getVendors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/vendor/all/active");

      if (response && response.status == 200) {
        setVendors(response.data);
      } else {
        console.log("cannot fetch vendors");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async () => {
    if (
      !itemCode ||
      !stockQuantity ||
      !purchaseDate ||
      !receiveDate ||
      selectedVendor.size == 0 ||
      !inspectedBy
    ) {
      toast.error("Please fill in all the fields, expire date is optional");
      return;
    }
    const newPurchaseDate = new Date(purchaseDate);
    const newRecievedDate = new Date(receiveDate);
    const newExpiredDate = expireDate ? new Date(expireDate) : null;
    const newSelectedVendor = selectedVendor.values().next().value;
    if (newRecievedDate < newPurchaseDate) {
      toast.error("Receive date cannot be before purchase date.");
      return;
    }
  
    if (newExpiredDate && newExpiredDate < new Date()) {
      toast.error("Cannot add expired stock.");
      return;
    }
    const formData = {
      item_code: itemCode,
      stock_quantity: stockQuantity,
      purchase_date: newPurchaseDate,
      received_date: newRecievedDate,
      expires_on: newExpiredDate,
      vendor_id: newSelectedVendor,
      inspected_by: inspectedBy,
      item_id: itemId,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/stock/add",
        formData);

      if (response && response.status === 201) {
        toast.success("Stock added successfully", {
          onClose: () => {
            location.reload();
          },
        });
      } else {
        toast.error("Failed to create Stock");
      }
    } catch (error) {
      toast.error("Could not post");
    }
  };

  React.useEffect(() => {
    getVendors();
  }, []);
  return (
    <div>
      <>
        <Button
          size="sm"
          onPress={onOpen}
          className=" text-background bg-warning"
          endContent={<PlusIcon />}
        >
          Add Stock
        </Button>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          backdrop="blur"
          size="xl"
          scrollBehavior={"outside"}
        >
          <form action={handleSubmit}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col text-md gap-1">
                    Add Stock
                  </ModalHeader>
                  <ModalBody className="my-1 ">
                    <div className="left-container ">
                      <Input
                        size="sm"
                        className="pb-2"
                        type="text"
                        label="Item Code"
                        placeholder="Enter Item Code"
                        labelPlacement="outside"
                        value={itemCode}
                        onChange={(e) => {
                          setItemCode(e.target.value);
                        }}
                      />
                      <Input
                        size="sm"
                        className="pb-2"
                        type="text"
                        label="Stock Quantity"
                        placeholder="Enter Stock Quantity"
                        labelPlacement="outside"
                        value={stockQuantity}
                        onChange={(e) => {
                          setStockQuantity(e.target.value);
                        }}
                      />
                      <DatePicker
                        labelPlacement="outside"
                        size="sm"
                        className="pb-2"
                        label="Purchase Date"
                        value={purchaseDate}
                        onChange={setPurchaseDate}
                      />

                      <DatePicker
                        labelPlacement="outside"
                        size="sm"
                        className="pb-2"
                        label="Receive Date"
                        value={receiveDate}
                        onChange={setReceiveDate}
                      />
                      <DatePicker
                        labelPlacement="outside"
                        size="sm"
                        className="pb-2"
                        label="Expire Date"
                        value={expireDate}
                        onChange={setExpireDate}
                      />
                      <Select
                        labelPlacement="outside"
                        label="Vendor"
                        placeholder="Select Vendor"
                        size="sm"
                        className="pb-2"
                        selectedKeys={selectedVendor}
                        onSelectionChange={setSelectedVendor}
                      >
                        {vendors.map((vendor) => (
                          <SelectItem key={vendor._id} value={vendor._id}>
                            {vendor.vendor_name}
                          </SelectItem>
                        ))}
                      </Select>
                      <Input
                        size="sm"
                        type="text"
                        label="Inspected By"
                        placeholder="Enter Name"
                        labelPlacement="outside"
                        value={inspectedBy}
                        onChange={(e) => {
                          setInspectedBy(e.target.value);
                        }}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className="w-1/2 font-semibold font-poppins"
                      size="sm"
                      variant="bordered"
                      style={{ borderColor: "#D0D5DD" }}
                      onPress={onClose}
                    >
                      Cancel
                    </Button>

                    <Button
                      size="sm"
                      className="w-1/2 bg-colorBlue text-white font-semibold font-poppins"
                      type="submit"
                    >
                      Add Stock
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

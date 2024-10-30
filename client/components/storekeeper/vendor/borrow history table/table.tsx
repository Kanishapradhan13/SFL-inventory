import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddBill } from "../add-bill";
import { BillImage } from "../add-image.";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import { PlusIcon } from "../Items table/PlusIcon";

export const BillsTableWrapper = ({ vendorId }) => {
  const [vendor, setVendor] = useState(null);
  const [switchActive, setSwitchActive] = useState(false);
  const [billImages, setBillImages] = useState();

  const toggleSwitch = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/vendor/changestatus/${vendorId}`
      );
      setSwitchActive(!switchActive);
    } catch (err) {
      console.log("Error toggling switch:", err);
    }
  };

  const fetchVendorDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/vendor/name/${vendorId}`
      );
      setVendor(response.data);
      if (response.data.status) {
        setSwitchActive(true);
      } else {
        setSwitchActive(false);
      }
    } catch (error) {
      console.error("Error fetching vendor details:", error);
    }
  };

  useEffect(() => {
    const fetchBillImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/bill/get/${vendorId}`
        );

        setBillImages(response.data);
      } catch (error) {
        console.error("Error fetching bill images:", error);
      }
    };

    fetchBillImages();
  }, [fetchVendorDetails()]);

  return (
    <div>
      {vendor && (
        <>
          <h2 className="text-xl font-bold">Vendor</h2>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mt-6">
              <h1 className="text-md font-semibold">{vendor.vendor_name}</h1>
              <p className="text-sm text-gray-500">Name</p>
            </div>
            <div className="mt-6">
              <h1 className="text-md font-semibold">{vendor.email}</h1>
              <p className="text-sm text-gray-500">Email</p>
            </div>
            <div className="mt-6">
              <h1 className="text-md font-semibold">{vendor.phone_no}</h1>
              <p className="text-sm text-gray-500">Phone No</p>
            </div>
            <div className="mt-6 md:ml-40">
              <Switch
                size="sm"
                defaultSelected={switchActive}
                color={switchActive ? "warning" : "warning"}
                onClick={toggleSwitch}
              ></Switch>
            </div>
          </div>
        </>
      )}
      <div className="flex flex-row mt-6">
        <div>
          <h3 className="text-xl font-bold">Bills</h3>
        </div>
        <div className="ml-auto">
          {switchActive ? (
            <AddBill color="warning" vendorId={vendorId} /> // Set color to "warning" when switchActive is true
          ) : (
            <Button
              size="sm"
              disabled
              className=" text-background bg-gray-300 mr-6"
              endContent={<PlusIcon />}
              color="success" // Set color to "success" when switchActive is false
            >
              Create Bill
            </Button>
          )}
        </div>
      </div>
      <div>
        <hr className="w-full border border-gray-200 my-4" />
      </div>

      <div className="flex-row gap-8 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {billImages &&
          billImages.map((billImage, index) => (
            <div key={index}>
              <BillImage billId={billImage._id} src={billImage.image} />
            </div>
          ))}
      </div>
    </div>
  );
};

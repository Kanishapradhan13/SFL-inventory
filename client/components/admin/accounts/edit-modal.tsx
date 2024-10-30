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
  Selection,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Image from "next/image";
import addimage from "../../../public/addimage.svg";

import { PlusIcon } from "../accounts/Items table/PlusIcon.jsx";
import axios from "axios";
import { toast } from "react-toastify";

export const EditAccount = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState(user);
  const [userR, setUserR] = React.useState<Selection>(new Set([user.role]));
  console.log(userData);
  const handleSVGClick = () => {
    onOpen();
  };
  const updateUserRole = async (userId, role) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/user/${userId}/update-role`,
        {
          role,
        }
      );
      toast.success("Updated", {
        onClose: () => {
          location.reload();

          onClose();
        },
      });
    } catch (error) {
      console.log("Failed to update user role");
    }
  };

  return (
    <div>
      <>
        <div onClick={handleSVGClick}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 7H6C4.89543 7 4 7.89543 4 9V18C4 19.1046 4.89543 20 6 20H15C16.1046 20 17 19.1046 17 18V15"
              stroke="#8B909A"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 15.0002H12L20.5 6.50023C21.3284 5.6718 21.3284 4.32865 20.5 3.50023C19.6716 2.6718 18.3284 2.6718 17.5 3.50023L9 12.0002V15.0002"
              stroke="#8B909A"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 5L19 8"
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
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <svg
                    width="40"
                    height="40"
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
                      fill="#D1FADF"
                    />
                    <rect
                      x="4"
                      y="4"
                      width="48"
                      height="48"
                      rx="24"
                      stroke="#ECFDF3"
                      stroke-width="8"
                    />
                    <path
                      d="M23.5 28L26.5 31L32.5 25M38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28Z"
                      stroke="#039855"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </ModalHeader>

                <ModalBody>
                  <div className="flex flex-col">
                    <div className="font-bold font-poppins">Change Role</div>
                    <span className="font-semi-bold font-poppins text-xs text-default-500 ">
                      You can change to the desired role
                    </span>
                  </div>
                  <Select
                    size="sm"
                    className="mb-1"
                    label="Role"
                    placeholder="Select Role"
                    labelPlacement="outside"
                    // defaultSelectedKeys={}
                    selectedKeys={userR}
                    onSelectionChange={setUserR}
                  >
                    <SelectItem key="StoreKeeper" value="StoreKeeper">
                      StoreKeeper
                    </SelectItem>
                    <SelectItem key="User" value="User">
                      User
                    </SelectItem>
                  </Select>
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
                    onClick={() =>
                      updateUserRole(user._id, userR.values().next().value)
                    }
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

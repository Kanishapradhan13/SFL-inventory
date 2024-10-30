import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarItem,
  Image,
  image,
} from "@nextui-org/react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { z } from "zod";

import { DarkModeSwitch } from "./darkmodeswitch";
import { logout } from "@/actions/auth_action";
import addimage from "../../../public/addimage.svg";
import { useGlobalContext } from "@/contex";
import { toast } from "react-toastify";
import axios from "axios";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone_no: z.string().min(1, "Phone number is required"),
  password: z.string().min(8, "Password must be at least 8 characters long").optional(),
  organization: z.string().min(1, "Organization is required"),
});

export const UserDropdown = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userImage, setUserImage] = React.useState();
  const [userImageUrl, setUserImageUrl] = React.useState(null);
  const [imageUploaded, setImageUploaded] = React.useState(false);
  const [dataBaseImageUrl, setDataBaseImageUrl] = React.useState(null);
  const { activeUserId } = useGlobalContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setPhone_No] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUserImageUrl(URL.createObjectURL(e.target.files[0]));
      setUserImage(e.target.files[0]);
      setImageUploaded(true);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Uploaded file:", file);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${activeUserId}`
        );
        const { name, email, phone_no, organization, image } = response.data;
        setName(name);
        setEmail(email);
        setPhone_No(phone_no);
        setOrganization(organization);
        setDataBaseImageUrl(image);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (activeUserId) {
      fetchUserData();
    }
  }, [activeUserId]);

  // user update with validation
  const handleUpdateProfile = async () => {
    try {
      // Validate user data using Zod
      userSchema.parse({ name, email, phone_no, password, organization });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone_no", phone_no);
      formData.append("organization", organization);

      if (password) {
        formData.append("password", password);
      }

      if (userImage) {
        formData.append("image", userImage);
      }

      // Log formData for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Send the request to the backend
      await axios.post(
        `http://localhost:5000/user/${activeUserId}/update-user`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("User profile updated successfully");
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        console.error("Error updating user profile:", error.response?.data || error.message);
        toast.error("Failed to update user profile");
      }
    }
  };

  return (
    <>
      <form action={logout}>
        <Dropdown size="sm">
          <NavbarItem>
            <DropdownTrigger>
              <Avatar
                as="button"
                size="sm"
                src={userImageUrl ? userImageUrl : dataBaseImageUrl}
              />
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="User menu actions"
            onAction={(actionKey) => console.log({ actionKey })}
          >
            <DropdownItem
              key="profile"
              className="flex flex-col justify-start w-full items-start"
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{email}</p>
            </DropdownItem>
            <DropdownItem key="settings" onPress={onOpen}>
              My setting
            </DropdownItem>

            <DropdownItem
              key="logout"
              onPress={handleLogout}
              color="danger"
              className="text-amber-400 "
            >
              Logout
            </DropdownItem>

            <DropdownItem key="switch">
              <DarkModeSwitch />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          placement="top-center"
          backdrop="blur"
          scrollBehavior="outside"
          size="sm"
        >
          <ModalContent className="w-auto">
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex flex-col">
                <h1
                  className="text-md font-semibold"
                  style={{ fontFamily: "Poppins" }}
                >
                  Edit Profile
                </h1>
                <p
                  className="font-normal text-sm"
                  style={{ fontFamily: "Poppins" }}
                >
                  Edit your username and other details
                </p>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col">
                <div className="mt-10 mr-10">
                  <Avatar
                    as="button"
                    size="lg"
                    src={userImageUrl ? userImageUrl : dataBaseImageUrl}
                  />
                </div>

                <input
                  id="files"
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                />

                <label htmlFor="files">
                  <div
                    className=" border flex flex-col ml-16"
                    style={{
                      marginTop: "-85px",
                      borderRadius: "8px",
                      width: "270px",
                      height: "130px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontFamily: "Poppins",
                    }}
                  >
                    <svg
                      width="46"
                      height="46"
                      viewBox="0 0 46 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="40"
                        height="40"
                        rx="20"
                        fill="#F2F4F7"
                      />
                      <rect
                        x="3"
                        y="3"
                        width="40"
                        height="40"
                        rx="20"
                        stroke="#F9FAFB"
                        strokeWidth="6"
                      />
                      <path
                        d="M19.6667 26.3333L23.0001 23M23.0001 23L26.3334 26.3333M23.0001 23V30.5M29.6667 26.9524C30.6847 26.1117 31.3334 24.8399 31.3334 23.4167C31.3334 20.8854 29.2814 18.8333 26.7501 18.8333C26.568 18.8333 26.3976 18.7383 26.3052 18.5814C25.2185 16.7374 23.2121 15.5 20.9167 15.5C17.465 15.5 14.6667 18.2982 14.6667 21.75C14.6667 23.4718 15.363 25.0309 16.4892 26.1613"
                        stroke="#475467"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex flex-col">
                      <div className="flex flex-row gap-1">
                        <h1 className="font-normal text-md text-colorBlue">
                          Click to upload
                        </h1>
                        <p className="text-md">or drag and drop</p>
                      </div>
                      <div className="font-light text-sm">
                        SVG,PNG,JPG or GIF(max. 800x400px)
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              <div
                className="flex flex-col mr-40 w-full mt-6 text-md"
                style={{ fontFamily: "Poppins" }}
              >
                <Input
                  name="name"
                  className="mb-3"
                  type="username"
                  label="Username"
                  labelPlacement="outside"
                  size="lg"
                  placeholder="Enter Your username"
                  value={name}
                  onValueChange={setName}
                />

                <Input
                  name="email"
                  className="mb-3"
                  type="email"
                  label="Email"
                  labelPlacement="outside"
                  size="lg"
                  placeholder="Enter Your email"
                  value={email}
                  onValueChange={setEmail}
                />
                <Input
                  name="phone_no"
                  className="mb-3"
                  type="phonenumber"
                  label="Phone Number"
                  labelPlacement="outside"
                  size="lg"
                  placeholder="Enter Your phonenumber"
                  value={phone_no}
                  onValueChange={setPhone_No}
                />
                <Input
                  name="password"
                  className="mb-3"
                  type="password"
                  label="New Password"
                  labelPlacement="outside"
                  size="lg"
                  placeholder="Enter a new password (optional)"
                  value={password}
                  onValueChange={setPassword}
                />
                <Input
                  name="organization"
                  className="mb-3"
                  type="organization"
                  label="Organization"
                  labelPlacement="outside"
                  size="lg"
                  placeholder="Enter Your organization"
                  value={organization}
                  onValueChange={setOrganization}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                onClick={onClose}
                className="w-48 bg-white text-black font-bold font-poppins border border-black"
                style={{ fontFamily: "Poppins" }}
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateProfile}
                className="w-48 bg-colorBlue text-white font-bold font-poppins"
                style={{ fontFamily: "Poppins" }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </>
  );
};

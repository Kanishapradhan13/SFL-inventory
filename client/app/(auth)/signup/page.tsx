"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import { signup } from "@/actions/auth_action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [formValues, setFormValues] = useState({
    name: "",
    phone_no: "",
    organization: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        formData.append(key, formValues[key as keyof typeof formValues]);
      }
    }
    const response = await signup(formData);

    if (response.type) {
      if (response.type === "error") {
        toast.error(response.message);
      } else if (response.type === "success") {
        toast.success(response.message);
        setFormValues({
          name: "",
          phone_no: "",
          organization: "",
          email: "",
          password: "",
          confirm_password: "",
        });
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <div className="p-4 flex-grow lg:m-0 w-full sm:w-1/2 flex justify-center content-center">
        <div className="mx-5 flex flex-col justify-center content-center w-2/3 md:w-3/5 h-contain">
          <div>
            <div className="mb-12">
              <h2 className="font-bold text-xl mb-1">Create an Account</h2>
              <span className="text-md font-normal text-grey-500">
                Be a user of the new JNSFL Inventory system
              </span>
            </div>
            <form onSubmit={handleSubmit}>
              <Input
                className="mb-7"
                name="name"
                type="text"
                label="Name"
                labelPlacement="outside"
                size="sm"
                placeholder="Enter Your Name"
                value={formValues.name}
                onChange={handleChange}
              />
              <Input
                className="mb-7"
                name="phone_no"
                type="number"
                label="Phone No"
                labelPlacement="outside"
                size="sm"
                placeholder="Enter Your Phone No"
                value={formValues.phone_no}
                onChange={handleChange}
              />
              <Input
                className="mb-7"
                name="organization"
                type="text"
                label="Organization"
                labelPlacement="outside"
                size="sm"
                placeholder="Enter Your Organization"
                value={formValues.organization}
                onChange={handleChange}
              />
              <Input
                className="mb-7"
                name="email"
                type="email"
                label="Email"
                labelPlacement="outside"
                size="sm"
                placeholder="Enter Your Email"
                value={formValues.email}
                onChange={handleChange}
              />
              <Input
                className="mb-7"
                name="password"
                type="password"
                label="Password"
                labelPlacement="outside"
                size="sm"
                placeholder="Enter Your Password"
                value={formValues.password}
                onChange={handleChange}
              />
              <Input
                className="mb-5"
                name="confirm_password"
                type="password"
                label="Confirm Password"
                labelPlacement="outside"
                size="sm"
                placeholder="Retype Your Password"
                value={formValues.confirm_password}
                onChange={handleChange}
              />
              <Button
                size="sm"
                type="submit"
                color="warning"
                variant="solid"
                className="w-full"
              >
                <span className="text-white text-md font-bold">Sign Up</span>
              </Button>
            </form>
            <div className="flex justify-center text-sm font-medium mt-2">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex-grow hidden lg:flex w-full sm:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url("/loginimage.jpg")` }}
      ></div>
    </div>
  );
}

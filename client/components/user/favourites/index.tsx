'use client'
import React, { useEffect, useState } from "react";
import { Link } from "@nextui-org/react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  useDisclosure,
  CardHeader,
  Input,
} from "@nextui-org/react";

import { AddModel } from "../home/addModel";
import { SearchIcon } from "../home/SearchIcon";
import { useGlobalContext } from "@/contex";
import { toast } from "react-toastify";
import axios from "axios";
export  function Favourites() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState();
  const [userFavs, setUserFavs] = useState()
  const { activeUserId } = useGlobalContext();

  // Function to filter items based on search query
  
  const toggleFav = async (itemId, userId) => {
    const id = toast.loading("Please wait");
    
    axios.post(`http://localhost:5000/user/toggle-favourite/${userId}/${itemId}`)
      .then(res => { 
        toast.update(id, {
          render: res.data.message,  // Use the message from the response
          type: "success",
          isLoading: false,
          autoClose: 2500
        });
      })
      .catch(err => {
        toast.update(id, {
          render: err.response?.data?.message || "Something went wrong",  // Use the message from the error response if available
          type: "error",
          isLoading: false,
          autoClose: 2500
        });
      });
  };
  const getAllUserFavs = async (itemId) => {
    try{
      const response = await axios.get(
        `http://localhost:5000/user/${itemId}/favourites`
      );
      if (response && response.status == 200) {
        setUserFavs(response.data)
      } else {
        console.log("failed to fetch");
      }
    }catch(err){
      console.log("could not get all favs")
    }
  }
  const checkIfItemExists = (itemId) => userFavs.some(item => item._id === itemId);

  const getAllItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/item/all-details"
      );
      if (response && response.status == 200) {
        setItems(response.data.filter(item => userFavs.some(fav => fav._id === item._id)));
       
      } else {
        console.log("failed to fetch");
      }
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getAllUserFavs(activeUserId);
    getAllItems();

  }, [toggleFav]);

  const filteredItems =
    items &&
    items.filter((item) =>
      `${item.item_name} ${item.category_id.category_name} ${item.category_id.type}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <div className="w-full gap-5 grid p-6">
        <div className="w-[100%] h-[140px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
          <Input
            label="Search"
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6 pb-6">
        {filteredItems &&
          filteredItems.map((item, index) => (
            <Card className="pt-4 pb-1" key={index}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <div className="flex flex-row w-full">
                  <p
                    className="text-tiny uppercase font-bold w-[90%]"
                    style={{ fontSize: "11px", fontFamily: "poppins" }}
                  >
                    {item.item_name}
                  </p>
                  <span className="w-[10%]  flex justify-end">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 19 17"
                      fill={userFavs && (checkIfItemExists(item._id) ? "#f59e0b" : "none")}
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        toggleFav(item._id, activeUserId)
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.50001 2.84929C7.80057 0.879459 4.96079 0.270696 2.8315 2.07447C0.702197 3.87824 0.402421 6.89404 2.07457 9.02739C3.46485 10.8011 7.67232 14.542 9.0513 15.7528C9.20553 15.8883 9.28269 15.956 9.3727 15.9826C9.45118 16.0058 9.53712 16.0058 9.6157 15.9826C9.70571 15.956 9.78277 15.8883 9.9371 15.7528C11.3161 14.542 15.5235 10.8011 16.9138 9.02739C18.5859 6.89404 18.3227 3.85927 16.1568 2.07447C13.9909 0.289671 11.1994 0.879459 9.50001 2.84929Z"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <small
                  className="text-default-500"
                  style={{ fontSize: "12px", fontFamily: "poppins" }}
                >
                  {item.category_id.type}
                </small>
                <h4
                  className="font-semibold"
                  style={{ fontSize: "11px", fontFamily: "poppins" }}
                >
                  {item.category_id.category_name}
                </h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Card isFooterBlurred radius="lg" className="border-none">
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={item.item_name}
                      className="w-full object-contain h-[170px]"
                      src={item.image}
                    />
                  </CardBody>

                  <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    {item.true_count > item.low_stock_threshold ? (
                      <h4
                        className="font-normal text-white"
                        style={{ fontSize: "11px", fontFamily: "poppins" }}
                      >
                        In Stock
                      </h4>
                    ) : (
                      <h4
                        className="font-normal text-red-600"
                        style={{ fontSize: "11px", fontFamily: "poppins" }}
                      >
                        Not Available
                      </h4>
                    )}

                    <AddModel item={item} />
                  </CardFooter>
                </Card>
              </CardBody>
            </Card>
          ))}
      </div>
    </>
  );
}

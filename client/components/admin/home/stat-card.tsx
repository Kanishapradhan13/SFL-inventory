"use client";
import React, { useState, useEffect } from "react";
import { AllItemsIcon } from "./all-items";
import { CategoriesIcon } from "./categories";
import { LowStockIcon } from "./low-stock";
import { LostIcon } from "./lost";
import TrendingCard from "../trending/TrendingCard";
import TrendingCard2 from "../trending/TrendingCard2";
import { IssueItemPage } from "./lost-damaged";
import { Card, CardBody, Input } from "@nextui-org/react";
import axios from "axios";

export const StatCard = () => {
  const [categoryCount, setCategoryCount] = useState(null);
  const [itemCount, setItemCount] = useState(null);
  const [lowStockCount, setLowStockCount] = useState(null);
  const [lostCount, setLosttCount] = useState();
  useEffect(() => {
    const fetchCategoryCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/category/get-categorycount"
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch category count");
        }
        setCategoryCount(response.data.categoryCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoryCount();
  }, []);

  useEffect(() => {
    const fetchItemCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/item/get-itemcount"
        );
        if (response.status === 200) {
          setItemCount(response.data.itemCount);
        } else {
          throw new Error("Failed to fetch item count");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchItemCount();
  }, []);

  useEffect(() => {
    const fetchLowStockCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/item/low-stock-count"
        );
        if (response.status === 200) {
          setLowStockCount(response.data);
        } else {
          throw new Error("Failed to fetch low stock count");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchLowStockCount();
  }, []);

  useEffect(() => {
    const fetchRequestCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/request/lost-count"
        );
        if (response.status === 200) {
          setLosttCount(response.data.requestCount);
        } else {
          throw new Error("Failed to fetch request count");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRequestCount();
  }, []);

  return (
    <div className="">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div className="h-28 flex items-center justify-center rounded-3xl shadow-md p-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
          <div className="flex items-center gap-2 text-white  w-full content-center justify-center">
            <div className="border-rounded bg-blue-500 rounded-full w-14 h-14 bg-opacity-30 mr-2 flex items-center justify-center">
              <CategoriesIcon />
            </div>
            <div className="">
              <h1 className="font-bold text-xl"> {categoryCount}</h1>
              <span className="text-sm ">Categories</span>
            </div>
          </div>
        </div>
        <div className="h-28 flex items-center justify-center rounded-3xl shadow-md p-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
          <div className="flex items-center gap-2 text-white  w-full content-center justify-center">
            <div className="border-rounded rounded-full w-14 h-14 bg-blue-500 bg-opacity-30 mr-2 flex items-center justify-center">
              <AllItemsIcon />
            </div>
            <div className="">
              <h1 className="font-bold text-xl">{itemCount}</h1>
              <span className="text-sm">All Items</span>
            </div>
          </div>
        </div>
        <div className="h-28 flex items-center justify-center rounded-3xl shadow-md p-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
          <div className="flex items-center gap-2 text-white w-full content-center justify-center">
            <div className="border-rounded rounded-full w-14 h-14 bg-blue-500 bg-opacity-30 mr-2 flex items-center justify-center">
              <LostIcon />
            </div>
            <div className="">
              <h1 className="font-bold text-xl">{lowStockCount}</h1>
              <span className="text-sm">Low Stock</span>
            </div>
          </div>
        </div>
        <div className="h-28 flex items-center justify-center rounded-3xl shadow-md p-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
          <div className="flex items-center gap-2 text-white w-full content-center justify-center">
            <div className="border-rounded bg-blue-500 rounded-full w-14 h-14 bg-opacity-30 mr-2 flex items-center justify-center">
              <LowStockIcon />
            </div>
            <div className="">
              <h1 className="font-bold text-xl">{lostCount}</h1>
              <span className="text-sm">Lost Items</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-8 gap-8">
        <div>
          <TrendingCard />
        </div>
        <div>
          <TrendingCard2 />
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <CardBody>
            <IssueItemPage />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default StatCard;

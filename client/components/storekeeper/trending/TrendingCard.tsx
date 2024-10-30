
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Avatar} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
const TrendingCard = () => {
  const [trendingData, setTrendingData] = useState()
  const getAllTrendingItems = async () =>{
    try {
        const response = await axios.get('http://localhost:5000/request/top-requested-items')
        if(response && response.status==200){
          setTrendingData(response.data)
        }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    getAllTrendingItems()
  }, [])


  const renderPlaceholderItems = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <div key={`placeholder-${index}`} className="flex flex-row">
        <div className="border rounded-md border-full bg-gray-300 flex justify-center items-center">
          <Avatar
            alt="Default Item"
            size="md"
            radius="sm"
            src="path/to/default-image.jpg"
          />
        </div>
        <div className="flex flex-col ml-6">
          <p className="text-xs font-bold">No Item</p>
          <p className="text-xs text-default-500">No Category</p>
        </div>
      </div>
    ));
  };
  return (
    <div>
      <Card className="max-w-[100%]">
      <CardHeader className="flex flex-col content-start gap-2">
        <h1 className="font-bold w-full text-small">Trending Items</h1>
        <p className="text-xs w-full text-gray-500">Trending items this month.</p>
      </CardHeader>
      <Divider/>
      <CardBody className="flex gap-5 flex-col ">
      {trendingData && trendingData.map((item, index) => (
            <div key={index} className="flex flex-row">
              <div className="border rounded-md border-full bg-gray-300 flex justify-center items-center">
                <Avatar
                  alt={item.itemDetails.item_name}
                  size="md"
                  radius="sm"
                  src={item.itemDetails.image}
                />
              </div>
              <div className="flex flex-col ml-6">
                <p className="text-xs font-bold">{item.itemDetails.item_name}</p>
                <p className="text-xs text-default-500">{item.categoryName}</p>
              </div>
            </div>
          ))}
          {trendingData && trendingData.length < 5 && renderPlaceholderItems(5 - trendingData.length)}
      </CardBody>
      <Divider/>
    </Card>
    </div>
  );
};

export default TrendingCard;

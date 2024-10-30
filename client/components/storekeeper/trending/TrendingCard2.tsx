import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
const TrendingCard2 = () => {
  const [trendingData, setTrendingData] = useState()
  const getAllTrendingItems = async () =>{
    try {
        const response = await axios.get('http://localhost:5000/request/top-requested-categories')
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
        <div>
          <span className="text-xl font-semibold text-gray-400">#{trendingData.length + index + 1}</span>
        </div>
        <div className="flex flex-col ml-5 ">
          <p className="text-xs  font-bold">No Category</p>
          <p className="text-xs text-default-500">No Type</p>
        </div>
      </div>
    ));
  };
  return (
    <div>
      <Card className="max-w-[100%]">
      <CardHeader className="flex flex-col content-start gap-2">
        <h1 className="font-bold w-full text-small">Trending Categories.</h1>
        <p className="text-xs w-full text-gray-500">Trending categories this month.</p>
      </CardHeader>
      <Divider/>
      <CardBody className="flex gap-8 flex-col ">
      {trendingData && trendingData.map((category, index) => (
            <div key={category.category_id} className="flex flex-row">
              <div>
                <span className="text-xl font-semibold text-gray-400">#{index + 1}</span>
              </div>
              <div className="flex flex-col ml-5">
                <p className="text-xs font-bold">{category.categoryDetails.category_name}</p>
                <p className="text-xs text-default-500">{category.categoryDetails.type}</p>
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

export default TrendingCard2;

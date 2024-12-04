'use client'
import { useState } from "react"
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import { SubLocationWrapper } from "@/components/admin/location/sub-location-table/table";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
export default function Page({ params }: { params: { id: string } }) {
    const [itemId, setItemId] = useState(params.id)
    const [locationName, setLocationName] = useState('')
    const getLocationName = async () => {

    
        try {
          const response = await axios.get(`http://localhost:5000/location/name/${itemId}`);
    
          if (response && response.status === 200) {  
            setLocationName(response.data.location_name)
          } else {
            toast.error('Failed to fetch location name');
          }
        } catch (error) {
          toast.error('Could not fetch location name');
        }
      };
      useEffect(()=>{
        getLocationName()
      })
    return (
       
       <div className="my-6 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <h2 className="text-xl font-bold pl-3">{locationName}</h2>
       <div className="flex w-full flex-col">
            
                <Card>
                    <CardBody>
                        <SubLocationWrapper locationId={itemId} />
                    
                    </CardBody>
                </Card>  
                
                
        </div>  
      
    </div>
    );
};
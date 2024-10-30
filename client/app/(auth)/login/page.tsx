'use client'

import Link from 'next/link'
import { login } from '@/actions/auth_action';
import {Input, Button} from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
// test
export default function Login(){
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await login(formData);
    
        if(response && response.type){
        if (response.type === 'error') {
            toast.error(response.message);
        } else if (response.type === 'success') {
        toast.success(response.message);
        }
        }
      };
    return (
        <div className="flex flex-col sm:flex-row h-screen">

            <div className="p-4 flex-grow  lg:m-0 w-full sm:w-1/2 flex justify-center content-center">
                <div className="mx-5 flex flex-col justify-center content-center w-2/3 md:w-3/5 h-contain">
                    <div>
                        <div className="mb-12 ">
                            <img src="/waving-hand.svg" className="mb-5" alt="" />
                            <h2 className="font-bold text-xl mb-1">Welcome back!</h2>
                            <span className="text-md font-normal">Please login to access your account.</span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <Input className="mb-7" name="email" type="email" label="Email" labelPlacement="outside" size="sm" placeholder="Enter Your email"/>
                            <Input className="mb-5" name="password" type="password" label="Password" labelPlacement="outside" size="sm"  placeholder="Enter Your password"/>
                            <Button type='submit' size="sm" color="warning" variant="solid" className="w-full" >
                                <span className="text-white text-sm font-semibold">Login</span>
                            </Button>
                        
                        </form>
                      
                        <div className="flex justify-center text-sm font-medium mt-2">
                            Don&apos;t have an account?
                         <Link href="/signup" className="text-blue-400">Sign Up</Link> 
                         </div>
                    </div>
          
                </div>
            </div>
            <div className="flex-grow hidden lg:flex w-full sm:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url("/loginimage.jpg")` }}>
            </div>

        </div>
    );
}

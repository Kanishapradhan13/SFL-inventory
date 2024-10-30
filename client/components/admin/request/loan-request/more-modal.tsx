import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  ModalBody,
} from "@nextui-org/react";
import {toast} from 'react-toastify'
import axios from "axios";
import { useGlobalContext } from "@/contex";

export const MoreModal = ({ request }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [data, setData] = useState(request);
  const {activeUserId} = useGlobalContext()
  const onReject = async () => {
    try{
      const res = await axios.put(`http://localhost:5000/request/reject/${request._id}`);
      if(res.status == 200) {
        toast.success("Rejected", {
          onClose: () => {
            location.reload()
          }
        });
        
      }else{
        toast.error('Could not reject request')
      }
      onClose()
    }catch(err){
      console.log('could not reject')
    }
  }
  const onAccept = async () => {
    try {
      const res = await axios.patch(`http://localhost:5000/request/accept/${request._id}`, { activeUserId });
      if (res.status === 200) {
        toast.success("Accepted", {
          onClose: () => {
            location.reload()
          }
        });
      } else {
        toast.error("Could not accept request");
      }
      onClose(); // Assuming you have an onClose function to close a modal or perform similar action
    } catch (err) {
      console.error("Could not accept request", err);
      toast.error("An error occurred while accepting the request");
    }
  };

  return (
    <div>
      <>
        <div>
          <Button
            onPress={onOpen}
            className="w-10 h-8 bg-colorBlue text-white font-semibold font-poppins "
            size="sm"
          >
            More
          </Button>
        </div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="outside"
          placement="top-center"
          backdrop="blur"
          size="sm"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <div className="flex flex-col gap-1">
                  <ModalHeader className="flex flex-col">
                    <span className="text-sm font-bold">
                      {data.item_id.item_name}
                    </span>

                    <p className="text-xs font-medium text-default-500">
                      {data.item_id.model_no}
                    </p>
                  </ModalHeader>
                </div>
                <ModalBody>
                  <div className="flex justify-center items-center">
                    <img
                      src={data.item_id.image}
                      alt="Item Image"
                      className="w-48 h-48"
                    />
                  </div>

                  <div className="">
                    <div className="">
                      <div
                        className="flex flex-col"
                        style={{ fontFamily: "Poppins" }}
                      >
                        <h1 className="text-sm font-semibold">
                          {data.user_id.name}
                        </h1>
                        <p className="text-xs text-default-500">Requested by</p>
                      </div>

                      <div
                        className="flex flex-col mt-3"
                        style={{ fontFamily: "Poppins" }}
                      >
                        <h1 className="text-sm font-semibold">{data.count}</h1>
                        <p className="text-xs text-default-500">
                          Count request
                        </p>
                      </div>
                      <div
                        className="flex flex-col mt-3"
                        style={{ fontFamily: "Poppins" }}
                      >
                        <h1 className="text-sm font-semibold">
                          {data.item_id.true_count}
                        </h1>
                        <p className="text-xs text-default-500">
                          Count in stock
                        </p>
                      </div>
                      <div
                        className="flex flex-col mt-3 mb-3"
                        style={{ fontFamily: "Poppins" }}
                      >
                        <h1 className="text-sm font-semibold">Reason</h1>
                        <p className="text-xs text-default-500">
                          {data.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="flat"
                    onClick={onReject}
                    className="w-full bg-red-600 text-white font-bold font-poppins "
                    size="sm"
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={onAccept}
                    size="sm"
                    className="w-full bg-green-600 text-white font-bold font-poppins "
                  >
                    Accept
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


import React from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Select, SelectItem, Selection } from '@nextui-org/react';
import { PlusIcon } from '../category/category table/PlusIcon.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';


export const AddCategory = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryName, setCategoryName] = React.useState('');
  const [categoryType, setCategoryType] = React.useState<Selection>(new Set([]));
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!categoryName || !categoryType.size === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/category/add', {
        category_name: categoryName,
        type: categoryType.values().next().value,
      });

      if (response && response.status === 201) {  
        onClose()
        toast.success('Category added successfully', {
          onClose: () => {
            location.reload() 
          }
        });
          // Force refresh the page

      } else {
        toast.error('Failed to create category');
      }
    } catch (error) {
      toast.error('Could not post');
    }
  };

  return (
    <div>
      <Button onPress={onOpen} className="text-background bg-warning" size="sm" endContent={<PlusIcon />}>
        Add Category 
      </Button>
        
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" backdrop="blur" size="xs">
        <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48">
              <title>category-solid</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                  <rect width="48" height="48" fill="none" />
                </g>
                <g id="icons_Q2" data-name="icons Q2" fill="#969696">
                  <path d="M24,2a2.1,2.1,0,0,0-1.7,1L13.2,17a2.3,2.3,0,0,0,0,2,1.9,1.9,0,0,0,1.7,1H33a2.1,2.1,0,0,0,1.7-1,1.8,1.8,0,0,0,0-2l-9-14A1.9,1.9,0,0,0,24,2Z" />
                  <path d="M43,43H29a2,2,0,0,1-2-2V27a2,2,0,0,1,2-2H43a2,2,0,0,1,2,2V41A2,2,0,0,1,43,43Z" />
                  <path d="M13,24A10,10,0,1,0,23,34,10,10,0,0,0,13,24Z" />
                </g>
              </g>
            </svg>
            <div className="font-bold font-poppins pl-6 text-md mb-1">Add Category</div>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col">
              <Input
                size="sm"
                className="mb-2"
                type="text"
                label="Category Name"
                labelPlacement="outside"
                placeholder="Type Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <Select
                size="sm"
                labelPlacement="outside"
                label="Type"
                placeholder="Select Type"
                className="pb-3.5"
                selectedKeys={categoryType}
                onSelectionChange={setCategoryType}
              >
                <SelectItem key="Consumable" value="Consumable">
                  Consumable
                </SelectItem>
                <SelectItem key="Non-Consumable" value="Non-Consumable">
                  Non-Consumable
                </SelectItem>
              </Select>
             
            </div>
  
          </ModalBody>
          <ModalFooter>
            <Button size="sm" className="w-full bg-colorBlue text-white font-semibold font-poppins" type="submit">
              Add Category
            </Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
   
    </div>
  );
};
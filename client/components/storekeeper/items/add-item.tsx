import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  ModalProps,
  Selection,
} from "@nextui-org/react";
import Image from "next/image";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect } from "react";
import addimage from "../../../public/addimage.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { PlusIcon } from "../items/Items table/PlusIcon";

export const AddItem = (props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");
  const [selectedLocation, setSelectedlocation] = React.useState<Selection>(
    new Set([])
  );
  const [selectedSubLocation, setSelectedSubLocation] =
    React.useState<Selection>(new Set([]));
  const [selectedCategory, setSelectedCategory] = React.useState<Selection>(
    new Set([])
  );
  const [itemName, setItemName] = React.useState<string>("");
  const [itemUnit, setItemUnit] = React.useState<string>("");
  const [modalNo, setModalNo] = React.useState<string>("");
  const [threshold, setThreshold] = React.useState<string>("");
  const [itemImage, setItemImage] = React.useState();
  const [itemImageUrl, setItemImageUrl] = React.useState(null);

  const [locations, setlocations] = React.useState([
    {
      _id: "66409470e8008cc0ea156cf8",
      location_name: "location Z",
      __v: 0,
      no_of_sublocations: 4,
    },
    {
      _id: "6640947ce8008cc0ea156cfa",
      location_name: "location A",
      __v: 0,
      no_of_sublocations: 2,
    },
    {
      _id: "6641a220c681f72a7a15f046",
      location_name: "GCIT",
      __v: 0,
      no_of_sublocations: 0,
    },
  ]);
  const [subLocations, setSubLocations] = React.useState([
    {
      _id: "664096d4b89382eb0380dd88",
      sublocation_name: "SUBLOCATION TEST Z1",
      location_id: "66409470e8008cc0ea156cf8",
      __v: 0,
    },
    {
      _id: "664096d9b89382eb0380dd8a",
      sublocation_name: "SUBLOCATION TEST Z2",
      location_id: "66409470e8008cc0ea156cf8",
      __v: 0,
    },
    {
      _id: "66409c8b177d0f2468aea590",
      sublocation_name: "SUBLOCATION TEST Z3",
      location_id: "66409470e8008cc0ea156cf8",
      __v: 0,
    },
    {
      _id: "66409fc970f5f2b2018e0a09",
      sublocation_name: "SUBlocation a",
      location_id: "6640947ce8008cc0ea156cfa",
      __v: 0,
    },
    {
      _id: "66409fcc70f5f2b2018e0a0b",
      sublocation_name: "SUBlocation b",
      location_id: "6640947ce8008cc0ea156cfa",
      __v: 0,
    },
    {
      _id: "6640bd98ae23ab5cb25187da",
      sublocation_name: "cvkcjalkfd",
      location_id: "66409470e8008cc0ea156cf8",
      __v: 0,
    },
  ]);
  const [vendros, setVendors] = React.useState([
    {
      _id: "6641b2757dd1c9d709a38151",
      vendor_name: "Sonam Dojri",
      phone_no: 17944697,
      email: "shyambasnet@gmail.com",
      status: false,
      __v: 0,
    },
    {
      _id: "6641b58a2dedf1254bdd0dab",
      vendor_name: "Sonam Dojri",
      phone_no: 17944697,
      email: "shyambasnet21@gmail.com",
      status: true,
      __v: 0,
    },
    {
      _id: "6641b6232dedf1254bdd0dbe",
      vendor_name: "Sonam Dojri",
      phone_no: 17944697,
      email: "shyambasnet231@gmail.com",
      status: true,
      __v: 0,
    },
    {
      _id: "6641b6982ea9e6abfdde28b8",
      vendor_name: "Shyam Basnet",
      phone_no: 19243423,
      email: "shyambasnet289@gmail.com",
      status: true,
      __v: 0,
    },
  ]);
  const [category, setCategory] = React.useState([
    {
      _id: "663f74bc1f7929928a93af27",
      category_name: "Category A",
      type: "Non-Consumable",
      __v: 0,
    },
    {
      _id: "66408cae728820110dd00a18",
      category_name: "kelden",
      type: "Non-Consumable",
      __v: 0,
    },
    {
      _id: "66418d182aef124cc4dcf4d8",
      category_name: "New category",
      type: "Consumable",
      __v: 0,
    },
  ]);

  const handleSubmit = async () => {
    if (
      !itemName ||
      !itemUnit ||
      !modalNo ||
      !itemImage ||
      !threshold ||
      selectedCategory.size == 0 ||
      selectedLocation.size == 0 ||
      selectedSubLocation.size == 0
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = {
      item_name: itemName,
      item_unit: itemUnit,
      model_no: modalNo,
      low_stock_threshold: parseInt(threshold),
      image: itemImage,
      category_id: selectedCategory.values().next().value,
      location_id: selectedLocation.values().next().value,
      sublocation_id: selectedSubLocation.values().next().value,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/item/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response && response.status === 201) {
        toast.success("Item added successfully", {
          onClose: () => {
            props.onAddItem && props.onAddItem(response.data);
          },
        });
      } else {
        toast.error("Failed to create Item");
      }
    } catch (error) {
      toast.error("Could not post");
    }

    setItemName("");
    setItemUnit("");
    setItemImage(null);
    setItemImageUrl(null);
    setModalNo("");
    setThreshold("");
    setSelectedlocation(new Set([]));
    setSelectedSubLocation(new Set([]));
    setSelectedCategory(new Set([]));
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/category/all");
      if (response && response.status == 200) {
        setCategory(response.data);
      } else {
        toast.error("failed response");
      }
    } catch (error) {
      toast.error("could not fetch");
    }
  };
  const getLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/location/all");

      if (response) {
        setlocations(response.data);
      } else {
        toast.error("failed response");
      }
    } catch (error) {
      toast.error("could not fetch");
    }
  };
  const getSubLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sublocation/all");

      if (response) {
        setSubLocations(response.data);
      } else {
        toast.error("failed response");
      }
    } catch (error) {
      toast.error("could not fetch");
    }
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setItemImageUrl(URL.createObjectURL(e.target.files[0]));
      setItemImage(e.target.files[0]);
    }
  };
  useEffect(() => {
    getLocations();
    getSubLocations();
    getCategories();
  }, []);
  return (
    <div>
      <>
        <Button
          size="sm"
          onPress={onOpen}
          className="bg-warning text-background"
          endContent={<PlusIcon width={undefined} height={undefined} />}
        >
          Add Item
        </Button>
        {console.log(itemImage)}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          backdrop="blur"
          size="2xl"
          scrollBehavior={"outside"}
        >
          <form action={handleSubmit}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-md font-bold">
                    Add Item
                  </ModalHeader>
                  <ModalBody className="my-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="left-container ">
                      <Input
                        size="sm"
                        className="pb-2.5"
                        type="text"
                        label="Item Name"
                        placeholder="Enter Item Name"
                        labelPlacement="outside"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                      />
                      <Input
                        size="sm"
                        className="pb-2.5"
                        type="text"
                        label="Item Unit"
                        placeholder="Enter Item Unit"
                        labelPlacement="outside"
                        value={itemUnit}
                        onChange={(e) => setItemUnit(e.target.value)}
                      />
                      <Input
                        size="sm"
                        className="pb-2.5"
                        type="text"
                        label="Modal No"
                        placeholder="Enter Item Modal No"
                        labelPlacement="outside"
                        value={modalNo}
                        onChange={(e) => setModalNo(e.target.value)}
                      />
                      <Input
                        size="sm"
                        className="pb-2.5"
                        type="text"
                        label="Set threshold"
                        placeholder="Enter Threshold"
                        labelPlacement="outside"
                        value={threshold}
                        onChange={(e) => setThreshold(e.target.value)}
                      />
                      <Select
                        size="sm"
                        labelPlacement="outside"
                        label="Location"
                        placeholder="Select Location"
                        className="pb-2.5"
                        selectedKeys={selectedLocation}
                        onSelectionChange={setSelectedlocation}
                      >
                        {locations.map((location) => (
                          <SelectItem key={location._id} value={location._id}>
                            {location.location_name}
                          </SelectItem>
                        ))}
                      </Select>
                      <Select
                        size="sm"
                        labelPlacement="outside"
                        label="Sub Location"
                        placeholder="Select Sub Location"
                        className="pb-2.5"
                        isDisabled={
                          subLocations.find((sl) =>
                            selectedLocation.has(sl.location_id)
                          )
                            ? false
                            : true
                        }
                        selectedKeys={selectedSubLocation}
                        onSelectionChange={setSelectedSubLocation}
                      >
                        {subLocations
                          .filter((sublocation) =>
                            selectedLocation.has(sublocation.location_id)
                          )
                          .map((sublocation) => (
                            <SelectItem
                              key={sublocation._id}
                              value={sublocation._id}
                            >
                              {sublocation.sublocation_name}
                            </SelectItem>
                          ))}
                      </Select>

                      <Select
                        size="sm"
                        label="Category"
                        placeholder="Select Category"
                        labelPlacement="outside"
                        className="pb-2.5"
                        selectedKeys={selectedCategory}
                        onSelectionChange={setSelectedCategory}
                      >
                        {category.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.category_name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className=" border-dashed border-3 rounded-lg border-warning">
                      <label
                        htmlFor="files"
                        className="btn flex justify-center content-center h-full"
                      >
                        <Image
                          src={itemImageUrl ? itemImageUrl : addimage}
                          alt="Add Image"
                          className={itemImageUrl ? "object-fill" : ""}
                          width={itemImageUrl ? 500 : 100}
                          height={itemImageUrl ? 500 : 100}
                        />
                      </label>
                      <input
                        id="files"
                        style={{ visibility: "hidden" }}
                        type="file"
                        accept="image/*"
                        onChange={onImageChange}
                        className="bg-black"
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    {/* <Button  variant="flat" onClick={onClose}>
                    <span className="">Close</span>
                  </Button>
                  <Button color="warning" onPress={onClose}>
                    <span className="text-white">Add Item</span>
                  </Button> */}

                    <Button
                      className="w-1/2 font-semibold font-poppins"
                      size="sm"
                      variant="bordered"
                      style={{ borderColor: "#D0D5DD" }}
                      onPress={onClose}
                    >
                      Cancel
                    </Button>

                    <Button
                      size="sm"
                      className="w-1/2 bg-colorBlue text-white font-semibold font-poppins"
                      type="submit"
                    >
                      Add Item
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </form>
        </Modal>
      </>
    </div>
  );
};

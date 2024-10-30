'use client'

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor
} from "@nextui-org/react";
import Link from 'next/link';

import axios from "axios";

import { PlusIcon } from "../user-request tables/PlusIcon";
import { VerticalDotsIcon } from "../user-request tables/VerticalDotsIcon";
import { ChevronDownIcon } from "../user-request tables/ChevronDownIcon";
import { SearchIcon } from "../user-request tables/SearchIcon";
import { TrashIcon } from "@/components/user/icons/accounts/trash-icon";
import { capitalize } from "../user-request tables/utils"; 
import { useGlobalContext } from "@/contex";

import { toast } from "react-toastify";
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["item_code", "expires_on", "purchase_date", "received_date", "stock_quantity", "stock_selected", "stock_remaining"];



export const IssueUserItemTable = ({requestedQuantity, data, selectedItemId}) => {

  const [count, setCount] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState(selectedItemId);
  const {activeUserId} = useGlobalContext()
  const [columns, setColumns] = React.useState([
    {name: "ID", uid: "_id", sortable: true},
    {name: "ITEM CODE", uid: "item_code", sortable: true},
    {name: "EXPIRY", uid: "expires_on", sortable: true},
    {name: "PURCHASE", uid: "purchase_date", sortable: true},
    {name: "RECEIVED", uid: "received_date", sortable: true},
    {name: "INSPECTED BY", uid: "inspected_by", sortable: true},
    {name: "QUANTITY", uid: "stock_quantity", sortable: true},
    {name: "SELECTED", uid: "stock_selected", sortable: true},
    {name: "REMAINING", uid: "stock_remaining", sortable: true},
  

  ])
  
  const [products, setProducts] = React.useState([{
    "_id": "66428131aa8e5a93344530ae",
    "item_code": "SAU1232",
    "stock_quantity": 40,
    "expires_on": "2024-05-01T00:00:00.000Z",
    "purchase_date": "2024-01-11T00:00:00.000Z",
    "received_date": "2024-04-27T00:00:00.000Z",
    "inspected_by": "Jigme Dorji",
    "item_id": {
        "_id": "6641ec004ba2f3e656eb4a50",
        "item_name": "Red Printer Filament",
        "item_unit": "Bundle",
        "model_no": "JFKLSD523",
        "low_stock_threshold": 20,
        "image": "uploads\\items\\1715596288201red 3d printer filament.png",
        "true_count": 150,
        "category_id": "6641e8454ba2f3e656eb4a26",
        "location_id": "6640947ce8008cc0ea156cfa",
        "sublocation_id": "66409fc970f5f2b2018e0a09",
        "__v": 0
    },
    "vendor_id": {
        "_id": "66424dd576217bdf815e9df8",
        "vendor_name": "State Trading Corporation",
        "phone_no": 17328238,
        "email": "statetrading@gmail.com",
        "status": true,
        "__v": 0
    },
    "__v": 0,
    "stock_selected": 0,
    "stock_remaining": 40
},
{
  "_id": "66426c0af527f5f16190a92e",
  "item_code": "SAU102",
  "stock_quantity": 90,
  "expires_on": "2024-10-16T00:00:00.000Z",
  "purchase_date": "2024-01-02T00:00:00.000Z",
  "received_date": "2024-04-11T00:00:00.000Z",
  "inspected_by": "Kelden Norbu",
  "item_id": {
      "_id": "6641ec004ba2f3e656eb4a50",
      "item_name": "Red Printer Filament",
      "item_unit": "Bundle",
      "model_no": "JFKLSD523",
      "low_stock_threshold": 20,
      "image": "uploads\\items\\1715596288201red 3d printer filament.png",
      "true_count": 150,
      "category_id": "6641e8454ba2f3e656eb4a26",
      "location_id": "6640947ce8008cc0ea156cfa",
      "sublocation_id": "66409fc970f5f2b2018e0a09",
      "__v": 0
  },
  "vendor_id": {
      "_id": "66424d1676217bdf815e9de5",
      "vendor_name": "Stardose Enterprise",
      "phone_no": 17328248,
      "email": "stardose@gmail.com",
      "status": true,
      "__v": 0
  },
  "__v": 0,
  "stock_selected": 0,
  "stock_remaining": 90
}
]);
  
  const getAllStocks = async () => {
    try {
      
      const response = await axios.get(`http://localhost:5000/stock/all-details/${selectedItemId}`);
      if (response && response.data) {
        // Process the response data to add the additional fields
        const processedData = response.data.map(stock => {
          const stockSelected = 0; // Assuming initial selected stock is 0
          const stockRemaining = stock.stock_quantity;

          return {
            ...stock,
            'stock_selected': stockSelected,
            'stock_remaining': stockRemaining
          };
        });
      
        setProducts(processedData);
      }
       
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    selectedItemId && (
      
      getAllStocks()
    
  );
   
  }, [selectedItemId]);
  
  type Product = typeof products[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
  const [disabledKeys, setDisabledKeys] = useState<Set<string>>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedStocks, setSelectedStocks] = React.useState();
  const [totalSelectedStock, setTotalSelectedStock] = React.useState(0);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  
  const pages = Math.ceil(products.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.item_code.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredProducts;
  }, [products, filterValue, statusFilter]);
  
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Product, b: Product) => {
      const first = a[sortDescriptor.column as keyof Product] as number;
      const second = b[sortDescriptor.column as keyof Product] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((product: Product, columnKey: React.Key) => {
    const cellValue = product[columnKey as keyof Product];

    switch (columnKey) {
      case "_id":
        return product._id;
      // case "item_name":
      //   return product.item_name;
      case "unit":
        return product.item_id.item_unit;
      case "purchase_date":
        return new Date(product.purchase_date).toISOString().substring(0, 10);
      case "expires_on":
        return product.expires_on ? new Date(product.expires_on).toISOString().substring(0, 10): "No date";
      case "received_date":
        return new Date(product.received_date).toISOString().substring(0, 10);
      case "vendor":
        return product.vendor_id.vendor_name;
      case "stock_quantity":
        return product.stock_quantity;
        case "model_no":
          return product.item_id.model_no;
      default:
        return cellValue;
    }
  }, [products, setProducts]);
  

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
          size="sm"
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
            size="sm"
              color="warning"
              className="text-white"
              onClick={()=> issueRequest(data._id, activeUserId)}
            >
           Issue Items
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {products.length} products</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    products.length,
    hasSearchFilter,
    selectedKeys, disabledKeys, products, setSelectedStocks
  ], );

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
        size="sm"
          showControls
          classNames={{
            cursor: "bg-warning text-background",
          }}
          color="warning"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {totalSelectedStock === requestedQuantity
            ? "All stock selected"
            : `${totalSelectedStock} of ${requestedQuantity} selected `}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  const handleSelection = (selectedKeys: Set<string>) => {

    let newProducts = [...products]; // Create a new array to hold the updated products
    let newDisabledKeys = new Set<string>([]);
    let totalSelectedStock = 0;
    let remainingQuantity = requestedQuantity;
  
    // Update the "Stock Selected" and "Stock Remaining" values in the new array
    newProducts = newProducts.map(row => {

      if (selectedKeys.has(row['_id'].toString())) {
        const selectedStock = Math.min(row['stock_quantity'], remainingQuantity);
        remainingQuantity -= selectedStock;
        return { ...row, ['stock_selected']: selectedStock, ['stock_remaining']: row['stock_quantity'] - selectedStock };
      } else {
        return { ...row, ['stock_selected']: 0, ['stock_remaining']: row['stock_quantity'] };
      }
    });
  
    // Update the disabled['id']s logic
    selectedKeys.forEach((selectedKey) => {
      const selectedRow = newProducts.find(row => row['_id'].toString() === selectedKey);
      totalSelectedStock += selectedRow ? selectedRow['stock_selected'] : 0;
    });
    
    if (totalSelectedStock >= requestedQuantity) {
      
      newDisabledKeys = new Set(newProducts.map(row => row['_id'].toString()));
      selectedKeys.forEach((selectedKey) => {
        const selectedRow = newProducts.find(row => row['_id'].toString() === selectedKey);
        if (selectedRow) {
          newDisabledKeys.delete(selectedKey);
        }
      });
    }
  
    setSelectedKeys(selectedKeys);

    setDisabledKeys(newDisabledKeys);
    setProducts(newProducts); 
    setTotalSelectedStock(totalSelectedStock);
    const selectedStock = getSelectedStocks(newProducts,selectedKeys)
    setSelectedStocks(selectedStock)
    
  };

  
  function getSelectedStocks(stocks, selectedKeys) {
    // console.log('stocks', stocks)
    // console.log('selectedKeys', selectedKeys)
    return stocks.map(stock => {
      if (selectedKeys.has(stock._id)) {
        return {
          _id: stock._id,
          stock_selected: stock.stock_selected,
          stock_remaining: stock.stock_remaining
        };
      }
      return null;
    }).filter(Boolean);
  }

  const issueRequest = async (requestId, userId) => {
    const selectedStock = getSelectedStocks(products,selectedKeys)

    if(selectedStock.length === 0){
      toast.error('Please Select a stock')
      return;
    }
    try {

      const response = await axios.put(`http://localhost:5000/request/issue/${requestId}`, {
        userId,
        selectedStocks
      });
      if(response && response.status == 200){
        toast.success("Items has been Issued!", {onClose: ()=>{
          window.location.reload();
        }})
      }else{
        toast.error('Item issue failed')
      }
    } catch (error) {
      console.error('Error issuing request:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const selectedStock = getSelectedStocks(products,selectedKeys)
    getSelectedStocks(products,selectedKeys)
    setSelectedStocks(selectedStock)
   
  }, [selectedKeys, disabledKeys, products, setSelectedStocks]);

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-warning after:text-background text-background",
        },
      }}
      classNames={classNames}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
      color="warning"
      disabledKeys={Array.from(disabledKeys)}
      selectedKeys={Array.from(selectedKeys)}
      onSelectionChange={(selectedKeys) => handleSelection(new Set(selectedKeys))}
    >
      
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No products found"} items={sortedItems}>
        {(item) => (
          <TableRow className="text-xs" key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            
          </TableRow>
        )}
      </TableBody>
      
    </Table>
  );
}

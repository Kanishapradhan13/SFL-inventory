import React, { useEffect } from "react";
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
  Product,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { SearchIcon } from "./SearchIcon";
import { columns, products, statusOptions } from "./data";
import { capitalize } from "./utils";
import { DeleteModel } from "../add-item";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useGlobalContext } from "@/contex";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Hold: "success",
  Rejected: "danger",
  Pending: "warning",
  Borrowed: "primary",
  Issued: "primary",
};

const INITIAL_VISIBLE_COLUMNS = [
  "item_name",
  "count",
  "request_type",
  "status",
  "actions",
];

export const TableWrapper = () => {
  const [columns, setColumns] = React.useState([
    { name: "ID", uid: "_id", sortable: true },
    { name: "NAME", uid: "item_name", sortable: true },
    { name: "COUNT", uid: "count", sortable: true },
    { name: "MODEL NO", uid: "model no", sortable: true },
    { name: "REQUEST_TYPE", uid: "request_type", sortable: true },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions", sortable: true },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeUserId} = useGlobalContext()
  const statusOptions = [
    { name: "Accepted", uid: "Hold" },
    { name: "Pending", uid: "Pending" },
    { name: "Rejected", uid: "Rejected" },
    { name: "Borrowed", uid: "Borrowed" },
    { name: "Received", uid: "Issued" },
  ];
  const [products, setProducts] = React.useState([
    {
      _id: "6644b6914652a9dda0bfd5a7",
      request_type: "User",
      status: "Rejected",
      reason: "Work",
      count: 44,
      user_id: {
        _id: "b0ae220b-8642-4deb-b2e4-3d3ebeb53246",
        name: "User",
        role: "User",
        phone_no: 17382929,
        organization: "DHI",
        email: "user@email.com",
        password: "useruser123",
        image: "http://localhost:5000/uploads/users/defaultProfile.png",
        favourite_items: [
          "66423e565e274481e7f84c85",
          "66439aa29ad55d7245cc6dfb",
        ],
        createdAt: "2024-05-14T18:27:28.601Z",
        updatedAt: "2024-05-14T21:38:13.313Z",
        __v: 34,
      },
      item_id: {
        _id: "6641ec004ba2f3e656eb4a50",
        item_name: "Red Printer Filament",
        item_unit: "Bundle",
        model_no: "JFKLSD523",
        low_stock_threshold: 20,
        image: "uploads\\items\\1715596288201red 3d printer filament.png",
        true_count: 116,
        category_id: "6641e8454ba2f3e656eb4a26",
        location_id: "6640947ce8008cc0ea156cfa",
        sublocation_id: "66409fc970f5f2b2018e0a09",
        __v: 0,
      },
      selected_stock_with_count: [],
      createdAt: "2024-05-15T13:20:17.502Z",
      updatedAt: "2024-05-15T15:58:24.086Z",
      __v: 0,
    },
  
  ]);

  const getAllMyRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/request/my-requests/${activeUserId}`);

      if (response) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMyRequest();
  });

  type Product = (typeof products)[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(products.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);
  const handleCrossIconClick = () => {
    onOpen();
  };

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.item_id.item_name
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.status === statusFilter
      );
    }

    return filteredProducts;
  }, [products, filterValue, statusFilter, hasSearchFilter]);

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

  const renderCell = React.useCallback(
    (product: Product, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof Product];

      switch (columnKey) {
        case "item_name":
          return product.item_id.item_name;

        case "model no":
          return product.item_id.model_no;

        case "model no":
          return product.item_id.model_no;

        case "status":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[product.status]}
              size="sm"
              variant="dot"
            >
              {(cellValue == "Hold" && "Accepted") ||
                (cellValue == "Rejected" && "Rejected") ||
                (cellValue == "Pending" && "Pending") ||
                (cellValue == "Borrowed" && "Borrowed") ||
                (cellValue == "Issued" && "Received")}
            </Chip>
          );
        case "actions":
          if (product.status === "Pending") {
            return (
              <div className="text-lg">
                <DeleteModel requestId={product._id} />
              </div>
            );
          }
          return null;
        default:
          return cellValue;
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };

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
                  size="sm"
                  endContent={<ChevronDownIcon className="text-small" />}
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
            <Dropdown>
              <DropdownTrigger>
                <Button
                  size="sm"
                  endContent={<ChevronDownIcon className="text-xs " />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => handleStatusFilterChange("all")}>
                  All
                </DropdownItem>
                {statusOptions.map((option) => (
                  <DropdownItem
                    key={option.uid}
                    onClick={() => handleStatusFilterChange(option.uid)}
                  >
                    {capitalize(option.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-xs">
            Total {products.length} products
          </span>
          <label className="flex items-center text-default-400 text-xs">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-xs"
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
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-warning text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      // selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
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
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell className="text-xs">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

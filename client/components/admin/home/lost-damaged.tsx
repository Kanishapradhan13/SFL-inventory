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
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "../table/PlusIcon";
import { VerticalDotsIcon } from "../table/VerticalDotsIcon";
import { ChevronDownIcon } from "../table/ChevronDownIcon";
import { SearchIcon } from "../icons/searchicon";
import { columns, products } from "../table/data";
import { capitalize } from "../accounts/Items table/utils";
import { DeleteModel } from "./eye-icon";
import axios from "axios";
const statusColorMap: Record<string, ChipProps["color"]> = {
  Damaged: "danger",
  Lost: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "item_code",
  "name",
  "return_date",
  "borrower",
  "count",
  "category",
  "type",
  "status",
  "actions",
];

export const IssueItemPage = () => {
  const [columns, setColumns] = React.useState([
    { name: "ID", uid: "_id", sortable: true },
    { name: "ITEM CODE", uid: "item_code", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    // { name: "RETURN DATE", uid: "return_date", sortable: true },
    { name: "COUNT", uid: "count", sortable: true },
    { name: "BORROWER", uid: "borrower", sortable: true },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions", sortable: true },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const statusOptions = [
    { name: "Damaged", uid: "Damaged" },
    { name: "Lost", uid: "Lost" },
  ];
  const [products, setProducts] = React.useState([]);

  const getAllLostDamaged = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/request/lost-and-damaged"
      );
      if (response) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLostDamaged();
  }, []);
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
        (product) => product.returned_status === statusFilter
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
        case "item_code":
          return product.damaged_lost_stock_id.item_code;
        case "count":
          return product.damaged_lost_count;
        case "name":
          return product.item_id.item_name;
        case "borrower":
          return product.user_id.name;
        case "status":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[product.returned_status]}
              size="lg"
              variant="dot"
            >
              <span className="text-xs"> {product.returned_status}</span>
            </Chip>
          );
        case "actions":
          if (product.returned_status === "Damaged") {
            return (
              <div className="text-lg">
                <DeleteModel
                  description={product.damaged_lost_description}
                  name={product.item_id.item_name}
                />
              </div>
            );
          }
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
            isClearable
            size="sm"
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
          <span className="text-default-400 text-small">
            Total {products.length} Stocks
          </span>
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
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          size="sm"
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
      <TableBody emptyContent={"No stocks found"} items={sortedItems}>
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

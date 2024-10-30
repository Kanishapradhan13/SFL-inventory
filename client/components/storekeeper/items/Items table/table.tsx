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
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";
import Link from "next/link";

import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { SearchIcon } from "./SearchIcon";
import { ActionIcon } from "./ActionIcon";
// import {columns, users, statusOptions} from "./data";
import { capitalize } from "./utils";
import { AddItem } from "../add-item";
import axios from "axios";
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "item_name",
  "true_count",
  "item_unit",
  "model_no",
  ,
  "type",
  "location",
  "actions",
];

export const TableWrapper = ({ value }) => {
  const [selectedSort, setSelectedSort] = React.useState(value);
  const [columns, setColumns] = React.useState([
    { name: "ID", uid: "_id", sortable: true },
    { name: "NAME", uid: "item_name", sortable: true },
    { name: "COUNT", uid: "true_count", sortable: true },
    { name: "UNIT", uid: "item_unit", sortable: true },

    { name: "TYPE", uid: "type", sortable: true },
    { name: "MODEL NO", uid: "model_no", sortable: true },
    { name: "LOCATION", uid: "location", sortable: true },
    { name: "ACTIONS", uid: "actions", sortable: true },
  ]);
  const [users, setUsers] = React.useState([]);
  const getAllItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/item/all-details"
      );

      if (response && response.status === 200) {
        setUsers(response.data);
      } else {
        console.log("Failed to fetch items");
      }
    } catch (error) {
      console.log("Could not fetch");
    }
  };
  const getAllLowStock = async () => {
    try {
      const response = await axios.get("http://localhost:5000/item/low-stock");

      if (response && response.status === 200) {
        setUsers(response.data);
      } else {
        console.log("Failed to fetch items");
      }
    } catch (error) {
      console.log("Could not fetch");
    }
  };
  const getAllExpired = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/item/expired-items"
      );

      if (response && response.status === 200) {
        setUsers(response.data);
      } else {
        console.log("Failed to fetch items");
      }
    } catch (error) {
      console.log("Could not fetch");
    }
  };
  useEffect(() => {
    if (selectedSort == "All") {
      getAllItems();
    } else if (selectedSort == "Low Stock") {
      getAllLowStock();
    } else if (selectedSort == "Expired") {
      getAllExpired();
    }
  }, []);

  type User = (typeof users)[0];

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

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.item_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "item_name":
        return (
          <User
            avatarProps={{
              radius: "full",
              size: "sm",
              src: user.image,
            }}
            classNames={{
              description: "text-default-500",
            }}
            description={user.category_id.category_name}
            name={cellValue}
          >
            {user.item_name}
          </User>
        );
      case "_id":
        return user._id;
      // case "item_name":
      //   return user.item_name;
      case "true_count":
        return user.true_count;
      case "item_unit":
        return user.item_unit;
      case "type":
        return user.category_id.type;
      case "model_no":
        return user.model_no;
      case "location":
        return user.location_id.location_name;
      case "actions":
        return (
          <div>
            <Link href={`/storekeeper/items/${user._id}`}>
              <ActionIcon></ActionIcon>
            </Link>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
            <AddItem onAddItem={(newItem) => setUsers((prevUsers) => [...prevUsers, newItem])} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-xs">
            Total {users.length} Items
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
    users.length,
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
      <TableBody emptyContent={"No Items found"} items={sortedItems}>
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

"use client";
import { useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { BillsTableWrapper } from "@/components/admin/vendor/borrow history table/table";
export default function Page({ params }: { params: { id: string } }) {
  const [itemId, setItemId] = useState(params.id);

  return (
    <div className="h-full p-7">
      <div className="flex w-full flex-col py-6">
        <BillsTableWrapper vendorId={itemId} />
      </div>
    </div>
  );
}

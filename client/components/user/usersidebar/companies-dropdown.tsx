import React, { useState } from "react";
import { AcmeIcon } from "../icons/acme-icon"; 

interface Company {
  logo: React.ReactNode;
  name: string;
  fname: string;
  lname: string;
}
export const CompaniesDropdown = () => {
  const [company, setCompany] = useState<Company>({
    logo: <AcmeIcon />,
    name: "JNWSFL INVENTORY",
    fname: "JNWSFL", 
    lname: "INVENTORY", 
  });
  
  return (
    <div className="flex flex-col items-center ">
      <div className="mt-1">{company.logo}</div>
  
      <div className="ml-1 text-center font-bold text-md block">{company.name}</div>
    </div>
  );
};

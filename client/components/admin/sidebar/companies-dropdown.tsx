import React, { useState } from "react";
import { AcmeIcon } from "../icons/acme-icon"; 

interface Company {
  logo: React.ReactNode;
  fname: string;
  lname: string;
}
export const CompaniesDropdown = () => {
  const [company, setCompany] = useState<Company>({
    logo: <AcmeIcon />,
    fname: "JNWSFL", 
    lname: "INVENTORY", 
  });
  
  return (
    <div className="flex flex-col items-center ">
      <div className="mt-1">{company.logo}</div>
      <div className="ml-1 text-center font-bold text-md block">{company.fname + " " + company.lname}</div>
      {/* <div className="ml-1 text-center font-bold text-md">{company.lname}</div> */}
    </div>
  );
};

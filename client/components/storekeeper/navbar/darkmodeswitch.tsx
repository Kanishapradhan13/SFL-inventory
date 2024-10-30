import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../navbar/MoonIcon.jsx"
import { SunIcon } from "../navbar/SunIcon.jsx"

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  return (
    <Switch 
      isSelected={resolvedTheme === "dark" ? true : false}
      onValueChange={(e) => setTheme(e ? "dark" : "light")}
      defaultSelected
      size="sm"
      color="warning"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
    />
 
  );
};

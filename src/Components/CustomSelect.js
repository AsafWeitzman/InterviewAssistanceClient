import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CustomSelect({ options }) {
  const [option, setOption] = useState("");

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Select
        value={option}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option, key) => {
          return (
            <MenuItem key={key} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

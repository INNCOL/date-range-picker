import React from "react";
import { FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import CalendarMonth from "@mui/icons-material/CalendarMonth";

interface InputRangeProps {
    value: string;
    onIconClick: React.MouseEventHandler<SVGSVGElement>
}

export const InputRange: React.FC<InputRangeProps> = ({ value, onIconClick }) => {
    return (
        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
            <OutlinedInput
                id="date-range-input"
                type="text"
                value={value}
                disabled
                endAdornment={
                    <InputAdornment position="end">
                        <CalendarMonth onClick={onIconClick} />
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}
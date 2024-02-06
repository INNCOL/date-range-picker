import React from "react"
import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material"

interface YearSelectProps {
    value: number;
    onChange: (event: SelectChangeEvent<string>) => void;
}

export const YearSelect: React.FC<YearSelectProps> = ({ value, onChange }) => {
    return (
        <FormControl fullWidth>
            <Select
                labelId="year-select-label"
                id="year-select"
                value={value.toString()}
                onChange={onChange}
            >
                {Array.from({ length: 10 }, (_, i) => (
                    <MenuItem key={i} value={value - 5 + i}>
                        {value - 5 + i}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface InputRangeProps {
    value: string;
    onIconClick: React.MouseEventHandler<any>;
}

export const InputRange: React.FC<InputRangeProps> = ({ value, onIconClick }) => {
    return (
        <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined" fullWidth>
            <OutlinedInput
                id="date-range-input"
                type="text"
                value={value || 'Selecciona un rango'}
                disabled
                fullWidth
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={onIconClick}
                            edge="end"
                            aria-describedby="inn-col-date-range-picker"
                            aria-label="select date range"
                            sx={{ pointerEvents: 'auto' }}
                        >
                            <CalendarMonthIcon />
                        </IconButton>
                    </InputAdornment>
                }
                inputProps={{
                    "aria-label": "date range input",
                }}
                sx={{
                    backgroundColor: "#f5f5f5",
                    color: "#000",
                    "&.Mui-disabled": {
                        backgroundColor: "#f5f5f5",
                        color: "#555",
                        WebkitTextFillColor: "#555", // for Safari
                    },
                }}
            />
        </FormControl>
    );
};

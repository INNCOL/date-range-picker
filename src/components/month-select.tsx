import React from "react";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface MonthSelectProps {
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void
}

export const MonthSelect: React.FC<MonthSelectProps> = ({ value, onChange }) => {
    return (
        <FormControl fullWidth>
            <Select
                labelId="month-select-label"
                id="month-select"
                value={value}
                onChange={onChange}
            >
                {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem key={i} value={i}>
                        {
                            format(new Date(0, i), 'MMMM', { locale: es })
                                .replace(/^\w/, (c) => c.toUpperCase())
                        }
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
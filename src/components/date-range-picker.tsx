import React, { useState } from 'react';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/MenuList';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { format, getMonth, getYear, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { es } from 'date-fns/locale';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import Close from '@mui/icons-material/Close';

export interface Dates {
  start: Date;
  end: Date | null;
}

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (date: Dates) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, startDate = new Date(), endDate }) => {
  const [dateRangeText, setDateRangeText] = React.useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(endDate);
  const [selectedMonth, setSelectedMonth] = useState(getMonth(startDate));
  const [selectedYear, setSelectedYear] = useState(getYear(startDate));

  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onChange({ start: selectedStartDate, end: selectedEndDate });
    setDateRangeText(`${format(selectedStartDate, 'dd/MM/yyyy')} - ${format(selectedEndDate!, 'dd/MM/yyyy')}`)
  };

  const handleDateSelect = (date: Date) => {
    if (!selectedStartDate) {
      setSelectedStartDate(date);
      onChange({ start: date, end: null });
    } else if (!selectedEndDate) {
      setSelectedEndDate(date);
      onChange({ start: selectedStartDate, end: date });
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      onChange({ start: date, end: null });
    }
  };

  const handleMonthSelect = (event: { target: { value: React.SetStateAction<number>; }; }) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearSelect = (event: { target: { value: React.SetStateAction<number>; }; }) => {
    setSelectedYear(event.target.value);
  };

  const generateDays = () => {
    const firstDayOfMonth = startOfMonth(new Date(selectedYear, selectedMonth, 1));
    const lastDayOfMonth = endOfMonth(new Date(selectedYear, selectedMonth, 1));
    return eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  };

  const renderDays = () => {
    const days = generateDays();
    return days.map((date) => (
      <MenuItem
        key={date.toISOString()}
        onClick={() => handleDateSelect(date)}
        style={
          date.getTime() === startDate?.getTime()
            ? { fontWeight: 'bold', backgroundColor: 'darkgray', color: 'white' }
            : date.getTime() === endDate?.getTime()
              ? { fontWeight: 'bold', backgroundColor: 'gray', color: 'white' }
              : selectedStartDate && selectedEndDate && date > selectedStartDate && date < selectedEndDate
                ? { backgroundColor: 'lightgray' }
                : {}
        }
      >
        {date.getDate()}
      </MenuItem>
    ));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
        <OutlinedInput
          id="date-range-input"
          type="text"
          value={dateRangeText}
          disabled
          endAdornment={
            <InputAdornment position="end">
              {/* @ts-ignore */}
              <CalendarMonth onClick={handleClick} />
            </InputAdornment>
          }
        />
      </FormControl>
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="auto" sx={{ padding: '1rem' }} >
        <Paper sx={{ padding: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
              <FormControl fullWidth>
                <Select
                  labelId="month-select-label"
                  id="month-select"
                  value={selectedMonth}
                  /* @ts-ignore */
                  onChange={handleMonthSelect}
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
              <FormControl>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={selectedYear}
                  /* @ts-ignore */
                  onChange={handleYearSelect}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <MenuItem key={i} value={selectedYear - 5 + i}>
                      {selectedYear - 5 + i}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <MenuList style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {renderDays()}
            </MenuList>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleClose}>Seleccionar</Button>
            <IconButton onClick={handleClick}>
              <Close />
            </IconButton>
          </div>
        </Paper>
      </Popper>
    </div>
  );
}
